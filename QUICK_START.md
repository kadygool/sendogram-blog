# Quick Start Guide 🚀

## Минимальный путь к запуску

### 1. Установка (2 минуты)

```bash
cd /Users/aidan/PycharmProjects/aisender/sendogram-blog
npm install
```

### 2. Настройка окружения (3 минуты)

Создайте `.env` файл:

```bash
cp .env.example .env
```

Заполните минимальные поля:

```env
# Для локальной разработки можно оставить как есть
NODE_ENV=development
STAGING=true
```

**Для production добавьте:**
- GitHub OAuth credentials
- Список разрешенных пользователей
- Basic Auth credentials

### 3. Локальный запуск (30 секунд)

```bash
npm run dev
```

Откройте: http://localhost:4321

### 4. Проверка (1 минута)

Проверьте что работает:

- ✅ Главная страница: http://localhost:4321
- ✅ Блог: http://localhost:4321/blog
- ✅ KB: http://localhost:4321/kb
- ✅ Блог-пост: http://localhost:4321/blog/anti-ban-timings
- ✅ KB статья: http://localhost:4321/kb/getting-started/first-campaign

### 5. Создание контента (5 минут)

#### Новый блог-пост:

```bash
# Скопируйте шаблон
cp content/blog/anti-ban-timings.mdx content/blog/my-first-post.mdx

# Отредактируйте файл
nano content/blog/my-first-post.mdx
```

Измените frontmatter:

```yaml
---
title: "Ваш заголовок"
description: "Ваше описание"
pubDate: "2025-10-05"
author: "Ваше имя"
tags: ["telegram"]
draft: false
---

# Ваш заголовок

Ваш контент...
```

Сохраните и перезагрузите страницу - пост появится автоматически!

#### Новая KB статья:

```bash
# Создайте папку и файл
mkdir -p content/kb/my-section
touch content/kb/my-section/my-article.mdx
```

Добавьте контент:

```yaml
---
title: "Название статьи"
description: "Описание"
updatedAt: "2025-10-05"
schemaType: "TechArticle"
draft: false
---

# Название статьи

Контент...
```

### 6. Production Build (2 минуты)

```bash
npm run build
npm run preview
```

Откройте: http://localhost:4321

Проверьте:
- Все страницы работают
- RSS доступен: http://localhost:4321/rss.xml
- Feed доступен: http://localhost:4321/feed.json
- Sitemap доступен: http://localhost:4321/sitemap.xml

### 7. Docker Deploy (5 минут)

```bash
# Build образа
docker build -t sendogram-blog .

# Создайте .htpasswd (для /admin)
htpasswd -c .htpasswd admin

# Запустите контейнер
docker-compose up -d

# Проверьте логи
docker logs sendogram-blog
```

Откройте: http://localhost:8080

## Готово! 🎉

Теперь у вас работающий блог и база знаний!

### Что дальше?

1. **Production деплой**
   - Настройте DNS (blog.sendogram.online)
   - Настройте SSL (Let's Encrypt)
   - Настройте GitHub OAuth для CMS
   - См. `DEPLOYMENT.md`

2. **Создание контента**
   - Используйте CMS: `/admin`
   - Или редактируйте MDX файлы напрямую
   - См. `CONTENT_GUIDE.md`

3. **Настройка аналитики**
   - Добавьте Plausible
   - Настройте Google Search Console
   - Настройте Яндекс.Вебмастер

4. **SEO оптимизация**
   - Submit sitemap
   - Build backlinks
   - Оптимизируйте контент

## Полезные команды

```bash
# Разработка
npm run dev              # Запустить dev-сервер
npm run build            # Собрать production build
npm run preview          # Превью production build

# Docker
docker-compose up -d     # Запустить контейнер
docker-compose down      # Остановить контейнер
docker logs sendogram-blog  # Посмотреть логи

# Контент
# Все в content/blog/ и content/kb/ автоматически подхватывается
```

## Проблемы?

Смотрите:
- `SETUP_INSTRUCTIONS.md` - детальная настройка
- `DEPLOYMENT.md` - деплой в production
- `CONTENT_GUIDE.md` - как писать контент
- `README.md` - общая информация

Или пишите: support@sendogram.online
