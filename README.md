# Sendogram Blog & Knowledge Base

Production-ready blog and knowledge base for Sendogram, built with Astro, Starlight, and Decap CMS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── content/
│   ├── blog/          # Blog posts (MDX)
│   └── kb/            # Knowledge base articles (MDX)
├── public/
│   ├── admin/         # Decap CMS admin panel
│   ├── og/            # OG images
│   └── uploads/       # User uploads
├── scripts/
│   ├── build-og.ts    # Generate OG images
│   └── make-feeds.mjs # Generate RSS & JSON Feed
├── src/
│   ├── components/    # Reusable components
│   ├── layouts/       # Page layouts with JSON-LD
│   ├── pages/         # Route pages
│   └── styles/        # Global styles
├── astro.config.mjs   # Astro configuration
├── site.config.ts     # Site metadata
└── decap.config.yml   # CMS configuration
```

## 🔐 Admin Access

### Prerequisites

1. GitHub OAuth App credentials (set in `.env`)
2. Allowed GitHub users list (ALLOWED_GITHUB_USERS)
3. Required GitHub org membership (REQUIRED_GITHUB_ORG)

### Setup Basic Auth

Generate .htpasswd file:

```bash
htpasswd -c .htpasswd admin
# Enter password when prompted
```

### Access CMS

Navigate to `/admin` and authenticate via GitHub OAuth. Only users in the allowed list and org members will have access.

## 📝 Creating Content

### Blog Post

Create a new MDX file in `content/blog/`:

```mdx
---
title: "Your Post Title"
description: "SEO description (max 160 chars)"
pubDate: "2025-10-05"
author: "Your Name"
tags: ["telegram", "marketing"]
image: "/og/your-image.png"
---

Your content here...
```

### Knowledge Base Article

Create a new MDX file in `content/kb/`:

```mdx
---
title: "Article Title"
description: "SEO description"
updatedAt: "2025-10-05"
schemaType: "TechArticle"
---

Your content here...
```

## 🎨 Features

- ✅ Static site generation (Astro)
- ✅ Visual CMS (Decap)
- ✅ GitHub-based workflow
- ✅ Full SEO optimization (sitemap, robots, meta tags)
- ✅ JSON-LD structured data
- ✅ RSS & JSON Feed
- ✅ Serverless search (Pagefind)
- ✅ OG image generation
- ✅ Mobile responsive
- ✅ Dark theme
- ✅ Fast loading (Lighthouse 90+)

## 🔧 Environment Variables

Create `.env` file:

```env
GITHUB_CLIENT_ID=your_oauth_client_id
GITHUB_CLIENT_SECRET=your_oauth_secret
ALLOWED_GITHUB_USERS=user1,user2,kadygool1994
REQUIRED_GITHUB_ORG=sendogram
NODE_ENV=production
STAGING=false
```

## 🚢 Deployment

### Docker

```bash
# Build image
docker build -t sendogram-blog .

# Run container
docker-compose up -d
```

### Manual

```bash
# Build
npm run build

# Serve dist/ with Nginx
```

## 📊 Analytics

Plausible Analytics is integrated. Set `PLAUSIBLE_DOMAIN` in config.

## 🔗 Integration with Main SPA

The main React SPA at sendogram.online should link to:

- `/blog` - Blog listing
- `/kb` - Knowledge base
- `/feed.json` - JSON Feed (for "Latest from Blog" widget)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Create PR to `main`
5. PR creates preview deployment
6. Merge to deploy to production

## 📄 License

Proprietary - Sendogram

## 🆘 Support

support@sendogram.online
