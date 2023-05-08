//명령어 들을 정의

const Command = {

    /**
     * 아이템의 정보 추출
     * @param {*} order 
     * @param  {Array} arg command line
     * @returns 
     */
    getInfo : (order, arg) => {
        // console.log(arg)
        // query shop's menu 
        // select info from menu where name = arg[0]
        info = "매콤한 닭가슴살 치킨 패티가 들어간 버거"
        return `If ask ${arg[1]}, tell ${info}`
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
        item = arg[1].replace(/"/g, '')
        count = parseInt(arg[2])
        if(order.menu.indexOf(item)){
            return `we don't have ${item}`
            // throw new Error("Fail to add")
        }
        let idx;
        if(idx = order.cart.find(item=> item.name === item)){
            order.cart[idx].cnt += count
        }
        order.cart.push({ name : item, cnt : count} )
        return item
    },


    removeItem : (order, arg) =>{
        item = arg[1].replace(/"/g, '')
        count = parseInt(arg[2])
        if(order.menu.indexOf(item)){
            return `we don't have ${item}`
            // throw new Error("Fail to add")
        }
        let idx = order.cart.find(item=> item.name === item);
        if(idx){
            
            order.cart[idx].cnt -= count
            if(order.cart[idx].cnt < 0){
                order.cart[idx].cnt = 0                
            }
        }else{
            return `There is no ${item} in cart`

        }
        order.cart.push({ name : item, cnt : count} )
    },

    setItem : (order, arg) => {
        console.log(order.menu[arg[1]])

        return 
    }

}
 


module.exports = Command