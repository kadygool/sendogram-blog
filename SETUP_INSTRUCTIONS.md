# Setup Instructions - Sendogram Blog

## Initial Setup

### 1. GitHub OAuth App

Создайте GitHub OAuth App для Decap CMS:

1. Перейдите: https://github.com/settings/developers
2. Нажмите "New OAuth App"
3. Заполните форму:
   - **Application name**: Sendogram Blog CMS
   - **Homepage URL**: `https://blog.sendogram.online`
   - **Authorization callback URL**: `https://blog.sendogram.online/api/auth/callback`
4. Сохраните **Client ID** и **Client Secret**

### 2. GitHub Repository

1. Создайте новый репозиторий: `sendogram/sendogram-blog`
2. Push код в репозиторий:

```bash
cd sendogram-blog
git init
git add .
git commit -m "Initial commit: Blog and KB setup"
git remote add origin git@github.com:sendogram/sendogram-blog.git
git push -u origin main
```

### 3. Environment Variables

Создайте `.env` файл в корне проекта:

```env
# GitHub OAuth для Decap CMS
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# Контроль доступа к CMS
ALLOWED_GITHUB_USERS=kadygool1994,user2,user3
REQUIRED_GITHUB_ORG=sendogram

# Basic Auth для /admin (дополнительная защита)
ADMIN_BASIC_USER=admin
ADMIN_BASIC_PASSWORD=your_secure_password_here

# Environment
NODE_ENV=production
STAGING=false

# Analytics
PLAUSIBLE_DOMAIN=blog.sendogram.online
```

### 4. Basic Auth Setup

Создайте `.htpasswd` файл для защиты `/admin`:

```bash
# Установите apache2-utils (если нет)
apt-get install apache2-utils

# Создайте .htpasswd
htpasswd -c .htpasswd admin
# Введите пароль когда попросит
```

**⚠️ Важно:** Добавьте `.env` и `.htpasswd` в `.gitignore` (уже добавлено).

### 5. Local Development

```bash
# Установите зависимости
npm install

# Запустите dev-сервер
npm run dev

# Откройте http://localhost:4321
```

### 6. DNS Configuration

Настройте DNS для `blog.sendogram.online`:

```
Type: A
Name: blog
Value: YOUR_SERVER_IP
TTL: 3600
```

Или используйте CNAME (если хостинг поддерживает):

```
Type: CNAME
Name: blog
Value: your-hosting-service.com
TTL: 3600
```

### 7. Production Deployment

#### Option A: Docker (Recommended)

```bash
# Build
docker build -t sendogram-blog:latest .

# Run
docker-compose up -d

# Check logs
docker logs sendogram-blog
```

#### Option B: Netlify

1. Push код в GitHub
2. Подключите репозиторий к Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Environment variables: добавьте из `.env`

#### Option C: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 8. SSL/TLS Certificate

Если используете свой сервер:

```bash
# Install Certbot
apt-get install certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d blog.sendogram.online

# Auto-renewal проверяется автоматически
```

### 9. GitHub Secrets (для CI/CD)

Добавьте secrets в GitHub:

1. Перейдите: Settings → Secrets and variables → Actions
2. Добавьте:
   - `DOCKER_USERNAME`: ваш Docker Hub username
   - `DOCKER_PASSWORD`: ваш Docker Hub token
   - `SERVER_HOST`: IP сервера (если деплой через SSH)
   - `SERVER_USER`: SSH username
   - `SERVER_SSH_KEY`: приватный SSH ключ

### 10. Testing

Проверьте что всё работает:

```bash
# Homepage
curl -I https://blog.sendogram.online

# Feed
curl https://blog.sendogram.online/feed.json

# Sitemap
curl https://blog.sendogram.online/sitemap.xml

# Admin (должен требовать Basic Auth)
curl -I https://blog.sendogram.online/admin
```

## Post-Setup Tasks

### 1. Создайте первый контент

Через CMS:
1. Откройте `/admin`
2. Войдите через GitHub
3. Создайте первый блог-пост или KB статью

Или вручную:
```bash
# Скопируйте примеры
cp content/blog/anti-ban-timings.mdx content/blog/my-first-post.mdx
# Отредактируйте frontmatter и контент
```

### 2. Настройте аналитику

1. Создайте аккаунт на plausible.io
2. Добавьте сайт `blog.sendogram.online`
3. Проверьте что скрипт загружается

### 3. Обновите основной SPA

Убедитесь что в основном приложении (sendogram.online):
- Ссылки на блог и KB в header
- Footer с ссылками на ресурсы
- Компонент BlogPreview на главной
- KnowledgeBaseLinks на странице логина

### 4. SEO Setup

1. Отправьте sitemap в Google Search Console:
   - https://search.google.com/search-console
   - Добавьте `https://blog.sendogram.online/sitemap.xml`

2. Отправьте sitemap в Яндекс.Вебмастер:
   - https://webmaster.yandex.ru/
   - Добавьте сайт и sitemap

3. Проверьте структурированные данные:
   - https://search.google.com/test/rich-results
   - Введите URL любого поста

### 5. Social Media Setup

Проверьте превью в социальных сетях:

- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## Maintenance

### Regular Tasks

- **Ежедневно**: проверяйте аналитику, отвечайте на комментарии
- **Еженедельно**: публикуйте новый контент
- **Ежемесячно**: обновляйте зависимости, проверяйте битые ссылки
- **Ежеквартально**: аудит SEO, обновление старого контента

### Backups

```bash
# Backup скрипт (запускайте еженедельно)
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf backup-content-$DATE.tar.gz content/
tar -czf backup-uploads-$DATE.tar.gz public/uploads/
tar -czf backup-config-$DATE.tar.gz .env .htpasswd site.config.ts

# Загрузите бэкапы в S3 или другое хранилище
```

### Updates

```bash
# Обновление зависимостей
npm update

# Проверка уязвимостей
npm audit

# Fix уязвимостей
npm audit fix
```

## Troubleshooting

### Проблема: Admin не открывается

**Решение:**
1. Проверьте `.htpasswd` файл существует
2. Проверьте GitHub OAuth настройки
3. Проверьте callback URL совпадает

### Проблема: Builds падают

**Решение:**
1. Очистите кэш: `rm -rf .astro node_modules && npm install`
2. Проверьте версию Node.js: должна быть 18+
3. Проверьте все frontmatter поля корректны

### Проблема: Feeds не генерируются

**Решение:**
1. Проверьте `scripts/make-feeds.mjs` исполняется
2. Проверьте права на запись в `dist/`
3. Проверьте frontmatter всех постов валиден

### Проблема: Поиск не работает

**Решение:**
1. Запустите `npm run pagefind` после билда
2. Проверьте Pagefind установлен: `npm list pagefind`
3. Проверьте `dist/_pagefind/` директория существует

## Support

Если возникли проблемы:
- Email: support@sendogram.online
- GitHub Issues: https://github.com/sendogram/sendogram-blog/issues
- Telegram: @sendogram
