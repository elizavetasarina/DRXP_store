# DRXP Store Development Plan

Проект разрабатывается по фазам. Обновлено: 2026-04-02.

---

# PHASE 1 — Core Architecture

* [x] проверить текущую структуру проекта
* [x] создать prisma schema (complete — User, Product, Category, Order, Cart, Promo)
* [x] активировать Prisma client singleton (src/lib/prisma.ts)
* [x] добавить backend слой server/ (repositories + services)
* [ ] настроить PostgreSQL (.env + prisma generate + db push) — ручное действие
* [x] создать seed данные (prisma/seed.ts) — 4 продукта + 2 промокода

---

# PHASE 2 — Products

* [x] модель Product (schema.prisma)
* [x] TypeScript типы (src/types/product.ts, src/types/order.ts) — выровнены с Prisma schema
* [x] страница каталога UI (src/app/(shop)/shop/page.tsx)
* [x] карточка товара (src/components/shop/ProductCard.tsx)
* [x] фильтры UI (src/components/shop/FilterSidebar.tsx)
* [x] исправить типы product.ts (comparePrice, isFeatured, sku, colorHex, tags, isPublished)
* [x] Product API → подключить к БД (src/app/api/products/route.ts + [id]/route.ts)

---

# PHASE 3 — Cart

* [x] cart store Zustand (src/store/cartStore.ts)
* [x] add to cart UI (src/components/product/AddToCart.tsx)
* [x] cart page (src/app/cart/page.tsx)
* [x] CartDrawer (src/components/cart/CartDrawer.tsx)
* [ ] cart API → server-side (src/app/api/cart/route.ts) — отложено до авторизации

---

# PHASE 4 — Checkout

* [x] checkout UI (src/app/checkout/page.tsx)
* [x] CheckoutForm, OrderSummary, PaymentStub компоненты
* [x] payment abstraction layer (src/lib/payment/)
* [x] order creation → расчёт subtotal/discount/total через promoService (DB persist — после auth)
* [ ] order DB persist (src/app/api/orders/route.ts) — требует userId из сессии
* [ ] order history (src/app/(account)/account/orders/page.tsx)

---

# PHASE 5 — Content

* [x] lookbook page UI (src/app/(content)/lookbook/)
* [x] journal page UI (src/app/(content)/journal/)
* [x] about page UI (src/app/(content)/about/)
* [x] contact page UI (src/app/(content)/contact/)
* [x] скачать изображения с Unsplash → public/images/{products,lookbook,editorial,hero}/
* [x] обновить пути изображений в constants.ts (comparePrice, isFeatured, sku, colorHex, tags)

---

# PHASE 6 — Backend Layer (текущий приоритет)

* [x] src/server/repositories/product.repository.ts
* [x] src/server/repositories/order.repository.ts
* [x] src/server/repositories/promo.repository.ts
* [x] src/server/repositories/user.repository.ts
* [x] src/server/services/product.service.ts
* [x] src/server/services/order.service.ts
* [x] src/server/services/promo.service.ts
* [x] src/server/services/auth.service.ts

---

# PHASE 7 — Auth

* [x] login page UI (src/app/(auth)/login/)
* [x] register page UI (src/app/(auth)/register/)
* [ ] NextAuth v5 конфигурация (src/lib/auth.ts)
* [ ] подключить login/register к NextAuth

---

# PHASE 8 — Performance & SEO

* [x] next.config.ts image domains (Unsplash + Pexels remotePatterns)
* [ ] metadata для страниц
* [ ] generateStaticParams для product pages
* [ ] Lighthouse 90+

---

# PHASE 9 — Payments

* [ ] YooKassa integration
* [ ] CloudPayments integration
* [ ] SBP support

---

# PHASE 10 — Admin

* [ ] admin products panel
* [ ] admin orders panel
* [ ] product creation form
