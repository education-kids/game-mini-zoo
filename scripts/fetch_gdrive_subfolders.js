const fs = require('fs');
const https = require('https');

const subfolders = [
  { name: 'karnivora', id: '1JEN_hu0AGtsQjxculgPeaFOHoDx3pDXp' },
  { name: 'herbivora', id: '1qQjO4l4yYVrgaAGrqZYfcVtio_-CR0PW' },
  { name: 'omnivora', id: '1bCq4B4ZnbrOLgXJVRAeGnchI4AbH_2Uf' }
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

Promise.all(subfolders.map(fetchFolder)).then(results => {
  console.log(JSON.stringify(results, null, 2));
  fs.writeFileSync('gdrive_all_items.json', JSON.stringify(results, null, 2));
}).catch(console.error);
