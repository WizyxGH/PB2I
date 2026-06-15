const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Center all card-polaroid-caption in the carousel
html = html.replace(/<p class="card-polaroid-caption font-semibold mt-2">/g, '<p class="card-polaroid-caption font-semibold mt-2 text-center">');

// Fix the Musee card
html = html.replace(/class="card-carousel-item bg-red block"/g, 'class="card-carousel-item bg-beige block"');
html = html.replace(/<p class="card-polaroid-caption font-semibold mt-2 text-white">Le Mus(é|Ǹ)e PB2I<\/p>/g, '<p class="card-polaroid-caption font-semibold mt-2 text-center">Le Musée PB2I</p>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed index.html carousel');
