const { openai, createCompletion } = require("../../utils/openaiApi")

const Agent = {

    /**
     * 명령어를 추출함
     * @param {Order} orderManager 
     * @param {String} str 
     * @returns 
    */
    extractCommand: async (orderManager, str) => {
        
        menu = JSON.stringify(orderManager.menu)
        test_prompt = `
            Convert Question to command.
            You Must consider conversation.
            You Must follow example. as short as possible.\
                if context about order or cancel item-> o id count
                if context about ask about item info -> i id
                if context about ask cart(order list) -> l
                if context about ask how much -> s p${/*ㄴㅇ*/null }
                other context  -> n 

                - If second arg is exist, the arg declare follow list [${menu}]
                - If second arg is something similar in the menu, use similar one's id.
       
                Separate each command with a "/"
       
        
        
        `
        //단순 네/ 아니요같은 대답은 기존 assistant의 응답 을 활용함
        // 근데 에이전트가 물어본다는 것은 내가 말한것에 대한 응답이란거잖아
        // ex
        // 불고기 빼고 감자튀김 주세요
        // 
        const messages = []
        messages.push({ role: "system", content: `${test_prompt}` })
        // messages.concat(order.dialogue)
        
        messages.push({role : "user", content : `Convert context to command "${str}"->`})//.concat(order.dialogue)
        //TODO: 
    
        
        let completion
        try{
            completion = await createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages
            })
            
        }catch(e){
            console.log(e)
        }

        content = completion.data.choices[0].message.content
        commands = content.split("/")
        console.log("createCMD", completion.data.usage)
        orderManager.token += completion.data.usage.total_tokens
        console.log(commands)
        return commands// = [cmd, ...args]
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
             Do not ask again.
             ${manual}
             ${order.cart?`Ask if there is anything more to order.`:``} 
            `// + cmd==='l'? `cart :  {${JSON.stringify(order.cart)}}.`:""
        let test_prompt = first_prompt + extra_prompt
        const messages = [{ role: "system", content: `${test_prompt}` }].concat(order.dialogue)
        messages.push({ role: "user", content: req_msg })


        let completion
        try{
            completion = await createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages
            })
            
        }catch(e){
            console.log(e)
            throw e;
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
