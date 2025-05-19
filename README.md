## 📂 폴더 구조
apps  
├── auth # 인증 서비스 (회원가입, 로그인)  
├── event # 이벤트/보상 서비스  
└── gateway # API 게이트웨이  
libs # 공통 DTO, Enum  
constants-data # 쿠폰/아이템 상수 데이터  
model # 공통 Mongoose 스키마  

## ✅ 실행 방법
```bash
npm install
npm run auth:start
npm run event:start
npm run gateway:start
```

## ✅ API 문서 (Swagger)
**http://localhost:3000/swagger**

모든 Enum 값은 각 API의 Swagger 문서 내
Request Body > Schema 영역에 정의되어 있습니다.  
필요한 값은 Swagger 참고 부탁드립니다!

## ✅ 설계 특징
1. 일관된 에러 및 상태 코드 전달을 위한 HTTP 요청 유틸리티 적용
모든 내부 HTTP 통신에 대해
실제 상태 코드와 에러 메시지를 그대로 반환하는
forwardHttpRequest 유틸리티를 적용했습니다.

이를 통해 에러 처리 일관성과 중복 코드 제거를 달성했습니다.

2. 리워드 타입별 지급 로직 분리
리워드 지급 방식(포인트, 아이템, 쿠폰 등)을
타입별로 명확히 분리된 처리 로직으로 관리했습니다.

지원하지 않는 타입에 대해서는
BadRequest 예외 처리를 통해 방어 코드를 적용했습니다.

3. 테스트 편의성을 고려한 상수 데이터 관리 및 Swagger 문서 연동
테스트 시 아이템/쿠폰 ID를 쉽게 찾을 수 있도록
상수 데이터(ItemTable, CouponTable)를 별도 관리했습니다.

## ✅ 아쉬운 점 및 개선 아이디어

과제를 진행하며 다음과 같은 확장 아이디어를 고민해 보았습니다.

- 리워드 지급 방식(자동/수동) 선택 기능
- 보상으로 경험치를 지급해 레벨이 올라가는 시스템 연계
- 보상 수령 가능 여부 사전 검증 기능
- 유저 ID / 캐릭터 ID 별 이벤트 참여 제한
- 이벤트 참여 대상 유저 조건 설정 기능
- 이벤트 진행일과 보상 수령 가능일 분리 설정
- 리프레시토큰 사용

시간 제약으로 구현하지 못했지만,  
추후 충분히 확장 가능한 구조를 목표로 설계해보았습니다.
