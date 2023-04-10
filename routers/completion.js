const express = require('express');
const router = express.Router();

const { Chat } = require("../services/chat.js");


router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message)

    const chat = new Chat();
    chat.create()
      .then(() => {
        res.json(chat.completion.data.choices.message);
        console.log(chat.completion.data.choices);
        chat.question(message).then(
          console.log(chat.messages)
        )
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
      });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
  question(message).then(
    console.log(chat.messages)
  )

  // while(True){
  //   chat.say(){

  //   }
  // }
  

});

module.exports = router;
//req.session.destroy();
