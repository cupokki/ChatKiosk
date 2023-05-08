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
// const Shop = require("../models/shop/shop")
const command = require("../models/command")
const openai = require("../utils/openaiApi")


exports.createOrder = (req, res, next)  => {
    //라우터에 달아두자
    const order = req.session.order 
    if(order){
        console.log("Order already exist")
        next()
    }
    //create order
    console.log("Create Order")
    req.session.order = {}
    next()
}

exports.getOrderRelpy =  async(req, res, next) => {
    // Shop.getMenu("롯데리아")

    const msg = req.body.msg
    const order = new Order()//TODO:첫번째 요청에서 가게의 정보를 받아봐서 초기화 해야함
    if(req.session.order  === undefined){
        console.log("Create Order")
        //가게정보를 넘겨주자
    }else{
        order.setOrder(req.session.order)
    }

    if(order.step >= 30){
        //terninate
        //next()
    }

    try {
        const cmd = await agent.extractCommand(order, msg)//extract command from request message
        let extra_prompt
        switch(cmd[0]){ //execute command 
            case 'i':
                //search command[1]
                extra_prompt = command.getInfo(order, cmd)
                console.log(extra_prompt)
                //activate menu
                
            case `a`:
                //command[1] is exist
                //activate menu
                extra_prompt = command.addItem(order, cmd)
                //add command[1]
            case `r`:
                
            case `s`:
                
            default: // `n`
                extra_prompt = `you didn't understand. ask to user again`
                
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
        
        order.dialogue.push({role : "user", content : msg})
        order.dialogue.push({role : "assistant", content : reply})
        
        console.log(order.dialogue)

        order.step += 1;
        req.session.order = order.getOrder()// save
        // console.log(order.getOrder())
        console.log(order.cart)
        res.json({
            reply : reply,
            command : cmd
        })
        
    }
    catch(err){
        next(err);
    }
};


exports.terminateOrder = (req, res, next)  => {


}
