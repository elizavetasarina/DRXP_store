# DRXP Store

Streetwear e-commerce built with Next.js 16, Prisma 7, Supabase, and Sanity CMS.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Styling | TailwindCSS 4, shadcn/ui, Radix UI |
| Animations | Framer Motion, GSAP |
| State | Zustand, TanStack Query |
| Database | PostgreSQL (Supabase), Prisma 7 |
| CMS | Sanity v3 |
| Auth | NextAuth v5 |
| i18n | next-intl |

## Architecture

```
src/
├── app/[locale]/          # Pages (App Router, i18n routing)
│   ├── (shop)/            # Catalog + product pages
│   ├── (account)/         # Profile, orders, wishlist
│   ├── (auth)/            # Login, register
│   ├── (content)/         # Journal, lookbook (Sanity)
│   ├── cart/
│   └── checkout/
├── components/            # UI components
├── server/
│   ├── services/          # Business logic
│   └── repositories/      # Database access (Prisma only)
├── store/                 # Zustand stores
├── sanity/                # Sanity schemas + queries
└── lib/                   # prisma.ts, auth.ts, utils
```

Data sources:
- **Supabase** — products, categories, variants, cart, orders, users, promo codes
- **Sanity** — home page content, journal, lookbook, editorial blocks

## Local Development

1. Clone the repo and install dependencies:
```bash
npm install
```

2. Create `.env` from the example:
```bash
cp .env.example .env
```

Fill in:
```env
DATABASE_URL="postgresql://..."   # Supabase transaction pooler (port 6543)
DIRECT_URL="postgresql://..."     # Supabase session pooler (port 5432)

NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

NEXT_PUBLIC_SANITY_PROJECT_ID="..."
NEXT_PUBLIC_SANITY_DATASET="production"
```

3. Generate Prisma client:
```bash
npx prisma generate
```

4. Run the dev server:
```bash
npm run dev
```

App: http://localhost:3000
Sanity Studio: http://localhost:3000/studio

## Database Setup (Supabase)

Tables are created via SQL — run `prisma/seed.sql` in the Supabase SQL Editor.

To seed initial data (categories, products, promo codes) — run `prisma/seed.sql` as well.

Prisma migrations are not used — schema changes are applied via SQL Editor directly.

## Deployment

Build command:
```bash
npm run build   # runs prisma generate + next build
```

Required env vars on the server: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, Sanity vars.

No migration step needed — the database schema is already live on Supabase.

## MVP Status

- [x] Product catalog with filtering and sorting
- [x] Product page with variant selector
- [x] Cart (Zustand + persisted to DB)
- [x] Checkout flow
- [x] Orders
- [x] Auth (register / login / sessions)
- [x] Wishlist
- [x] Promo codes
- [x] Journal + Lookbook (Sanity)
- [x] i18n (ru / en)
- [ ] Real payment gateway (currently stub)
- [ ] Search
- [ ] Admin panel
- [ ] Email notifications
