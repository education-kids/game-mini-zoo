const fs = require('fs');
const https = require('https');
const path = require('path');

const allGameSlides = [
  // Root
  { key: 'cover', id: '1uQR3X-4u868Qf1sStB3qyoLiODJLCya5', name: 'cover.png' },
  { key: 'pembuka', id: '1_8vVAWkW0ITK_AEOxPzp9TxkxUvQTT2z', name: 'pembuka.png' },
  { key: 'main_map', id: '1NWY4x93ti0Zz736kKGTE3nWA0SCO2093', name: 'main_map.png' },
  { key: 'pre_ending', id: '1eFi-8QpFBWxOAKRNjdcjKUNWNAJ1bBFB', name: 'pre_ending.png' },
  { key: 'tamat', id: '12-hhMFfMj81VS8osHB0VuoNjOZg9Tnk9', name: 'tamat.png' },

  // Karnivora
  { key: 'karnivora_gate', id: '1rFNevXEZmrzG5_AN26rwJVRM1g6LQ3Jg', name: 'karnivora_gate.png' },
  { key: 'karnivora_1', id: '1JgexqEz2Oz1IYvMgVj0113w0q38rSZ6I', name: 'karnivora_1.png' },
  { key: 'karnivora_2', id: '1S9LzIC048MaHlBPmjojeXAJnWUYR5dLJ', name: 'karnivora_2.png' },
  { key: 'karnivora_3', id: '1bfqAjHkQk2pITxY7uFl8xr3Ue7_dhNtg', name: 'karnivora_3.png' },
  { key: 'karnivora_4', id: '1wORBbVYazFUzGP_exkd9UNt4CO3gBs4_', name: 'karnivora_4.png' },
  { key: 'karnivora_5', id: '1TRAiMbgoUFcqC7dUQCurq-cAMSLlY0dE', name: 'karnivora_5.png' },
  { key: 'karnivora_ending', id: '1KkwWQEywyA5PE_Gsf1JTR2hMp5xYGRac', name: 'karnivora_ending.png' },

  // Herbivora
  { key: 'herbivora_gate', id: '1xKaoG8cXY_wPepktJzbOgPvF9SD8L1oB', name: 'herbivora_gate.png' },
  { key: 'herbivora_1', id: '1baXRRIe75s8mopDESyJ-Tr4LX6PdwsQd', name: 'herbivora_1.png' },
  { key: 'herbivora_2', id: '1YhDYlAVYW99hMZwrHGi7WSGVDALJE2gR', name: 'herbivora_2.png' },
  { key: 'herbivora_3', id: '12IdXBrtkCauKIE0YDqGD3DP32yD2RUpl', name: 'herbivora_3.png' },
  { key: 'herbivora_4', id: '1wVvzVBVFZvuL-XoqvQSXWzttHM-e4GFA', name: 'herbivora_4.png' },
  { key: 'herbivora_5', id: '1_Rxdy4Fx7n5MqLq53VeQT3kCF2RsiRMg', name: 'herbivora_5.png' },
  { key: 'herbivora_ending', id: '1r7JnSDTIB3VchscD7yQLtukKCtnci1yL', name: 'herbivora_ending.png' },

  // Omnivora
  { key: 'omnivora_gate', id: '1Z9uejn7odaCqYSHJnr3l7gxnu8LhTTNh', name: 'omnivora_gate.png' },
  { key: 'omnivora_1', id: '1f1nMAEPzUu5SxpmF_0S8ti2tWYafOomk', name: 'omnivora_1.png' },
  { key: 'omnivora_2', id: '1HRG2knexRy8rnZJWEe9eUDrTugD5zSLI', name: 'omnivora_2.png' },
  { key: 'omnivora_3', id: '1CXq1pWCa9G2VHfPUsswkK1uZnuf_E7hw', name: 'omnivora_3.png' },
  { key: 'omnivora_4', id: '1qZ2lDyjuZPlgckNUc9oyfZ3sWAS88N3L', name: 'omnivora_4.png' },
  { key: 'omnivora_5', id: '1ml4pq31x0y7Us6wPfvhRL0Xxxe_zaJVw', name: 'omnivora_5.png' },
  { key: 'omnivora_ending', id: '1SAhSvhjrRpYCLdZAYYtbTFGjk7U-F3Yd', name: 'omnivora_ending.png' }
];

const destDir = path.join(__dirname, '..', 'assets', 'slides');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function downloadFile(item) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(destDir, item.name);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100000) {
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
  console.log(`Starting download of ${allGameSlides.length} slides to ${destDir}...`);
  for (let i = 0; i < allGameSlides.length; i++) {
    const item = allGameSlides[i];
    try {
      console.log(`[${i+1}/${allGameSlides.length}] Downloading ${item.name}...`);
      await downloadFile(item);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
  console.log('All slides downloaded successfully!');
})();
