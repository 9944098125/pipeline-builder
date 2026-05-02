---
alwaysApply: true
---

# Project Directory Structure

This repo is a Nx monorepo. Every top-level folder has a clear, single responsibility, so humans and AI agents can quickly find the right place to work.

## Directory Overview

- **apps/** – Applications. Backend services are prefixed with `server-`, frontend apps with `web-`. Each app has a corresponding `-e2e` project for end-to-end testing (e.g., `web-crm` and `web-crm-e2e`).
- **libs/** – Shared libraries used by apps, organized by domain and functionality:
  - **auth/** – Authentication core logic (JWT tokens, middleware, security)
  - **auth-ui/** – Authentication UI components (auth context, token validator)
  - **crm/** – CRM business logic and UI, organized into:
    - **domain/** – Domain-specific modules (see below)
    - **trpc/** – tRPC API layer (client, core, router)
  - **database/** – Prisma schema, migrations, and database client
  - **design-system/** – Atomic design system with reusable UI components (Material-UI based)
  - **shared/** – Cross-cutting utilities and services (see below)
- **deployment/** – Docker configurations, deployment scripts, and environment configs
- **docs/** – Project documentation including CI/CD guides, deployment guides, and business specifications
- **.cursor/** – Rules and commands that teach AI agents how to work in this repo:
  - **rules/** – Numbered project-specific rules
  - **commands/** – Feature workflow commands (feature-plan, feature-implement, feature-test, create-pr, conduct-code-review, etc.)

## CRM Domain Modules (`libs/crm/domain/`)

Business logic organized by domain following domain-driven design principles.

**Pattern Note**: Some domains separate backend logic from UI components (e.g., `funnel` + `funnel-ui`, `parser` + `parser-ui`) for better modularity and reusability.

## tRPC Organization (`libs/crm/trpc/`)

Type-safe API layer organized as:

- **client/** – tRPC client for consuming APIs from frontend apps
- **core/** – Shared types, context, and middleware
- **router/** – API route definitions and implementations

**Usage**: Frontend apps use the tRPC client to make type-safe API calls to backend services. Add new endpoints in `router/`, shared types in `core/`, and consume via `client/`.

## Shared Libraries (`libs/shared/`)

Cross-cutting utilities and third-party service integrations:

- **azure-storage/** – Azure Blob storage service for file uploads and management
- **email/** – Email service abstraction
- **logger/** – Winston-based logging service
- **openai/** – OpenAI API integration for AI features
- **pdf/** – PDF generation and manipulation utilities
- **redis/** – Redis client and caching utilities
- **sendgrid/** – SendGrid email service integration
- **twilio/** – Twilio SMS and voice service integration
- **validation/** – Shared validation schemas and middleware (Zod-based)
- **websockets/** – WebSocket service for real-time communication
- **xactus/** – Xactus credit reporting integration (XML schemas)

## Tech Stack

### General

- **nx** (v21) – Monorepo build system and task orchestration
- **yarn** (v4.9.4) – Package manager with workspaces
- **typescript** (v5.8.2) – Type-safe JavaScript

### Frontend

- **react** (v18.3.1) – UI framework
- **react-router** (v7) – Routing and data loading
- **@mui/material** (v7) – Primary component library (Material-UI)
- **@mui/icons-material** (v7) – Material Design icons
- **vite** – Build tool and dev server
- **storybook** (v9) – Component development and documentation

### Backend

- **express** (v4) – Web server framework
- **prisma** (v6) – Database ORM and migrations
- **@trpc/server** (v11) – Type-safe API framework
- **winston** – Logging
- **bullmq** – Job queue for background processing
- **ioredis** – Redis client

### Testing

- **vitest** (v3) – Unit testing framework
- **cypress** (v14) – E2E testing
- **@testing-library/react** – React component testing

### Database

- **postgresql** – Primary database
- **prisma** – Schema definition and migrations
- **@nx-tools/nx-prisma** – Nx integration for Prisma commands

## Application Architecture

### Frontend-Backend Communication

- **web-crm** – CRM frontend React application (admin dashboard)
- **server-crm** – CRM backend Express API server
- **web-funnel** – Mortgage funnel frontend React application (customer-facing)

**Connection**: Frontend apps (`web-crm`, `web-funnel`) communicate with backend (`server-crm`) via tRPC for type-safe, end-to-end typed APIs. The tRPC client in frontend apps automatically gets TypeScript types from the backend router definitions.

## Key Architectural Patterns

### 1. Domain-Driven Design

Business logic is organized into domain modules under `libs/crm/domain/*`. Each domain is self-contained with its own:

- Service layer (business logic)
- Repository layer (data access)
- Router (API endpoints - tRPC or Express)
- Schemas (validation and types)

### 2. Type-Safe APIs with tRPC

All API communication uses tRPC for end-to-end type safety:

- Backend defines procedures in `libs/crm/trpc/router/`
- Frontend imports types automatically via `libs/crm/trpc/client/`
- No manual API typing or OpenAPI specs needed

### 3. Nx Monorepo Organization

- Shared code lives in `libs/`
- Applications live in `apps/`
- Nx manages dependencies and build orchestration
- Use `nx run <project>:<target>` for all operations

### 4. E2E Testing Pattern

Each application has a corresponding E2E test project:

- `web-crm` → `web-crm-e2e` (Cypress)
- `web-funnel` → `web-funnel-e2e` (Cypress)
- `server-crm` → `server-crm-e2e` (Jest integration tests)

### 5. Atomic Design System

UI components follow atomic design principles in `libs/design-system/`:

- **Atoms** – Basic building blocks (Button, Input, Badge)
- **Molecules** – Simple combinations (Card, Modal, SearchBar)
- **Organisms** – Complex sections (Navigation, DataGrid)
- All documented in Storybook
