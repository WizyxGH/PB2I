const fs = require('fs');
let html = fs.readFileSync('association.html', 'utf8');

// The problematic URL
const brokenUrl = 'https://images.unsplash.com/photo-1614315584025-0bdc60fb9db0?w=640&q=70';
const workingUrl = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=640&q=70';

html = html.replace(brokenUrl, workingUrl);

fs.writeFileSync('association.html', html, 'utf8');
console.log('Fixed placeholder URL.');
