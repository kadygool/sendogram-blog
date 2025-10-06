import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import expressiveCode from 'astro-expressive-code';
import { SITE_CONFIG } from './site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_CONFIG.siteUrl,
  trailingSlash: 'ignore',
  
  integrations: [
    expressiveCode({
      themes: ['github-dark'],
    }),
    starlight({
      title: 'База знаний Sendogram',
      description: 'Полное руководство по работе с Telegram-рассылками',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'Русский',
          lang: 'ru',
        },
      },
      social: {
        github: 'https://github.com/sendogram',
      },
      sidebar: [
        {
          label: 'Быстрый старт',
          items: [
            { label: 'Первая рассылка за 5 минут', link: '/kb/getting-started/first-campaign/' },
            { label: 'Настройка аккаунта', link: '/kb/getting-started/account-setup/' },
          ],
        },
        {
          label: 'Анти-бан',
          items: [
            { label: 'Чек-лист безопасности', link: '/kb/anti-ban/checklist/' },
            { label: 'Тайминги отправки', link: '/kb/anti-ban/timings/' },
          ],
        },
        {
          label: 'Шаблоны',
          items: [
            { label: 'HR рассылки', link: '/kb/templates/hr/' },
            { label: 'B2B outreach', link: '/kb/templates/b2b/' },
          ],
        },
      ],
      customCss: [
        './src/styles/starlight-custom.css',
      ],
      components: {
        Head: './src/components/StarlightHead.astro',
      },
      pagefind: true,
    }),
    mdx(),
    react(),
    sitemap({
      filter: (page) => {
        if (SITE_CONFIG.isStaging) return false;
        return !page.includes('/admin');
      },
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },

  vite: {
    ssr: {
      noExternal: ['@astrojs/starlight'],
    },
  },
});
