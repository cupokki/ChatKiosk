//에이전트들은 명령어와 대답을 생성한다.
//completion을 생성하는 주체는 agent이다.
//명령을 수행하는 주체도 agent이다
//일단 이게 기존 Chat class 대체할 부분이다
//Agent는 필드가 필요없다.
//너무 많은 요청에 대한 문제 429
//api 키 여러개로 스케줄링
//토큰을 다소모하면 새로운 order로 내용을 전부 옮겨서 진행하자

const { openai, createCompletion } = require("../../utils/openaiApi")

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
    extractCommand: async (order, str) => {

        menu = JSON.stringify(order.menu)
        test_prompt = `
       Convert Question to command. You Must consider conversation and  You Must follow example. as short as possible.
       - If second arg is exist, the arg declare follow list [${menu}]
       - If second arg is something similar in the menu, use similar one.
       
       if context about add order item-> a menu.id count
       if context about remove order item-> r menu.id count
       if context about question item info -> i menu.id
       if context about question cart(order list) -> l
        other context  -> n
        `
        
        const messages = [{ role: "system", content: `${test_prompt}` },
        {role : "user", content : `Convert text to command "${str}"->`}]//.concat(order.dialogue)
        //TODO: 다이얼로그 포함아직 못함, 그래서 그거 줘 이런거 대답 못함
        //TODO: 추후 명령어 추출기로 다른 모델 사용할 수도
        
        let completion
        try{
            completion = await createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages
            })
            
        }catch(e){
            console.log(e)
        }

        // const completion = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: messages
        //     // prompt: test_prompt
        // })

        // cmd = completion.data.choices[0].text
        cmd = completion.data.choices[0].message.content
        cmd_line = cmd.split(" ")
        console.log(cmd_line)
        console.log("createCMD", completion.data.usage)
        order.token += completion.data.usage.total_tokens
        return cmd_line// = [cmd, ...args]
    },

    /**
     * 평문을 생성함
     * @param {Order} order
     * @param {String} req_msg
     * @param {String} prompt
     * @returns 평문
    */
    createReply: async (order, req_msg, extra_prompt) => {
        let manual = `If 메뉴 추천 요청 시, 기호나 가격대를 되물을 것`
        const first_prompt =
            `You're ${"롯데리아"} order staff. menu :  {${JSON.stringify(order.menu)}}.
             Never reply unrelated to the order.
             You're job is just take order,DO NOT SERVE ITEM.
             Talk only korean.
             You NEVER contain menu list in reply.
             as short as possible.
             ${manual}
            `
        let test_prompt = first_prompt + extra_prompt
        
        
        const messages = [{ role: "system", content: `${test_prompt}` }].concat(order.dialogue)
        messages.push({ role: "user", content: req_msg })

        // const completion = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: messages
        // })
        let completion
        try{
            completion = await createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages
            })
            
        }catch(e){
            console.log(e)
        }

        console.log("createReply", completion.data.usage)
        order.token += completion.data.usage.total_tokens
        return completion.data.choices[0].message.content
    },


    //TODO:삭제예정
    checkItem: async (order, item) => {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${item} is in the ${JSON.stringify(order.menu)} if nothing match, return "n" ->`
        })
        console.log(completion.data.choices[0].text)
        // return 
    }
}



module.exports = Agent;
