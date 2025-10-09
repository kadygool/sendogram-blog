# Настройка GitHub Secrets для автоматического деплоя

## Что нужно сделать

Чтобы GitHub Actions мог автоматически деплоить блог на сервер, нужно добавить секреты (credentials) в настройки репозитория.

## Шаг 1: Получите SSH ключ с сервера

На вашем сервере выполните:

```bash
# Проверьте, есть ли SSH ключ
cat ~/.ssh/id_rsa

# Если ключа нет, создайте новый
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key -N ""

# Добавьте публичный ключ в authorized_keys
cat ~/.ssh/github_deploy_key.pub >> ~/.ssh/authorized_keys

# Скопируйте приватный ключ (понадобится для GitHub)
cat ~/.ssh/github_deploy_key
```

**Скопируйте весь вывод** (включая `-----BEGIN RSA PRIVATE KEY-----` и `-----END RSA PRIVATE KEY-----`)

## Шаг 2: Добавьте секреты в GitHub

1. Перейдите в репозиторий: https://github.com/kadygool/sendogram-blog
2. Нажмите **Settings** (в верхнем меню)
3. В левом меню выберите **Secrets and variables** → **Actions**
4. Нажмите **New repository secret**

### Добавьте следующие секреты:

#### `SERVER_HOST`
- **Name:** `SERVER_HOST`
- **Value:** IP адрес вашего сервера (например, `158.160.XXX.XXX`)

#### `SERVER_USER`
- **Name:** `SERVER_USER`
- **Value:** `admin17`

#### `SERVER_SSH_KEY`
- **Name:** `SERVER_SSH_KEY`
- **Value:** Приватный SSH ключ (весь текст из `cat ~/.ssh/github_deploy_key`)

#### `SERVER_PORT` (опционально)
- **Name:** `SERVER_PORT`
- **Value:** `22` (или другой порт SSH, если изменен)

## Шаг 3: Проверьте настройки

После добавления секретов:

1. Перейдите в **Actions** в репозитории
2. Вы должны увидеть workflow "Deploy Blog to Server"
3. Нажмите **Run workflow** → **Run workflow** для тестового запуска

Или просто сделайте любой коммит в `main` ветку — деплой запустится автоматически.

## Шаг 4: Проверьте результат

После успешного деплоя:

```bash
# Проверьте, что статья появилась
curl -I https://blog.sendogram.online/blog/rasylka-v-telegram/

# Проверьте sitemap
curl https://blog.sendogram.online/sitemap.xml | grep rasylka

# Откройте в браузере
open https://blog.sendogram.online/
```

## Как это работает

1. Вы публикуете статью в Decap CMS
2. Decap создает Pull Request в GitHub (режим `editorial_workflow`)
3. Вы мержите PR в `main` ветку
4. GitHub Actions автоматически:
   - Подключается к серверу по SSH
   - Подтягивает изменения из GitHub
   - Пересобирает Docker образ
   - Перезапускает контейнер блога
5. Статья появляется на сайте! 🎉

## Альтернатива: Режим Simple (без PR)

Если хотите, чтобы статьи публиковались сразу без PR, измените в `public/admin/config.yml`:

```yaml
# Было:
publish_mode: editorial_workflow

# Станет:
publish_mode: simple
```

Тогда статьи будут коммититься сразу в `main` и деплоиться автоматически.

## Troubleshooting

### Ошибка: "Permission denied (publickey)"

Проверьте, что публичный ключ добавлен в `~/.ssh/authorized_keys` на сервере:

```bash
cat ~/.ssh/github_deploy_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Ошибка: "docker: command not found"

Убедитесь, что Docker доступен для пользователя `admin17`:

```bash
sudo usermod -aG docker admin17
```

### Workflow не запускается

Проверьте, что все секреты добавлены правильно в Settings → Secrets and variables → Actions.

