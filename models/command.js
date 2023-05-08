//명령어 들을 정의

const Command = {

    /**
     * 아이템의 정보 추출
     * @param {*} order 
     * @param  {Array} arg command line
     * @returns 
     */
    getInfo : (order, arg) => {
        console.log(arg)
        // query shop's menu 
        // select info from menu where name = arg[0]
        info = "매콤한 닭가슴살 치킨 패티가 들어간 버거"
        return `${arg[1]} :  ${info}`
        // throw new Error('Failed to find')
    },

    /**
     * order.cart에 주문내용 갱신
     * @param {Order} order 
     * @param  {...any} arg 
     * @returns 
     */
    addItem : (order, arg) =>{
        // 해당 아이템이 존재하는지?
        // 여기서도 completion을 사용할 수도?
        
        if(order.menu.indexOf(arg[1])){
            return `there is no ${arg[1]}`
            // throw new Error("Fail to add")
        }
        let idx;
        if(idx = order.cart.find(item=> item.name === arg[1])){
            console.log(idx)
            order.cart[idx].cnt += arg[2]
        }
        order.cart.push({ name : arg[1], cnt : arg[2]} )
        return arg[1]
        
        

        // return 
    },


    removeItem : () =>{
        return 
    },

    setItem : (order, arg) => {
        console.log(order.menu[arg[1]])

        return 
    }

}
 


module.exports = Command