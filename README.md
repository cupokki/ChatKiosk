#ChatKiosk backend

도커사용권장

```sudo serivce docker start```

```docker build -t <server:version_tag> .```
```docker stop <server:version_tag>```
```docker rm <server:version_tag>```
```docker run [--name<container_name>] [-p<host_port:container_port>] [-it] <server:version_tag>```
   - it옵션은 iteractive 모드 
   - 탈출은 ctrl+p + ctrl+q
   - ```docker attach <container_name>```으로 재진입가능

```docker-compose .```
```
   version: "3" # docker compose 파일의 버전
   services: # 실행할 서비스들의 목록
   service1: # 서비스의 이름
      build: ./service1 # 서비스를 빌드하기 위한 Dockerfile의 위치
      image: service1 # 서비스의 이미지 이름
      ports: # 서비스가 사용할 포트들
         - "5000:5000" # 호스트 포트:컨테이너 포트
      volumes: # 서비스가 사용할 볼륨들
         - ./service1:/app # 호스트 디렉토리:컨테이너 디렉토리
      depends_on: # 서비스가 의존하는 다른 서비스들
         - service2
   service2:
      image: redis # 이미 존재하는 이미지를 사용하는 경우
      environment: # 서비스에 전달할 환경변수들
         - REDIS_HOST=redis
```

```docker-compose up```: docker compose 파일에 정의된 모든 서비스를 빌드하고 실행합니다. -d 옵션을 주면 백그라운드에서 실행합니다.
```docker-compose ps```: docker compose 파일에 정의된 모든 서비스의 상태를 확인합니다.
```docker-compose logs```: docker compose 파일에 정의된 모든 서비스의 로그를 출력합니다. -f 옵션을 주면 실시간으로 로그를 보여줍니다.
```docker-compose run```: docker compose 파일에 정의된 특정 서비스를 실행하고 명령어를 수행합니다. 예를 들어, docker-compose run service1 bash는 service1 컨테이너에서 bash 셸을 실행합니다.
```docker-compose start / stop / restart```: docker compose 파일에 정의된 모든 서비스를 시작 / 중지 / 재시작합니다.
```docker-compose rm```: docker compose 파일에 정의된 모든 서비스를 삭제합니다.
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








1. "불고기버거 주세요"
2. 불고기 버거가 존재하는지?
3. NLP가 필요하다.
4. CMD로 바꿔서 불고기 버거를찾는다?
5. 

주문 대화에는 두가지 방향이 있다.
주문자가 점원에게 일방적으로 요청하면 바로 점원이 알아듣는다.
점원이 권유할때가 있을까?
어떤가요? 좋아요! -> 요걸 명령어로 만들수 있어야한다.

Order의 lifecycle을 위한 State
   - Greet : 시작, manual에 인사, 고객응대에 관여
   - Order : 주문을 주고받는 상태
      - cart가 채워졌을때 더 주문할게 없는지 물어봐야한다.
   - Option : 전체 주문에 대한 옵션??(포장 / 매장)
   - Pay : 주문단계
   - Done : 완료된 주문


   