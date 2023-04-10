//chat 생성

const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require("openai");
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
const openai = new OpenAIApi(configuration);

let menual = "첫 인삿말 : 안녕하십니까! 롯데리아입니다. 이쪽에서 주문도와드리겠습니다"

async function getCompletion(menu, menual) {
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 300,
        messages: [{role: "system", content: "당신은 세계최고의 점원입니다. 주어지는 메뉴얼 대로 행동하여 고객을 응대합니다."}],
        messages: [{role: "user", content: "당신은 세계최고의 점원입니다. 주어지는 메뉴얼 대로 행동하여 고객을 응대합니다. 메뉴얼은 다음과 같습니다. \n"+ menual +"이제 고객이 왔습니다. 대답하세요"}],
      });
      console.log(completion.data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  module.exports = {getCompletion}