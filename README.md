# Hani Portfolio

인터랙티브 요소를 활용한 웹 포트폴리오입니다.

GSAP 애니메이션과 커스텀 UI를 활용해 다양한 인터랙션을 경험할 수 있도록 제작했습니다.

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- GSAP
- Zustand

### Deploy

- Netlify

---

## Features

### Character Customizer

- GameBoy / Hard Disk / Console 캐릭터 선택
- 캐릭터 눈동자가 마우스를 따라 움직이는 인터랙션
- 컬러 테마 변경

### Contact

- 드래그 슬라이더를 끝까지 밀어 Contact 팝업 오픈
- GSAP 기반 버튼 인터랙션

### Side Projects

- 프로젝트 카드 선택
- 프로젝트 상세 팝업
- 외부 링크 이동

### Hidden Interaction

- 나사를 제거하면 Stack 패널 등장
- Door Open 애니메이션

---

## Folder Structure

```text
src
├── app              # 라우터 및 앱 설정
├── features         # 기능 단위 모듈
│   ├── intro
│   └── work
│       ├── api
│       ├── components
│       └── stores
├── layouts          # 공통 레이아웃
├── pages            # 페이지 컴포넌트
└── shared
    ├── ui           # 공통 UI
    └── utils        # 유틸 함수
```

---

## Installation

```bash
git clone ...
```

```bash
pnpm install
```

```bash
pnpm dev
```

---

## Build

```bash
pnpm build
```

---

## What I Focused On

- 컴포넌트 단위로 UI를 분리하여 재사용성을 높였습니다.
- GSAP 유틸 함수를 만들어 애니메이션 코드를 일관성 있게 관리했습니다.
- 하드코딩을 최소화하고 상수 및 공통 스타일을 분리했습니다.
- Zustand를 이용해 캐릭터와 컬러 상태를 관리했습니다.
- 사용자 경험을 고려한 인터랙션 중심의 UI를 구현했습니다.
