const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has initI18n
  if (content.includes('initI18n')) return;

  // Add import
  // Find the last import
  const lastImportIndex = content.lastIndexOf('import ');
  if (lastImportIndex !== -1) {
    const endOfImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfImport + 1) + `import { initI18n, translateDOM } from '../utils/i18n.js'\n` + content.slice(endOfImport + 1);
  } else {
    content = `import { initI18n, translateDOM } from '../utils/i18n.js'\n` + content;
  }

  // Replace mountComponents(...)
  content = content.replace(/mountComponents\((.*?)\)/g, `await initI18n()\n  mountComponents($1)\n  translateDOM()`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Refactored ${file}`);
});
