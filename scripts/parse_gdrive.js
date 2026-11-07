const fs = require('fs');
const html = fs.readFileSync('gdrive_raw.html', 'utf8');

// Unescape unicode and hex escapes
const clean = html.replace(/\\x22/g, '"').replace(/\\x5b/g, '[').replace(/\\x5d/g, ']').replace(/\\/g, '');

const regex = /"([a-zA-Z0-9_-]{25,})",\["1iTauph6JTgub_aBSMuceYcTs5qTyRtu0"\],"([^"]+)"/g;
let match;
const files = [];
while ((match = regex.exec(clean)) !== null) {
  files.push({ id: match[1], name: match[2] });
}

console.log('Files found:', files);

// Let's also search for all aria-label="..." in html
const ariaMatches = html.match(/aria-label="([^"]+)"/g);
if (ariaMatches) {
  console.log('Aria labels:', ariaMatches.filter(a => !a.includes('Google') && !a.includes('menu')));
}
