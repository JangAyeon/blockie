

### ㅊ 설명:

한 칸에 만 원, 색칠하듯 기록하는 지출 시각화 앱.
지출 금액을 색으로 표현하고 예산 잔액을 직관적으로 파악할 수 있어 외부에서도 소비를 통제할 수 있음.
모바일 기반 반응형 UI로, 유저가 예산을 설정하고, 소비 시 색으로 시각화하여 직접 소비 습관을 개선하도록 돕는 서비스.

### 🗂️ 서비스 기획서
[서비스 기획서 바로가기](https://www.notion.so/Blockie-228d90bb9d9880efb652cfc6af596e7c)

### 🔧 기술 스택

- Frontend: Next.js (App Router), TypeScript, React, Zustand, TanStack Query, TailwindCSS, Framer Motion, Storybook

- Backend: NestJS, Prisma, Supabase (PostgreSQL)

- 기타: GitHub Actions, Vercel, ESLint/Prettier, Jest, Playwright, Sentry, GA

### 📁 Monorepo 구성 (Turborepo)

apps/

- web: Next.js + React + TypeScript (지출 시각화 앱)

- api: NestJS + Prisma + Supabase 연동 (REST or GraphQL 선택 가능)

packages/

- ui: 디자인 시스템 / 컴포넌트 라이브러리 (Storybook, Tailwind 사용)

- utils: 공통 유틸 함수 모음

- config: ESLint, Prettier, tsconfig 등 공통 설정

infrastructure/ (선택):

- 배포용 Dockerfile, CI/CD 설정

### 핵심 기능

| 기능                         | 설명                                                                      |
| ---------------------------- | ------------------------------------------------------------------------- |
| **색칠형 예산 시각화**       | 한 칸 = 1만 원 단위의 그리드 UI 제공, 지출 금액만큼 클릭/드래그로 칸 색칠 |
| **지출 기록 및 관리**        | 날짜/메모 기반의 지출 기록 (REST API 연동)                                |
| **잔액 시각화**              | 색칠된 칸 대비 남은 칸 시각화로 잔여 예산 직관적 파악                     |
| **모바일 퍼스트 UX**         | 반응형 UI + PWA 적용으로 장보러 나갈 때도 접근 가능                       |
| **색상/아이콘 커스터마이징** | 항목별 색상 설정으로 지출 분류 가능                                       |
| **프로그레시브 애니메이션**  | Framer Motion 활용해 색칠 인터랙션 부드럽게 처리                          |
| **오프라인 지원**            | 로컬 DB (IndexedDB or localStorage) 기반 캐시 기능                        |
| **이미지형 리포트 공유**     | 색칠 결과를 이미지로 저장/공유 (canvas 기반)                              |

### 핵심 기술

| 카테고리           | 기술 스택                                                           |
| ------------------ | ------------------------------------------------------------------- |
| **Frontend**       | React, Next.js (App Router + RSC + SSR), TypeScript                 |
| **UI/UX**          | Framer Motion, TailwindCSS, Storybook 기반 CDD, Design Token 시스템 |
| **상태관리**       | zustand + tanstack query                                            |
| **API 통신**       | REST API (백엔드 연동 전제)                                         |
| **컴포넌트 구조**  | SRP 기반 아토믹 디자인 구조 + 재사용 가능한 색칠 인터랙션 컴포넌트  |
| **에디터 경험**    | 메모 입력 시 WYSIWYG 에디터 (TipTap 또는 Slate.js) 활용             |
| **성능 최적화**    | useTransition, useDeferredValue, React.memo, Code Splitting         |
| **국제화 (i18n)**  | i18next 기반 다국어 적용 가능 구조 설계                             |
| **테스트**         | Jest + React Testing Library / E2E: Cypress                         |
| **CI/CD**          | Vercel + GitHub Actions                                             |
| **분산 구조 고려** | Monorepo (Turborepo 기반), Core UI Library 설계                     |

# 🧩 Git Branch 전략 (Turborepo 기반 모노레포)

이 프로젝트는 [Turborepo](https://turbo.build/)를 기반으로 구성된 모노레포이며, 안정적이고 효율적인 협업을 위해 아래와 같은 브랜치 전략을 따릅니다.

---

## ✅ 기본 브랜치 구조

| 브랜치 이름 | 역할                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------ |
| `main`      | 프로덕션 배포용 브랜치. 항상 **안정적인 코드**만 머지됩니다.                                     |
| `develop`   | 통합 개발 브랜치. 기능/버그 브랜치들은 이 브랜치를 기준으로 파생되며, 완료 후 이곳에 머지됩니다. |

---

## 🌱 브랜치 유형 및 네이밍 규칙

### 1. 기능 브랜치 (`feat/`)

- **형식:** `feat/{패키지명}/{기능명}`
- **예시:**
  - `feat/web/login-page`
  - `feat/api/user-auth`
- **기준 브랜치:** `develop`
- **설명:** 하나의 기능 또는 특정 패키지 내 변경을 담당합니다.

### 2. 버그 수정 브랜치 (`fix/`)

- **형식:** `fix/{패키지명}/{버그설명}`
- **예시:**
  - `fix/web/typo-header`
  - `fix/shared/validation-error`
- **기준 브랜치:** `develop`

---

### 3. 릴리즈 브랜치 (`release/`)

- **형식:** `release/{버전}`
- **예시:**
  - `release/1.0.0`
- **기준 브랜치:** `develop`
- **설명:** QA 및 배포 준비를 위한 브랜치입니다. 준비 완료 시 `main`에 병합합니다.

---

## 📦 커밋 컨벤션

> [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 방식을 따릅니다.

- 예시:

```bash
  feat(web): 로그인 페이지 UI 추가
  fix(shared): 이메일 정규식 오류 수정
```

# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
