const fs = require('fs');

const path = 'src/Stylesheet.html';
let css = fs.readFileSync(path, 'utf8');

// Ensure .visually-hidden is defined
if (!css.includes('.visually-hidden')) {
  css = css.replace(
    '/* Screen Slide Backgrounds */',
    `/* Visually Hidden Helper for Clean DOM Semantics */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* Screen Slide Backgrounds */`
  );
}

// Replace Section 17 with the pure-hyperlink tactile button system
const section17Start = css.indexOf('/* ==========================================================================\n   17. GOOGLE DRIVE SLIDE-DRIVEN PRESENTATION SYSTEM');
if (section17Start !== -1) {
  const newSection17 = `/* ==========================================================================
   17. PURE-HYPERLINK SLIDE-DRIVEN NATIVE GAMEPLAY SYSTEM
   ========================================================================== */
.game-viewport {
  background: #0F172A;
}

.game-canvas-container {
  background-size: 100% 100% !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}

/* Screen Slide Backgrounds */
#screen-splash {
  background: url('assets/slides/cover.jpg') center center / 100% 100% no-repeat !important;
}

#screen-instructions {
  background: url('assets/slides/pembuka.jpg') center center / 100% 100% no-repeat !important;
}

#screen-main-map {
  background: url('assets/slides/main_map.jpg') center center / 100% 100% no-repeat !important;
  position: relative;
}

#screen-kingdom-gate {
  background: url('assets/slides/karnivora_gate.jpg') center center / 100% 100% no-repeat !important;
}

#screen-challenge {
  background: url('assets/slides/karnivora_1.jpg') center center / 100% 100% no-repeat !important;
  position: relative;
}

#screen-kingdom-reward {
  background: url('assets/slides/karnivora_ending.jpg') center center / 100% 100% no-repeat !important;
}

#screen-final-victory {
  background: url('assets/slides/pre_ending.jpg') center center / 100% 100% no-repeat !important;
}

/* Common Tactile Hotspot Base - Never looks like a web hyperlink */
.slide-hotspot-pill {
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
  outline: none !important;
  border-radius: 9999px !important;
  cursor: pointer !important;
  border: 3.5px solid transparent !important;
  background: transparent !important;
  box-shadow: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease !important;
}

.slide-hotspot-pill:hover,
.slide-hotspot-pill:focus-visible {
  border-color: #FACC15 !important;
  background: rgba(250, 204, 21, 0.22) !important;
  box-shadow: 0 0 26px rgba(250, 204, 21, 0.75), inset 0 0 14px rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.02) !important;
}

.slide-hotspot-pill:active {
  transform: scale(0.97) translateY(2px) !important;
  background: rgba(250, 204, 21, 0.4) !important;
  box-shadow: 0 0 14px rgba(250, 204, 21, 0.9) !important;
}

/* 1. Splash Screen: Hotspot over "Mulai Petualangan" */
#screen-splash .splash-cta-container {
  position: absolute;
  left: 36.5%;
  top: 73.5%;
  width: 33%;
  height: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

#screen-splash #btn-start-adventure {
  width: 100% !important;
  height: 100% !important;
}

/* 2. Instructions Screen: Hotspot over "Ayo Mulai!" */
#screen-instructions .instructions-footer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

#btn-start-mission.slide-hotspot-pill {
  position: absolute !important;
  left: 58.5% !important;
  top: 77.5% !important;
  width: 31.5% !important;
  height: 16.5% !important;
  pointer-events: auto !important;
  z-index: 50;
}

#btn-start-mission.slide-hotspot-pill:hover {
  border-color: #22C55E !important;
  background: rgba(34, 197, 94, 0.25) !important;
  box-shadow: 0 0 28px rgba(34, 197, 94, 0.8), inset 0 0 14px rgba(255, 255, 255, 0.3) !important;
}

.btn-hotspot-back {
  position: absolute !important;
  left: 2.5% !important;
  top: 2.5% !important;
  z-index: 50;
  border-radius: 9999px !important;
  pointer-events: auto !important;
  padding: 8px 22px !important;
}

.btn-hotspot-flowchart {
  position: absolute !important;
  left: 130px !important;
  top: 2.5% !important;
  z-index: 50;
  border-radius: 9999px !important;
  pointer-events: auto !important;
  padding: 8px 22px !important;
}

/* 3. Main Map Screen: Precision Castle Hotspots */
.map-castle-hotspot {
  position: absolute;
  cursor: pointer;
  border-radius: 28px;
  border: 3.5px dashed transparent;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 40;
  outline: none;
}

.castle-hotspot-badge {
  opacity: 0;
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%) translateY(5px);
  background: linear-gradient(180deg, #F59E0B 0%, #B45309 100%);
  color: #FFFDF0;
  font-family: var(--font-game);
  font-size: 1rem;
  font-weight: 900;
  padding: 4px 16px;
  border-radius: 9999px;
  border: 2px solid #451A03;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}

.map-castle-hotspot:hover .castle-hotspot-badge {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

#card-kingdom-0 {
  left: 11% !important;
  top: 13% !important;
  width: 25% !important;
  height: 42% !important;
}

#card-kingdom-0:hover {
  border-color: #EF4444 !important;
  background: rgba(239, 68, 68, 0.18) !important;
  box-shadow: 0 0 35px rgba(239, 68, 68, 0.65) !important;
  transform: scale(1.02);
}

#card-kingdom-1 {
  left: 38% !important;
  top: 9% !important;
  width: 25% !important;
  height: 42% !important;
}

#card-kingdom-1:hover {
  border-color: #22C55E !important;
  background: rgba(34, 197, 94, 0.18) !important;
  box-shadow: 0 0 35px rgba(34, 197, 94, 0.65) !important;
  transform: scale(1.02);
}

#card-kingdom-2 {
  left: 66% !important;
  top: 21% !important;
  width: 25% !important;
  height: 42% !important;
}

#card-kingdom-2:hover {
  border-color: #A855F7 !important;
  background: rgba(168, 85, 247, 0.18) !important;
  box-shadow: 0 0 35px rgba(168, 85, 247, 0.65) !important;
  transform: scale(1.02);
}

#btn-map-quick-start {
  width: 100% !important;
  height: 100% !important;
}

/* 4. Kingdom Gate Screen: Hotspot over "MASUK KERAJAAN" */
#screen-kingdom-gate .gate-footer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

#btn-start-challenge.slide-hotspot-pill {
  position: absolute !important;
  right: 2.5% !important;
  bottom: 2.5% !important;
  width: 27% !important;
  height: 15% !important;
  pointer-events: auto !important;
  z-index: 50;
}

#btn-start-challenge.slide-hotspot-pill:hover {
  border-color: #22C55E !important;
  background: rgba(34, 197, 94, 0.25) !important;
  box-shadow: 0 0 28px rgba(34, 197, 94, 0.8) !important;
}

.btn-hotspot-minimap-trigger {
  position: absolute !important;
  left: 160px !important;
  bottom: 2.5% !important;
  border-radius: 9999px !important;
  pointer-events: auto !important;
  z-index: 50;
  padding: 8px 22px !important;
}

#btn-back-to-map {
  pointer-events: auto !important;
  position: absolute !important;
  left: 2.5% !important;
  bottom: 2.5% !important;
  z-index: 50;
  border-radius: 9999px !important;
  padding: 8px 22px !important;
}

/* 5. Challenge Screen: Options Hotspots, Submit Button, and Minimap Zoom */
.quiz-main-stage {
  display: block !important;
  position: absolute;
  inset: 0;
}

#quiz-options-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: block !important;
  gap: 0 !important;
}

.btn-quiz-option {
  position: absolute !important;
  left: 67.37% !important;
  width: 30.24% !important;
  height: 7.96% !important;
  cursor: pointer !important;
  pointer-events: auto !important;
  background: transparent !important;
  border: 3.5px solid transparent !important;
  border-radius: 9999px !important;
  box-shadow: none !important;
  transform: none !important;
  transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  padding-right: 18px !important;
  box-sizing: border-box !important;
  -webkit-tap-highlight-color: transparent !important;
  user-select: none !important;
  outline: none !important;
}

.btn-quiz-option .option-key-badge,
.btn-quiz-option .option-text {
  display: none !important;
}

.btn-quiz-option:hover {
  border-color: #FACC15 !important;
  background: rgba(250, 204, 21, 0.18) !important;
  box-shadow: 0 0 22px rgba(250, 204, 21, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.02) !important;
}

.btn-quiz-option.active,
.btn-quiz-option.selected {
  border-color: #22C55E !important;
  background: rgba(34, 197, 94, 0.25) !important;
  box-shadow: 0 0 26px rgba(34, 197, 94, 0.85), inset 0 0 14px rgba(34, 197, 94, 0.4) !important;
  transform: scale(1.02) !important;
}

.btn-quiz-option::after {
  content: "✓";
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #22C55E;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  opacity: 0;
  transform: scale(0.4);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-quiz-option.active::after,
.btn-quiz-option.selected::after {
  opacity: 1;
  transform: scale(1);
}

.btn-quiz-option:nth-child(1) { top: 61.2% !important; }
.btn-quiz-option:nth-child(2) { top: 69.5% !important; }
.btn-quiz-option:nth-child(3) { top: 77.8% !important; }

/* Jawab Sekarang Button Hotspot */
.quiz-submit-hotspot {
  position: absolute !important;
  left: 67.37% !important;
  top: 86.8% !important;
  width: 30.24% !important;
  height: 9.2% !important;
  border-radius: 9999px !important;
  cursor: pointer !important;
  pointer-events: auto !important;
  background: transparent !important;
  border: 3.5px solid transparent !important;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  z-index: 30;
  outline: none !important;
}

.quiz-submit-hotspot:hover {
  border-color: #FACC15 !important;
  background: rgba(250, 204, 21, 0.3) !important;
  box-shadow: 0 0 28px rgba(250, 204, 21, 0.85) !important;
  transform: scale(1.02) !important;
}

.quiz-submit-hotspot:active {
  transform: scale(0.97) translateY(2px) !important;
}

/* Minimap Hotspot on Challenge Screen */
.quiz-minimap-hotspot {
  position: absolute;
  left: 1.5%;
  top: 13%;
  width: 30%;
  height: 80%;
  cursor: pointer;
  border-radius: 20px;
  border: 3px dashed transparent;
  z-index: 35;
  transition: all 0.25s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
}

.quiz-minimap-hotspot:hover {
  border-color: #FACC15;
  background: rgba(250, 204, 21, 0.15);
  box-shadow: 0 0 25px rgba(250, 204, 21, 0.45);
}

.minimap-hotspot-hint {
  opacity: 0;
  background: rgba(15, 23, 42, 0.9);
  color: #FDE047;
  font-family: var(--font-game);
  font-size: 0.95rem;
  font-weight: 800;
  padding: 6px 16px;
  border-radius: 9999px;
  border: 2px solid #F59E0B;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: translateY(6px);
  pointer-events: none;
}

.quiz-minimap-hotspot:hover .minimap-hotspot-hint {
  opacity: 1;
  transform: translateY(0);
}

/* 6. Reward Screen: Hotspot over "Lanjutkan Petualangan" */
#screen-kingdom-reward .reward-footer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

#btn-reward-continue.slide-hotspot-pill {
  position: absolute !important;
  right: 2.5% !important;
  bottom: 2.5% !important;
  width: 30% !important;
  height: 16% !important;
  pointer-events: auto !important;
  z-index: 50;
}

#btn-reward-continue.slide-hotspot-pill:hover {
  border-color: #FACC15 !important;
  background: rgba(250, 204, 21, 0.3) !important;
  box-shadow: 0 0 28px rgba(250, 204, 21, 0.85) !important;
}

/* 7. Victory Screen: Pre-ending & Tamat Hotspots */
#screen-final-victory .victory-footer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

#btn-victory-continue {
  position: absolute !important;
  bottom: 5% !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  border-radius: 9999px !important;
  padding: 12px 36px !important;
  font-size: 1.25rem !important;
  cursor: pointer !important;
  pointer-events: auto !important;
  z-index: 60;
}

#btn-play-again.slide-hotspot-pill {
  position: absolute !important;
  left: 31% !important;
  bottom: 6% !important;
  width: 18% !important;
  height: 10% !important;
  border-radius: 9999px !important;
  background: rgba(245, 158, 11, 0.9) !important;
  border: 3px solid #78350F !important;
  color: #FFFDF0 !important;
  font-family: var(--font-game) !important;
  font-weight: 900 !important;
  font-size: 1.2rem !important;
  cursor: pointer !important;
  pointer-events: auto !important;
  box-shadow: 0 6px 0 #451A03, 0 10px 20px rgba(0,0,0,0.5) !important;
  transition: all 0.15s ease !important;
}

#btn-play-again.slide-hotspot-pill:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 0 #451A03, 0 14px 24px rgba(0,0,0,0.6) !important;
}

#btn-play-again.slide-hotspot-pill:active {
  transform: translateY(3px) !important;
  box-shadow: 0 2px 0 #451A03 !important;
}

#btn-finish-game.slide-hotspot-pill {
  position: absolute !important;
  left: 53% !important;
  bottom: 6% !important;
  width: 18% !important;
  height: 10% !important;
  border-radius: 9999px !important;
  background: rgba(22, 163, 74, 0.9) !important;
  border: 3px solid #14532D !important;
  color: #FFFDF0 !important;
  font-family: var(--font-game) !important;
  font-weight: 900 !important;
  font-size: 1.2rem !important;
  cursor: pointer !important;
  pointer-events: auto !important;
  box-shadow: 0 6px 0 #14532D, 0 10px 20px rgba(0,0,0,0.5) !important;
  transition: all 0.15s ease !important;
}

#btn-finish-game.slide-hotspot-pill:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 0 #14532D, 0 14px 24px rgba(0,0,0,0.6) !important;
}

#btn-finish-game.slide-hotspot-pill:active {
  transform: translateY(3px) !important;
  box-shadow: 0 2px 0 #14532D !important;
}

/* In-Game Floating Toast */
.game-toast {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  background: linear-gradient(180deg, #FFFDF5 0%, #FEF9C3 100%);
  color: #451A03;
  border: 3.5px solid #F59E0B;
  border-radius: 16px;
  padding: 10px 24px;
  font-family: var(--font-game);
  font-size: 1.15rem;
  font-weight: 900;
  box-shadow: 0 6px 0 #451A03, 0 12px 24px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.game-toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* Modals for Authentic Minimap & Flowchart */
.game-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.88);
  backdrop-filter: blur(6px);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.minimap-modal-card {
  width: 90%;
  max-width: 860px;
  height: 84%;
  background: linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%);
  border: 4px solid #78350F;
  border-radius: 20px;
  box-shadow: 0 12px 0 #451A03, 0 20px 35px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.flowchart-modal-card {
  max-width: 920px;
  height: 88%;
}

.minimap-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(180deg, #F59E0B 0%, #D97706 100%);
  border-bottom: 3.5px solid #78350F;
}

.minimap-modal-title {
  font-family: var(--font-game);
  font-size: 1.3rem;
  font-weight: 900;
  color: #FFFDF0;
  text-shadow: 0 2px 4px #78350F;
  margin: 0;
}

.btn-modal-close {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #DC2626;
  border: 2px solid #7F1D1D;
  color: #FFFFFF;
  font-family: sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 0 #7F1D1D;
  transition: transform 0.15s, background 0.15s;
}

.btn-modal-close:hover {
  background: #EF4444;
  transform: scale(1.08);
}

.btn-modal-close:active {
  transform: scale(0.95);
}

.minimap-modal-body {
  flex: 1;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1E293B;
  overflow: hidden;
}

.minimap-modal-view-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
}

.minimap-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #FEF3C7;
  border-top: 2.5px solid #F59E0B;
}

.minimap-modal-hint {
  font-family: var(--font-game);
  font-size: 0.95rem;
  font-weight: 800;
  color: #78350F;
}

.btn-minimap-dismiss {
  padding: 8px 24px !important;
  font-size: 1rem !important;
}
</style>`;

  css = css.substring(0, section17Start) + newSection17;
}

fs.writeFileSync(path, css, 'utf8');
console.log('Successfully updated src/Stylesheet.html with pure-hyperlink native button styling!');
