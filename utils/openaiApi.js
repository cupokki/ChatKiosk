const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

api_keys = JSON.parse(process.env.API_KEYS)

const pool = []
var pool_pointer = 0;

api_keys.forEach(key => {
  const configuration = new Configuration({
    apiKey: key
  });
  pool.push(new OpenAIApi(configuration))
})

// https://jungseob86.tistory.com/12
// API 응답의 신뢰성 위한 retry로 발생하는 부담을 줄이기 위한 방법, 현재는 그냥 무조건 반복
exports.createCompletion = async (args) => {
  let i = 1;
  let max = 10;
  while (i < max) {
    try {
      const completion = await pool[pool_pointer % pool.length].createChatCompletion({
        model: args.model,//"gpt-3.5-turbo",
        messages: args.messages
      })
      return completion

    } catch (e) {
      //429에 대한 에러 구분 해야함
      // console.log(e.config.request.response.status)
      // console.log('i : ', i)
      pool_pointer++
      i++
    }

  }
  throw new Error(`Completion Faild`)
}


