const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.js'));

for (const page of pages) {
  const filePath = path.join(pagesDir, page);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has initI18n
  if (!content.includes('initI18n')) {
    // Add import
    content = content.replace(
      "import { mountComponents",
      "import { initI18n, translateDOM } from '../utils/i18n.js'\nimport { mountComponents"
    );

    // Replace mountComponents(...) with await initI18n(); mountComponents(...); translateDOM();
    content = content.replace(
      /(mountComponents\([^)]*\);?)/,
      "await initI18n()\n  $1\n  translateDOM()"
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${page}`);
  }
}

// Fix issue 1: copy articles.json
const dataDir = path.join(__dirname, 'public', 'data');
const frArticles = path.join(dataDir, 'fr', 'articles.json');
const enArticles = path.join(dataDir, 'en', 'articles.json');
const deArticles = path.join(dataDir, 'de', 'articles.json');

if (fs.existsSync(frArticles)) {
  fs.copyFileSync(frArticles, enArticles);
  fs.copyFileSync(frArticles, deArticles);
  console.log('Copied articles.json to en/ and de/');
}

