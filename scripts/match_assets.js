const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function hashFile(file) {
  const buf = fs.readFileSync(file);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const docxDir = path.join(__dirname, '..', 'assets', 'docx_media');
const slidesDir = path.join(__dirname, '..', 'assets', 'slides');
const minimapsDir = path.join(__dirname, '..', 'assets', 'minimaps');

const docxFiles = fs.readdirSync(docxDir);
const driveFiles = [
  ...fs.readdirSync(slidesDir).filter(f => f.endsWith('.png')).map(f => ({ name: f, path: path.join(slidesDir, f), type: 'slide' })),
  ...fs.readdirSync(minimapsDir).map(f => ({ name: f, path: path.join(minimapsDir, f), type: 'minimap' }))
];

console.log(`Comparing ${docxFiles.length} docx media files with ${driveFiles.length} drive files...`);

const docxMap = new Map();
docxFiles.forEach(f => {
  const fullPath = path.join(docxDir, f);
  const size = fs.statSync(fullPath).size;
  const hash = hashFile(fullPath);
  docxMap.set(f, { name: f, size, hash, matched: false });
});

const driveMap = new Map();
driveFiles.forEach(f => {
  const size = fs.statSync(f.path).size;
  const hash = hashFile(f.path);
  driveMap.set(f.name, { ...f, size, hash, matched: false });
});

// Check exact hash matches
for (const [dfName, df] of driveMap) {
  for (const [docName, doc] of docxMap) {
    if (df.hash === doc.hash) {
      df.matched = docName;
      doc.matched = dfName;
    }
  }
}

console.log('\n--- MATCHED BY EXACT SHA256 HASH ---');
let exactMatches = 0;
for (const [dfName, df] of driveMap) {
  if (df.matched) {
    exactMatches++;
    console.log(`Drive: ${df.name} <===> Docx: ${df.matched}`);
  }
}
console.log(`Exact matches: ${exactMatches} / ${driveFiles.length}`);

console.log('\n--- DRIVE FILES NOT EXACTLY MATCHED BY HASH ---');
for (const [dfName, df] of driveMap) {
  if (!df.matched) {
    console.log(`Unmatched Drive file: ${df.name} (${df.size} bytes)`);
  }
}

console.log('\n--- DOCX MEDIA NOT EXACTLY MATCHED BY HASH ---');
for (const [docName, doc] of docxMap) {
  if (!doc.matched) {
    console.log(`Unmatched Docx media: ${doc.name} (${doc.size} bytes)`);
  }
}
