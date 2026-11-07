const fs = require('fs');
const relsXml = fs.readFileSync('scripts/document.xml.rels', 'utf8');
const docXml = fs.readFileSync('scripts/document.xml', 'utf8');

const rIdMap = {};
const relRegex = /<Relationship[^>]+Id="([^"]+)"[^>]+Target="media\/([^"]+)"/g;
let m;
while ((m = relRegex.exec(relsXml)) !== null) {
  rIdMap[m[1]] = m[2];
}

// Find each image occurrence and its nearest previous heading
const imgRegex = /r:embed="([^"]+)"/g;
let match;
while ((match = imgRegex.exec(docXml)) !== null) {
  const rId = match[1];
  const target = rIdMap[rId] || rId;
  const pos = match.index;
  // Get text before pos
  const before = docXml.substring(Math.max(0, pos - 1500), pos);
  const headings = before.match(/<w:t[^>]*>([A-Z0-9\.\s\-]{3,40})<\/w:t>/g) || [];
  const lastHeading = headings.map(h => h.replace(/<[^>]+>/g, '')).join(' >> ');
  console.log(`${target} (at ${pos}) -> ${lastHeading}`);
}
