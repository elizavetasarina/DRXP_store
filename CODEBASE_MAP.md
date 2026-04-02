# Codebase Map — DRXP Store

Описание структуры проекта.

---

# src/app

Next.js App Router.

Содержит страницы сайта:

home
shop
product
lookbook
journal
about
contact
cart
checkout

---

# src/components

UI компоненты.

Разделены по доменам:

home
shop
product
layout
shared

---

# src/store

Zustand state.

cartStore
wishListStore

---

# src/types

TypeScript типы.

product
order
user

---

# src/server

Backend слой.

services → бизнес логика
repositories → работа с БД
prisma → prisma client

---

# prisma

Prisma schema и миграции.
