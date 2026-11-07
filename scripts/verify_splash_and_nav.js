const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const rootDir = path.resolve(__dirname, '..');
const brainDir = 'C:\\Users\\TUF\\.gemini\\antigravity\\brain\\20b84d47-09db-4cdd-b38e-46ba02d50737';

function captureSplashWithSession() {
  const testHtmlPath = path.join(rootDir, `test_splash_resume.html`);
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

  const injection = `
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      // Simulate saved game progress
      const savedState = {
        currentKingdomIndex: 0,
        currentLevelIndex: 1,
        unlockedKingdoms: [0],
        collectedCrystals: [],
        completedLevels: ['karnivora_1'],
        highScores: {},
        isMuted: false
      };
      localStorage.setItem('mini_zoo_progress_v2', JSON.stringify(savedState));
      
      setTimeout(() => {
        const engine = window.gameEngine;
        const router = window.navigationRouter;
        if (engine) engine.loadProgress();
        if (router) router.navigateTo('screen-splash');
      }, 300);
    });
  </script>
  `;

  fs.writeFileSync(testHtmlPath, indexHtml.replace('</body>', `${injection}</body>`));
  const outPng = path.join(brainDir, `verified_splash_resume_clean.png`);
  try {
    execSync(`"${edgePath}" --headless --screenshot="${outPng}" --window-size=1280,720 --virtual-time-budget=2000 "file:///${testHtmlPath.replace(/\\/g, '/')}"`, { stdio: 'pipe' });
    console.log(`Captured verified_splash_resume_clean.png`);
  } catch (e) {
    console.error(`Failed splash resume:`, e.message);
  } finally {
    if (fs.existsSync(testHtmlPath)) fs.unlinkSync(testHtmlPath);
  }
}

function captureSplashInitial() {
  const testHtmlPath = path.join(rootDir, `test_splash_initial.html`);
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

  const injection = `
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      localStorage.removeItem('mini_zoo_progress_v2');
      setTimeout(() => {
        const router = window.navigationRouter;
        if (router) router.navigateTo('screen-splash');
      }, 300);
    });
  </script>
  `;

  fs.writeFileSync(testHtmlPath, indexHtml.replace('</body>', `${injection}</body>`));
  const outPng = path.join(brainDir, `verified_splash_initial.png`);
  try {
    execSync(`"${edgePath}" --headless --screenshot="${outPng}" --window-size=1280,720 --virtual-time-budget=2000 "file:///${testHtmlPath.replace(/\\/g, '/')}"`, { stdio: 'pipe' });
    console.log(`Captured verified_splash_initial.png`);
  } catch (e) {
    console.error(`Failed splash initial:`, e.message);
  } finally {
    if (fs.existsSync(testHtmlPath)) fs.unlinkSync(testHtmlPath);
  }
}

captureSplashWithSession();
captureSplashInitial();
