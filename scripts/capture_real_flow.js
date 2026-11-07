const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const rootDir = path.resolve(__dirname, '..');
const outDir = 'C:\\Users\\TUF\\real_screens';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const screens = [
  'screen-splash',
  'screen-instructions',
  'screen-main-map',
  'screen-kingdom-gate',
  'screen-challenge',
  'screen-kingdom-reward',
  'screen-final-victory'
];

screens.forEach((targetScreen, idx) => {
  const outPng = path.join(outDir, `screen_${idx}_${targetScreen}.png`);
  const url = `file:///${path.join(rootDir, 'index.html').replace(/\\/g, '/')}#${targetScreen}`;
  try {
    execSync(`"${edgePath}" --headless --screenshot="${outPng}" --window-size=1280,720 --virtual-time-budget=1500 "${url}"`, { stdio: 'pipe' });
    console.log(`Captured ${outPng}`);
  } catch (e) {
    console.error(e.message);
  }
});
