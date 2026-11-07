const fs = require('fs');
const https = require('https');
const path = require('path');

const minimapData = JSON.parse(fs.readFileSync('gdrive_minimap_items.json', 'utf8'));
const destDir = path.join(__dirname, '..', 'assets', 'minimaps');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const allMinimapFiles = [];
minimapData.forEach(folder => {
  folder.items.forEach(item => {
    // e.g. karnivora_minimap_1.png
    const prefix = folder.folder;
    const ext = path.extname(item.name);
    const base = path.basename(item.name, ext);
    const filename = `${prefix}_${base}${ext}`;
    allMinimapFiles.push({
      id: item.id,
      name: filename,
      originalName: item.name,
      folder: folder.folder
    });
  });
});

console.log(`Found ${allMinimapFiles.length} minimap files to download:`);
allMinimapFiles.forEach(f => console.log(' -', f.name, f.id));

function downloadFile(item) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(destDir, item.name);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`[CACHED] ${item.name} (${fs.statSync(destPath).size} bytes)`);
      return resolve();
    }
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
  for (let i = 0; i < allMinimapFiles.length; i++) {
    const item = allMinimapFiles[i];
    try {
      console.log(`[${i+1}/${allMinimapFiles.length}] Downloading ${item.name}...`);
      await downloadFile(item);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
  console.log('All minimap files downloaded successfully!');
})();
