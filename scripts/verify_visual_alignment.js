const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const rootDir = path.resolve(__dirname, '..');
const brainDir = 'C:\\Users\\TUF\\.gemini\\antigravity\\brain\\20b84d47-09db-4cdd-b38e-46ba02d50737';

// Create a small test HTML harness that loads index.html and selects a level + option
function captureLevel(animalId, optionKey, outName) {
  const testHtmlPath = path.join(rootDir, `test_align_${animalId}.html`);
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  
  // Inject script at end to set kingdom, level, and select option
  const injection = `
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const engine = window.gameEngine;
        const quiz = window.quizController;
        const router = window.navigationRouter;
        
        // Find animal level index
        const lvlIdx = engine.gameData.levels.findIndex(l => l.id === '${animalId}');
        if (lvlIdx >= 0) {
          const lvl = engine.gameData.levels[lvlIdx];
          const kIdx = engine.gameData.kingdoms.findIndex(k => k.id === lvl.kingdomId);
          engine.currentKingdomIndex = kIdx;
          engine.currentLevelIndex = lvl.kingdomLevel - 1;
          router.navigateTo('screen-challenge');
          
          // Select option
          setTimeout(() => {
            const optBtn = document.querySelector('[data-option-key="${optionKey}"]');
            if (optBtn) {
              optBtn.classList.add('selected', 'active');
            }
          }, 300);
        }
      }, 500);
    });
  </script>
  `;
  
  fs.writeFileSync(testHtmlPath, indexHtml.replace('</body>', `${injection}</body>`));
  
  const outPng = path.join(brainDir, `${outName}.png`);
  try {
    execSync(`"${edgePath}" --headless --screenshot="${outPng}" --window-size=1280,720 --virtual-time-budget=2000 "file:///${testHtmlPath.replace(/\\/g, '/')}"`, { stdio: 'pipe' });
    console.log(`Captured ${outName}.png`);
  } catch (e) {
    console.error(`Failed to capture ${outName}:`, e.message);
  } finally {
    if (fs.existsSync(testHtmlPath)) fs.unlinkSync(testHtmlPath);
  }
}

captureLevel('harimau', 'B', 'verified_harimau_align');
captureLevel('babi', 'B', 'verified_babi_align');
