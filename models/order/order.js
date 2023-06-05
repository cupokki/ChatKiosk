/**
 * 주문 클래스는 서버단에서 주문을 정의하기 위함이다.
 * 서버는 주문 목록을 가질 필요가 있는가?
 * 서버의 역할은 주문을 받아주고 질문을 받아주어
 * 주문과 요청사항을 뱉어놓는게 목표이다.
 * 
 * 클라이언트와 서버간의 데이터 차이가 발생하면
 * 디스플레이에 표시되는것과 서버가 이해하는 내용의 차이가 발생한다.
 * 사용자 혼란을 줌
 * 따라서 그때그때 주문에따라 주문 목록을 갱신할 필요가 있어보인다.
 * 
 * 결론은 이 객체는 서버단에서 객체의 정보를 유지하기 위한 클래스이며
 * chat과 생명주기가 같다.
 * 근데 세션에 이걸 저장 할 수 있나? 없잖아
 * 일단 필드만 저장 시키자
 */


/**
 * 주문 상태를 정의함
 */
const OrderState = Object.freeze({
    Greet: Symbol(0),      // 초기상태
    Order: Symbol(1),      // 
    Paying: Symbol(2),
    Done: Symbol(3)        // 완료된 주문
})

function OrderManagerFeild(feilds){
    this.shop_id = feilds.shop_id,
    this.shop_id = feilds.shop_name,
    this.dialogue = feilds.dialogue,
    this.state = feilds.state,
    this.menu = feilds.menu,
    this.orders = feilds.orders,
    this.step = feilds.step,
    this.token = feilds.token,
}
new OrderManagerFeild

class OrderManager {
    constructor() {
        if(number === typeof arguments[0]){
            this.shop_id = shop_id          // 가게 식별아이디
            this.shop_name = ``             // 가게 이름
            this.dialogue = []              // 주문 과정을 기억하여 프롬프트 구성에 활용하기 위함
            this.state = OrderState.Greet   // 주문상태
            this.menu = Shop.getMenuList(shop_id)   // 가게의 메뉴판
            this.orders = []                // 주문의 
            this.step = 0;
            this.token = 0;
        }
        else if (arguments[0] instanceof OrderManagerFeild){
            this.shop_id = arguments[0].shop_id,
            this.shop_name = arguments[0].shop_name,
            this.dialogue = arguments[0].dialogue,
            this.state = arguments[0].state,
            this.menu = arguments[0].menu,
            this.orders = arguments[0].orders,
            this.step = arguments[0].step,
            this.token = arguments[0].token
        }else
            throw new Error(`Failed`)
        
        // this.requirement = ``       //요청사항보단 option 속성을 검토해보자
    }
    constructor({orderFeilds}){

    }
    getFeilds() {
        return new OrderManagerFeild({
            shop_id: this.shop_id,          // 가게 식별아이디
            shop_name: this.shop_name,             // 가게 이름
            dialogue: this.dialogue,              // 주문 과정을 기억하여 프롬프트 구성에 활용하기 위함
            state: this.state,                 // 주문상태
            menu: this.menu,                  // 가게의 메뉴판
            orders: this.orders,                // 주문의 
            step: this.step,
            token: this.token
        })
    }

    setState(state){
        this.OrderState = state
    }



}


module.exports = {OrderManager, OrderState};