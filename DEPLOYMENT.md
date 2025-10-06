# Deployment Guide - Sendogram Blog

## Prerequisites

1. **GitHub OAuth App**
   - Create OAuth App at: https://github.com/settings/developers
   - Homepage URL: `https://blog.sendogram.online`
   - Callback URL: `https://blog.sendogram.online/api/auth/callback`
   - Save Client ID and Client Secret

2. **Environment Variables**
   Create `.env` file:
   ```env
   GITHUB_CLIENT_ID=your_oauth_client_id
   GITHUB_CLIENT_SECRET=your_oauth_secret
   ALLOWED_GITHUB_USERS=kadygool1994,user2,user3
   REQUIRED_GITHUB_ORG=sendogram
   NODE_ENV=production
   STAGING=false
   ```

3. **Basic Auth Credentials**
   Generate `.htpasswd` file for /admin protection:
   ```bash
   htpasswd -c .htpasswd admin
   # Enter password when prompted
   ```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Access at http://localhost:4321
# Admin panel at http://localhost:4321/admin
```

## Production Build

```bash
# Build with OG images and feeds
npm run build

# Preview production build
npm run preview
```

## Docker Deployment

### Build Image

```bash
cd sendogram-blog
docker build -t sendogram-blog:latest .
```

### Run Container

```bash
# Using docker-compose
docker-compose up -d

# Or manually
docker run -d \
  -p 8080:80 \
  -v $(pwd)/.htpasswd:/etc/nginx/.htpasswd:ro \
  --name sendogram-blog \
  sendogram-blog:latest
```

### Environment Configuration

Update `docker-compose.yml`:

```yaml
services:
  blog:
    environment:
      - NODE_ENV=production
      - STAGING=false
    volumes:
      - ./.htpasswd:/etc/nginx/.htpasswd:ro
```

## DNS Configuration

Point `blog.sendogram.online` to your server IP:

```
Type: A
Name: blog
Value: YOUR_SERVER_IP
TTL: 3600
```

## Nginx Reverse Proxy (if needed)

If using a reverse proxy in front:

```nginx
server {
    listen 80;
    server_name blog.sendogram.online;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## SSL/TLS with Let's Encrypt

```bash
# Install certbot
apt-get install certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d blog.sendogram.online

# Auto-renewal is configured automatically
```

## GitHub Workflow (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Blog

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Build Docker image
        run: docker build -t sendogram-blog:${{ github.sha }} .
      
      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: |
          # Your deployment script here
          # e.g., push to Docker registry, SSH to server, etc.
```

## Post-Deployment Checklist

- [ ] Blog accessible at https://blog.sendogram.online
- [ ] /admin requires Basic Auth
- [ ] GitHub OAuth working in /admin
- [ ] Only allowed users can access CMS
- [ ] Sitemap at /sitemap.xml
- [ ] RSS at /rss.xml
- [ ] JSON Feed at /feed.json (with CORS)
- [ ] robots.txt configured correctly
- [ ] OG images loading
- [ ] Search working (Pagefind)
- [ ] Links from main SPA working
- [ ] Feed fetching works from main app
- [ ] Mobile responsive
- [ ] Lighthouse score 90+ (Performance & SEO)

## Monitoring

### Health Checks

```bash
# Blog homepage
curl -I https://blog.sendogram.online

# Feed endpoint
curl https://blog.sendogram.online/feed.json

# Sitemap
curl https://blog.sendogram.online/sitemap.xml
```

### Analytics

Check Plausible dashboard at: https://plausible.io/blog.sendogram.online

## Troubleshooting

### Admin login not working

1. Check GitHub OAuth credentials in `.env`
2. Verify callback URL matches GitHub App settings
3. Check `.htpasswd` file exists and is mounted correctly

### Build fails

1. Clear `.astro` cache: `rm -rf .astro`
2. Clear `node_modules`: `rm -rf node_modules && npm install`
3. Check Node.js version: `node -v` (should be 18+)

### Docker container crashes

1. Check logs: `docker logs sendogram-blog`
2. Verify `.htpasswd` file permissions
3. Check port 80 is not already in use

## Backup

Backup critical files:

```bash
# Content
tar -czf backup-content-$(date +%Y%m%d).tar.gz content/

# Config
tar -czf backup-config-$(date +%Y%m%d).tar.gz \
  .env .htpasswd site.config.ts astro.config.mjs

# Uploads
tar -czf backup-uploads-$(date +%Y%m%d).tar.gz public/uploads/
```

## Support

For deployment issues: support@sendogram.online
