const express = require('express');
const router = express.Router();

const { Chat } = require("../services/chat.js");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message)


    //보안성 검토
    req.session.chat = chat;

    const chat = new Chat();

    //chat 객체는 세션마다 존재
    chat.create()
      .then((result) => {
        // let data = chat.messages[chat.masseages.length - 1];
        console.log(result);
        console.log(chat.messages);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
      });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }

});

module.exports = router;
//req.session.destroy();
