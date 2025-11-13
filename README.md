# Color Expense

> 개인 재무 관리를 위한 지출 추적 및 분석 웹 애플리케이션

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)

## 프로젝트 소개

**Color Expense**는 사용자의 지출을 시각적으로 관리하고 분석할 수 있는 풀스택 웹 애플리케이션입니다.
일일 지출 기록을 색상 큐브로 시각화하고, 연속 기록 스트릭(Streak) 시스템을 통해 꾸준한 재무 관리를 독려합니다.

## 프로젝트 목표

프로덕트 완성도보다는 꾸준한 **기술적 도전과 학습 경험**에 중점을 두고, 퇴근 후 공부한 것을 덧붙여 개발하며 깊이 있게 이해하는 것을 목표로 했습니다. 일일 지출 기록을 색상 큐브로 시각화하는 컨셉을 통해 다양한 기술 영역(프론트엔드, 백엔드, 모노레포, 애니메이션, 상태 관리 등)을 종합적으로 경험할 수 있도록 설계했습니다.

- **지출 관리**: 카테고리별 지출 추적 및 통계 분석
- **예산 설정**: 월별 예산 설정 및 실시간 예산 대비 지출 모니터링
- **시각적 대시보드**: 지출 내역을 색상 큐브로 표현하는 독창적인 UI
- **스트릭 시스템**: 연속 기록 일수 추적으로 습관 형성 지원
- **다국어 지원**: 한국어, 영어, 중국어 지원
- **실시간 분석**: 일간/주간/월간 지출 패턴 분석 및 인사이트 제공

### 개발 일지

1. [사용자 인증이 필요한 페이지를 어떻게 빠르고 안전하게 렌더링할까?](https://hixsch-kixsch59.tistory.com/124)
2. [지출 블록 시각화에서 데이터 정합성 문제 해결 여정](https://hixsch-kixsch59.tistory.com/127)
3. [다국어 서비스에서 실용적인 사용자 중심 에러 처리](https://hixsch-kixsch59.tistory.com/128)
4. [규모에 맞는 정말 현실적인 로깅 시스템 구축기](https://hixsch-kixsch59.tistory.com/129)
5. [고군분투 모노레포 배포 1](https://hixsch-kixsch59.tistory.com/126?category=1288344)
6. [고군분투 모노레포 배포 2](https://hixsch-kixsch59.tistory.com/125)

```
[지출 등록 화면]  [큐브 대시보드]  [예산 설정]  [통계 분석]
```

## 기술 스택

### Frontend

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand 5.0
- **Data Fetching**: TanStack React Query 5.8
- **Animation**: Framer Motion 12.23
- **Charts**: Chart.js, React-ChartJS-2, Lightweight Charts
- **i18n**: next-intl

### Backend

- **Framework**: NestJS 11.0
- **Language**: TypeScript 5.8
- **Database**: PostgreSQL + Prisma ORM 6.9
- **Authentication**: JWT + Passport.js
- **Validation**: Class Validator
- **API Documentation**: Swagger/OpenAPI

### Monorepo & Infrastructure

- **Monorepo**: Turborepo 2.5
- **Package Manager**: npm 10.2.0
- **Testing**: Jest 30.1 + React Testing Library
- **Build Tool**: Turbopack (Next.js), tsup (UI library)
- **Code Quality**: ESLint, TypeScript strict mode

## 프로젝트 구조

```
color-expense/
├── apps/
│   ├── web/              # Next.js 프론트엔드 애플리케이션
│   ├── api/              # NestJS 백엔드 API 서버
│   └── docs/             # 프로젝트 문서
├── packages/
│   ├── ui/               # 공유 React UI 컴포넌트 라이브러리
│   ├── types/            # 공유 TypeScript 타입 정의
│   ├── eslint-config/    # ESLint 설정
│   └── typescript-config/# TypeScript 설정
└── turbo.json            # Monorepo 빌드 설정
```

### 주요 디렉토리 설명

#### `apps/web` - 프론트엔드 애플리케이션

```
web/
├── app/[locale]/         # Next.js App Router (다국어 지원)
│   ├── (public)/         # 공개 라우트 (로그인, 회원가입)
│   └── (private)/        # 인증 필요 라우트
│       ├── expense/      # 지출 관리
│       ├── budget/       # 예산 설정
│       ├── cube/         # 큐브 대시보드
│       ├── mypage/       # 마이페이지
│       └── onboarding/   # 온보딩
├── @component/
│   └── features/         # 기능별 컴포넌트
├── @hook/
│   ├── api/              # API 연동 훅
│   └── business/         # 비즈니스 로직 훅
├── @utils/               # 유틸리티 함수
├── @store/               # Zustand 상태 관리
└── messages/             # i18n 번역 파일
```

#### `apps/api` - 백엔드 API

```
api/src/
├── auth/                 # 인증 모듈 (JWT)
├── users/                # 사용자 관리
├── expenses/             # 지출 CRUD 및 통계
├── budget/               # 예산 관리
└── prisma/               # Prisma 스키마 및 마이그레이션
```

#### `packages/ui` - UI 컴포넌트 라이브러리

```
ui/
├── src/
│   ├── button/           # 버튼 컴포넌트
│   ├── card/             # 카드 컴포넌트
│   └── animation/        # 애니메이션 유틸
└── storybook/            # Storybook 설정
```

## 데이터베이스 스키마

### User (사용자)

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String
  expenses  Expense[]
  budgets   Budget[]
  createdAt DateTime @default(now())
}
```

### Expense (지출)

```prisma
model Expense {
  id          String   @id @default(cuid())
  userId      String
  amount      Int
  category    String
  expenseDate DateTime  // 실제 지출 날짜
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}
```

### Budget (예산)

```prisma
model Budget {
  id        String   @id @default(cuid())
  userId    String
  year      Int
  month     Int
  amount    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])

  @@unique([userId, year, month])
}
```

## API 엔드포인트

### 인증 (Authentication)

- `POST /auth/signin` - 로그인
- `POST /auth/signup` - 회원가입
- `POST /auth/refresh` - 토큰 갱신

### 지출 관리 (Expenses)

- `POST /expenses` - 지출 생성
- `GET /expenses` - 지출 목록 조회
- `PATCH /expenses/:id` - 지출 수정
- `DELETE /expenses/:id` - 지출 삭제
- `GET /expenses/stats/daily` - 일일 통계
- `GET /expenses/stats/weekly` - 주간 통계
- `GET /expenses/stats/monthly` - 월간 통계
- `GET /expenses/stats/category` - 카테고리별 분석
- `GET /expenses/stats/streak` - 연속 기록 통계
- `GET /expenses/analysis` - 트렌드 분석

### 예산 관리 (Budget)

- `POST /budget` - 예산 생성
- `GET /budget` - 예산 조회
- `PATCH /budget/:id` - 예산 수정
- `GET /budget/recommendation` - 예산 추천

## 시작하기

### 요구사항

- Node.js >= 18
- npm 10.2.0
- PostgreSQL

### 설치

```bash
# 저장소 클론
git clone https://github.com/JangAyeon/color-expense.git
cd color-expense

# 의존성 설치
npm install
```

### 환경 변수 설정

#### `apps/api/.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/color_expense"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"
```

#### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-key"
```

### 데이터베이스 마이그레이션

```bash
cd apps/api
npx prisma migrate dev
npx prisma generate
```

### 실행

```bash
# 전체 애플리케이션 실행 (monorepo)
npm run dev

# 개별 실행
npm run dev:web    # 프론트엔드만 실행 (http://localhost:3000)
npm run dev:api    # 백엔드만 실행 (http://localhost:3001)
```

### 빌드

```bash
# 전체 빌드
npm run build

# 타입 체크
npm run check-types

# 린트
npm run lint

# 테스트
npm run test
```

## 주요 구현 사항

### 1. 모노레포 아키텍처

- Turborepo를 활용한 효율적인 빌드 캐싱 및 병렬 실행
- 공유 UI 컴포넌트 라이브러리와 타입 정의를 통한 코드 재사용
- 일관된 ESLint 및 TypeScript 설정 공유

### 2. 큐브 시각화

[apps/web/@component/features/cube](apps/web/@component/features/cube)

- Framer Motion을 활용한 애니메이션 큐브 그리드
- 지출 금액에 따른 동적 색상 표현
- 연속 기록 스트릭 시각화

### 3. 실시간 데이터 동기화

- React Query를 활용한 서버 상태 관리
- Optimistic Updates로 빠른 UX 제공
- 자동 리패칭 및 캐시 무효화 전략

### 4. 다국어 지원 (i18n)

[apps/web/messages](apps/web/messages)

- next-intl을 활용한 정적 메시지 번역
- URL 기반 로케일 라우팅 (`/ko`, `/en`, `/zh`)
- 동적 로케일 전환 UI

### 5. 반응형 디자인

- Tailwind CSS를 활용한 모바일 우선 디자인
- 태블릿 및 데스크톱 환경 최적화
- 터치 제스처 지원

### 6. 타입 안정성

- 엄격한 TypeScript 설정 (`strict: true`)
- Prisma를 통한 타입 안전한 DB 쿼리
- 프론트엔드-백엔드 간 타입 공유 (`@repo/types`)

### 7. 테스트

- Jest 기반 단위 테스트
- React Testing Library를 활용한 컴포넌트 테스트
- 테스트 커버리지 리포트

## 성능 최적화

- **코드 스플리팅**: Next.js 동적 import 활용
- **이미지 최적화**: Next.js Image 컴포넌트
- **빌드 최적화**: Turbopack을 통한 빠른 개발 서버
- **캐싱 전략**: React Query의 staleTime 및 cacheTime 설정
- **번들 사이즈 최적화**: Tree shaking 및 동적 import

## 향후 계획

- [ ] PWA 지원 (오프라인 모드)
- [ ] 지출 알림 기능 (푸시 알림)
- [ ] AI 기반 지출 예측 및 추천
- [ ] 영수증 OCR 스캔 기능
- [ ] 소셜 공유 기능 (지출 통계 공유)
- [ ] 다크 모드 지원
- [ ] E2E 테스트 추가 (Playwright)

## 배운 점 및 개선 사항

### 기술적 성장

1. **모노레포 관리**: Turborepo를 통한 효율적인 멀티 패키지 관리 경험
2. **풀스택 개발**: Next.js와 NestJS를 연동한 End-to-End 개발 경험
3. **타입 안정성**: TypeScript를 활용한 타입 기반 개발 프로세스 확립
4. **상태 관리**: React Query와 Zustand를 조합한 효율적인 상태 관리 전략
5. **국제화**: next-intl을 활용한 다국어 지원 구현
