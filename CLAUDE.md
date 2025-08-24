# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `npm run dev` - Start development server (NODE_ENV=development)
- `npm run build` - Build for production (NODE_ENV=production)
- `npm run prod` - Start production server (NODE_ENV=production)
- `npm run test` - Start test environment (NODE_ENV=test)
- `npm run lint` - Run ESLint

### Environment-Specific Testing

The project uses cross-env to set NODE_ENV for different contexts. The test command runs in test mode which enables mock repositories via the dependency injection system.

## Architecture Overview

### Clean Architecture Pattern

The project follows a feature-based clean architecture structure under `/features/`:

```
features/[domain]/
├── presentation/     # React components, hooks, stores
├── application/      # Business logic services
├── domain/          # Entities, repositories interfaces, types
└── infrastructure/  # API clients, repository implementations, DTOs
```

### Key Features

- **auth** - Authentication with Google OAuth
- **posts** - Discount posts from scraped content
- **categories** - Product categories
- **tags** - Post tagging system
- **users** - User management and profiles

### Dependency Injection System

Located in `lib/di/dependencies.ts`, this system:

- Automatically switches between mock and HTTP repositories based on NODE_ENV
- Creates service instances with proper repository dependencies
- Exports a centralized `container` object for accessing all services

Environment switching logic:

- `ENV === "test"` → Uses mock repositories
- Otherwise → Uses HTTP repositories

### State Management

- **React Query** (@tanstack/react-query) - Server state management
- **Zustand** - Client state management (see user.store.ts)
- **React Context** - Theme and authentication providers

### API Architecture

- **Next.js App Router** for routing and API routes
- **Custom API client** in `lib/api/client.ts`
- **DTO pattern** for request/response mapping
- **Repository pattern** with mock/HTTP implementations

### Styling & UI

- **Tailwind CSS** with custom component library in `/components/ui/`
- **Radix UI** primitives for accessible components
- **next-themes** for dark/light mode
- **Lucide React** for icons

### External Integrations

- **Sentry** - Error monitoring and performance tracking
- **Google Analytics** via `lib/ga.ts`
- **Microsoft Clarity** - User behavior analytics
- **Google AdSense** - Monetization
- **Firebase** - Additional services integration

### Image Handling

The project handles images from multiple discount/deal websites. Check `next.config.ts` for the extensive list of allowed image domains including major Korean e-commerce sites.

### Authentication Flow

- Google OAuth integration via `@react-oauth/google`
- Server-side user detection in layout.tsx via `getUserFromCookies`
- JWT-based authentication with refresh token support

### Development Notes

- Uses TypeScript with strict mode enabled
- Path aliases configured: `@/*` maps to project root
- Korean language support for the "할인탐정" (Discount Detective) app
- Responsive design with mobile-first approach using react-responsive

### Backend Integration

The frontend connects to:

- **NestJS** backend for main API functionality
- **FastAPI** service for web scraping operations

### Testing Strategy

The test environment automatically uses mock repositories, allowing for isolated frontend testing without backend dependencies.

## Testing Guidelines

### data-testid Naming Conventions

#### 공통 컴포넌트 (Reusable Components)

재사용 가능한 컴포넌트는 props를 통해 동적으로 testid를 생성합니다.

**패턴**: `{component-name}-{element-type}-{kebab-case-title}`

**예시**:

```typescript
// MainListSection.tsx
const kebabCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')           // 공백을 대시로
    .replace(/[^a-z0-9가-힣-]/g, '') // 특수문자 제거 (한글 포함)
    .replace(/-+/g, '-')           // 연속 대시 정리
    .replace(/^-|-$/g, '');        // 앞뒤 대시 제거
};

<section data-testid={`main-list-section-${kebabCase(title)}`}>
<ul data-testid={`main-list-container-${kebabCase(title)}`}>
<li data-testid={`main-list-item-${kebabCase(title)}`}>
```

**결과**:

- "오늘의 할인" → `main-list-section-오늘의-할인`
- "마감일이 가까워요" → `main-list-section-마감일이-가까워요`
- "추천 포스트" → `main-list-section-추천-포스트`

#### 개별 컴포넌트 (Specific Components)

특정 기능을 가진 컴포넌트는 고정된 testid를 사용합니다.

**패턴**: `{component-name}-{element-type}`

**예시**:

```typescript
// 기본 요소
<Link data-testid="discount-preview-link">
<div data-testid="post-detail-loading">
<nav data-testid="navbar">
<button data-testid="navbar-logo-link">

// 상태별 구분
<div data-testid="post-detail-error">
<div data-testid="post-detail-no-data">
<article data-testid="post-detail-article">

// 기능별 구분
<section data-testid="post-detail-image-section">
<div data-testid="post-detail-content">
<div data-testid="post-detail-footer">
```

### E2E Testing with Playwright

#### 안정적인 셀렉터 사용

data-testid 기반 셀렉터를 사용하여 CSS나 텍스트 변경에 영향받지 않는 안정적인 테스트를 작성합니다.

**Good**:

```typescript
// data-testid 기반 (권장)
const discountSection = page.locator(
  '[data-testid="main-list-section-오늘의-할인"]',
);
const discountLinks = page.locator('[data-testid="discount-preview-link"]');
const shortcutButton = page.locator(
  '[data-testid="post-detail-image-section"]',
);
```

**Bad**:

```typescript
// CSS 클래스 기반 (비추천)
const discountSection = page.locator(".discount-section");
const discountLinks = page.locator('a[href^="/posts/"]');

// 텍스트 기반 (비추천)
const discountSection = page.locator('text="오늘의 할인"');
```

#### 테스트 파일 구조

E2E 테스트는 `/e2e/` 디렉토리에 위치하며, 실제 사용자 여정을 기반으로 작성합니다.

**실행 명령어**:

```bash
# 모든 E2E 테스트 실행
npm run test:e2e

# 브라우저 화면 보면서 실행 (개발 시 권장)
npm run test:e2e:headed

# 특정 테스트 파일만 실행
npx playwright test e2e/user-journey.spec.ts --headed
```

### 베스트 프랙티스

1. **재사용성**: 공통 컴포넌트는 동적 testid 생성 시스템 사용
2. **고유성**: 각 요소가 고유한 testid를 가지도록 보장
3. **일관성**: 프로젝트 전체에서 동일한 명명 규칙 사용
4. **가독성**: testid만 보고도 어떤 요소인지 파악 가능하도록 명명
5. **안정성**: CSS나 텍스트 변경에 영향받지 않는 견고한 테스트 작성
