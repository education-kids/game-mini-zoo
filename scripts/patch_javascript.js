const fs = require('fs');

const path = 'src/JavaScript.html';
let js = fs.readFileSync(path, 'utf8');

// 1. Update VictoryController showFinalVictory and add handleVictoryContinue
const oldVictoryMethod = `    showFinalVictory() {
      if (this.sfx) this.sfx.play('fanfare');

      if (typeof document === 'undefined' || !this.engine) return;

      const victoryScreen = document.getElementById('screen-final-victory');
      if (victoryScreen) {
        victoryScreen.style.backgroundImage = \`url('assets/slides/tamat.jpg')\`;
      }`;

const newVictoryMethod = `    showFinalVictory() {
      if (this.sfx) this.sfx.play('fanfare');

      if (typeof document === 'undefined' || !this.engine) return;

      const victoryScreen = document.getElementById('screen-final-victory');
      const btnVictoryContinue = document.getElementById('btn-victory-continue');
      const btnPlayAgain = document.getElementById('btn-play-again');
      const btnFinishGame = document.getElementById('btn-finish-game');

      // Stage 1: Pre-ending authentic narrative slide
      if (victoryScreen) {
        victoryScreen.style.backgroundImage = "url('assets/slides/pre_ending.jpg')";
      }
      if (btnVictoryContinue) {
        btnVictoryContinue.style.display = 'inline-block';
      }
      if (btnPlayAgain) btnPlayAgain.style.display = 'none';
      if (btnFinishGame) btnFinishGame.style.display = 'none';`;

js = js.replace(oldVictoryMethod, newVictoryMethod);

// Add handleVictoryContinue before handlePlayAgain
js = js.replace(
  '    handlePlayAgain() {',
  `    handleVictoryContinue() {
      if (this.sfx) this.sfx.play('fanfare');
      if (typeof document === 'undefined') return;

      const victoryScreen = document.getElementById('screen-final-victory');
      const btnVictoryContinue = document.getElementById('btn-victory-continue');
      const btnPlayAgain = document.getElementById('btn-play-again');
      const btnFinishGame = document.getElementById('btn-finish-game');

      // Stage 2: Tamat authentic celebration slide
      if (victoryScreen) {
        victoryScreen.style.backgroundImage = "url('assets/slides/tamat.jpg')";
      }
      if (btnVictoryContinue) btnVictoryContinue.style.display = 'none';
      if (btnPlayAgain) btnPlayAgain.style.display = 'inline-block';
      if (btnFinishGame) btnFinishGame.style.display = 'inline-block';

      this._spawnConfetti();
    }

    handlePlayAgain() {`
);

// 2. Add modal helpers to NavigationRouter
const modalHelpers = `
    openMinimapModal(src, title) {
      if (typeof document === 'undefined') return;
      if (this.sfx) this.sfx.play('click');
      const modal = document.getElementById('modal-minimap-viewer');
      const img = document.getElementById('minimap-modal-img');
      const titleEl = document.getElementById('minimap-modal-title');
      if (img && src) img.src = src;
      if (titleEl && title) titleEl.textContent = title;
      if (modal) modal.style.display = 'flex';
    }

    closeMinimapModal() {
      if (typeof document === 'undefined') return;
      if (this.sfx) this.sfx.play('click');
      const modal = document.getElementById('modal-minimap-viewer');
      if (modal) modal.style.display = 'none';
    }

    openFlowchartModal() {
      if (typeof document === 'undefined') return;
      if (this.sfx) this.sfx.play('click');
      const modal = document.getElementById('modal-flowchart-viewer');
      if (modal) modal.style.display = 'flex';
    }

    closeFlowchartModal() {
      if (typeof document === 'undefined') return;
      if (this.sfx) this.sfx.play('click');
      const modal = document.getElementById('modal-flowchart-viewer');
      if (modal) modal.style.display = 'none';
    }
`;

js = js.replace(
  '    showToast(message, duration = 2200) {',
  modalHelpers + '\n    showToast(message, duration = 2200) {'
);

// 3. Add cases in handleGlobalInteraction
const interactionCases = `          case 'quiz-minimap-hotspot':
            if (this.engine) {
              const lvl = this.engine.getCurrentLevelData();
              const mapSrc = (lvl && lvl.minimapImage) ? lvl.minimapImage : 'assets/minimaps/karnivora_minimap_1.jpg';
              this.openMinimapModal(mapSrc, \`Peta Jalur: \${lvl ? lvl.name : ''}\`);
            }
            break;

          case 'btn-gate-minimap':
            if (this.engine) {
              const k = this.engine.getCurrentKingdom();
              const mapSrc = (k && k.minimapGate) ? k.minimapGate : 'assets/minimaps/karnivora_minimap_1.jpg';
              this.openMinimapModal(mapSrc, \`Peta Jalur Kerajaan: \${k ? k.name : ''}\`);
            }
            break;

          case 'btn-reward-minimap':
            if (this.engine) {
              const k = this.engine.getCurrentKingdom();
              const mapSrc = (k && k.minimapEnd) ? k.minimapEnd : 'assets/minimaps/karnivora_minimap_end.jpg';
              this.openMinimapModal(mapSrc, \`Peta Jalur Tuntas: \${k ? k.name : ''}\`);
            }
            break;

          case 'btn-close-minimap':
          case 'btn-minimap-dismiss':
            this.closeMinimapModal();
            break;

          case 'btn-view-flowchart':
            this.openFlowchartModal();
            break;

          case 'btn-close-flowchart':
          case 'btn-flowchart-dismiss':
            this.closeFlowchartModal();
            break;

          case 'btn-victory-continue':
            if (this.victoryController && this.victoryController.handleVictoryContinue) {
              this.victoryController.handleVictoryContinue();
            }
            break;

`;

js = js.replace(
  "          case 'btn-play-again':",
  interactionCases + "          case 'btn-play-again':"
);

fs.writeFileSync(path, js, 'utf8');
console.log('Successfully patched src/JavaScript.html!');
