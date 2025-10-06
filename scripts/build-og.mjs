import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Функция для переноса текста
function wrapText(ctx, text, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  return {
    lines,
    totalHeight: lines.length * lineHeight,
  };
}

// Генерация OG-картинки
function generateOGImage({ title, subtitle, filename }) {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Фон (градиент)
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#4f46e5');
  gradient.addColorStop(1, '#7c3aed');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Паттерн (декоративные элементы)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * width,
      Math.random() * height,
      Math.random() * 100 + 50,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }

  // Заголовок
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const titleWrapped = wrapText(ctx, title, width - 100, 80);
  const startY = height / 2 - titleWrapped.totalHeight / 2;

  titleWrapped.lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * 80);
  });

  // Подзаголовок
  if (subtitle) {
    ctx.font = '32px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(subtitle, width / 2, height - 80);
  }

  // Логотип/бренд
  ctx.font = 'bold 36px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Sendogram', width / 2, 60);

  // Сохранение
  const buffer = canvas.toBuffer('image/png');
  const outputPath = join('public/og', filename);
  
  if (!existsSync('public/og')) {
    mkdirSync('public/og', { recursive: true });
  }
  
  writeFileSync(outputPath, buffer);
  console.log(`✅ OG-картинка создана: ${outputPath}`);
}

// Генерация дефолтной картинки и нескольких примеров
function main() {
  console.log('🎨 Генерация OG-картинок...');

  // Дефолтная картинка
  generateOGImage({
    title: 'Sendogram',
    subtitle: 'Блог о Telegram-маркетинге',
    filename: 'default.png',
  });

  // Примеры для будущих постов
  generateOGImage({
    title: 'Анти-бан тайминги в Telegram',
    subtitle: 'Полное руководство',
    filename: 'anti-ban-timings.png',
  });

  generateOGImage({
    title: 'Первая рассылка за 5 минут',
    subtitle: 'Быстрый старт',
    filename: 'first-campaign.png',
  });

  console.log('✨ Все OG-картинки созданы!');
}

main();
