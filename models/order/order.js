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
class Order{
    constructor(shop_type){
        this.prompt = `You're ${shop_type} staff. first greeting. talk with just korean. as short as possible answer`
        this.dialogue = []
        this.menu = ``
        this.cart = ``
        this.requirement = ``
    }

    //임시로 스태틱
     getOrder(){        
        return {
            //Order's field
            prompt : this.prompt,
            dialogue : this.dialogue,
            menu : this.menu,
            cart : this.cart,
            requirement : this.requirement
        }
    }
}
    
    
module.exports = Order;