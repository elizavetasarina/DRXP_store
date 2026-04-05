# DRXP Store Development Plan

Проект разрабатывается по фазам. Обновлено: 2026-04-05.

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
* [ ] cart API → server-side — отложено до Phase 8 Auth

---

# PHASE 4 — Checkout ✅

* [x] checkout UI (src/app/checkout/page.tsx)
* [x] CheckoutForm, OrderSummary, PaymentStub компоненты
* [x] payment abstraction layer (src/lib/payment/)
* [x] promo API → подключён к promoService (src/app/api/promo/validate/)
* [x] orders API → promo расчёт работает, stub orderId (src/app/api/orders/)
* [x] order DB persist → CheckoutForm подключён к POST /api/orders, редирект на /order-confirmation
* [x] order history page (src/app/(account)/account/orders/page.tsx) — Phase 8.6
* [x] cart promo валидация → реальный /api/promo/validate (убраны hardcoded коды)
* [x] order confirmation page (src/app/order-confirmation/page.tsx)
* [x] PaymentStub подключён к checkout — выбранный метод передаётся в API

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
* [x] деплой работает (Node 20, prisma generate при билде)
* [x] hydration fix (Header.tsx — mounted state для cart/wishlist)
* [x] motion.create() fix (SplitText.tsx — Framer Motion v12)
* [x] Prisma build error fix — engineType binary убран, named import исправлен
* [x] NextAuth config fix — AUTH_SECRET, proxy.ts (бывший middleware.ts)
* [ ] `npx prisma db seed` — загрузить тестовые данные (через Railway CLI)

---

# PHASE 8 — Auth ✅

## 8.1 — Инфраструктура ✅
* [x] NextAuth v5 конфигурация — Credentials provider, JWT strategy (src/lib/auth.ts)
* [x] API route: /api/auth/[...nextauth] (src/app/api/auth/[...nextauth]/route.ts)
* [x] API route: /api/auth/register (src/app/api/auth/register/route.ts)
* [x] SessionProvider в layout (src/providers/AuthProvider.tsx)
* [x] .env.local с AUTH_SECRET
* [x] proxy.ts — защита /account/* и /checkout (src/proxy.ts)

## 8.2 — Login & Register UI ✅
* [x] /login — форма, signIn("credentials", { redirect: false }), редирект на /account
* [x] /register — форма, POST /api/auth/register, auto signIn после регистрации
* [x] Обе страницы показывают ошибки от API

## 8.3 — Header: состояние авторизации ✅
> Файл: src/components/layout/Header.tsx
* [x] добавить useSession() из next-auth/react
* [x] если залогинен → иконка User ведёт на /account
* [x] если не залогинен → ссылка "SIGN IN" ведёт на /login
* [x] не изменять остальные иконки (Search, Heart, Cart)

## 8.4 — Account page: реальные данные ✅
> Файл: src/app/(account)/account/page.tsx
* [x] заменить hardcoded имя/email на данные из useSession()
* [x] кнопка Sign Out — вызов signOut() с редиректом на /
* [x] sidebar: Sign Out добавлен последним пунктом навигации

## 8.5 — Order persist с userId ✅
> Файл: src/app/api/orders/route.ts
* [x] auth() уже вызывался, session?.user?.id ветка реализована
* [x] если залогинен → orderService.createOrder() с userId → сохраняется в БД
* [x] если гость → расчёт без persist, orderId = guest_...
* [x] TypeScript типы для сессии (src/types/next-auth.d.ts) — id, role

## 8.6 — Order history ✅
> Файлы: src/app/(account)/account/orders/page.tsx, OrderList.tsx
* [x] серверный компонент — auth() + orderRepository.findByUserId()
* [x] редирект на /login если нет сессии
* [x] клиент-компонент OrderList — аккордеон по заказам
* [x] список заказов: дата, сумма, статус, состав позиций

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
