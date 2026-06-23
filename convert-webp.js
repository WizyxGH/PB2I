import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public', 'assets');
const srcDir = path.join(__dirname, 'src');

const imageExtensions = ['.jpg', '.png', '.jpeg'];
const textExtensions = ['.html', '.js', '.json', '.css'];

const filesToUpdate = [];

function walk(dir, extFilter, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, extFilter, callback);
    } else {
      if (!extFilter || extFilter.includes(path.extname(fullPath).toLowerCase())) {
        callback(fullPath);
      }
    }
  }
}

walk(__dirname, textExtensions, (filePath) => {
  if (!filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('dist')) {
    filesToUpdate.push(filePath);
  }
});

const conversions = [];

async function processImages() {
  const images = [];
  walk(publicDir, imageExtensions, (img) => images.push(img));
  walk(srcDir, imageExtensions, (img) => images.push(img));

  for (const img of images) {
    const ext = path.extname(img);
    if (img.endsWith('og-image.webp')) continue;
    
    const webpPath = img.slice(0, -ext.length) + '.webp';
    const oldName = path.basename(img);
    const newName = path.basename(webpPath);
    
    console.log(`Converting ${img} to ${webpPath}`);
    await sharp(img).webp({ quality: 80 }).toFile(webpPath);
    fs.unlinkSync(img);
    
    // Escape regex characters in filename
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    conversions.push({ 
        oldName: escapeRegExp(oldName), 
        newName,
        oldNameURI: escapeRegExp(encodeURIComponent(oldName)),
        newNameURI: encodeURIComponent(newName)
    });
  }

  for (const filePath of filesToUpdate) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    for (const conv of conversions) {
      const regex = new RegExp(`([/'"])${conv.oldName}`, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, `$1${conv.newName}`);
        changed = true;
      }
      
      const regexURI = new RegExp(`([/'"])${conv.oldNameURI}`, 'g');
      if (regexURI.test(content)) {
        content = content.replace(regexURI, `$1${conv.newNameURI}`);
        changed = true;
      }
      
      // Handle the case where spaces are just URL encoded as %20
      const oldNameSpaceEncoded = conv.oldName.replace(/ /g, '%20');
      if (oldNameSpaceEncoded !== conv.oldName) {
        const regexSpaceURI = new RegExp(`([/'"])${oldNameSpaceEncoded}`, 'g');
        if (regexSpaceURI.test(content)) {
          content = content.replace(regexSpaceURI, `$1${conv.newName.replace(/ /g, '%20')}`);
          changed = true;
        }
      }
    }
    
    if (changed) {
      console.log(`Updated references in ${filePath}`);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

processImages().then(() => console.log('Done')).catch(console.error);
