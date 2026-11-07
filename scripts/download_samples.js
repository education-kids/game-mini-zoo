const fs = require('fs');
const https = require('https');
const path = require('path');

const sampleFiles = [
  { name: 'cover.png', id: '1uQR3X-4u868Qf1sStB3qyoLiODJLCya5' },
  { name: 'halaman_awal.png', id: '1NWY4x93ti0Zz736kKGTE3nWA0SCO2093' },
  { name: 'pembuka.png', id: '1_8vVAWkW0ITK_AEOxPzp9TxkxUvQTT2z' },
  { name: 'gerbang_karnivora.png', id: '1rFNevXEZmrzG5_AN26rwJVRM1g6LQ3Jg' },
  { name: 'karnivora_1_singa.png', id: '1JgexqEz2Oz1IYvMgVj0113w0q38rSZ6I' },
  { name: 'tamat.png', id: '12-hhMFfMj81VS8osHB0VuoNjOZg9Tnk9' }
];

const destDir = path.join(__dirname, '..', 'gdrive_samples');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function downloadFile(item) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(destDir, item.name);
    const file = fs.createWriteStream(destPath);
    
    function req(url) {
      https.get(url, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          req(res.headers.location);
        } else if (res.statusCode === 200) {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`[DONE] ${item.name} (${fs.statSync(destPath).size} bytes)`);
            resolve();
          });
        } else {
          reject(new Error(`Failed ${item.name}: status ${res.statusCode}`));
        }
      }).on('error', reject);
    }
    
    req(`https://drive.google.com/uc?export=download&id=${item.id}`);
  });
}

(async () => {
  for (const item of sampleFiles) {
    try {
      await downloadFile(item);
    } catch (e) {
      console.error(e);
    }
  }
})();
