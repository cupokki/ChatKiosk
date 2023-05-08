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
    constructor(){
        this.dialogue = []
        // this.menu = [] // query menu list??
        this.menu = [`불고기버거`, `핫크리스피버거`, `펩시콜라`, `감자튀김`, `데리버거`,`더블엑스버거`,`ㅁ`,`ㅁㅋㅌㅊ`,`ㅂㅈ`,`ㅈㄷㄳ`,`ㄷㄱㅌㅊㅍ`,`ㄴㅇㄹ`,`ㄷㄱㅂ` ,`ㄹㄹㄴㅇㅁㄹ`] // query menu list?? TODO:하드코딩
        this.cart = []
        // this.requirement = ``//요청사항보단 option 속성을 검토해보자
        this.step = 0;
        this.token = 0;
    }
     getOrder(){        
        return {
            //Order's field
            prompt : this.prompt,
            dialogue : this.dialogue,
            menu : this.menu,
            cart : this.cart,
            // requirement : this.requirement,
            step : this.step,
            token : this.token
        }
    }
    setOrder(arg){
        this.prompt = arg.prompt
        this.dialogue = arg.dialogue
        this.menu = arg.menu
        this.cart = arg.cart
        // this.requirement = arg.requirement
        this.step = arg.step
        this.token - arg.token

    }
    
}
    
    
module.exports = Order;