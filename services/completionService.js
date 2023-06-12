const agent = require("../models/agent")
const OrderManager = require("../models/orderManager")
const Shop = require("../models/shop")
const command = require("../models/command")

exports.createOrderSession = async (req, res, next) => {
    let shop_id, shop_name;
    if (!(shop_id = req.body.shop_id)) {
        next('There is no id')
    }
    try {
        const orderManager = new OrderManager(shop_id)
        orderManager.initMenu(shop_id)
        req.session.orderManager = orderManager.getFeilds()
        // console.log(orderManager) //데이터쿼리과정에서 비동기화 소요 발생 
        res.status(200).json({
            response: 'created'
        })
    } catch (e) {
        res.status(500).json({
            response: 'Failed to create'
        })
        throw (e)
    }
}

exports.createOrderCompletion = async (req, res, next) => {
    try {
        const msg = req.body.msg
        let u_commands = []
        let a_commands = []
        let commands = []
        let reply = ''
        let extra_prompt = ''
        const orderManager = new OrderManager(req.session.orderManager)
        orderManager.initMenu()

        if (orderManager.step >= 30) {    // 
            orderManager = null
            req.session.orderManager = null;
            res.status(500).send(new Error('Too many steps'))
        }

        //유저의 커맨드를 추출함
        u_commands = await agent.extractUserCommand(orderManager, msg)//extract command from request message


        //////-------------------------------------------------
        //수락되어 저장할 명령어  명령어에 저장
        if (!orderManager.requested_commands) {
            commands = [...orderManager.requested_commands]
            orderManager.requested_commands = null
        }
        //------------------------------------------------------
        //유저커맨드로 리플 프롬프트 구성
        u_commands.forEach(cmd => {
            const command_name = cmd[0]
            const args = cmd.copyWithin(1, cmd.length)

            // command.execute(order, command)
            switch (command_name) { //execute command 
                case `info`:
                    extra_prompt = command.getInfo(orderManager, args)
                    break
                case `ls`:
                    extra_prompt = command.getCart(orderManager)
                    break
                case `yes`:
                    //직전 명령어를 불러와서
                    commands = [...orderManager.requested_commands]
                    orderManager.requested_commands = null
                    break
                case `no`:
                    orderManager.requested_commands = null
                    break
                default: // `-`
                    // extra_prompt = `you didn't understand. ask to user again`
                    break
                //undo
                //redo


            }
        });


        reply = await agent.createReply(orderManager, msg, extra_prompt)
        a_commands = await agent.extractAssistantCommand(orderManager, reply)


        // 명령어 추출에 실패하면 다시 시도하는 로직 필요
        let idx = a_commands.indexOf('ask');
        if (!idx) {
            a_commands.removeItem(idx)
            orderManager.requested_commands = a_commands
        }

        commands = [...commands, ...a_commands]

        commands.forEach(cmd => {
            const command_name = cmd[0]
            const args = cmd.copyWithin(1, cmd.length)


            // command.execute(order, command)
            switch (command_name) { //execute command 
                case `add`:
                    extra_prompt = command.addItem(orderManager, args)
                    //Change State
                    //add command[1]
                    break
                case `rm`:
                    // 제거할때 이거 빼주세요 하고 하지않잖아
                    // 그거 말고 저거 주세요 이런식으로 하지.. 그러니까 바꿀 방법을 생각해야하고
                    // 그렇기 때문에 명령어를 보관할 필요도 있어보인다.
                    // 
                    extra_prompt = command.removeItem(orderManager, args)
                    break
                case `state`:
                    //state transition
                    // o -> p
                    // p -> o  only two case
                    command.transitionState(orderManager, args)
                    break
                default: // `-`

                    break
                //undo
                //redo



            }
        });
        //최근 2쌍의 컨텐트만 dialogue에 보관
        if (orderManager.dialogue.length > 3) {
            orderManager.dialogue.shift()
            orderManager.dialogue.shift()
        }

        orderManager.dialogue.push({ role: "user", content: msg })//reply생성 위에 존재시 429에러시 문제
        orderManager.dialogue.push({ role: "assistant", content: reply })

        orderManager.step = orderManager.step + 1;
        req.session.orderManager = orderManager.getFeilds()

        console.log("step : ", orderManager.step, "orders : ", orderManager.orders)
        res.json([{
            reply: reply,
            command: a_commands,
            total_token: orderManager.total_token,
            step: orderManager.step
        }])


    } catch (err) {
        // next(err);
        console.log(err)
        res.status(500).send(err)
    }
}
