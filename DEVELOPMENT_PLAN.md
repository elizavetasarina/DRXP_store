# DRXP Store Development Plan

Проект разрабатывается по фазам. Обновлено: 2026-04-02.

---

# PHASE 1 — Core Architecture ✅

* [x] проверить текущую структуру проекта
* [x] создать prisma schema (User, Product, Category, Order, Cart, Promo)
* [x] активировать Prisma client singleton (src/lib/prisma.ts)
* [x] добавить backend слой server/ (repositories + services)
* [x] Railway PostgreSQL подключён к проекту
* [x] деплой на Railway работает (Node 20, prisma generate при билде)
* [x] создать seed данные (prisma/seed.ts) — 4 продукта + 2 промокода

---

# PHASE 2 — Products ✅

* [x] модель Product (schema.prisma)
* [x] TypeScript типы (product.ts, order.ts) — выровнены с Prisma schema
* [x] страница каталога UI (src/app/(shop)/shop/page.tsx)
* [x] карточка товара (src/components/shop/ProductCard.tsx)
* [x] фильтры UI (src/components/shop/FilterSidebar.tsx)
* [x] Product API → подключён к services (src/app/api/products/)
* [x] Product [id] API → подключён к services (src/app/api/products/[id]/)

---

# PHASE 3 — Cart ✅ (client-side)

* [x] cart store Zustand (src/store/cartStore.ts)
* [x] add to cart UI (src/components/product/AddToCart.tsx)
* [x] cart page (src/app/cart/page.tsx)
* [x] CartDrawer (src/components/cart/CartDrawer.tsx)
* [ ] cart API → server-side — отложено до авторизации

---

# PHASE 4 — Checkout (частично)

* [x] checkout UI (src/app/checkout/page.tsx)
* [x] CheckoutForm, OrderSummary, PaymentStub компоненты
* [x] payment abstraction layer (src/lib/payment/)
* [x] promo API → подключён к promoService (src/app/api/promo/validate/)
* [x] orders API → promo расчёт работает, stub orderId (src/app/api/orders/)
* [ ] order DB persist → требует userId из сессии (после Phase 8 Auth)
* [ ] order history (src/app/(account)/account/orders/page.tsx)

---

# PHASE 5 — Content ✅

* [x] lookbook, journal, about, contact — UI готов
* [x] изображения с Unsplash → public/images/{products,lookbook,editorial,hero}/
* [x] пути изображений обновлены в constants.ts

---

# PHASE 6 — Backend Layer ✅

* [x] repositories: product, order, promo, user
* [x] services: product, order, promo, auth
* [x] API routes подключены к services: products, products/[id], promo/validate, orders

---

# PHASE 7 — Database Init & Deploy ✅

* [x] Railway PostgreSQL подключён
* [x] prisma db push — таблицы созданы
* [x] деплой работает (Node 20, prisma generate при билде, db push при старте)
* [x] hydration fix (Header.tsx — mounted state для cart/wishlist)
* [x] motion.create() fix (SplitText.tsx — Framer Motion v12)
* [ ] запустить `npx prisma db seed` — загрузить тестовые данные (через Railway CLI)

---

# PHASE 8 — Auth

* [x] login page UI
* [x] register page UI
* [ ] NextAuth v5 конфигурация (src/lib/auth.ts)
* [ ] API route: src/app/api/auth/[...nextauth]/route.ts
* [ ] API route: src/app/api/auth/register/route.ts
* [ ] подключить login/register формы к NextAuth
* [ ] защитить /account/* роуты (middleware)
* [ ] order DB persist после получения userId из сессии

---

# PHASE 9 — Performance & SEO

* [x] next.config.ts image domains
* [ ] metadata для страниц (title, description, og:image)
* [ ] generateStaticParams для /product/[slug]
* [ ] Lighthouse 90+

---

# PHASE 10 — Payments

* [ ] YooKassa integration
* [ ] CloudPayments integration
* [ ] SBP support

---

# PHASE 11 — Admin

* [ ] admin products panel
* [ ] admin orders panel
* [ ] product creation form
