const express = require('express');
const router = express.Router();

const Chat = require("../services/chat.js");


//이는 추후에 세션으로 구현되어야함
//id와 같이 저장?




let task_queue; //동시에 여러요청들어오면 에러 반환-> 파이프라이닝 해야함

//첫 요청-> chat생성-> 초기 스크립트 반환해야함
//요청에 대한 반환값으로 text
router.post("/", async (req, res) => {
  let msg = req.body.message;
  let chat = req.session.chat;
  if(!chat){
    req.session.chat = Chat.create();
    chat = req.session.chat;
  }
  console.log(chat);
  Chat.request(chat, msg)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
    })
});

module.exports = router;
