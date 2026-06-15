const fs = require('fs');

let content = fs.readFileSync('src/components/navbar.js', 'utf8');

// 1. Add import
content = content.replace(/import { getActiveLang, saveLang } from '\.\.\/utils\/lang\.js'/, `import { getActiveLang, saveLang } from '../utils/lang.js'\nimport { t } from '../utils/i18n.js'`);

// 2. Replace the hardcoded lists
const targetLists = `  const links = [
    { label: 'Notre histoire', href: \`\${BASE_URL}notre-histoire.html\`, key: 'histoire' },
    { label: 'Nos missions',   href: \`\${BASE_URL}nos-missions.html\`,   key: 'missions'  },
    { label: "L'association",  href: \`\${BASE_URL}association.html\`,    key: 'association' },
    { label: 'Actualités',     href: \`\${BASE_URL}actualites.html\`,     key: 'actualites' },
    { label: 'Contact',        href: \`\${BASE_URL}contact.html\`,        key: 'contact'    },
  ]

  const collectionLinks = [
    { label: 'Mécanographie',  href: \`\${BASE_URL}collections/mecanographie.html\`, key: 'mecanographie' },
    { label: 'Imprimantes',    href: \`\${BASE_URL}collections/imprimantes.html\`,    key: 'imprimantes' },
    { label: 'Magnétographie', href: \`\${BASE_URL}collections/magnetographie.html\`, key: 'magnetographie' },
    { label: 'Musée',          href: \`\${BASE_URL}collections/musee.html\`,          key: 'musee' },
  ]`;

const replacementLists = `  const links = [
    { label: t('navbar.histoire'),    href: \`\${BASE_URL}notre-histoire.html\`, key: 'histoire' },
    { label: t('navbar.missions'),    href: \`\${BASE_URL}nos-missions.html\`,   key: 'missions'  },
    { label: t('navbar.association'), href: \`\${BASE_URL}association.html\`,    key: 'association' },
    { label: t('navbar.actualites'),  href: \`\${BASE_URL}actualites.html\`,     key: 'actualites' },
    { label: t('navbar.contact'),     href: \`\${BASE_URL}contact.html\`,        key: 'contact'    },
  ]

  const collectionLinks = [
    { label: t('navbar.mecanographie'),  href: \`\${BASE_URL}collections/mecanographie.html\`, key: 'mecanographie' },
    { label: t('navbar.imprimantes'),    href: \`\${BASE_URL}collections/imprimantes.html\`,    key: 'imprimantes' },
    { label: t('navbar.magnetographie'), href: \`\${BASE_URL}collections/magnetographie.html\`, key: 'magnetographie' },
    { label: t('navbar.musee'),          href: \`\${BASE_URL}collections/musee.html\`,          key: 'musee' },
  ]`;

content = content.replace(targetLists, replacementLists);

// 3. Replace 'Nos collections'
content = content.replace(/>\s*Nos collections\s*<svg/g, `>\n          \${t('navbar.collections')}\n          <svg`);
content = content.replace(/>Nos collections<\/span>/g, `>\${t('navbar.collections')}</span>`);

// 4. Update interactions to reload instead of doing window.i18n.setLanguage if not defined
const targetEvent = `    btn.addEventListener('click', () => {
      closeLangMenu()
      saveLang(btn.dataset.lang)
      setActiveLang(btn.dataset.lang)
      window.i18n?.setLanguage(btn.dataset.lang, window.PB2I_PAGE)
    })`;

const replEvent = `    btn.addEventListener('click', () => {
      closeLangMenu()
      saveLang(btn.dataset.lang)
      setActiveLang(btn.dataset.lang)
      window.location.reload()
    })`;

content = content.replace(targetEvent, replEvent);

const targetEvent2 = `    btn.addEventListener('click', () => {
      saveLang(btn.dataset.lang)
      setActiveLang(btn.dataset.lang)
      window.i18n?.setLanguage(btn.dataset.lang, window.PB2I_PAGE)
    })`;

const replEvent2 = `    btn.addEventListener('click', () => {
      saveLang(btn.dataset.lang)
      setActiveLang(btn.dataset.lang)
      window.location.reload()
    })`;

content = content.replace(targetEvent2, replEvent2);

fs.writeFileSync('src/components/navbar.js', content, 'utf8');
console.log('navbar.js refactored successfully.');
