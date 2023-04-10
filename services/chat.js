//chat 생성

const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require("openai");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

let menual = ""

class Chat {
  constructor(menu, menual) {
    this.completion = null;
    this.menu = menu || '불고기버거:{가격:3000원, 재료:{4호번스, 마요네즈, 양파, 레터스, 불고기버거소스, 불고기패티}, 제품소개:"불고기 맛"}';
    this.menual = menual || `사용자가 음식을 주문하면 "(order:menu) prompt content"의 형태로 대답한다.`;
    this.messages = [
      { role: "system", content: "당신은 세계최고의 점원입니다. 주어지는 메뉴얼 대로 행동하여 고객을 응대합니다." },
      { role: "user", content: "당신은 세계최고의 점원입니다. 주어지는 메뉴얼 대로 행동하여 고객을 응대합니다. 메뉴얼은 다음과 같습니다. \n" + this.menual + "이제 고객이 왔습니다. 대답하세요" }
    ];

  }

  async create() {
    try {
      this.completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 300,
        messages: this.messages
      });
    } catch (error) {
      console.error(error);
    }
  };

  async question(msg) {
    let parsed = JSON.parse(
      `{"role":"user", "content":"${msg.toString()}"}`
    )
    this.messages.push(parsed)
    // return answer;
  }

}
//https://yscho03.tistory.com/m/284
//문자열로 content를 전달하지말고 id로 content를 대체하여 토근 절약이 가능하다
//대화 내용을 반영할 유일한 방법인 듯
// module.exports = { Chat, getCompletion };
module.exports = { Chat };