# SU'UD Project Structure

This document outlines the new organized project structure with clear role-based separation.

## Overview

The project has been restructured into two main domains:
- **Dashboard** - Internal application for different user roles
- **Website** - Public-facing pages and marketing site

## Directory Structure

```
src/
├── app/                          # Next.js App Router (unchanged)
│   ├── dashboard/               # Dashboard routes
│   ├── auth/                    # Authentication routes  
│   ├── page.tsx                 # Home page
│   └── ...
├── dashboard/                   # Dashboard-specific code
│   ├── admin/                   # Admin role specific
│   │   ├── components/
│   │   └── pages/
│   ├── employer/                # Employer role specific
│   │   ├── components/
│   │   └── pages/
│   │       └── jobs.tsx         # Employer job management
│   ├── employee/                # Employee role specific
│   │   ├── components/
│   │   └── pages/
│   │       └── applications.tsx # Employee applications
│   └── shared/                  # Shared dashboard code
│       ├── components/
│       │   ├── layout/          # Dashboard layout components
│       │   │   ├── DashboardLayout.tsx
│       │   │   └── Sidebar.tsx
│       │   └── index.ts
│       ├── page.tsx             # Main dashboard page
│       └── profile.tsx          # Profile page
├── website/                     # Website-specific code
│   ├── components/
│   │   ├── FramerDemo.tsx
│   │   └── index.ts
│   ├── pages/                   # Website pages
│   │   ├── home.tsx
│   │   ├── about.tsx
│   │   ├── jobs.tsx
│   │   ├── companies.tsx
│   │   ├── contact.tsx
│   │   ├── services.tsx
│   │   └── index.ts
│   └── shared/                  # Website shared components
└── shared/                      # Shared across all domains
    ├── components/              # Shared UI components
    │   ├── ui/                  # Basic UI components
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   └── index.ts
    │   ├── auth/                # Auth-related components
    │   │   ├── ProtectedRoute.tsx
    │   │   ├── login.tsx
    │   │   └── register.tsx
    │   ├── Navbar.tsx           # Global navigation
    │   ├── Footer.tsx           # Global footer
    │   ├── LoadingSkeleton.tsx  # Loading states
    │   ├── LazyWrapper.tsx      # Lazy loading
    │   └── index.ts
    ├── contexts/                # React contexts
    │   ├── AuthContext.tsx
    │   ├── I18nContext.tsx
    │   ├── Providers.tsx
    │   └── index.ts
    ├── services/                # API services
    │   ├── api.ts
    │   ├── auth.service.ts
    │   ├── job.service.ts
    │   └── index.ts
    ├── types/                   # TypeScript type definitions
    │   ├── api.ts
    │   ├── application.ts
    │   ├── company.ts
    │   ├── i18n.ts
    │   ├── job-listing.ts
    │   ├── user.ts
    │   └── index.ts
    ├── utils/                   # Utility functions
    │   ├── cn.ts
    │   └── index.ts
    └── index.ts                 # Main shared exports
```

## Import Path Mappings

The project uses TypeScript path mapping for clean imports:

```typescript
// tsconfig.json paths
{
  "@/*": ["./src/*"],                    // General src access
  "@/shared/*": ["./src/shared/*"],      // Shared resources
  "@/dashboard/*": ["./src/dashboard/*"], // Dashboard-specific
  "@/website/*": ["./src/website/*"]     // Website-specific
}
```

## Usage Examples

### Import shared components:
```typescript
import { Button, Card } from '@/shared/components/ui';
import { Navbar, Footer } from '@/shared/components';
import { useAuth, useI18n } from '@/shared/contexts';
```

### Import dashboard components:
```typescript
import { Sidebar, DashboardLayout } from '@/dashboard/shared/components';
import { EmployerJobsPage } from '@/dashboard/employer/pages';
```

### Import website components:
```typescript
import { HomePage, AboutPage } from '@/website/pages';
import { FramerDemo } from '@/website/components';
```

## Role-Based Organization

### Admin Role
- User management
- System settings
- Analytics and reporting
- Content moderation

### Employer Role
- Company profile management
- Job posting and management
- Application review
- Candidate communication

### Employee Role
- Profile management
- Job search and applications
- Application tracking
- Interview scheduling

## Benefits

1. **Clear Separation of Concerns**: Each domain has its own directory
2. **Role-Based Access**: Easy to implement role-based routing and components
3. **Scalability**: Easy to add new roles or features
4. **Maintainability**: Clear structure makes code easier to find and modify
5. **Code Reusability**: Shared components reduce duplication
6. **Type Safety**: Organized types make development more robust

## Migration Notes

- All existing imports have been updated to use the new path mappings
- The app router structure remains unchanged for backward compatibility
- Old component directories have been cleaned up
- All functionality has been preserved during the restructuring
