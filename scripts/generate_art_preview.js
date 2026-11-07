const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'assets', 'compressed');

function toDataUri(filename) {
  const p = path.join(dir, filename);
  const buf = fs.readFileSync(p);
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

const splashUri = toDataUri('bg_splash.jpg');
const instructionsUri = toDataUri('bg_instructions.jpg');
const mapUri = toDataUri('bg_main_map.jpg');
const rewardUri = toDataUri('bg_reward.jpg');
const victoryUri = toDataUri('bg_victory.jpg');

const htmlContent = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700;800;900&family=Nunito:wght@700;800;900&display=swap');

  .art-preview-wrapper {
    font-family: 'Nunito', sans-serif;
    color: #F8FAFC;
    max-width: 1040px;
    margin: 0 auto;
    user-select: none;
  }

  .font-display {
    font-family: 'Fredoka', cursive, sans-serif;
  }

  /* Nav Tab Bar */
  .art-screen-tabs {
    display: flex;
    gap: 8px;
    background: #0F172A;
    padding: 6px;
    border-radius: 16px;
    border: 2px solid #334155;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .art-tab-btn {
    flex: 1;
    min-width: 130px;
    padding: 10px 12px;
    border-radius: 12px;
    background: transparent;
    border: none;
    color: #94A3B8;
    font-weight: 800;
    font-size: 0.88rem;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: center;
  }

  .art-tab-btn.active {
    background: linear-gradient(180deg, #22C55E 0%, #15803D 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
  }

  /* 16:9 Screen Frame */
  .art-stage-169 {
    position: relative;
    aspect-ratio: 16 / 9;
    width: 100%;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 0 4px #78350F, 0 0 0 7px #F59E0B;
    background: #000;
    box-sizing: border-box;
  }

  .art-screen-view {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }
  .art-screen-view.active {
    display: block;
  }

  /* Big Glossy Green Button (Matching the illustration) */
  .art-btn-green-hotspot {
    position: absolute;
    left: 50%;
    bottom: 42px;
    transform: translateX(-50%);
    padding: 12px 34px;
    border-radius: 9999px;
    background: linear-gradient(180deg, #4ADE80 0%, #22C55E 40%, #16A34A 100%);
    border: 3.5px solid #FEF08A;
    box-shadow: 0 6px 0 #14532D, 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.7);
    color: #FFFFFF;
    font-size: 1.35rem;
    font-weight: 900;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }
  .art-btn-green-hotspot:hover {
    transform: translateX(-50%) translateY(-2px);
    box-shadow: 0 8px 0 #14532D, 0 14px 26px rgba(34, 197, 94, 0.5);
    filter: brightness(1.08);
  }
  .art-btn-green-hotspot:active {
    transform: translateX(-50%) translateY(4px);
    box-shadow: 0 2px 0 #14532D;
  }

  /* Interactive Portals on Main Map */
  .map-portal-hotspot {
    position: absolute;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 3px solid transparent;
  }
  .map-portal-hotspot:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: #FBBF24;
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
    transform: scale(1.03);
  }
</style>

<div class="art-preview-wrapper">
  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
    <div>
      <h2 class="font-display" style="margin: 0; color: #22C55E; font-size: 1.6rem;">Pratinjau Asli Game: 100% Sesuai Gambar Karya Anda</h2>
      <p style="margin: 2px 0 0 0; color: #CBD5E1; font-size: 0.92rem;">
        Kelima gambar ilustrasi asli Anda telah dipasang ke panggung 16:9 dengan tombol interaktif!
      </p>
    </div>
    <span style="background: #22C55E; color: #052E16; font-weight: 900; font-size: 0.8rem; padding: 6px 14px; border-radius: 9999px;">
      5 SCREEN LIVE PREVIEW
    </span>
  </div>

  <!-- Screen Tabs -->
  <div class="art-screen-tabs font-display">
    <button class="art-tab-btn active" onclick="switchArtScreen('splash', this)">1. Sampul (Splash)</button>
    <button class="art-tab-btn" onclick="switchArtScreen('instructions', this)">2. Petunjuk (Misi)</button>
    <button class="art-tab-btn" onclick="switchArtScreen('map', this)">3. Peta 3 Kerajaan</button>
    <button class="art-tab-btn" onclick="switchArtScreen('reward', this)">4. Istana Persatuan</button>
    <button class="art-tab-btn" onclick="switchArtScreen('victory', this)">5. Kristal Pelangi (Menang)</button>
  </div>

  <!-- 16:9 STAGE -->
  <div class="art-stage-169">
    
    <!-- 1. SPLASH -->
    <div id="art-view-splash" class="art-screen-view active" style="background-image: url('${splashUri}');">
      <button class="art-btn-green-hotspot font-display" onclick="playBeep(); switchArtScreen('instructions', document.querySelectorAll('.art-tab-btn')[1]);">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#FFFFFF"><polygon points="6,4 20,12 6,20"></polygon></svg>
        <span>Mulai Petualangan</span>
      </button>
    </div>

    <!-- 2. INSTRUCTIONS -->
    <div id="art-view-instructions" class="art-screen-view" style="background-image: url('${instructionsUri}');">
      <button class="art-btn-green-hotspot font-display" style="right: 32px; left: auto; bottom: 32px; transform: none;" onclick="playBeep(); switchArtScreen('map', document.querySelectorAll('.art-tab-btn')[2]);">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#FFFFFF"><polygon points="6,4 20,12 6,20"></polygon></svg>
        <span>Ayo Mulai!</span>
      </button>
    </div>

    <!-- 3. MAP -->
    <div id="art-view-map" class="art-screen-view" style="background-image: url('${mapUri}');">
      <!-- Hotspot Karnivora (Left) -->
      <div class="map-portal-hotspot" style="left: 13%; top: 15%; width: 23%; height: 50%;" title="Buka Gerbang Kerajaan Karnivora" onclick="playBeep(); alert('Membuka Gerbang Kerajaan Karnivora!');"></div>
      
      <!-- Hotspot Herbivora (Center) -->
      <div class="map-portal-hotspot" style="left: 41%; top: 13%; width: 20%; height: 50%;" title="Kerajaan Herbivora (Terkunci)" onclick="alert('Selesaikan Kerajaan Karnivora terlebih dahulu!');"></div>
      
      <!-- Hotspot Omnivora (Right) -->
      <div class="map-portal-hotspot" style="left: 68%; top: 22%; width: 22%; height: 46%;" title="Kerajaan Omnivora (Terkunci)" onclick="alert('Kumpulkan 2 Kristal terlebih dahulu!');"></div>

      <!-- Quick Start Button Bottom Right -->
      <button class="art-btn-green-hotspot font-display" style="right: 32px; left: auto; bottom: 32px; transform: none;" onclick="playBeep(); alert('Memulai Misi Pertama di Kerajaan Karnivora!');">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#FFFFFF"><polygon points="6,4 20,12 6,20"></polygon></svg>
        <span>Mulai Petualangan</span>
      </button>
    </div>

    <!-- 4. REWARD -->
    <div id="art-view-reward" class="art-screen-view" style="background-image: url('${rewardUri}');">
      <button class="art-btn-green-hotspot font-display" style="bottom: 28px;" onclick="playBeep(); switchArtScreen('victory', document.querySelectorAll('.art-tab-btn')[4]);">
        <span>Satukan 3 Kristal Ajaib!</span>
      </button>
    </div>

    <!-- 5. VICTORY -->
    <div id="art-view-victory" class="art-screen-view" style="background-image: url('${victoryUri}');">
      <button class="art-btn-green-hotspot font-display" style="bottom: 28px;" onclick="playBeep(); switchArtScreen('splash', document.querySelectorAll('.art-tab-btn')[0]);">
        <span>Main Lagi dari Awal</span>
      </button>
    </div>

  </div>
</div>

<script>
  function switchArtScreen(name, btn) {
    document.querySelectorAll('.art-screen-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.art-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('art-view-' + name).classList.add('active');
    btn.classList.add('active');
  }

  function playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch(e) {}
  }
</script>
`;

const outputPath = path.join(__dirname, '..', '.superpowers', 'brainstorm', 'session-1', 'content', 'actual-art-preview.html');
fs.writeFileSync(outputPath, htmlContent, 'utf8');
console.log('Successfully generated actual-art-preview.html:', (fs.statSync(outputPath).size / 1024).toFixed(1) + ' KB');
