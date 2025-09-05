# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The **SU'UD Frontend** is a modern Next.js application built with:
- Next.js 15.5.2 with App Router architecture
- React 19.1.0 with TypeScript
- Framer Motion for animations
- Tailwind CSS v4 + SCSS for styling
- Turbopack for fast builds

This is part of a larger SU'UD project with separate frontend (Next.js) and backend (Laravel) repositories.

## Common Development Commands

### Development Server
```bash
npm run dev          # Start development server with Turbopack
```

### Build & Production
```bash
npm run build        # Build for production with Turbopack
npm start           # Start production server
```

### Code Quality
```bash
npm run lint        # Run ESLint
```

### Package Management
```bash
npm install         # Install dependencies
```

## Architecture & Key Patterns

### App Router Structure
- Uses Next.js App Router (not Pages Router)
- Main layout: `src/app/layout.tsx` with Geist fonts and global SCSS
- Root page: `src/app/page.tsx` serves as home page
- Components directory: `src/components/` for reusable React components

### Styling Architecture
- **Primary**: Tailwind CSS v4 with `@import "tailwindcss"` in `globals.scss`
- **SCSS Variables**: Defined in `globals.scss` with CSS custom properties
- **Color System**: Primary (#3b82f6), Secondary (#6366f1), Accent (#f59e0b)
- **Theme Support**: Light/dark mode via `prefers-color-scheme`
- **Typography**: Geist Sans and Geist Mono fonts from Google Fonts

### Component Patterns
- **Client Components**: Use `'use client'` directive for interactive components
- **Framer Motion**: Used for animations and micro-interactions
- **TypeScript**: Strict mode enabled, all components should be properly typed

### Path Aliases
- `@/*` maps to `./src/*` for clean imports

## Configuration Files

### Core Config
- `next.config.ts`: Next.js configuration (minimal setup)
- `tsconfig.json`: TypeScript with strict mode, JSX preserve
- `postcss.config.mjs`: PostCSS with Tailwind plugin
- `eslint.config.mjs`: ESLint with Next.js and TypeScript rules

### Build Tools
- **Turbopack**: Enabled by default for both dev and build commands
- **ESLint**: Configured with `next/core-web-vitals` and `next/typescript`
- **PostCSS**: Uses `@tailwindcss/postcss` plugin

## Development Notes

### File Structure
- All source files in `src/` directory
- Components use TypeScript with `.tsx` extension
- Global styles in `src/app/globals.scss`
- Public assets in `public/` directory

### Animation Guidelines
- Uses Framer Motion for consistent animations
- Motion components follow declarative animation patterns
- Supports gesture interactions (hover, tap, drag)

### Styling Guidelines
- Tailwind classes for layout and utilities
- SCSS variables for design tokens
- CSS custom properties for theming
- Utility classes defined in `globals.scss` (e.g., `.flex-center`)

### TypeScript Integration
- Strict TypeScript configuration
- Next.js plugin enabled for enhanced type checking
- Path mapping configured for clean imports
