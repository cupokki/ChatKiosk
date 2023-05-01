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
const chat = require("../models/chat")


exports.getCompletion = async (req, res, next) => {
    try {
        console.log("test");
        chat.createPrompt()
        let req_msg = req.body.message;
        let msgs = req.session.messages;
        let qDuration = req.session.qeuryDuration;

        // if (!messages) {
        //     req.session.chat = chat.testCreate();
        //     chat = req.session.chat;
        // }
        // console.log(chat);

        // chat.requestCompletion(messages, req_msg)
        //     .then(data => {
        //         res.json(data);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     })
    }
    catch(err){
        next(err);
    }
};

