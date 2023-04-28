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
    this.menu = menu || '불고기버거:{가격:3000원, 재료:{4호번스, 마요네즈, 양파, 레터스, 불고기버거소스, 불고기패티}, 제품소개:"불고기 맛"}';
    this.menual = menual || `사용자가 음식을 주문하면 "(order:menu) prompt content"의 형태로 대답한다.`;
    this.messages = [
      { role: "system", content: "당신은 세계최고의 점원입니다. 주어지는 메뉴얼 대로 행동하여 고객을 응대합니다." },
      { role: "user", content: "당신은 세계최고의 점원입니다. 주어지는 메뉴얼 대로 행동하여 고객을 응대합니다. 메뉴얼은 다음과 같습니다. \n" + this.menual + "이제 고객이 왔습니다. 대답하세요" }
    ];

  }

  // async create() {
  //   try {
  //     const completion = await openai.createChatCompletion({
  //       model: "gpt-3.5-turbo", //파인튜닝이 안된다 -> createCompletion(text davichi 모델) -> 비싸고 느려
  //       max_tokens: 300,
  //       messages: this.messages
  //     });
  //     //get Id
      // let parsedId = JSON.parse(`{"role":"assistant", "content":"${completion.data.id}"}`)
  //     this.messages.push(parsedId);
  //     //생성한 즉시 메시지 배열에 바로 push하고 메시지만 밖에서 읽게하면 되겠네?
  //     return new Promise((resolve, reject)=>{
  //         resolve(completion.data.choices.message)
  //     }) 
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //생성자 초기화 로직
  //db 접속해서 프롬프트 세팅
  init(){
    
  }

  //대화 컴플리션 생성
  //context string 반환
  //message 추가
  async create(){
    // return new Promise( async (resolve, reject)=>{
      await openai.createChatCompletion({
        model : 'gpt-3.5-turbo',
        max_tokens : 300,
        messages : this.messages
      })
      .then(completion=>{
        let parsedId = JSON.parse(`{"role":"assistant", "content":"${completion.data.id}"}`)
        this.messages.push(parsedId);
        console.log(completion.data.choices[0].message)
        // return completion.data.choices.message
        //resolve()
      })
      .catch(err=>{
        // console.log(err)
        console.log("err")
      })
      
    // })
  }

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
module.exports = { Chat };