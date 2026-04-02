# Content Guide — DRXP Store

Во время разработки используется временный контент.

---

# Источники изображений

Использовать:

https://unsplash.com

Поиск изображений:

streetwear fashion
minimal fashion
editorial fashion photography
dark fashion studio
streetwear lookbook

---

# Важно

Нельзя использовать изображения по прямым ссылкам.

AI должен:

1. скачать изображение
2. сохранить локально
3. использовать локальный путь

---

# Структура хранения

public/

images/

products/
lookbook/
editorial/
hero/

---

# Пример структуры

public/images/products/hoodie-01.jpg
public/images/lookbook/lookbook-01.jpg

---

# Использование изображений

Использовать Next.js Image:

<Image
src="/images/products/hoodie-01.jpg"
width={800}
height={1000}
/>

---

# Временные продукты

Для разработки AI должен создать несколько тестовых продуктов:

DRXP Hoodie
DRXP Oversize Tee
DRXP Cargo Pants
DRXP Tactical Jacket

---

# Seed данные

AI должен добавить seed файл:

prisma/seed.ts

который создаёт тестовые товары.

---

# Будущее

Позже изображения будут храниться в:

Cloudinary
или CMS storage.
