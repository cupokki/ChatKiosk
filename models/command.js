exports.registry = Object.freeze(["add", "rm", "yes","no","-","st", "ask"])

//명령어 들을 정의
exports.execute = (command, arguments) =>{
    switch(commmand){
        case '':   
            break;
        default:
            break;
    }
}

/**
 * 아이템의 정보 추출
 * @param {*} orderManager 
 * @param  {Array} arg command line
 * @returns 
 */
exports.getInfo = (orderManager, arg) => {
    const menu_id = arg[0]
    const info = orderManager.menu.find(menu => menu.id === menu_id)
    let prompt = info ? info : ``//디폴트 프롬프트에 메뉴에 없는 내용을 안내하지 말라는 것이 있음
    return `Q: ${menu_id} A: ${prompt}.`
}

/**
 * cart에 주문내용 갱신s
 * @param {Order} orderManager 
 * @param  {...any} arg 
 * @returns 
 */
exports.addItem = (orderManager, arg) => {

    //변환오류
    if (arg.length != 2)
        return `There is no menu`

    const menu_id = parseInt(arg[0])
    const count = arg[1]?parseInt(arg[1]):1

    const item = orderManager.menu.find(menu => menu.id === menu_id)

    if (!item)
        return `There is no menu`

    let selected = orderManager.orders.find(_item => _item.name === item.name)
    if (selected) {
        selected.cnt += count
    } else {
        orderManager.orders.push({ name: item.name, cnt: count })
    }
    return ``//
}

/**
 * cart에서 아이템 제거
 * @param {*} orderManager 
 * @param {*} arg 
 * @returns {String} 프롬프트반환
 */
exports.removeItem = (orderManager, arg) => {
    
    //변환오류
    if (arg.length != 2)
        return `There is no menu`

    const menu_id = parseInt(arg[0])
    const count = parseInt(arg[1])

    const item = orderManager.menu.find(menu => menu.id === menu_id)

    if (!item)
        return `There is no menu`

    let selected = orderManager.orders.find(_item => _item.name === item.name)
    if (selected) {
        selected.cnt -= count
        if(selected.cnt <= 0)
            selected = null
    }
    return ``//
}


//TODO:미완
/**
 * cart에서 아이템 리스트 갱신
 * @param {*} orderManager 
 * @param {*} arg 
 * @returns 
 */
exports.setItem = (orderManager, arg) => {
    //변환오류
    if (arg.length != 2)
        return `There is no menu`
    
    const menu_id = parseInt(arg[0])
    const count = parseInt(arg[1])

    const item = orderManager.menu.fine(menu => menu.id === menu_id)

    if(!item)

    

    return
}

/**
 * 
 * @param {*} order 
 * @returns {Array<T>} cart
 */
exports.getCart = (orderManager) => { 
    
   return  `orders(ordered) : ${JSON.stringify(orderManager.cart)}`
}

exports.getTotal = (orderManager) => {
    orderManager.orders
}

exports.getCost = (orderManager) => {

}