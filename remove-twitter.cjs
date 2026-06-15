const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'actualites.html',
  'article.html',
  'association.html',
  'contact.html',
  'mentions-legales.html',
  'nos-missions.html',
  'notre-histoire.html',
  'collections/imprimantes.html',
  'collections/magnetographie.html',
  'collections/mecanographie.html',
  'collections/musee.html'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove twitter tags
  content = content.replace(/<meta\s+name="twitter:.*?">\n?/g, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
