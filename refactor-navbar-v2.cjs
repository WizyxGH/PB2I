const fs = require('fs');

let content = fs.readFileSync('src/components/navbar.js', 'utf8');

// 1. Add import
if (!content.includes("import { t } from '../utils/i18n.js'")) {
  content = content.replace(/import { getActiveLang, saveLang } from '\.\.\/utils\/lang\.js'/, `import { getActiveLang, saveLang } from '../utils/lang.js'\nimport { t } from '../utils/i18n.js'`);
}

// 2. Replace links array
const targetLinks = `  const links = [
    { label: 'Notre histoire', href: \`\${BASE_URL}notre-histoire.html\`, key: 'histoire' },
    { label: 'Nos missions',   href: \`\${BASE_URL}nos-missions.html\`,   key: 'missions'  },
    { label: "L'association",  href: \`\${BASE_URL}association.html\`,    key: 'association' },
    { label: 'Actualités',     href: \`\${BASE_URL}actualites.html\`,     key: 'actualites' },
    { label: 'Contact',        href: \`\${BASE_URL}contact.html\`,        key: 'contact'    },
  ]`;

const replLinks = `  const links = [
    { label: t('navbar.histoire'), href: \`\${BASE_URL}notre-histoire.html\`, key: 'histoire' },
    { label: t('navbar.missions'),   href: \`\${BASE_URL}nos-missions.html\`,   key: 'missions'  },
    { label: t('navbar.association'),  href: \`\${BASE_URL}association.html\`,    key: 'association' },
    { label: t('navbar.actualites'),     href: \`\${BASE_URL}actualites.html\`,     key: 'actualites' },
    { label: t('navbar.contact'),        href: \`\${BASE_URL}contact.html\`,        key: 'contact'    },
  ]`;

content = content.replace(targetLinks, replLinks);

// 3. Replace collectionLinks array
const targetColLinks = `  const collectionLinks = [
    { label: 'Mécanographie',  href: \`\${BASE_URL}collections/mecanographie.html\` },
    { label: 'Imprimantes',    href: \`\${BASE_URL}collections/imprimantes.html\`    },
    { label: 'Magnétographie', href: \`\${BASE_URL}collections/magnetographie.html\` },
    { label: 'Musée',          href: \`\${BASE_URL}collections/musee.html\`          },
  ]`;

const replColLinks = `  const collectionLinks = [
    { label: t('navbar.mecanographie'),  href: \`\${BASE_URL}collections/mecanographie.html\` },
    { label: t('navbar.imprimantes'),    href: \`\${BASE_URL}collections/imprimantes.html\`    },
    { label: t('navbar.magnetographie'), href: \`\${BASE_URL}collections/magnetographie.html\` },
    { label: t('navbar.musee'),          href: \`\${BASE_URL}collections/musee.html\`          },
  ]`;

content = content.replace(targetColLinks, replColLinks);

// 4. Replace 'Nos collections'
content = content.replace(/>\s*Nos collections\s*<svg/g, `>\n          \${t('navbar.collections')}\n          <svg`);
content = content.replace(/>Nos collections<\/span>/g, `>\${t('navbar.collections')}</span>`);

// 5. Replace setLanguage with location.reload()
content = content.replace(/window\.i18n\?\.setLanguage\(btn\.dataset\.lang, window\.PB2I_PAGE\)/g, `window.location.reload()`);

fs.writeFileSync('src/components/navbar.js', content, 'utf8');
console.log('navbar.js refactored correctly.');
