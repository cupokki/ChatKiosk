const Shop = require("./shop")

/**
 * 주문 상태를 정의함
 */
const OrderState = Object.freeze({
    Greet : "Greet",      // 초기상태
    Order : "Order",      // 주문중    Paying 상태로 전이하기 위해서 오퍼레이션이 필요함
    Paying: "Paying",     // 결제
    Done : "Done"        // 완료된 주문
})
//when Greet : 고객응대 메뉴얼을 프롬에 삽입

class OrderManager {
    constructor(arg) {
        if(!arg){
            throw new Error('argument is null')
        }
        console.log(typeof arg)
        if(typeof arg === 'object'){
            this.shop_id = arg.shop_id;
        }else{
            this.shop_id = arg;
        }
        this.shop_name = arg.shop_name || null;             // 가게 이름
        this.dialogue = arg.dialogue || [];              // 주문 과정을 기억하여 프롬프트 구성에 활용하기 위함
        this.requested_commands = arg.command_stack || [];
        this.state = arg.state || OrderState.Greet;                 // 주문상태
        this.menu = arg.menu || [];   // 가게의 메뉴판
        this.orders = arg.orders || [];                // 주문의 
        this.step = arg.step || 0;
        this.total_token = arg.total_token || 0;
        
    }

    /**
     * 메뉴판 초기화
     */
    async initMenu(){
        this.menu = await Shop.getMenuNameList(this.shop_id)
        console.log(this.menu)
    }

    handshake(){

    }
    getFeilds() {
        return {
            shop_id: this.shop_id,          // 가게 식별아이디
            shop_name: this.shop_name,             // 가게 이름
            dialogue: this.dialogue,              // 주문 과정을 기억하여 프롬프트 구성에 활용하기 위함
            requested_commands : this.requested_commands,
            state: this.state,                 // 주문상태
            menu: this.menu,                  // 가게의 메뉴판
            orders: this.orders,                // 주문의 
            step: this.step,
            total_token: this.total_token
        };
    }

    /**
     * 상태 변경
     * @param {OrderState} state 
     */
    setState(state){
        this.OrderState = state
    }
}
module.exports = OrderManager;