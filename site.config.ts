export const SITE_CONFIG = {
  title: 'Sendogram | Блог и База знаний',
  description: 'Блог о Telegram-маркетинге, автоматизации рассылок и эффективной работе с ботами',
  author: 'Sendogram Team',
  
  // URLs
  siteUrl: 'https://blog.sendogram.online',
  appUrl: 'https://sendogram.online',
  
  // Social
  ogImage: '/og/default.png',
  twitterHandle: '@sendogram',
  
  // GitHub OAuth (для Decap CMS)
  githubRepo: 'sendogram/sendogram-blog',
  githubOrg: 'sendogram',
  
  // Environment-specific
  isProd: process.env.NODE_ENV === 'production',
  isStaging: process.env.STAGING === 'true',
  
  // Analytics
  plausibleDomain: 'blog.sendogram.online',
  
  // Content
  postsPerPage: 10,
  relatedPostsCount: 3,
} as const;

export type SiteConfig = typeof SITE_CONFIG;
