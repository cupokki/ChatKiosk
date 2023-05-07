//에이전트들은 명령어와 대답을 생성한다.
//completion을 생성하는 주체는 agent이다.
//명령을 수행하는 주체도 agent이다
//일단 이게 기존 Chat class 대체할 부분이다
//Agent는 필드가 필요없다.

const forOrder = require("../command")
const openai = require("../../utils/openaiApi")

const Agent = {
    extractCommand : async (str)=>{
        test_prompt = `You're convert givent text to follow form, ex) command_name [...arg], if you can convert return "n", ${str}->`

        //TODO: 추후 명령어 추출기로 다른 모델 사용할 수도
        const completion = await openai.createChatCompletion({
            model : "gpt-3.5-turbo",
            messages : [{role : "system", content : `${test_prompt}`}]
        })

        cmd = completion.data.choices[0].message.content
        cmd_line = cmd.split(" ")

        return cmd_line// = [cmd, ...args]
    },

    /**
     * 평문을 생성함
     * @param {String} req_msg
     * @param {String} prompt
     * @returns 평문
     */
    createResponse: async (req_msg, prompt)=>{
        const completion = await openai.createChatCompletion({
            model : "gpt-3.5-turbo",
            messages : [
                { role : "system", content : prompt},
                { role : "user", content : req_msg}
        
            ] //TODO: 하드코딩
        })
        console.log(completion.data.usage)
        return completion.data.choices[0].message.content
    },

    /**
    * 명령어 추출
    * @param {string} str 
    * @returns {Array} cmd_line
    */
    createCommand : async ()=>{
        test_prompt = `
            this system is NLP.
            Convert text to command
            This system Must follow below rules
            if you can convert, return "n"
                - ex) <commandName> <itemName> <count>
                - commandName : defined below list
                    - add, delete
                - itemName : object item name.
                - count : how many
        `
    
        completion = await openai.createChatCompletion({
            model : "gpt-3.5-turbo",
            messages : test_prompt,
            max_token : 100
        })
        console.log = completion.data.choices[0].messages
        // this.prompt = 
        // return cmd
    }
}



module.exports = Agent;
