const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const screens = [
  { id: 'screen-splash', name: '01_splash' },
  { id: 'screen-instructions', name: '02_instructions' },
  { id: 'screen-main-map', name: '03_main_map' },
  { id: 'screen-kingdom-gate', name: '04_kingdom_gate' },
  { id: 'screen-challenge', name: '05_challenge' },
  { id: 'screen-kingdom-reward', name: '06_reward' },
  { id: 'screen-final-victory', name: '07_victory' }
];

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlPath = path.resolve(__dirname, '..', 'index.html');
const outDir = 'C:\\Users\\TUF\\screens';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// We can create temporary HTML files showing each screen, or inject JS
const originalHtml = fs.readFileSync(htmlPath, 'utf8');

screens.forEach(({ id, name }) => {
  // modify html to activate this screen
  let modified = originalHtml.replace(/class="game-screen screen active"/g, 'class="game-screen screen" style="display:none;"');
  modified = modified.replace(new RegExp(`id="${id}" class="game-screen screen"([^>]*)>`, 'g'), `id="${id}" class="game-screen screen active"$1 style="display:block;">`);
  
  const tempHtmlPath = path.join(outDir, `${name}.html`);
  fs.writeFileSync(tempHtmlPath, modified, 'utf8');
  
  const outPng = path.join(outDir, `${name}.png`);
  try {
    execSync(`"${edgePath}" --headless --screenshot="${outPng}" --window-size=1280,720 "file:///${tempHtmlPath.replace(/\\/g, '/')}"`, { stdio: 'pipe' });
    console.log(`Captured ${name}.png`);
  } catch (err) {
    console.error(`Failed ${name}:`, err.message);
  }
});
