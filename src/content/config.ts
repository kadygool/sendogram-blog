import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()).optional(),
    author: z.string().default('Команда Sendogram'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    canonical: z.string().url().optional(),
    schemaType: z.enum(['Article', 'NewsArticle']).default('Article'),
    draft: z.boolean().default(false),
    related: z.array(z.string()).default([]),
  }),
});

const kbCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    updatedAt: z.string().or(z.date()),
    schemaType: z.enum(['FAQPage', 'TechArticle', 'HowTo']).default('TechArticle'),
    draft: z.boolean().default(false),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    breadcrumbs: z.array(z.object({
      name: z.string(),
      url: z.string(),
    })).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'kb': kbCollection,
};
