const express = require('express');
const router = express.Router();

const { Chat } = require("../services/chat.js");




//첫 요청-> chat생성-> 초기 스크립트 반환해야함
router.post("/", async (req, res) => {
  // try {
    // const { message } = req.body;
    // console.log(message)


    //보안성 검토
    // req.session.chat = chat;

    const chat = new Chat();

    //chat 객체는 세션마다 존재
  //   chat.create()
  //     .then((result) => {
  //       // let data = chat.messages[chat.masseages.length - 1];
  //       console.log(result);
  //       // console.log(chat.messages);
  //       // res.json(chat.messages);
  //       // return 
  //     })
  //     .catch((result) => {
  //       console.error(result);
  //       res.status(500).send("Internal server error");
  //     })
    
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send("Internal server error");
  chat.create()//.then(data=>{console.log(data)});
    // console.log(chat.create());
  // }
});

module.exports = router;
//req.session.destroy();
