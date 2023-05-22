const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY_1,
});
// exports.openai = new OpenAIApi(configuration);
const openai1 = new OpenAIApi(configuration);

const configuration2 = new Configuration({
  apiKey: process.env.API_KEY_2
});
const openai2 = new OpenAIApi(configuration);
exports.openai = new OpenAIApi(configuration);

let pool = [openai1, openai2]

let idx = 0;


exports.createCompletion = async (args) => {
  let i = 1;
  let max = 5;
  while (i++ < max) {
    try {
      const completion = await pool[idx].createChatCompletion({
        model: args.model,//"gpt-3.5-turbo",
        messages: args.messages
      })
      return completion

    } catch (e) {
      //429에 대한 에러 구분 해야함
      console.log(idx)
      idx++
    }
  }
  throw new Error(`Completion Faild`)
}


