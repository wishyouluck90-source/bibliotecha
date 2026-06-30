비브리오테카 모집 전환형 랜딩페이지

구성 파일
- index.html
- styles.css
- script.js
- README.txt

실행 방법
1. 네 파일을 같은 폴더에 둡니다.
2. index.html을 더블클릭해 브라우저에서 엽니다.
3. 모바일, 태블릿, 데스크톱 너비에서 화면을 확인합니다.

신청 폼 주소 교체 방법
1. script.js를 엽니다.
2. 맨 위의 FORM_URL 값을 실제 신청 폼 주소로 교체합니다.

현재 값:
const FORM_URL = "https://forms.gle/REPLACE_WITH_YOUR_APPLICATION_FORM";

예시:
const FORM_URL = "https://forms.gle/실제신청폼주소";

문의 링크 교체 방법
1. script.js를 엽니다.
2. 맨 위의 CONTACT_URL 값을 실제 문의 폼, 카카오채널, 네이버 톡톡, 오픈채팅 주소 등으로 교체합니다.

현재 값:
const CONTACT_URL = "https://forms.gle/REPLACE_WITH_YOUR_CONTACT_FORM";

확인이 필요한 placeholder
- script.js의 FORM_URL: 실제 7월 파일럿 신청 폼 주소
- script.js의 CONTACT_URL: 실제 문의 링크
- index.html의 [운영자 이름 입력]: 실제 운영자 이름 또는 브랜드 호스트명
- index.html의 HOST PHOTO 영역: 실제 운영자 사진을 사용할 경우 이미지로 교체
- index.html의 og-placeholder.jpg: SNS 공유용 대표 이미지가 있다면 실제 파일로 추가하거나 meta og:image 값을 수정
- 7월 파일럿 시즌의 날짜와 요일: 실제 일정 확정 후 index.html의 시즌 섹션에 추가 권장
- 참가비 4주 69,000원: 실제 가격 확정 후 수정

배포 전 체크리스트
- FORM_URL이 실제 신청 폼으로 연결되는지 확인
- CONTACT_URL이 실제 문의 채널로 연결되는지 확인
- 운영자 이름 또는 호스트 표기를 확정했는지 확인
- 실제 일정, 장소 범위, 참가비가 확정 정보와 일치하는지 확인
- 모바일 360px 너비에서 Hero, 메뉴, CTA, FAQ가 깨지지 않는지 확인
- 브라우저 개발자도구 Console에 오류가 없는지 확인
- Firebase Hosting 배포 시 index.html, styles.css, script.js가 같은 public/dist 폴더에 포함됐는지 확인

Firebase Hosting 기본 배포 참고
- 정적 HTML만 배포한다면 firebase.json의 hosting public 경로가 실제 파일이 들어 있는 폴더를 가리켜야 합니다.
- 예: public 폴더에 파일을 넣는 경우 "public": "public"
- Vite 빌드 결과를 배포하는 경우 보통 "public": "dist"

브랜드 방향
- 서울 강남·역삼·선릉권 30–40대
- 서양 고전 독서 커뮤니티
- 완독보다 사유
- 친목보다 존중
- 6–8명 소규모 대화
- 지식 과시, 독서량 경쟁, 소개팅식 친목 지양
