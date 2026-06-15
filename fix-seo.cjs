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

  // Read as utf8 (might be corrupted if written by powershell as windows-1252/iso-8859-1)
  // Let's read it as binary, then decode correctly or just do string replace
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix PowerShell encoding corruption
  content = content.replace(/prǸserver/g, 'préserver');
  content = content.replace(/PB2I \?"/g, 'PB2I —');
  content = content.replace(/l\?/g, "l'"); // just in case
  content = content.replace(/\?/g, '—');
  content = content.replace(/dǸ/g, 'dé');
  
  // Also try to fix any other common corrupted chars
  content = content.replace(/Ă©/g, 'é');
  content = content.replace(/Ă /g, 'à');

  // Remove twitter tags properly (including leading spaces)
  content = content.replace(/^[ \t]*<meta\s+name="twitter:.*?>\r?\n?/gm, '');
  
  // Remove duplicate og tags if any
  content = content.replace(/^[ \t]*<meta\s+property="og:.*?>\r?\n?/gm, '');

  // Add the SEO tags properly once
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'PB2I - Patrimoine Belfortain de l\'Industrie Informatique';
  
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"\s*\/?>/);
  const description = descMatch ? descMatch[1] : 'Découvrez le patrimoine industriel informatique de Belfort avec PB2I. Collection, histoire, mécanographie, et imprimantes.';
  
  const seoTags = `
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pb2i.fr/" />
  <meta property="og:image" content="https://pb2i.fr/assets/images/logo-pb2i.png" />
  <meta property="og:site_name" content="PB2I" />`;

  // Insert exactly after description
  content = content.replace(/(<meta\s+name="description".*?>)/, `$1\n${seoTags}`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
