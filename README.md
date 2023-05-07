#ChatKiosk backend

도커사용권장

```sudo serivce docker start```

```docker build -t .```

```docker-compose .```


## 토큰절약
 1.ID생성
 2. API 두개사용
 3. 쿼리문
 4. 답변에 필요한 문서는?
 5. 주문목록을 유지할 필요가 있다.
 6. 꼭 필요한 기억만 유지하자

 ## 출력을 정의해야한다.
 1. API의 출력형태
    - json
    - cotent와 command
 2. chat -> agent
    - 채팅을 관리하지말고 메시지목록과 처리기를 따로관리하자
    - agent는 대화를 생성하고 명령을 실행해야한다.
 3. 명령을 정의하자
    - 쿼리문의 경우 GPT가 충분히 SQL을 작성할 수 있지만, 이걸 직접 실행 시킬 수 있으면 보안상 문제가 발생한다. -> 아싸리 한정적인 명령만 수행 할 수 있게하자

 4. NLP은 GPT-3.5가 처리해야한다.








