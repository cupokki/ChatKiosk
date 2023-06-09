const agent = require("../models/agent")
const OrderManager = require("../models/orderManager")
const Shop = require("../models/shop")
const command = require("../models/command")

exports.createOrderSession = async(req, res, next)  => {
    let shop_id, shop_name;
    if(!(shop_id = req.body.shop_id)){
        next('There is no id')
    }
    try{
        const orderManager = new OrderManager(shop_id)
        orderManager.setMenu(shop_id)
        req.session.orderManager = orderManager.getFeilds()
        console.log(orderManager) //데이터쿼리과정에서 비동기화 소요 발생 
        res.status(200).json({
            response : 'created'
        })
    }catch(e){
        res.status(400).json({
            response : 'Failed to create'
        })
        throw(e)
    }
}

exports.createOrderCompletion =  async(req, res, next) => {
    if(!req.session.orderManager){
        next('There is no order')
        // 에러처리
    }

    const msg = req.body.msg
    const orderManager = new OrderManager(req.session.orderManager)
    orderManager.setMenu()
    
    if(orderManager.step >= 30){    // 
        orderManager = null
        req.session.orderManagerFeild = null;
        res.status(400).send(err)
        // 에러처리
    }

    try {
        let extra_prompt
        const commands = await agent.extractCommand(orderManager, msg)//extract command from request message

        //이동예정
        commands.forEach(element => {
            const args = element.split(" ")
            const command_name = args.shift()

            // command.execute(order, command)
            switch(command_name){ //execute command 
                case `i`:
                    extra_prompt = command.getInfo(orderManager, arguments)
                    break
                case `a`:
                    extra_prompt = command.addItem(orderManager, arguments)
                    OrderManager.orderItem(item_id, count)
                    //Change State
                    //add command[1]
                    break
                case `r`:
                    // 제거할때 이거 빼주세요 하고 하지않잖아
                    // 그거 말고 저거 주세요 이런식으로 하지.. 그러니까 바꿀 방법을 생각해야하고
                    // 그렇기 때문에 명령어를 보관할 필요도 있어보인다.
                    // 
                    extra_prompt = command.removeItem(orderManager, arguments)
                    break
                case `l`:
                    extra_prompt = command.getCart(orderManager)
                    break
                
                default: // `n`
                    extra_prompt = `you didn't understand. ask to user again`
                    break  
            }
        });

        //TODO : 특정 명령어에만 menu, cart 활성화
        const reply = await agent.createReply(orderManager, msg, extra_prompt)
        
        //최근 2쌍의 컨텐트만 dialogue에 보관
        if (orderManager.dialogue.length > 3){
            orderManager.dialogue.shift()
            orderManager.dialogue.shift()
        }
        
        orderManager.dialogue.push({role : "user", content : msg})//reply생성 위에 존재시 429에러시 문제
        orderManager.dialogue.push({role : "assistant", content : reply})

        orderManager.step += 1;
        req.session.orderManagerFeild = orderManager.getFeilds
        // console.log(order.getOrder())
        console.log("cart : ", orderManager.cart)
        console.log("step : ", orderManager.step)
        res.json({
            reply : reply,
            command : commands,
            token : orderManager.token,
            step : orderManager.step
        })
        
    }
    catch(err){
        // next(err);
        console.log(err)
        res.status(500).send(err)
    }
};


exports.terminateOrder = (req, res, next)  => {


}
