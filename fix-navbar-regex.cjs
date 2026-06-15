const fs = require('fs');
let content = fs.readFileSync('src/components/navbar.js', 'utf8');

const newLinks = `const links = [
    { label: t('navbar.histoire'), href: \`\${BASE_URL}notre-histoire.html\`, key: 'histoire' },
    { label: t('navbar.missions'),   href: \`\${BASE_URL}nos-missions.html\`,   key: 'missions'  },
    { label: t('navbar.association'),  href: \`\${BASE_URL}association.html\`,    key: 'association' },
    { label: t('navbar.actualites'),     href: \`\${BASE_URL}actualites.html\`,     key: 'actualites' },
    { label: t('navbar.contact'),        href: \`\${BASE_URL}contact.html\`,        key: 'contact'    },
  ]`;

const newColLinks = `const collectionLinks = [
    { label: t('navbar.mecanographie'),  href: \`\${BASE_URL}collections/mecanographie.html\` },
    { label: t('navbar.imprimantes'),    href: \`\${BASE_URL}collections/imprimantes.html\`    },
    { label: t('navbar.magnetographie'), href: \`\${BASE_URL}collections/magnetographie.html\` },
    { label: t('navbar.musee'),          href: \`\${BASE_URL}collections/musee.html\`          },
  ]`;

content = content.replace(/const links = \[\s*\{[\s\S]*?\]/, newLinks);
content = content.replace(/const collectionLinks = \[\s*\{[\s\S]*?\]/, newColLinks);

fs.writeFileSync('src/components/navbar.js', content, 'utf8');
console.log('Fixed navbar links.');
