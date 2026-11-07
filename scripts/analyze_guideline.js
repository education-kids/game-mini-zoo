const fs = require('fs');
const path = require('path');

const appFile = path.join(__dirname, '..', 'User Guideline', 'src', 'App.tsx');
const content = fs.readFileSync(appFile, 'utf8');

// Match any element content between > and </
const regex = />([^<]+)<\//g;
let match;
const lines = [];
while ((match = regex.exec(content)) !== null) {
  const t = match[1].replace(/\s+/g, ' ').trim();
  if (t.length > 2 && !t.startsWith('const ') && !t.startsWith('export ') && !t.startsWith('return ')) {
    if (!lines.includes(t)) {
      lines.push(t);
    }
  }
}

console.log('Extracted unique text fragments:', lines.length);
fs.writeFileSync(path.join(__dirname, 'guideline_extracted_text.txt'), lines.join('\n'), 'utf8');
console.log('Saved to scripts/guideline_extracted_text.txt');
