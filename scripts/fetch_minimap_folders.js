const fs = require('fs');
const https = require('https');

const minimaps = [
  { name: 'karnivora_minimap', id: '1CjtTghB9QzZbOwFC_mcSd_7HRTWcp0Ry' },
  { name: 'herbivora_minimap', id: '1-vgWqNgSA-Hi73Amj5Qh5M2TdYpgzflL' },
  { name: 'omnivora_minimap', id: '1kRJWIUtXjLlS-_h4gaCfZmKzMxiHId0f' }
];

function fetchFolder(folder) {
  return new Promise((resolve, reject) => {
    https.get(`https://drive.google.com/drive/folders/${folder.id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const clean = data.replace(/\\x22/g, '"').replace(/\\x5b/g, '[').replace(/\\x5d/g, ']').replace(/\\/g, '');
        const regex = new RegExp(`"([a-zA-Z0-9_-]{25,})",\\["${folder.id}"\\],"([^"]+)"`, 'g');
        let match;
        const items = [];
        while ((match = regex.exec(clean)) !== null) {
          items.push({ id: match[1], name: match[2], folder: folder.name });
        }
        resolve({ folder: folder.name, id: folder.id, items });
      });
    }).on('error', reject);
  });
}

Promise.all(minimaps.map(fetchFolder)).then(results => {
  console.log(JSON.stringify(results, null, 2));
  fs.writeFileSync('gdrive_minimap_items.json', JSON.stringify(results, null, 2));
}).catch(console.error);
