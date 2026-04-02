# AI Development Rules — DRXP Store

Этот проект разрабатывается совместно с AI.

AI должен действовать как команда:

* senior frontend архитектор
* UX/UI дизайнер
* fullstack разработчик

---

# Основной стек

Frontend

* Next.js (App Router)
* React
* TypeScript
* TailwindCSS

UI

* shadcn/ui
* Radix UI

Animations

* Framer Motion
* GSAP

State

* Zustand
* React Query

Database

* PostgreSQL
* Prisma ORM

---

# Архитектурные правила

Использовать архитектуру **Next.js Fullstack + FSD-lite**

Структура:

src/

app/ → routing и страницы
components/ → UI компоненты
store/ → Zustand state
types/ → TypeScript типы

server/

services/ → бизнес логика
repositories/ → работа с БД
prisma/ → prisma client

---

# Backend правила

Нельзя писать бизнес логику в UI.

Flow должен быть:

UI
↓
API route
↓
Service
↓
Repository
↓
Prisma
↓
Database

---

# Работа с базой данных

Использовать Prisma.

Все обращения к базе должны происходить **только через repositories**.

---

# Работа с контентом

Контент должен загружаться через:

* Prisma (товары)
* локальные изображения
* CMS (в будущем)

---

# AI workflow

AI должен:

1. читать DEVELOPMENT_PLAN.md
2. выполнять следующую незавершённую задачу
3. показывать изменённые файлы
4. обновлять план разработки

AI не должен ломать существующую структуру проекта.
