const fs = require('fs');
const path = require('path');

// --- index.html ---
let idx = fs.readFileSync('index.html', 'utf8');
idx = idx.replace(
  /<div class="relative overflow-hidden w-full h-\[320px\] lg:h-\[500px\]">/,
  `<div class="relative overflow-hidden w-full h-[320px] lg:h-[500px]" style="-webkit-mask-image: url('./assets/figma/spacing-mask.svg'); -webkit-mask-size: 100% 100%; mask-image: url('./assets/figma/spacing-mask.svg'); mask-size: 100% 100%;">`
);
// Remove the img tag for the mask if it's there
idx = idx.replace(/<img src="\/assets\/figma\/spacing-mask\.svg".*?>\s*/, '');
fs.writeFileSync('index.html', idx, 'utf8');
console.log('Fixed index.html mask');

// --- association.html ---
let assoc = fs.readFileSync('association.html', 'utf8');
// Fix unsplash image
assoc = assoc.replace('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Punch_card_reader_IBM.jpg/640px-Punch_card_reader_IBM.jpg', 'https://images.unsplash.com/photo-1614315584025-0bdc60fb9db0?w=640&q=70');

// Extract photos section
const photosMatch = assoc.match(/<!-- Photos -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
if (photosMatch) {
  assoc = assoc.replace(photosMatch[0], '');
  // Insert at the bottom, before </main>
  assoc = assoc.replace('</main>', `\n${photosMatch[0]}\n\n</main>`);
}
fs.writeFileSync('association.html', assoc, 'utf8');
console.log('Fixed association.html photos position');
