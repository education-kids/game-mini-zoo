const fs = require('fs');

const relsXml = fs.readFileSync('scripts/document.xml.rels', 'utf8');
const docXml = fs.readFileSync('scripts/document.xml', 'utf8');

// Find rId for image2.png and image42.png
const rIdMap = {};
const relRegex = /<Relationship[^>]+Id="([^"]+)"[^>]+Target="media\/([^"]+)"/g;
let m;
while ((m = relRegex.exec(relsXml)) !== null) {
  rIdMap[m[1]] = m[2];
}

console.log('Rels media count:', Object.keys(rIdMap).length);

// For each rId, find surrounding text in docXml
for (const [rId, target] of Object.entries(rIdMap)) {
  if (['image2.png', 'image42.png', 'image14.jpg', 'image18.jpg', 'image32.jpg', 'image39.jpg', 'image41.jpg'].includes(target)) {
    const idx = docXml.indexOf(rId);
    if (idx !== -1) {
      const snippet = docXml.substring(Math.max(0, idx - 500), Math.min(docXml.length, idx + 500))
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      console.log(`\n=== ${target} (${rId}) ===`);
      console.log(snippet);
    }
  }
}
