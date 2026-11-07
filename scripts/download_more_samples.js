const fs = require('fs');
const https = require('https');
const path = require('path');

const sampleFiles = [
  { name: 'pre_ending.png', id: '1eFi-8QpFBWxOAKRNjdcjKUNWNAJ1bBFB' },
  { name: 'ending_karnivora.png', id: '1KkwWQEywyA5PE_Gsf1JTR2hMp5xYGRac' },
  { name: 'gerbang_herbivora.png', id: '1xKaoG8cXY_wPepktJzbOgPvF9SD8L1oB' },
  { name: 'gerbang_omnivora.png', id: '1Z9uejn7odaCqYSHJnr3l7gxnu8LhTTNh' }
];

const destDir = path.join(__dirname, '..', 'gdrive_samples');

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
