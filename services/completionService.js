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
const openai = require("../utils/openaiApi")


//에이전트는 어케야할까...
//에이전트는 필드가 필요하나?
//아! 에이전트는 필드를 가질 필요가 없다.
// 그렇다면 클래스는 옳은가?



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

exports.getCompletion =  async(req, res, next) => {

    
    if(req.session.order  === undefined){
        //create order
        console.log("Create Order")
        //가게정보를 넘겨주자
        test = new Order("일반음식점")
        req.session.order = test.getOrder()
    }else{
        console.log("Order already exist")
    }

//    TODO:인자 변수로 빼기
    try {
        const data = await agent.createResponse(req.body.msg, req.session.order.prompt)//order.prompt) 
        console.log(data) // output : undefined
        const command = await agent.extractCommand(req.body.msg)
        res.json(command)
           
    }
    catch(err){
        next(err);
    }
};


exports.terminataOrder = (req, res, next)  => {


}
