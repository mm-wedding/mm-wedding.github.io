# 모바일 청첩장

GitHub Pages용 순수 HTML / CSS / JS 프로젝트입니다.

## 폴더 구조

- `index.html` : 메인 페이지
- `css/style.css` : 디자인
- `js/main.js` : D-Day, 갤러리, QR, 계좌 복사 등
- `images/` : 실제 사진을 넣는 폴더

## 사진 넣기

`images/`에 아래 이름으로 사진을 넣으면 자동으로 적용됩니다.

- hero.jpg
- invitation.jpg
- countdown.jpg
- story-1.jpg
- story-2.jpg
- gallery-1.jpg ~ gallery-6.jpg
- venue.jpg

## 중요한 수정 위치

`js/main.js` 맨 위의 `WEDDING_DATE`를 실제 결혼식 날짜로 변경하세요.

이름/문구/예식장/계좌번호 등은 `index.html`에서 수정합니다.

QR 코드는 현재 접속 중인 URL을 자동으로 사용합니다.
GitHub Pages에 올린 뒤 QR이 최종 `https://username.github.io/` 주소를 가리키게 됩니다.

## GitHub Pages

Repository 이름을 `username.github.io`로 만들고 `index.html`을 루트에 올린 뒤,
Settings → Pages → Deploy from a branch → `main / (root)`를 선택하면 됩니다.
