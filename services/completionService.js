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
        const orderManager = new OrderManager(req.session.orderManager)
        orderManager.initMenu()

        if (orderManager.step >= 30) {    // 
            orderManager = null
            req.session.orderManager = null;
            res.status(400).send(err)
            // 에러처리
        }

        let extra_prompt
        const commands = await agent.extractUserCommand(orderManager, msg)//extract command from request message
        


        //명령어 적재 및 지난 명령어 처리구문
        commands.forEach(element => {
            //빈명령어 제거
            if (!element)
                return

            if (element === 'y') {
                // 지난 스텝의 명령어를 수락한다.
                // 지난 스텝의 명령어를 어떻게 보관할까? 그래고 처리할 스텝의 스코프는? 바로직전만?
                // 지난 스텝이 불고기버거한개 맞으신가요?
                

            } else if (element === 'n') {
                // 지난 스텝의 명령어를 거부한다.
            } else {

                orderManager.command_stack.push({ step: orderManager.step, command: element })
            }
        })

        //현재스탭의 명령어중 accept명령어로 지난 스탭의 명령어 처리
        commands.forEach(element => {
            // 명령어 중에 허락명령어가 있다면 지난 명령어를 수락한다.
            element.step
        })

        //이동예정
        commands.forEach(element => {
            const args = element.split(" ")
            const command_name = args.shift()

            // command.execute(order, command)
            switch (command_name) { //execute command 
                case `i`:
                    extra_prompt = command.getInfo(orderManager, args)
                    break
                case `a`:
                    extra_prompt = command.addItem(orderManager, args)
                    //Change State
                    //add command[1]
                    break
                case `r`:
                    // 제거할때 이거 빼주세요 하고 하지않잖아
                    // 그거 말고 저거 주세요 이런식으로 하지.. 그러니까 바꿀 방법을 생각해야하고
                    // 그렇기 때문에 명령어를 보관할 필요도 있어보인다.
                    // 
                    extra_prompt = command.removeItem(orderManager, args)
                    break
                case `l`:
                    extra_prompt = command.getCart(orderManager)
                    break
                case `st`:
                    //state transition
                    // o -> p
                    // p -> o  only two case
                    command.transitionState(orderManager, args)
                    break
                default: // `n`
                    extra_prompt = `you didn't understand. ask to user again`
                    break
            }
        });

        //TODO : 특정 명령어에만 menu, cart 활성화
        const reply = await agent.createReply(orderManager, msg, extra_prompt)

        //최근 2쌍의 컨텐트만 dialogue에 보관
        if (orderManager.dialogue.length > 3) {
            orderManager.dialogue.shift()
            orderManager.dialogue.shift()
        }

        orderManager.dialogue.push({ role: "user", content: msg })//reply생성 위에 존재시 429에러시 문제
        orderManager.dialogue.push({ role: "assistant", content: reply })

        orderManager.step = orderManager.step + 1;
        console.log(orderManager.step)
        req.session.orderManager = orderManager.getFeilds()
        // console.log(order.getOrder())
        console.log("orders : ", orderManager.orders)
        console.log("step : ", orderManager.step)
        res.json({
            reply: reply,
            command: commands,
            token: orderManager.token,
            step: orderManager.step
        })

    }
    catch (err) {
        // next(err);
        console.log(err)
        res.status(500).send(err)
    }
};


exports.terminateOrder = (req, res, next) => {


}
