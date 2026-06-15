const fs = require('fs');
let html = fs.readFileSync('collections/mecanographie.html', 'utf8');

// For each video card, extract the caption div and put it outside
const videoCardRegex = /(<div class="card-video group"[\s\S]*?)<div class="card-video-caption.*?<p.*?>(.*?)<\/p>\s*<\/div>\s*(<\/div>)/g;

html = html.replace(videoCardRegex, (match, before, text, after) => {
  return `${before}${after}\n        <p class="text-sm font-medium mt-3" style="color:var(--color-text)">${text}</p>`;
});

fs.writeFileSync('collections/mecanographie.html', html, 'utf8');
console.log('Fixed video captions');
