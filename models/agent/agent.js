//에이전트들은 명령어와 대답을 생성한다.
//completion을 생성하는 주체는 agent이다.
//명령을 수행하는 주체도 agent이다
//일단 이게 기존 Chat class 대체할 부분이다
//Agent는 필드가 필요없다.
//너무 많은 요청에 대한 문제 429
//api 키 여러개로 스케줄링
//토큰을 다소모하면 새로운 order로 내용을 전부 옮겨서 진행하자

const {openai, openai2} = require("../../utils/openaiApi")

//TODO: 대회의 state를 정해서 필요한 prompt를 교체하자
//state를 결정짓는 것은 command를 통해서
//getCompletion 서비스 로직쪽으로 옮길 필요 있음
// const default_prompt = //
//     `You're ${"패스트푸드점"} staff. talk with just korean.  Ask "Anything else?" every answer `,
//     // as short as possible answer <- 너무 단답을 만들어냄
// const end_prompt = ``,

const Agent = {
    /**
     * 명령어를 추출함
     * @param {Order} order 
     * @param {String} str 
     * @returns 
    */
   extractCommand : async (order, str)=>{
       
       menu = JSON.stringify(order.menu)
       test_prompt = `
       Convert Question to command. You Must consider conversation and  You Must follow example. 
       - If second arg is exist, the arg declare follow list [${menu}]
       if context about add -> a 콜라 1
       if context about remove -> r 콜라 1
       if context about update -> s 콜라 2
       if context about question item information-> i 콜라
        other context  -> "n"
       
       Q:${str}-> A:`
       
       const messages =  [{role : "system", content : `${test_prompt}`}]
       messages.concat(order.dialogue)
       
       //TODO: 추후 명령어 추출기로 다른 모델 사용할 수도
       const completion = await openai.createChatCompletion({
           model : "gpt-3.5-turbo",
           messages : messages
        })
        //토큰 사용량
        console.log(completion.data.usage)
        
        cmd = completion.data.choices[0].message.content
        cmd_line = cmd.split(" ")
        console.log(cmd_line)
        console.log("createCMD", completion.data.usage)
        return cmd_line// = [cmd, ...args]
    },
    
    /**
     * 평문을 생성함
     * @param {Order} order
     * @param {String} req_msg
     * @param {String} prompt
     * @returns 평문
    */
    createReply: async (order, req_msg, extra_prompt)=>{
        const first_prompt =
            `You're ${"롯데리아"} staff. you can sell ${JSON.stringify(order.menu)}. do not reply unrelated to the order. talk with just korean. as short as possible.
             `
        //TODO: menu와 test_prompt 하드코딩된 요소임
        const completion = await openai2.createChatCompletion({
            model : "gpt-3.5-turbo",
            messages : [
                { role : "system", content : first_prompt+extra_prompt},
                { role : "user", content : req_msg}
        
            ] 
        })
        console.log("createReply", completion.data.usage)
        return completion.data.choices[0].message.content
    },


    //TODO:삭제예정
    checkItem : async (order, item) => {
        const completion = await openai.createCompletion({
            model : "text-davinci-003",
            prompt : `${item} is in the ${JSON.stringify(order.menu)} if nothing match, return "n" ->`
        })
        console.log(completion.data.choices[0].text)
        // return 
    }
}



module.exports = Agent;
