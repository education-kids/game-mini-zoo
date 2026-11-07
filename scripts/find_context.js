const fs = require('fs');
const docXml = fs.readFileSync('scripts/document.xml', 'utf8');

function getContext(rId) {
  const needle = '"' + rId + '"';
  const pos = docXml.indexOf(needle);
  if (pos === -1) return 'NOT FOUND';
  let start = Math.max(0, pos - 2000);
  let end = Math.min(docXml.length, pos + 2000);
  const chunk = docXml.slice(start, end);
  const textMatches = chunk.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
  return textMatches.map(m => m.replace(/<[^>]+>/g, '')).join(' | ');
}

['rId6', 'rId12', 'rId38', 'rId39', 'rId40', 'rId41', 'rId42'].forEach(id => {
  console.log('=== ' + id + ' ===');
  console.log(getContext(id));
});
