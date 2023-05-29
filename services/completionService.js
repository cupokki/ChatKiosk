// const userModel = require('../models/userModel');

// exports.getUsers = async (req, res, next) => {
//   try {
//     const users = await userModel.find();
//     res.status(200).json({
//       status: 'success',
//       results: users.length,
//       data: {
//         users,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getUser = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.params.id);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.createUser = async (req, res, next) => {
//   try {
//     const newUser = await userModel.create(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         user: newUser,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateUser = async (req, res, next) => {
//   try {
//     const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.deleteUser = async (req, res, next) => {
//   try {
//     await userModel.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
const agent = require("../models/agent/agent")
const Order = require("../models/order/order")
const Shop = require("../models/shop/shop")
const command = require("../models/command")
const {openai} = require("../utils/openaiApi")

let test =[{role : 'system' , content : '테스트 테스트'}]
let step = 1
let sum = 0;
exports.test = async (req, res, next) => {
    try{
        msg = req.body.msg 
        test.push({role : "user", content : msg})//reply생성 위에 존재시 429에러시 문제
        
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: test
        })
        
        id = completion.data.id
        reply = completion.data.choices[0].message.content
        test.push({role : "assistant", content : id})
        console.log(completion.data.usage, test)
        res.status(200).send(reply)
    }catch(err){
        console.error(err)
    }
}

exports.createOrderSession = async(req, res, next)  => {
    //라우터에 달아두자
    let shop_id, shop_name;
    if(!(shop_id = req.body.shop_id)){
        next('There is no id')
    }
    try{
        menu = await Shop.getMenuList(shop_id)
        console.log(menu)
    }catch(e){
        throw e;
    }

    const order = {
        // shop_id : ,
        // shop_name : ,
        menu : menu,
        cart : [{name : `불고기버거`, cnt : 1}],
        step : 0,
        state : "greeting",
        dialogue : [],
        command_log : []
    }

    //create order
    req.session.order = order
    res.status(200).send('')
}

exports.createOrderCompletion =  async(req, res, next) => {
    // Shop.getMenu("롯데리아")

    const msg = req.body.msg
    const order = req.session.order

    if(!order){
        next('There is no order')
        // res.status(400).send(err)

    }
    if(order.step >= 30){
        //terninate
        req.session.order = null;
        res.status(400).send(err)
        // next("Too many dialogue")
    }

    try {
        // const tasks = await agent.taskPrioritize(order, msg)
        // console.log(tasks)

        let extra_prompt
        const commands = await agent.extractCommand(order, msg)//extract command from request message



        //이동예정
        commands.forEach(element => {
            console.log(element)
            const arguments = element.split(" ")
            const command_name = arguments.shift()
            console.log(arguments)

            // command.execute(order, command)

            switch(command_name){ //execute command 
                case `i`:
                    //search command[1]
                    extra_prompt = command.getInfo(order, arguments)
                    break
                    //activate menu
                    
                case `a`:
                    //command[1] is exist
                    //activate menu
                    extra_prompt = command.addItem(order, arguments)
                    //add command[1]
                    break
                case `r`:
                    // 제거할때 이거 빼주세요 하고 하지않잖아
                    // 그거 말고 저거 주세요 이런식으로 하지.. 그러니까 바꿀 방법을 생각해야하고
                    // 그렇기 때문에 명령어를 보관할 필요도 있어보인다.
                    // 
                    extra_prompt = command.removeItem(order, arguments)
                    break
                case `l`:
                    extra_prompt = command.getCart(order)
                    break
                
                default: // `n`
                    extra_prompt = `you didn't understand. ask to user again`
                    break  
            }
        });

        //TODO : 특정 명령어에만 menu, cart 활성화
        const reply = await agent.createReply(order, msg, extra_prompt)
        
        //최근 2쌍의 컨텐트만 dialogue에 보관
        if (order.dialogue.length > 3){
            order.dialogue.shift()
            order.dialogue.shift()
        }
        
        order.dialogue.push({role : "user", content : msg})//reply생성 위에 존재시 429에러시 문제
        order.dialogue.push({role : "assistant", content : reply})

        order.step += 1;
        req.session.order = order
        // console.log(order.getOrder())
        console.log("cart : ", order.cart)
        console.log("step : ", order.step)
        res.json({
            reply : reply,
            command : commands,
            token : order.token,
            step : order.step
        })
        
    }
    catch(err){
        // next(err);
        console.log(err)
        res.status(400).send(err)
    }
};


exports.terminateOrder = (req, res, next)  => {


}
