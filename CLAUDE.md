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