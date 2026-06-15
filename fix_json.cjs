const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'public', 'data');
const frDir = path.join(dataDir, 'fr');
const enDir = path.join(dataDir, 'en');
const deDir = path.join(dataDir, 'de');

function copyFiles(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const files = fs.readdirSync(src);
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isFile()) {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to ${dest}`);
      }
    }
  }
}

copyFiles(frDir, enDir);
copyFiles(frDir, deDir);

// Also copy any missing translations to the existing ui.json or create it
const frUiPath = path.join(frDir, 'ui.json');
const enUiPath = path.join(enDir, 'ui.json');
const deUiPath = path.join(deDir, 'ui.json');

if (fs.existsSync(frUiPath) && !fs.existsSync(enUiPath)) fs.copyFileSync(frUiPath, enUiPath);
if (fs.existsSync(frUiPath) && !fs.existsSync(deUiPath)) fs.copyFileSync(frUiPath, deUiPath);
