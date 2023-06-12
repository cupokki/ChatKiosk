const { openai, createCompletion } = require("../utils/openaiApi")
const Command = require("./command")

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
            if context is about asking item info-> info id
            if context is about asking order list-> ls
            if context about agree-> yes
            if context about disagree-> no
            other context -> -

            - If second arg is exist, the arg declare follow list [${menu}]
            - If the second argument is a similar one from the menu, use the id of the similar one.
   
            Separate each command with a "/"
        `
        //단순 네/ 아니요같은 대답은 기존 assistant의 응답 을 활용함
        // 근데 에이전트가 물어본다는 것은 내가 말한것에 대한 응답이란거잖아
        // 불고기 빼고 감자튀김 주세요
        // TODO: 그냥 어시스턴스의 대답을 추출하자

        const messages = [
            { role: "system", content: `${base_prompt}` },
            { role: "user", content: `Convert context to command  :'${msg}'->` }
        ]

        try {
            const completion = await createCompletion({
                model: "gpt-3.5-turbo", // 명령어 추출도 상대적으로 성능이 좋은 gpt3.5를 사용하기 위하여
                messages: messages
            })
            console.log(Command.registry)
            const content = completion.data.choices[0].message.content
            const commands = content.split("/").map( cmd_string => cmd_string.trim())            
            const vaild_commands = commands.filter(cmd => Command.registry.some(r => cmd.includes(r)))
            const tokenized_commands = vaild_commands.map(cmd => cmd.split(" "))

            console.log("createUCMD", completion.data.usage)
            orderManager.total_token += completion.data.usage.total_tokens
            console.log("c :", content)
            console.log("c :", commands)
            console.log("v :", vaild_commands)
            console.log("t :", tokenized_commands)
            return [...tokenized_commands]// = [cmd, ...args]

        } catch (e) {
            console.log(e)
            throw new Error('failed to extract user command')
        }
    },


    extractAssistantCommand: async (orderManager, msg) => {
        // const base_prompt = PromptGenrator.assistantDefaultPrompt()
        menu = JSON.stringify(orderManager.menu)
        const base_prompt =
        `
        Convert context to command.
        Command declare follow name list [add, rm, ask]
        Each command must start with a command name in name list.
        Command can be mutiple. Separate each command with a "/"
        If second arg is exist, the arg declare follow list [${menu}]
        If the second argument is a similar one from the menu, use the id of the similar one.
        When you convert, follow example
            if context is about adding items from orderlist -> add id count
            if context is about removing items from orderlist -> rm id count
            if context is asking for agreement-> ask
                Command "ask" cannot exist alone.

            other context -> -
            
            
            `

        const messages = [
            { role: "system", content: `${base_prompt}` },
            { role: "user", content: `Convert context to command "${msg}"->` }
        ]
        try {
            const completion = await createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages
            })

            // var str = "ls -a / cd .. / pwd"; // 두 개 이상의 명령어가 "/"로 구분된 문자열
            // var commands = str.split("/").map((s) => s.trim()); // "/"기준으로 나누고, 각 요소를 trim하여 명령어 배열 생성
            // var args = commands.map((c) => c.split(" ")); // 각 명령어를 " "기준으로 나누어 인자배열 생성
            // console.log(args); // [["ls", "-a"], ["cd", ".."], ["pwd"]]

            const content = completion.data.choices[0].message.content
            const commands = content.split("/").map( command_string => command_string.trim())            
            const vaild_commands = commands.filter(cmd => Command.registry.some(r => cmd.includes(r)))
            const tokenized_commands = vaild_commands.map(commnad => commnad.split(" "))

            console.log("createACMD", completion.data.usage)
            orderManager.total_token += completion.data.usage.total_tokens
            console.log("c :", content)
            console.log("c :", commands)
            console.log("v :", vaild_commands)
            console.log("t :", tokenized_commands)
            return [...tokenized_commands]// = [cmd, ...args]

        } catch (e) {
            console.log(e)
            throw new Error('failed to extract assistant command')
        }
    },
    /**
     * 평문을 생성함
     * @param {Order} orderManager
     * @param {String} req_msg
     * @param {String} prompt
     * @returns 평문
    */
    createReply: async (orderManager, req_msg, extra_prompt) => {
        let manual = `만약 메뉴 추천 요청 시, 기호나 가격대를 되물을 것`
        const first_prompt =
            `Role : You're ${"롯데리아"} restaurant order assistant. 
             Situation : taking an order
             OrderState : ${orderManager.state}
             Menu : {${JSON.stringify(orderManager.menu)}}.
             Rule : 
                1. Never reply unrelated to the order.
                2. You're job is just take order, NOT SERVE ITEM.
                3. Talk only korean.
                4. You NEVER contain menu list in reply.
                5. as short as possible.
                6. You must check the menu
                7. Don't ask if there is anything else to order.
                ${manual}
                
                `// + cmd==='l'? `cart :  {${JSON.stringify(order.cart)}}.`:""
                //TODD: ${order.cart ? `Ask if there is anything more to order. and put '(transition)' after the response.` : ``} 
        let test_prompt = first_prompt + extra_prompt
        const messages = [{ role: "system", content: `${test_prompt}` }].concat(orderManager.dialogue)
        messages.push({ role: "user", content: req_msg })


        let completion
        try {
            completion = await createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages
            })
            const content = completion.data.choices[0].message.content

            console.log("createACMD", completion.data.usage)
            orderManager.total_token += completion.data.usage.total_tokens
            return content// = [cmd, ...args]

        } catch (e) {
            console.log(e)
            throw new Error('failed to create reply')
        }

    },
}



module.exports = Agent;
