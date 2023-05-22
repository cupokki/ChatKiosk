//명령어 들을 정의


/**
 * 아이템의 정보 추출
 * @param {*} order 
 * @param  {Array} arg command line
 * @returns 
 */
exports.getInfo = (order, arg) => {
    // console.log(arg)
    // query shop's menu 
    // select info from menu where name = arg[0]
    const menu_id = arg[0]
    const info = order.menu.find(menu => menu.id === menu_id)
    let prompt = info ? info : ``//디폴트 프롬프트에 메뉴에 없는 내용을 안내하지 말라는 것이 있음
    return `Q: ${arg[1]} A: ${prompt}.`
    // throw new Error('Failed to find')
}

/**
 * cart에 주문내용 갱신
 * @param {Order} order 
 * @param  {...any} arg 
 * @returns 
 */
exports.addItem = (order, arg) => {

    //변환오류
    if (arg.length != 2)
        return `There is no menu`

    const menu_id = parseInt(arg[0])
    const count = parseInt(arg[1])

    const item = order.menu.find(menu => menu.id === menu_id)

    if (!item)
        return `There is no menu`

    let old_item = order.cart.find(_item => _item.name === item.name)
    if (old_item) {
        old_item.cnt += count
    } else {
        order.cart.push({ name: item.name, cnt: count })
    }
    return ``//
}

/**
 * cart에서 아이템 제거
 * @param {*} order 
 * @param {*} arg 
 * @returns {String} 프롬프트반환
 */
exports.removeItem = (order, arg) => {
    item = arg[1].replace(/"/g, '')
    count = parseInt(arg[2])
    if (order.menu.indexOf(item)) {
        return `we don't have ${item}`
        // throw new Error("Fail to add")
    }
    let idx = order.cart.find(item => item.name === item);
    if (idx) {

        order.cart[idx].cnt -= count
        if (order.cart[idx].cnt < 0) {
            order.cart[idx].cnt = 0
        }
    } else {
        return `There is no ${item} in cart`

    }
    order.cart.push({ name: item, cnt: count })
}


//TODO:미완
/**
 * cart에서 아이템 리스트 갱신
 * @param {*} order 
 * @param {*} arg 
 * @returns 
 */
exports.setItem = (order, arg) => {
    console.log(order.menu[arg[1]])

    return
}

/**
 * 
 * @param {*} order 
 * @returns {Array<T>} cart
 */
exports.getCart = (order) => { `Cart : ${order.cart??``}`}

exports.getTotal = (order) => {
    order.cart
}

exports.getCost = (order) => {

}