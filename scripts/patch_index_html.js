const fs = require('fs');

const path = 'src/Index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Add btn-view-flowchart to screen-instructions
if (!html.includes('btn-view-flowchart')) {
  html = html.replace(
    '<button id="btn-start-mission"',
    `<button id="btn-view-flowchart" class="pro-game-cta-btn btn-3d-wood" type="button" style="margin-right: 12px;" aria-label="Lihat Diagram Alur">
            <span>📋 Alur Game</span>
          </button>\n          <button id="btn-start-mission"`
  );
}

// 2. Add btn-gate-minimap to screen-kingdom-gate
if (!html.includes('btn-gate-minimap')) {
  html = html.replace(
    '<button id="btn-start-challenge"',
    `<button id="btn-gate-minimap" class="pro-game-cta-btn btn-3d-gold" type="button" style="position: absolute; left: 160px; bottom: 20px; z-index: 50;" aria-label="Lihat Peta Jalur">
            <span>🗺️ Peta Jalur</span>
          </button>\n          <button id="btn-start-challenge"`
  );
}

// 3. Add minimap hotspot & trigger to screen-challenge
if (!html.includes('quiz-minimap-hotspot')) {
  html = html.replace(
    '<div id="quiz-minimap" class="minimap-wrapper"></div>',
    `<div id="quiz-minimap" class="minimap-wrapper"></div>
        <!-- Clickable Hotspot over authentic left-side minimap -->
        <div id="quiz-minimap-hotspot" class="quiz-minimap-hotspot" title="Ketuk untuk Memperbesar Peta" aria-label="Perbesar Peta Mini">
          <span class="minimap-hotspot-hint">🗺️ Perbesar Peta</span>
        </div>`
  );
}

// 4. Add btn-reward-minimap to screen-kingdom-reward
if (!html.includes('btn-reward-minimap')) {
  html = html.replace(
    '<div class="reward-footer">',
    `<div class="reward-footer">
          <button id="btn-reward-minimap" class="pro-game-cta-btn btn-3d-wood" type="button" style="position: absolute; left: 24px; bottom: 24px; z-index: 50;" aria-label="Lihat Peta Tuntas">
            <span>🗺️ Peta Tuntas</span>
          </button>`
  );
}

// 5. Add btn-victory-continue to screen-final-victory footer
if (!html.includes('btn-victory-continue')) {
  html = html.replace(
    '<div class="victory-footer">',
    `<div class="victory-footer">
          <button id="btn-victory-continue" class="pro-game-cta-btn btn-3d-gold" type="button" style="display: none; z-index: 60;" aria-label="Lanjut ke Piagam Tamat">
            <span>Lanjut ke Piagam Tamat ➜</span>
          </button>`
  );
}

// 6. Add Minimap & Flowchart Modals before closing container
if (!html.includes('modal-minimap-viewer')) {
  const modalsHtml = `
      <!-- ================================================================= -->
      <!-- AUTHENTIC MINIMAP VIEWER MODAL                                    -->
      <!-- ================================================================= -->
      <div id="modal-minimap-viewer" class="game-modal-overlay" style="display:none;" role="dialog" aria-modal="true" aria-label="Peta Jalur Kerajaan">
        <div class="minimap-modal-card">
          <div class="minimap-modal-header">
            <h3 id="minimap-modal-title" class="minimap-modal-title">Peta Jalur Kerajaan</h3>
            <button id="btn-close-minimap" class="btn-modal-close" type="button" aria-label="Tutup Peta">✕</button>
          </div>
          <div class="minimap-modal-body">
            <img id="minimap-modal-img" class="minimap-modal-view-img" src="assets/minimaps/karnivora_minimap_1.jpg" alt="Peta Jalur Kerajaan" />
          </div>
          <div class="minimap-modal-footer">
            <span class="minimap-modal-hint">Amati perjalananmu melintasi lima pos pemeriksaan satwa!</span>
            <button id="btn-minimap-dismiss" class="pro-game-cta-btn btn-3d-gold btn-minimap-dismiss" type="button">
              <span>Kembali</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- ALUR PERMAINAN FLOWCHART MODAL                                    -->
      <!-- ================================================================= -->
      <div id="modal-flowchart-viewer" class="game-modal-overlay" style="display:none;" role="dialog" aria-modal="true" aria-label="Diagram Alur Permainan">
        <div class="minimap-modal-card flowchart-modal-card">
          <div class="minimap-modal-header">
            <h3 class="minimap-modal-title">Diagram Alur Permainan Mini Zoo</h3>
            <button id="btn-close-flowchart" class="btn-modal-close" type="button" aria-label="Tutup Diagram">✕</button>
          </div>
          <div class="minimap-modal-body">
            <img class="minimap-modal-view-img" src="assets/slides/alur_permainan.jpg" alt="Diagram Alur Permainan" />
          </div>
          <div class="minimap-modal-footer">
            <button id="btn-flowchart-dismiss" class="pro-game-cta-btn btn-3d-gold btn-minimap-dismiss" type="button">
              <span>Tutup Diagram</span>
            </button>
          </div>
        </div>
      </div>
`;
  html = html.replace('</div>\n    </div>\n\n    <!-- SOUND & FULLSCREEN SCRIPTS -->', modalsHtml + '</div>\n    </div>\n\n    <!-- SOUND & FULLSCREEN SCRIPTS -->');
}

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully patched src/Index.html!');
