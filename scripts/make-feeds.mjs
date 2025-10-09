import { writeFileSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import RSS from 'rss';

const SITE_URL = 'https://blog.sendogram.online';
const SITE_TITLE = 'Sendogram | Блог';
const SITE_DESCRIPTION = 'Блог о Telegram-маркетинге и автоматизации рассылок';

// Функция для парсинга frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---/);
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
    }
  });
  
  return frontmatter;
}

// Чтение всех постов блога
function getAllBlogPosts() {
  const blogDir = './src/content/blog';
  const files = readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  const posts = files.map(file => {
    const content = readFileSync(join(blogDir, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);
    
    if (!frontmatter || frontmatter.draft === 'true') return null;
    
    const slug = file.replace(/\.(md|mdx)$/, '');
    
    return {
      title: frontmatter.title,
      description: frontmatter.description || '',
      pubDate: frontmatter.pubDate,
      url: `${SITE_URL}/blog/${slug}/`,
      slug,
      author: frontmatter.author || 'Команда Sendogram',
      image: frontmatter.image ? `${SITE_URL}${frontmatter.image}` : null,
    };
  }).filter(Boolean);
  
  // Сортировка по дате (новые первыми)
  posts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  
  return posts;
}

// Генерация RSS
function generateRSS(posts) {
  const feed = new RSS({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    language: 'ru',
    pubDate: new Date(),
  });
  
  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.description,
      url: post.url,
      date: post.pubDate,
      author: post.author,
      enclosure: post.image ? { url: post.image } : undefined,
    });
  });
  
  return feed.xml({ indent: true });
}

// Генерация JSON Feed
function generateJSONFeed(posts) {
  return JSON.stringify({
    version: 'https://jsonfeed.org/version/1.1',
    title: SITE_TITLE,
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    description: SITE_DESCRIPTION,
    language: 'ru',
    items: posts.map(post => ({
      id: post.url,
      url: post.url,
      title: post.title,
      content_text: post.description,
      date_published: post.pubDate,
      author: {
        name: post.author,
      },
      image: post.image,
    })),
  }, null, 2);
}

// Основная функция
function main() {
  console.log('📝 Генерация RSS и JSON Feed...');
  
  const posts = getAllBlogPosts();
  console.log(`✅ Найдено ${posts.length} постов`);
  
  const rss = generateRSS(posts);
  writeFileSync('./dist/rss.xml', rss);
  console.log('✅ RSS feed создан: dist/rss.xml');
  
  const jsonFeed = generateJSONFeed(posts);
  writeFileSync('./dist/feed.json', jsonFeed);
  console.log('✅ JSON Feed создан: dist/feed.json');
}

main();
