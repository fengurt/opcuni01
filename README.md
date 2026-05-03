# OPC UNI

OPC Global's university partnership and AI talent development platform — built with Vite/React, Express/tRPC, and MySQL/Drizzle.

## Quick Start

```bash
# 1. Copy and fill environment variables
cp .env.example .env

# 2. Install dependencies
pnpm install

# 3. Start development (server + Vite HMR)
pnpm dev
```

Open **http://localhost:3000** — or whatever port `pnpm dev` reports.

> **Note:** Without a live `DATABASE_URL` the app still loads pages, but tRPC API calls that hit the DB return empty/placeholder data. Set `DATABASE_URL` in `.env` to get the full experience.

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | Yes (for DB features) | — | MySQL connection string |
| `NODE_ENV` | No | `development` | `development` or `production` |
| `VITE_OPC_UNI_HOME` | No | `false` | `true` → `/` shows UNI page; marketing home moves to `/global` |
| `VITE_APP_URL` | No | `http://localhost:3000` | Canonical URL for OAuth callbacks |
| `LOGTO_ENDPOINT` | No | — | Logto SSO endpoint |
| `LOGTO_APP_ID` | No | — | Logto application ID |
| `LOGTO_APP_SECRET` | No | — | Logto application secret |
| `JWT_SECRET` | No | fallback string | Cookie signing secret |

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start server (Express + tRPC) with `tsx watch` |
| `pnpm build` | Vite client build + esbuild server bundle → `dist/` |
| `pnpm start` | Run production server from `dist/` |
| `pnpm check` | Type-check with `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |
| `pnpm test` | Vitest |
| `pnpm db:push` | Run Drizzle migrations |
| `pnpm db:studio` | Open Drizzle Studio |

## Architecture

```
client/src/          React frontend (Vite)
server/              Express + tRPC API (development via tsx, production via esbuild)
functions/          Cloudflare Workers API routes (optional)
drizzle/             Database migrations + schema
shared/              Types and constants shared client ↔ server
```

### Route Map

| Path | Description |
|---|---|
| `/` | Home (or UNI page when `VITE_OPC_UNI_HOME=true`) |
| `/uni` | UNI — full AI talent blueprint page |
| `/courses` | University hub — curriculum, programs, delivery |
| `/hom` | OPC HOM landing |
| `/dao` | OPC DAO |
| `/universe` | OPC Universe |

## Deploy

### Cloudflare Pages + Workers

```bash
# Build
pnpm build

# Deploy static frontend
wrangler pages deploy dist/public --project=opcuni01

# Deploy API Worker
wrangler deploy api-worker.ts
```

Set environment variables in **Cloudflare Dashboard → Workers & Pages → opcuni01 → Settings → Variables**.

> **Cloudflare resources needed** (set IDs in `wrangler.toml`):
> - D1 database (`opcuni`)
> - R2 bucket (`opcuni-assets`)
> - Hyperdrive (existing MySQL)
