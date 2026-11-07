const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const rootDir = path.resolve(__dirname, '..');
const brainDir = 'C:\\Users\\TUF\\.gemini\\antigravity\\brain\\20b84d47-09db-4cdd-b38e-46ba02d50737';

function captureState() {
  const testHtmlPath = path.join(rootDir, `test_kelinci_after_retry.html`);
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  
  const injection = `
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const engine = window.gameEngine;
        const router = window.navigationRouter;
        
        // Go to Kelinci (Herbivora 2)
        engine.currentKingdomIndex = 1;
        engine.currentLevelIndex = 1;
        router.navigateTo('screen-challenge');
        
        // Tap wrong answer B (Kambing)
        setTimeout(() => {
          const optBtn = document.querySelector('[data-option-key="B"]');
          if (optBtn) optBtn.click();
          
          // Then click "Coba Lagi"
          setTimeout(() => {
            const btnRetry = document.getElementById('btn-feedback-retry');
            if (btnRetry) btnRetry.click();
          }, 300);
        }, 300);
      }, 500);
    });
  </script>
  `;
  
  fs.writeFileSync(testHtmlPath, indexHtml.replace('</body>', `${injection}</body>`));
  const outPng = path.join(brainDir, `verified_kelinci_after_retry.png`);
  try {
    execSync(`"${edgePath}" --headless --screenshot="${outPng}" --window-size=1280,720 --virtual-time-budget=2000 "file:///${testHtmlPath.replace(/\\/g, '/')}"`, { stdio: 'pipe' });
    console.log(`Captured verified_kelinci_after_retry.png`);
  } catch (e) {
    console.error(`Failed:`, e.message);
  } finally {
    if (fs.existsSync(testHtmlPath)) fs.unlinkSync(testHtmlPath);
  }
}

captureState();
