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
        data = await Shop.getMenu(shop_id)
        console.log(data)
    }catch(e){
        throw e;
    }

    const order = {
        menu : data,
        step : 0,
        state : "greeting",
        dialogue : []
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
    }
    if(order.step >= 30){
        //terninate
        req.session.order = null;
        next("Too many dialogue")
    }

    try {
        const cmd = await agent.extractCommand(order, msg)//extract command from request message
        let extra_prompt
        switch(cmd[0]){ //execute command 
            case `i`:
                //search command[1]
                extra_prompt = command.getInfo(order, cmd)
                break
                //activate menu
                
            case `a`:
                //command[1] is exist
                //activate menu
                extra_prompt = command.addItem(order, cmd)
                //add command[1]
                break
            case `r`:
                break
            case `s`:
                break
            case `n`:
                break
            default: // `e`
                extra_prompt = `you didn't understand. ask to user again`
                break
                
        }
        //TODO : 특정 명령어에만 menu, cart 활성화
        const reply = await agent.createReply(order,msg, extra_prompt)//order.prompt) 
        // console.log(reply)
        
        //최근 2쌍의 컨텐트만 dialogue에 보관하자
        //다이얼로그는 
        
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
            command : cmd,
            token : order.token,
            step : order.step
        })
        
    }
    catch(err){
        next(err);
    }
};


exports.terminateOrder = (req, res, next)  => {


}
