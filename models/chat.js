const client = require('../utils/dbClient');
const openai = require('../utils/openaiApi');

const chat = {
    testCreate : ()=>{
        return {
            menu: menu || '불고기버거:{가격:3000원, 재료:{4호번스, 마요네즈, 양파, 레터스, 불고기버거소스, 불고기패티}, 제품소개:"불고기 맛"}',
            manual: manual || `사용자가 음식을 주문하면 "(order:menu) prompt content"의 형태로 대답한다.`,
            messages: [
              { role: "system", content: `이 시스템은 음식점 점원입니다. 고객의 주문과 문의 사항에 대답하며 어떠한 창의적인 답변을 허용한다. 답변을 위해 리스트에 명시된 조건을 반드시 따라야한다. 
        
              #가게정보
               - 시스템의 이름은 "제니"입니다. 
               - 해당 점포의 이름은 " 롯데리아 대구역사점"입니다.
               - 고객은 음식을 카운터에서 픽업해갑니다.
               - 해당 점포의 주소는 "대구역사123-1"입니다.
               - 결제시 포장 여부를 반드시 물어봐야합니다.
              
              점포에서 판매하는 메뉴는 다음과 같습니다.
              #메뉴
              [
                {
                  "name" : "불고기버거",
                  "type" : "main",
                  "description" : "불고기맛이나는 햄버거.",
                  "price" : 4200,
                  "ingredients" : [
                      "버거번(4호)",
                      "마요네즈 9g",
                      "양파 9g",
                      "래터스 30g",
                      "불고기패티",
                      "불고기맛소스 16g",
                  ],
                },
                {
                  "name" : "핫크리스피버거",
                  "type" : "main"
                  "description" : "매콤하고 크리스피.",
                  "price" : 4800, 
                  "ingredients" : [
                      "버거번(4호)",
                      "마요네즈 6g",
                      "래터스 15g",
                      "토마토 슬라이스",
                      "핫크리스피 패티"
                  ],
                },
                {
                  "name" : "감자튀김",
                  "type" : "side"
                  "description" : "제공량이 89g.",
                  "price" : 1800,
                  "ingredients" : [
                      "감자"
                  ],
                },
                {
                  "name" : "감자튀김 Large",
                  "type" : "side"
                  "description" : "제공량이 130g입니다.",
                  "price" : 2500,
                  "ingredients" : [
                      "감자"
                  ],
                },
                {
                  "name" : "양념감자",
                  "type" : "side"
                  "description" : "제공량이 117g,  시즈닝분말이 하나 기본 제공되어 [양파/치즈/칠리] 선택할 수 있습니다.",
                  "price" : 2500,
                  "ingredients" : [
                      "감자",
                      "양파시즈닝",
                      "치즈시즈닝",
                      "칠리시즈닝"
                  ],
                },
                {
                  "name" : "콜라",
                  "type" : "beverage"
                  "description" : "기본사이즈이며 1회 리필 가능합니다.",
                  "price" : 1800,
                  "ingredients" : [
                      "펩시"
                  ],
                },
                {
                  "name" : "콜라 Large",
                  "type" : "beverage"
                  "description" : "큰 사이즈이며 1회 리필 가능합니다.",
                  "price" : 2200,
                  "ingredients" : [
                      "펩시"
                  ],
                },
                {
                  "name" : "콜라 small",
                  "type" : "beverage"
                  "description" : "작은사이즈이며 리필이 불가능합니다..",
                  "price" : 1500,
                  "ingredients" : [
                      "펩시"
                  ],
                },
              ]
              
              ` },
              { role: "user", content: "당신은 세계최고의 점원입니다. 주어지는 메뉴얼 대로 행동하여 고객을 응대합니다. 메뉴얼은 다음과 같습니다. \n" + manual + "이제 고객이 왔습니다. 대답하세요" }
            ]
          }
    },
    createPrompt : async (shop_id)=>{
      const db = client.db("Shop")
      const collection = db.collection('test')
      await collection.find()
      .then((data)=>{
        console.log(data.toArray())
      })
      .catch(()=>{
        console.log("err");
      })
      
      // messages.push(``)
      // return
    },
    /**
     * GPT API 사용 
     * @param {String} msg 
     * @returns message and command
     */
    requestCompletion : async (msg)=>{
        if (msg !== undefined) {
            let parsedId = JSON.parse(`{"role":"user", "content":"${msg}"}`)
            chat.messages.push(parsedId);
          }
        
          try {
            const completion = await openai.createChatCompletion({
              model: 'gpt-3.5-turbo',
              max_tokens: 300,
              messages: chat.messages,
              n: 1 // 생성할 개수 choices배열
            })
            // let parsedId = JSON.parse(`{"role":"assistant", "content":"${completion.data.id}"}`)
            // this.messages.push(parsedId);
        
            let parsedMsg = JSON.parse(`{"role":"assistant", "content":"${completion.data.choices[0].message.content}"}`)
            // let parsedMsg = JSON.parse(`{"role":"assistant", "content":"${completion.data.choices[0].message}"}`)
            chat.messages.push(parsedMsg);
        
            console.log(completion.data.usage);
        
            //그 명령어를 넣어서 처리 할 수 있도록 해야함
            // 그럼 명령들을 정의해야하고
            //
            duration != 0 ? "" : "";
            if(queryCondition){
              
            }
        
            return {
              content : completion.data.choices[0].message,
              command : ""
            };
          }
          catch (err) {
            console.error(err);
          }
    },
    
}


module.exports = chat