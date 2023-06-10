const { openai, createCompletion } = require("../utils/openaiApi")

const Agent = {

    /**
     * 명령어를 추출함
     * @param {Order} orderManager 
     * @param {String} msg 
     * @returns 
    */
    extractUserCommand: async (orderManager, msg) => {

        menu = JSON.stringify(orderManager.menu)
        const base_prompt = `
        Convert context to command.
        You must follow example. as short as possible.
            if context is about adding items from orderlist-> add id count
            if context is about removing items from orderlist-> rm id count
            if context about ask about item info -> info id
            if context about ask cart(order list) -> ls
            other context  -> -

            - If second arg is exist, the arg declare follow list [${menu}]
            - If the second argument is a similar one from the menu, use the id of the similar one.
   
            Separate each command with a "/"
        `
        //단순 네/ 아니요같은 대답은 기존 assistant의 응답 을 활용함
        // 근데 에이전트가 물어본다는 것은 내가 말한것에 대한 응답이란거잖아
        // 불고기 빼고 감자튀김 주세요
        // TODO: 그냥 어시스턴스의 대답을 추출하자

        const messages = []
        messages.push({ role: "system", content: `${base_prompt}` })
        // messages.concat(order.dialogue)

        //이전 메시지가 권유와 관련되었다면? 
        let context = `Convert context to command  :'${msg}'->`
        // orderManager.dialogue.forEach(element => {
        //     if(element.role === 'user'){
        //         context += `A:` + element.content + '\n'
        //     }else{
        //         context += `B:` + element.content + '\n'
        //     }
        // });
        // context += `B : ${msg}\n->`
        // console.log(context)

        //만약 어시스턴트의 것도 처리한다면 대화 내역을 고려할 필요가 있나?



        messages.push({ role: "user", content: context })
        //TODO: 

        try {
            const completion = await createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages
            })

            content = completion.data.choices[0].message.content
            commands = content.split("/")
            console.log("createCMD", completion.data.usage)
            orderManager.token += completion.data.usage.total_tokens
            return commands// = [cmd, ...args]

        } catch (e) {
            console.log(e)
        }
    },


    extractAssistantCommand: async (orderManager, msg) => {
        // const base_prompt = PromptGenrator.assistantDefaultPrompt()
        const base_prompt =
            `
        Convert context to command.
            You Must consider conversation.
            You Must follow example. as short as possible.\
                if context about order or cancel item-> o id count
                if context about ask about item info -> i id
                if context about ask cart(order list) -> l
                if context about ask how much -> st ${/*ㄴㅇ*/ null}
                if context about accept previouse request -> y
                if context about reject previouse request -> n
                other context  -> -

                - If second arg is exist, the arg declare follow list [${menu}]
                - If second arg is something similar in the menu, use similar one's id.
       
                Separate each command with a "/"
        `

        const messages = []
        messages.push({ role: "system", content: `${base_prompt}` })
        messages.push({ role: "user", content: `Convert context to command "${msg}"->` })//.concat(order.dialogue)

        try {
            const completion = await createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages
            })


        } catch (e) {
            console.log(e)
        }
    },
    /**
     * 평문을 생성함
     * @param {Order} order
     * @param {String} req_msg
     * @param {String} prompt
     * @returns 평문
    */
    createReply: async (order, req_msg, extra_prompt) => {
        let manual = `만약 메뉴 추천 요청 시, 기호나 가격대를 되물을 것`
        const first_prompt =
            `Role : You're ${"롯데리아"} restaurant order assistant.
             Situation : taking an order
             OrderState : take order menu
             Menu : {${JSON.stringify(order.menu)}}.
             Rule : 
                1. Never reply unrelated to the order.
                2. You're job is just take order, NOT SERVE ITEM.
                3. Talk only korean.
                4. You NEVER contain menu list in reply.
                5. as short as possible.
                6. Do not ask again.
                ${manual}
             
             ${order.cart ? `Ask if there is anything more to order. and put '(transition)' after the response.` : ``} 
            `// + cmd==='l'? `cart :  {${JSON.stringify(order.cart)}}.`:""
        let test_prompt = first_prompt + extra_prompt
        const messages = [{ role: "system", content: `${test_prompt}` }].concat(order.dialogue)
        messages.push({ role: "user", content: req_msg })


        let completion
        try {
            completion = await createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages
            })

        } catch (e) {
            console.log(e)
            throw e;
        }

        console.log("createReply", completion.data.usage)
        order.token += completion.data.usage.total_tokens
        return completion.data.choices[0].message.content
    },
}



module.exports = Agent;
