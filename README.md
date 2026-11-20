# CySocial — Multilingual Digital & Social Media Agency Platform (Cyprus)

Full-stack pnpm workspace monorepo powering **CySocial**, a multilingual (`TR`, `EN`, `RU`, `AR`) digital marketing and social media agency web platform for Cyprus.

## Monorepo Architecture

```text
CySocial/
├── artifacts/
│   ├── cysocial/          # React 18 + Vite multilingual (TR/EN/RU/AR) agency frontend
│   └── api-server/        # Express 5 + Zod API server
├── lib/
│   ├── api-spec/          # OpenAPI 3.1 contract & Orval codegen config
│   ├── api-client-react/  # Generated React Query hooks & fetch client
│   ├── api-zod/           # Generated Zod v4 request/response validators
│   └── db/                # Drizzle ORM + PostgreSQL schema
└── scripts/               # Workspace automation utilities
```

## Key Features

- **4-Language Localization (`tr`, `en`, `ru`, `ar`)**: Type-safe dictionary helpers (`tw` and `tl`) with full RTL layout support for Arabic.
- **Agency Metadata & Service Catalog API (`/api/healthz`, `/api/meta`, `/api/services`)**: Express 5 + Zod endpoints exposing health telemetry, locale capabilities, and the agency service pillars.
- **Accessible Modal & Interactive Effects**: Dialogs with `aria-modal`, Escape-key dismissal, 3D card tilt, scroll progress bar, and cancellable typewriter animations.
- **Dark & Light Themes**: CSS custom properties (`--primary`, `--bg`, `--surface`) toggled via `html.dark`.

## Development Commands

```bash
pnpm install
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/cysocial run dev
pnpm run typecheck
pnpm run build
```
