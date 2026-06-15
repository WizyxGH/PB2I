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

  // Extract title
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'PB2I - Patrimoine Belfortain de l\'Industrie Informatique';

  // Extract description if exists
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"\s*\/?>/);
  const description = descMatch ? descMatch[1] : 'Découvrez le patrimoine industriel informatique de Belfort avec PB2I. Collection, histoire, mécanographie, et imprimantes.';

  const seoTags = `
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pb2i.fr/" />
  <meta property="og:image" content="https://pb2i.fr/assets/images/logo-pb2i.png" />
  <meta property="og:site_name" content="PB2I" />`;

  // Clean old tags
  content = content.replace(/^[ \t]*<meta\s+name="description".*?>\r?\n?/gm, '');
  content = content.replace(/^[ \t]*<meta\s+property="og:.*?>\r?\n?/gm, '');
  content = content.replace(/^[ \t]*<meta\s+name="twitter:.*?>\r?\n?/gm, '');

  // Insert exactly after title
  content = content.replace(/(<title>.*?<\/title>)/, `$1\n${seoTags}`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
