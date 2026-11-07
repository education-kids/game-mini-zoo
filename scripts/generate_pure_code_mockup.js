const fs = require('fs');
const path = require('path');

const html = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700;800;900&family=Nunito:wght@700;800;900&display=swap');

  .ui-clone-hub {
    font-family: 'Nunito', sans-serif;
    color: #1E293B;
    max-width: 1080px;
    margin: 0 auto;
    user-select: none;
  }

  .font-cartoon {
    font-family: 'Fredoka', cursive, sans-serif;
  }

  /* Navigation Tabs for Preview */
  .preview-nav-bar {
    display: flex;
    gap: 8px;
    background: #1E293B;
    padding: 6px;
    border-radius: 16px;
    border: 2px solid #475569;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }

  .preview-nav-btn {
    flex: 1;
    min-width: 120px;
    padding: 9px 12px;
    border-radius: 11px;
    border: none;
    background: transparent;
    color: #CBD5E1;
    font-family: 'Fredoka', sans-serif;
    font-weight: 800;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .preview-nav-btn.active {
    background: linear-gradient(180deg, #FACC15 0%, #EA580C 100%);
    color: #2A1002;
    box-shadow: 0 3px 10px rgba(234, 88, 12, 0.4);
  }

  /* ==========================================================================
     16:9 GAME STAGE CONTAINER (100% PURE CSS + SVG, ZERO JPG IMAGES)
     ========================================================================== */
  .zoo-stage-169 {
    position: relative;
    aspect-ratio: 16 / 9;
    width: 100%;
    border-radius: 26px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65), 0 0 0 5px #78350F, 0 0 0 9px #F59E0B;
    background: linear-gradient(180deg, #0284C7 0%, #38BDF8 38%, #BAE6FD 62%, #86EFAC 63%, #22C55E 100%);
    box-sizing: border-box;
  }

  .zoo-screen {
    display: none;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .zoo-screen.active {
    display: block;
  }

  /* ==========================================================================
     REUSABLE CARTOON WOODEN SIGNBOARDS & PARCHMENT (MATCHING REFERENCE IMAGES)
     ========================================================================== */
  /* Top-Left Hanging Wooden Plank ("Game Edukasi", "Misi Pemain", "Peta Utama") */
  .wood-hanging-sign {
    position: absolute;
    top: 16px;
    left: 20px;
    z-index: 30;
    background: linear-gradient(180deg, #F59E0B 0%, #D97706 45%, #B45309 100%);
    border: 3.5px solid #451A03;
    border-radius: 16px;
    padding: 8px 22px;
    box-shadow: 0 6px 0 #451A03, 0 10px 18px rgba(0,0,0,0.35), inset 0 3px 0 rgba(254, 240, 138, 0.6);
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  /* Hanging Ropes */
  .wood-hanging-sign::before,
  .wood-hanging-sign::after {
    content: '';
    position: absolute;
    top: -22px;
    width: 8px;
    height: 22px;
    background: repeating-linear-gradient(45deg, #D97706, #D97706 3px, #78350F 3px, #78350F 6px);
    border: 2px solid #451A03;
    border-radius: 4px;
  }
  .wood-hanging-sign::before { left: 22px; }
  .wood-hanging-sign::after { right: 22px; }

  .wood-sign-text {
    font-family: 'Fredoka', cursive, sans-serif;
    font-size: 1.35rem;
    font-weight: 900;
    color: #FFFDF0;
    letter-spacing: 0.5px;
    text-shadow:
      0 3px 0 #451A03,
      -2px -2px 0 #451A03,
      2px -2px 0 #451A03,
      -2px 2px 0 #451A03,
      2px 2px 0 #451A03;
  }

  /* Glossy Lime-Green Pill Button Inside Golden-Wood Frame */
  .wood-framed-green-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 9999px;
    background: linear-gradient(180deg, #FBBF24 0%, #D97706 55%, #92400E 100%);
    border: 4px solid #451A03;
    box-shadow: 0 7px 0 #451A03, 0 12px 24px rgba(0,0,0,0.45), inset 0 2px 0 #FEF08A;
    cursor: pointer;
    transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.12s ease;
    text-decoration: none;
  }
  .wood-framed-green-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 0 #451A03, 0 16px 28px rgba(0,0,0,0.5), inset 0 2px 0 #FEF08A;
    filter: brightness(1.05);
  }
  .wood-framed-green-btn:active {
    transform: translateY(5px);
    box-shadow: 0 2px 0 #451A03, 0 4px 10px rgba(0,0,0,0.4);
  }

  .green-glossy-inner {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 32px;
    border-radius: 9999px;
    background: linear-gradient(180deg, #84CC16 0%, #4D7C0F 45%, #15803D 100%);
    border: 3px solid #14532D;
    box-shadow: inset 0 5px 0 rgba(255, 255, 255, 0.45), inset 0 -4px 0 rgba(0, 0, 0, 0.25);
  }

  .green-btn-label {
    font-family: 'Fredoka', cursive, sans-serif;
    font-size: 1.4rem;
    font-weight: 900;
    line-height: 1.05;
    color: #FFFFFF;
    text-align: center;
    text-shadow:
      0 3px 0 #052E16,
      -2px -2px 0 #052E16,
      2px -2px 0 #052E16,
      -2px 2px 0 #052E16,
      2px 2px 0 #052E16;
  }

  /* Cream Parchment Speech Bubble */
  .parchment-speech-bubble {
    position: relative;
    background: radial-gradient(circle at 50% 40%, #FFFDF5 0%, #FEF3C7 75%, #FDE68A 100%);
    border: 4px solid #92400E;
    border-radius: 32px;
    padding: 20px 28px;
    box-shadow: 0 8px 0 rgba(120, 53, 15, 0.35), 0 14px 28px rgba(0,0,0,0.25), inset 0 0 0 3px rgba(255, 255, 255, 0.7);
    color: #451A03;
    text-align: center;
  }
  /* Speech Bubble Tail Left */
  .parchment-speech-bubble.tail-left::before {
    content: '';
    position: absolute;
    left: -26px;
    top: 52%;
    border-width: 14px 26px 14px 0;
    border-style: solid;
    border-color: transparent #92400E transparent transparent;
  }
  .parchment-speech-bubble.tail-left::after {
    content: '';
    position: absolute;
    left: -19px;
    top: calc(52% + 3px);
    border-width: 11px 22px 11px 0;
    border-style: solid;
    border-color: transparent #FEF3C7 transparent transparent;
  }

  /* Cartoon 3D Outlined Text Helper */
  .text-stroke-brown {
    text-shadow:
      0 4px 0 #451A03,
      -2.5px -2.5px 0 #451A03,
      2.5px -2.5px 0 #451A03,
      -2.5px 2.5px 0 #451A03,
      2.5px 2.5px 0 #451A03,
      0 6px 12px rgba(0,0,0,0.45);
  }
</style>

<div class="ui-clone-hub">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
    <div>
      <h2 class="font-cartoon" style="margin: 0; color: #F59E0B; font-size: 1.55rem;">
        100% Pure Code UI Recreation (Bukan Gambar Tempelan!)
      </h2>
      <p style="margin: 2px 0 0 0; color: #94A3B8; font-size: 0.9rem;">
        Seluruh langit, awan, pohon, papan kayu gantung, istana 3 kerajaan, karakter Survivor &amp; Corgi, serta tombol kapsul hijau dibangun murni dengan HTML + CSS + SVG!
      </p>
    </div>
    <span style="background: #22C55E; color: #052E16; font-weight: 900; font-size: 0.78rem; padding: 6px 14px; border-radius: 999px;">
      PURE HTML/CSS/SVG
    </span>
  </div>

  <!-- Screen Selector Tabs -->
  <div class="preview-nav-bar">
    <button class="preview-nav-btn active" onclick="showZooScreen('s1', this)">1. Sampul Pembuka</button>
    <button class="preview-nav-btn" onclick="showZooScreen('s2', this)">2. Misi Pemain</button>
    <button class="preview-nav-btn" onclick="showZooScreen('s3', this)">3. Peta Utama 3 Kerajaan</button>
    <button class="preview-nav-btn" onclick="showZooScreen('s4', this)">4. Tantangan Kuis Satwa</button>
    <button class="preview-nav-btn" onclick="showZooScreen('s5', this)">5. Istana &amp; Kristal Persatuan</button>
  </div>

  <!-- ==================================================================== -->
  <!-- 16:9 GAME STAGE                                                      -->
  <!-- ==================================================================== -->
  <div class="zoo-stage-169">

    <!-- SHARED SUNNY ZOO NATURE SCENERY SVG (Clouds, Mountains, Trees, Path, Archway) -->
    <svg id="shared-nature-bg" viewBox="0 0 960 540" preserveAspectRatio="none" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0284C7"/>
          <stop offset="45%" stop-color="#38BDF8"/>
          <stop offset="80%" stop-color="#E0F2FE"/>
        </linearGradient>
        <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4ADE80"/>
          <stop offset="100%" stop-color="#16A34A"/>
        </linearGradient>
        <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#84CC16"/>
          <stop offset="100%" stop-color="#15803D"/>
        </linearGradient>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FDE68A"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
      </defs>

      <!-- Sky -->
      <rect width="960" height="400" fill="url(#skyGrad)"/>

      <!-- Sunbeams -->
      <g opacity="0.22" fill="#FEF08A">
        <polygon points="480,0 120,540 240,540"/>
        <polygon points="480,0 380,540 520,540"/>
        <polygon points="480,0 680,540 820,540"/>
      </g>

      <!-- Fluffy Cartoon Clouds -->
      <g fill="#FFFFFF" opacity="0.92">
        <path d="M80 95 Q95 65 130 75 Q155 50 190 70 Q220 65 230 95 Q250 105 240 125 L70 125 Q55 110 80 95 Z"/>
        <path d="M680 70 Q705 40 745 55 Q780 30 820 55 Q855 50 865 80 Q885 95 870 115 L665 115 Q650 95 680 70 Z"/>
        <path d="M380 55 Q400 35 430 45 Q455 25 485 45 Q510 50 505 75 L370 75 Q360 65 380 55 Z" opacity="0.75"/>
      </g>

      <!-- Distant Mountains -->
      <polygon points="0,330 140,190 290,330" fill="#7DD3FC" opacity="0.6"/>
      <polygon points="180,330 350,160 520,330" fill="#93C5FD" opacity="0.5"/>
      <polygon points="620,330 790,175 960,330" fill="#7DD3FC" opacity="0.6"/>

      <!-- Far Lush Hills -->
      <path d="M0 340 Q240 250 520 330 T960 310 L960 540 L0 540 Z" fill="url(#hillFar)"/>

      <!-- Near Grassy Meadow -->
      <path d="M0 380 Q320 320 640 385 T960 365 L960 540 L0 540 Z" fill="url(#hillNear)"/>

      <!-- Dirt Cobblestone Path -->
      <path d="M420 540 C430 470 550 430 780 410 L910 410 C780 455 690 495 680 540 Z" fill="url(#pathGrad)" opacity="0.85"/>
      <ellipse cx="550" cy="505" rx="28" ry="9" fill="#D97706" opacity="0.5"/>
      <ellipse cx="620" cy="480" rx="22" ry="7" fill="#D97706" opacity="0.5"/>
      <ellipse cx="695" cy="455" rx="18" ry="6" fill="#D97706" opacity="0.5"/>

      <!-- Left & Right Lush Tree Canopies -->
      <g fill="#15803D">
        <circle cx="-10" cy="180" r="95"/>
        <circle cx="50" cy="110" r="85"/>
        <circle cx="120" cy="60" r="75"/>
        <circle cx="970" cy="190" r="95"/>
        <circle cx="910" cy="115" r="85"/>
        <circle cx="840" cy="55" r="75"/>
      </g>
      <g fill="#22C55E">
        <circle cx="15" cy="140" r="70"/>
        <circle cx="85" cy="80" r="65"/>
        <circle cx="940" cy="145" r="70"/>
        <circle cx="875" cy="80" r="65"/>
      </g>
      <g fill="#4ADE80">
        <circle cx="30" cy="105" r="45"/>
        <circle cx="920" cy="105" r="45"/>
      </g>

      <!-- Wooden Picket Fence Bottom Right -->
      <g transform="translate(800, 445)">
        <rect x="0" y="25" width="140" height="12" rx="4" fill="#B45309" stroke="#451A03" stroke-width="2.5"/>
        <rect x="0" y="55" width="140" height="12" rx="4" fill="#B45309" stroke="#451A03" stroke-width="2.5"/>
        <rect x="12" y="5" width="18" height="85" rx="6" fill="#D97706" stroke="#451A03" stroke-width="2.5"/>
        <rect x="58" y="0" width="18" height="90" rx="6" fill="#D97706" stroke="#451A03" stroke-width="2.5"/>
        <rect x="104" y="8" width="18" height="82" rx="6" fill="#D97706" stroke="#451A03" stroke-width="2.5"/>
      </g>
    </svg>

    <!-- ================================================================== -->
    <!-- SCREEN 1: SAMPUL PEMBUKA ("Petualangan Mini Zoo")                  -->
    <!-- ================================================================== -->
    <section id="zoo-s1" class="zoo-screen active" style="z-index: 10;">
      
      <!-- Top-Left Hanging Wooden Sign: Game Edukasi -->
      <div class="wood-hanging-sign">
        <span class="wood-sign-text">Game Edukasi</span>
        <!-- 3D Golden Paw SVG -->
        <svg width="28" height="28" viewBox="0 0 36 36">
          <ellipse cx="18" cy="23" rx="9" ry="7.5" fill="#FACC15" stroke="#451A03" stroke-width="2.5"/>
          <circle cx="8" cy="14" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
          <circle cx="14.5" cy="10" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
          <circle cx="21.5" cy="10" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
          <circle cx="28" cy="14" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
        </svg>
      </div>

      <!-- Right Background: Stone MINI ZOO Archway (Matching Reference 1) -->
      <svg viewBox="0 0 240 250" style="position: absolute; right: 24px; bottom: 75px; width: 215px; height: 225px; z-index: 5; pointer-events: none;">
        <!-- Stone Pillars -->
        <rect x="20" y="95" width="48" height="145" rx="6" fill="#F59E0B" stroke="#78350F" stroke-width="3.5"/>
        <rect x="172" y="95" width="48" height="145" rx="6" fill="#F59E0B" stroke="#78350F" stroke-width="3.5"/>
        <!-- Stone Brick Lines -->
        <line x1="20" y1="130" x2="68" y2="130" stroke="#92400E" stroke-width="3"/>
        <line x1="20" y1="168" x2="68" y2="168" stroke="#92400E" stroke-width="3"/>
        <line x1="172" y1="130" x2="220" y2="130" stroke="#92400E" stroke-width="3"/>
        <line x1="172" y1="168" x2="220" y2="168" stroke="#92400E" stroke-width="3"/>
        <!-- Arch Sign Header -->
        <path d="M12 105 Q120 15 228 105 L202 125 Q120 55 38 125 Z" fill="#FDE68A" stroke="#78350F" stroke-width="4"/>
        <!-- Top Paw Crest -->
        <circle cx="120" cy="48" r="24" fill="#FEF3C7" stroke="#78350F" stroke-width="3.5"/>
        <ellipse cx="120" cy="53" rx="8" ry="6" fill="#78350F"/>
        <circle cx="110" cy="43" r="3.5" fill="#78350F"/>
        <circle cx="116" cy="39" r="3.5" fill="#78350F"/>
        <circle cx="124" cy="39" r="3.5" fill="#78350F"/>
        <circle cx="130" cy="43" r="3.5" fill="#78350F"/>
        <text x="120" y="92" text-anchor="middle" font-family="Fredoka" font-weight="900" font-size="20" fill="#5C2D0C">MINI ZOO</text>
      </svg>

      <!-- CENTER GIANT WOODEN SIGNBOARD + PEEKING ANIMALS (Matching Reference 1) -->
      <div style="position: absolute; left: 53%; top: 43%; transform: translate(-50%, -50%); width: 570px; z-index: 15; text-align: center;">
        
        <!-- Peeking Animals + Pith Helmet SVG Above the Signboard -->
        <svg viewBox="0 0 600 150" style="width: 100%; height: 135px; margin-bottom: -34px; overflow: visible;">
          <!-- Left: Cute Smiling Lion -->
          <g transform="translate(55, 22)">
            <circle cx="55" cy="65" r="48" fill="#B45309" stroke="#451A03" stroke-width="3.5"/>
            <circle cx="55" cy="68" r="34" fill="#FBBF24" stroke="#451A03" stroke-width="3"/>
            <circle cx="32" cy="42" r="10" fill="#F59E0B" stroke="#451A03" stroke-width="3"/>
            <circle cx="78" cy="42" r="10" fill="#F59E0B" stroke="#451A03" stroke-width="3"/>
            <circle cx="43" cy="60" r="5" fill="#1E293B"/>
            <circle cx="45" cy="58" r="2" fill="#FFF"/>
            <circle cx="67" cy="60" r="5" fill="#1E293B"/>
            <circle cx="69" cy="58" r="2" fill="#FFF"/>
            <polygon points="49,68 61,68 55,75" fill="#78350F"/>
            <path d="M43 78 Q55 92 67 78 Z" fill="#DC2626" stroke="#451A03" stroke-width="2.5"/>
          </g>

          <!-- Inner Left: Cute Tiger -->
          <g transform="translate(155, 5)">
            <circle cx="48" cy="58" r="36" fill="#F97316" stroke="#451A03" stroke-width="3.5"/>
            <circle cx="24" cy="32" r="9" fill="#F97316" stroke="#451A03" stroke-width="3"/>
            <circle cx="72" cy="32" r="9" fill="#F97316" stroke="#451A03" stroke-width="3"/>
            <!-- Tiger Stripes -->
            <path d="M20 48 L32 52 M76 48 L64 52 M48 24 L48 36" stroke="#1E293B" stroke-width="4" stroke-linecap="round"/>
            <ellipse cx="48" cy="68" rx="22" ry="16" fill="#FFFDF0"/>
            <circle cx="38" cy="52" r="4.5" fill="#1E293B"/>
            <circle cx="58" cy="52" r="4.5" fill="#1E293B"/>
            <polygon points="43,60 53,60 48,66" fill="#F43F5E"/>
            <path d="M39 69 Q48 80 57 69 Z" fill="#EF4444" stroke="#451A03" stroke-width="2"/>
          </g>

          <!-- Center Top: Explorer Safari Pith Helmet + Lush Leaves -->
          <g transform="translate(245, -2)">
            <ellipse cx="55" cy="72" rx="62" ry="18" fill="#D97706" stroke="#451A03" stroke-width="3.5"/>
            <path d="M10 68 C10 18 100 18 100 68 Z" fill="#FDE68A" stroke="#451A03" stroke-width="3.5"/>
            <path d="M14 56 Q55 66 96 56" stroke="#92400E" stroke-width="8" fill="none"/>
            <!-- Green Jungle Leaves Under Hat -->
            <ellipse cx="20" cy="82" rx="22" ry="11" fill="#22C55E" stroke="#14532D" stroke-width="2.5"/>
            <ellipse cx="90" cy="82" rx="22" ry="11" fill="#22C55E" stroke="#14532D" stroke-width="2.5"/>
            <ellipse cx="55" cy="86" rx="26" ry="12" fill="#4ADE80" stroke="#14532D" stroke-width="2.5"/>
          </g>

          <!-- Inner Right: Cute Giraffe -->
          <g transform="translate(385, -8)">
            <rect x="28" y="45" width="24" height="65" rx="10" fill="#FBBF24" stroke="#451A03" stroke-width="3"/>
            <circle cx="36" cy="68" r="5" fill="#B45309"/>
            <circle cx="44" cy="85" r="6" fill="#B45309"/>
            <!-- Giraffe Head -->
            <ellipse cx="45" cy="38" rx="22" ry="17" fill="#FDE047" stroke="#451A03" stroke-width="3"/>
            <ellipse cx="56" cy="42" rx="12" ry="10" fill="#FBBF24" stroke="#451A03" stroke-width="2.5"/>
            <!-- Ossicones (Horns) -->
            <line x1="36" y1="22" x2="34" y2="10" stroke="#451A03" stroke-width="4"/>
            <circle cx="34" cy="10" r="5" fill="#78350F" stroke="#451A03" stroke-width="2"/>
            <line x1="48" y1="22" x2="50" y2="10" stroke="#451A03" stroke-width="4"/>
            <circle cx="50" cy="10" r="5" fill="#78350F" stroke="#451A03" stroke-width="2"/>
            <circle cx="42" cy="34" r="4" fill="#1E293B"/>
          </g>

          <!-- Far Right: Cute Baby Elephant with Raised Trunk -->
          <g transform="translate(465, 18)">
            <ellipse cx="20" cy="68" rx="24" ry="30" fill="#94A3B8" stroke="#334155" stroke-width="3"/>
            <ellipse cx="20" cy="68" rx="15" ry="20" fill="#FDA4AF"/>
            <ellipse cx="90" cy="68" rx="24" ry="30" fill="#94A3B8" stroke="#334155" stroke-width="3"/>
            <ellipse cx="90" cy="68" rx="15" ry="20" fill="#FDA4AF"/>
            <circle cx="55" cy="65" r="34" fill="#94A3B8" stroke="#334155" stroke-width="3.5"/>
            <circle cx="43" cy="56" r="4.5" fill="#1E293B"/>
            <circle cx="67" cy="56" r="4.5" fill="#1E293B"/>
            <!-- Raised Happy Trunk -->
            <path d="M48 68 Q28 65 25 32 Q25 22 34 25 Q40 28 38 48" fill="#94A3B8" stroke="#334155" stroke-width="3.5" stroke-linecap="round"/>
          </g>
        </svg>

        <!-- GIANT WOODEN SIGNBOARD -->
        <div style="position: relative; background: linear-gradient(180deg, #F59E0B 0%, #D97706 45%, #92400E 100%); border: 5px solid #451A03; border-radius: 34px; padding: 22px 30px 26px 30px; box-shadow: 0 12px 0 #451A03, 0 20px 35px rgba(0,0,0,0.45), inset 0 4px 0 #FEF08A;">
          <div class="font-cartoon text-stroke-brown" style="font-size: 3.4rem; font-weight: 900; color: #FACC15; line-height: 1; letter-spacing: 1px;">
            Petualangan
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 2px;">
            <span class="font-cartoon text-stroke-brown" style="font-size: 3.7rem; font-weight: 900; color: #FFFDF0; line-height: 1;">
              Mini Zoo
            </span>
            <!-- Golden Paw Emblem on Board -->
            <svg width="46" height="46" viewBox="0 0 36 36">
              <ellipse cx="18" cy="23" rx="9" ry="7.5" fill="#FACC15" stroke="#451A03" stroke-width="2.5"/>
              <circle cx="8" cy="14" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
              <circle cx="14.5" cy="10" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
              <circle cx="21.5" cy="10" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
              <circle cx="28" cy="14" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
            </svg>
          </div>
        </div>

        <!-- Birch Parchment Sub-Banner -->
        <div style="position: relative; margin: -14px auto 0 auto; width: 88%; background: linear-gradient(180deg, #FFFDF0 0%, #FDE68A 100%); border: 3.5px solid #78350F; border-radius: 18px; padding: 10px 20px; box-shadow: 0 6px 0 #451A03, 0 10px 18px rgba(0,0,0,0.3);">
          <div class="font-cartoon" style="font-size: 1.08rem; font-weight: 900; color: #451A03; line-height: 1.25;">
            Kenali Hewan, Jelajahi Kerajaan,<br>dan Tunjukkan Pengetahuanmu!
          </div>
        </div>
      </div>

      <!-- FOREGROUND LEFT: SURVIVOR EXPLORER BOY + CORGI COMPANION (Custom Vector SVG) -->
      <svg viewBox="0 0 310 330" style="position: absolute; left: 8px; bottom: -6px; width: 295px; height: 315px; z-index: 25; pointer-events: none;">
        <!-- Survivor Boy Explorer -->
        <g transform="translate(10, 15)">
          <!-- Backpack -->
          <rect x="22" y="165" width="55" height="95" rx="18" fill="#92400E" stroke="#451A03" stroke-width="3.5"/>
          <!-- Raised Cheering Right Arm -->
          <path d="M35 190 Q5 145 22 105" stroke="#FDBA74" stroke-width="24" stroke-linecap="round" fill="none"/>
          <path d="M35 190 Q5 145 22 105" stroke="#451A03" stroke-width="29" stroke-linecap="round" fill="none" opacity="0.15"/>
          <circle cx="22" cy="100" r="15" fill="#FDBA74" stroke="#451A03" stroke-width="3.5"/>
          <!-- Khaki Safari Shirt & Torso -->
          <path d="M35 175 L135 175 L145 295 L25 295 Z" fill="#FDE68A" stroke="#451A03" stroke-width="3.5"/>
          <!-- Shirt Pockets & Belt -->
          <rect x="48" y="210" width="26" height="26" rx="4" fill="#FCD34D" stroke="#451A03" stroke-width="2.5"/>
          <rect x="96" y="210" width="26" height="26" rx="4" fill="#FCD34D" stroke="#451A03" stroke-width="2.5"/>
          <rect x="28" y="262" width="114" height="16" fill="#78350F" stroke="#451A03" stroke-width="3"/>
          <rect x="74" y="259" width="22" height="22" rx="3" fill="#FACC15" stroke="#451A03" stroke-width="2.5"/>
          <!-- Red Scout Neckerchief -->
          <path d="M52 172 Q85 205 118 172 L102 212 L85 195 L68 212 Z" fill="#EF4444" stroke="#451A03" stroke-width="3"/>
          <!-- Head & Ears -->
          <circle cx="38" cy="122" r="12" fill="#FDBA74" stroke="#451A03" stroke-width="3"/>
          <circle cx="136" cy="122" r="12" fill="#FDBA74" stroke="#451A03" stroke-width="3"/>
          <rect x="42" y="72" width="90" height="88" rx="42" fill="#FDBA74" stroke="#451A03" stroke-width="3.5"/>
          <!-- Hair -->
          <path d="M40 102 Q55 68 90 72 Q125 68 135 102 Q115 82 88 88 Q62 82 40 102 Z" fill="#5C2D0C" stroke="#451A03" stroke-width="3"/>
          <!-- Big Anime Eyes & Happy Smile -->
          <ellipse cx="68" cy="116" rx="8" ry="10" fill="#1E293B"/>
          <circle cx="71" cy="112" r="3.5" fill="#FFFFFF"/>
          <ellipse cx="108" cy="116" rx="8" ry="10" fill="#1E293B"/>
          <circle cx="111" cy="112" r="3.5" fill="#FFFFFF"/>
          <ellipse cx="54" cy="128" rx="7" ry="4" fill="#FB7185" opacity="0.55"/>
          <ellipse cx="122" cy="128" rx="7" ry="4" fill="#FB7185" opacity="0.55"/>
          <path d="M74 132 Q88 150 102 132 Z" fill="#EF4444" stroke="#451A03" stroke-width="2.8"/>
          <!-- Safari Pith Helmet -->
          <ellipse cx="88" cy="76" rx="72" ry="22" fill="#FCD34D" stroke="#451A03" stroke-width="3.5"/>
          <path d="M32 72 C32 15 144 15 144 72 Z" fill="#FDE68A" stroke="#451A03" stroke-width="3.5"/>
          <path d="M36 58 Q88 70 140 58" stroke="#B45309" stroke-width="9" fill="none"/>
        </g>

        <!-- Cute Corgi Companion with Red Bandana -->
        <g transform="translate(155, 165)">
          <!-- Ears -->
          <polygon points="18,45 8,5 45,28" fill="#F97316" stroke="#451A03" stroke-width="3.5"/>
          <polygon points="22,40 15,14 40,30" fill="#FECDD3"/>
          <polygon points="102,45 112,5 75,28" fill="#F97316" stroke="#451A03" stroke-width="3.5"/>
          <polygon points="98,40 105,14 80,30" fill="#FECDD3"/>
          <!-- Head & Body -->
          <ellipse cx="60" cy="115" rx="46" ry="42" fill="#F97316" stroke="#451A03" stroke-width="3.5"/>
          <ellipse cx="60" cy="120" rx="30" ry="28" fill="#FFFDF0"/>
          <ellipse cx="60" cy="62" rx="44" ry="36" fill="#F97316" stroke="#451A03" stroke-width="3.5"/>
          <!-- White Face Blaze -->
          <path d="M60 32 Q42 60 35 82 Q60 95 85 82 Q78 60 60 32 Z" fill="#FFFDF0"/>
          <!-- Eyes, Nose & Happy Tongue -->
          <circle cx="43" cy="56" r="6" fill="#1E293B"/>
          <circle cx="45" cy="54" r="2.2" fill="#FFF"/>
          <circle cx="77" cy="56" r="6" fill="#1E293B"/>
          <circle cx="79" cy="54" r="2.2" fill="#FFF"/>
          <ellipse cx="60" cy="66" rx="7" ry="5" fill="#1E293B"/>
          <path d="M52 74 Q60 92 68 74 Z" fill="#FB7185" stroke="#451A03" stroke-width="2.5"/>
          <!-- Red Bandana with White Paw -->
          <path d="M24 92 Q60 108 96 92 L60 128 Z" fill="#EF4444" stroke="#451A03" stroke-width="3"/>
          <circle cx="60" cy="110" r="4.5" fill="#FFFFFF"/>
          <!-- Waving Paw -->
          <ellipse cx="112" cy="96" rx="14" ry="18" transform="rotate(25 112 96)" fill="#FFFDF0" stroke="#451A03" stroke-width="3.5"/>
          <ellipse cx="112" cy="98" rx="6" ry="5" fill="#FDA4AF"/>
        </g>
      </svg>

      <!-- BOTTOM-CENTER GLOSSY GREEN CTA BUTTON (Matching Reference 1) -->
      <div style="position: absolute; left: 54%; bottom: 26px; transform: translateX(-50%); z-index: 30;">
        <button class="wood-framed-green-btn" onclick="playTone(); showZooScreen('s2', document.querySelectorAll('.preview-nav-btn')[1]);">
          <div class="green-glossy-inner">
            <!-- Rounded Play Icon -->
            <svg width="34" height="34" viewBox="0 0 36 36">
              <path d="M8 6 C8 3 11 2 14 4 L29 14 C32 16 32 20 29 22 L14 32 C11 34 8 33 8 30 Z" fill="#FFFFFF" stroke="#14532D" stroke-width="3"/>
            </svg>
            <div class="green-btn-label">
              Mulai<br>Petualangan
            </div>
          </div>
        </button>
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- SCREEN 2: MISI PEMAIN / PETUNJUK (Matching Reference 3)            -->
    <!-- ================================================================== -->
    <section id="zoo-s2" class="zoo-screen" style="z-index: 10;">
      <!-- Top-Left Hanging Wooden Sign -->
      <div class="wood-hanging-sign">
        <span class="wood-sign-text">Misi Pemain</span>
        <svg width="28" height="28" viewBox="0 0 36 36">
          <ellipse cx="18" cy="23" rx="9" ry="7.5" fill="#FACC15" stroke="#451A03" stroke-width="2.5"/>
          <circle cx="8" cy="14" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
          <circle cx="14.5" cy="10" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
          <circle cx="21.5" cy="10" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
          <circle cx="28" cy="14" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
        </svg>
      </div>

      <!-- Top-Right Mini Wooden Badge -->
      <div style="position: absolute; top: 16px; right: 20px; z-index: 30; background: linear-gradient(180deg, #F59E0B 0%, #B45309 100%); border: 3px solid #451A03; border-radius: 16px; padding: 6px 16px; box-shadow: 0 5px 0 #451A03;">
        <span class="font-cartoon text-stroke-brown" style="color: #FDE047; font-size: 1rem; font-weight: 900;">Petualangan Mini Zoo</span>
      </div>

      <!-- Left: Survivor Pointing + Corgi on Rock -->
      <svg viewBox="0 0 320 340" style="position: absolute; left: 10px; bottom: -10px; width: 310px; height: 330px; z-index: 25; pointer-events: none;">
        <!-- Corgi + Survivor Pointing Right -->
        <g transform="translate(20, 20)">
          <rect x="45" y="175" width="90" height="115" rx="18" fill="#FDE68A" stroke="#451A03" stroke-width="3.5"/>
          <!-- Pointing Arm Extended Right -->
          <path d="M125 195 L215 150" stroke="#FDBA74" stroke-width="22" stroke-linecap="round"/>
          <circle cx="222" cy="146" r="12" fill="#FDBA74" stroke="#451A03" stroke-width="3"/>
          <path d="M60 172 Q90 205 120 172 L105 210 L90 195 L75 210 Z" fill="#EF4444" stroke="#451A03" stroke-width="3"/>
          <rect x="45" y="72" width="90" height="88" rx="42" fill="#FDBA74" stroke="#451A03" stroke-width="3.5"/>
          <path d="M43 102 Q58 68 90 72 Q125 68 135 102 Q115 82 88 88 Q62 82 43 102 Z" fill="#5C2D0C" stroke="#451A03" stroke-width="3"/>
          <ellipse cx="72" cy="116" rx="8" ry="10" fill="#1E293B"/>
          <circle cx="75" cy="112" r="3.5" fill="#FFFFFF"/>
          <ellipse cx="110" cy="116" rx="8" ry="10" fill="#1E293B"/>
          <circle cx="113" cy="112" r="3.5" fill="#FFFFFF"/>
          <path d="M76 132 Q90 148 104 132 Z" fill="#EF4444" stroke="#451A03" stroke-width="2.8"/>
          <ellipse cx="90" cy="76" rx="72" ry="22" fill="#FCD34D" stroke="#451A03" stroke-width="3.5"/>
          <path d="M34 72 C34 15 146 15 146 72 Z" fill="#FDE68A" stroke="#451A03" stroke-width="3.5"/>
        </g>
        <!-- Rock at bottom left -->
        <path d="M0 340 Q40 275 140 285 Q210 295 235 340 Z" fill="#94A3B8" stroke="#475569" stroke-width="3.5"/>
      </svg>

      <!-- Right: Giant Parchment Speech Bubble (Matching Reference 3) -->
      <div class="parchment-speech-bubble tail-left" style="position: absolute; right: 48px; top: 82px; width: 500px; z-index: 25;">
        <!-- Yellow Exclamation Rays Top-Left -->
        <svg width="60" height="60" viewBox="0 0 60 60" style="position: absolute; left: -45px; top: -25px;">
          <line x1="45" y1="45" x2="15" y2="15" stroke="#FACC15" stroke-width="8" stroke-linecap="round"/>
          <line x1="52" y1="30" x2="35" y2="5" stroke="#FACC15" stroke-width="8" stroke-linecap="round"/>
          <line x1="32" y1="52" x2="5" y2="38" stroke="#FACC15" stroke-width="8" stroke-linecap="round"/>
        </svg>

        <div class="font-cartoon" style="font-size: 1.55rem; font-weight: 800; line-height: 1.38; color: #451A03;">
          Tugasmu adalah menjelajahi<br>
          <span style="font-size: 1.75rem; font-weight: 900; color: #5C2D0C;">Mini Zoo,</span> menyelesaikan<br>
          semua <span style="color: #DC2626; font-weight: 900;">checkpoint hewan,</span><br>
          dan belajar tentang<br>
          <span style="color: #15803D; font-weight: 900;">jenis makanan</span> mereka!
        </div>
      </div>

      <!-- Bottom-Right Wooden Sign Board + Ayo Mulai Button -->
      <div style="position: absolute; right: 44px; bottom: 22px; width: 450px; background: linear-gradient(180deg, #D97706 0%, #92400E 100%); border: 4px solid #451A03; border-radius: 24px; padding: 14px 22px; text-align: center; box-shadow: 0 10px 0 #451A03, 0 16px 28px rgba(0,0,0,0.45); z-index: 25;">
        <div style="background: linear-gradient(180deg, #FACC15 0%, #F59E0B 100%); border: 3px solid #78350F; border-radius: 14px; padding: 6px 14px; margin-bottom: 12px;">
          <span class="font-cartoon text-stroke-brown" style="font-size: 1.35rem; font-weight: 900; color: #FFFDF0;">
            Siap untuk memulai petualangan?
          </span>
        </div>

        <button class="wood-framed-green-btn" onclick="playTone(); showZooScreen('s3', document.querySelectorAll('.preview-nav-btn')[2]);">
          <div class="green-glossy-inner" style="padding: 8px 36px;">
            <svg width="28" height="28" viewBox="0 0 36 36">
              <path d="M8 6 C8 3 11 2 14 4 L29 14 C32 16 32 20 29 22 L14 32 C11 34 8 33 8 30 Z" fill="#FFFFFF" stroke="#14532D" stroke-width="3"/>
            </svg>
            <span class="green-btn-label" style="font-size: 1.5rem;">Ayo Mulai!</span>
          </div>
        </button>
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- SCREEN 3: PETA UTAMA 3 KERAJAAN (Matching Reference 2)             -->
    <!-- ================================================================== -->
    <section id="zoo-s3" class="zoo-screen" style="z-index: 10;">
      <!-- Top-Left Hanging Wooden Sign -->
      <div class="wood-hanging-sign">
        <span class="wood-sign-text">Peta Utama</span>
        <svg width="28" height="28" viewBox="0 0 36 36">
          <ellipse cx="18" cy="23" rx="9" ry="7.5" fill="#FACC15" stroke="#451A03" stroke-width="2.5"/>
          <circle cx="8" cy="14" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
          <circle cx="14.5" cy="10" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
          <circle cx="21.5" cy="10" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
          <circle cx="28" cy="14" r="4" fill="#FACC15" stroke="#451A03" stroke-width="2.2"/>
        </svg>
      </div>

      <!-- Top-Right Compact Speech Bubble -->
      <div class="parchment-speech-bubble" style="position: absolute; top: 14px; right: 20px; width: 350px; padding: 10px 18px; border-radius: 22px; z-index: 30; font-size: 0.86rem; font-weight: 800; line-height: 1.35;">
        Ada tiga kerajaan di Mini Zoo ini:<br>
        <span style="color: #DC2626; font-weight: 900;">Karnivora</span>, <span style="color: #15803D; font-weight: 900;">Herbivora</span>, dan <span style="color: #7E22CE; font-weight: 900;">Omnivora</span>!<br>
        Ayo bantu aku menemukan semua survivor di setiap kerajaan!
      </div>

      <!-- River, Wooden Bridge & 3 Winding Stepping-Stone Paths SVG -->
      <svg viewBox="0 0 960 540" style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 8; pointer-events: none;">
        <!-- Sparkling Blue River -->
        <path d="M260 350 Q420 390 580 345 T960 390 L960 445 Q620 410 420 435 T210 395 Z" fill="#0EA5E9" opacity="0.85"/>
        <!-- Winding Dirt Paths to the 3 Castles -->
        <path d="M470 430 Q330 375 245 280" stroke="#FDE68A" stroke-width="34" fill="none" stroke-linecap="round"/>
        <path d="M470 430 Q485 350 485 275" stroke="#FDE68A" stroke-width="34" fill="none" stroke-linecap="round"/>
        <path d="M470 430 Q630 400 755 315" stroke="#FDE68A" stroke-width="34" fill="none" stroke-linecap="round"/>
        <!-- Stepping Stones Left (Karnivora) -->
        <ellipse cx="265" cy="295" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
        <ellipse cx="295" cy="322" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
        <ellipse cx="330" cy="348" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
        <ellipse cx="370" cy="372" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
        <!-- Stepping Stones Center (Herbivora) -->
        <ellipse cx="485" cy="295" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
        <ellipse cx="485" cy="325" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
        <ellipse cx="485" cy="355" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
        <!-- Wooden Bridge -->
        <path d="M435 395 Q485 375 535 395 L535 422 Q485 402 435 422 Z" fill="#D97706" stroke="#451A03" stroke-width="3"/>
        <!-- Stepping Stones Right (Omnivora) -->
        <ellipse cx="735" cy="340" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
        <ellipse cx="690" cy="368" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
        <ellipse cx="640" cy="392" rx="18" ry="8" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
      </svg>

      <!-- THREE ILLUSTRATED KINGDOM CASTLES (Matching Reference 2) -->
      <div style="position: absolute; top: 88px; left: 120px; right: 40px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 22px; z-index: 20;">
        
        <!-- 1. KERAJAAN KARNIVORA CASTLE -->
        <div onclick="playTone(); showZooScreen('s4', document.querySelectorAll('.preview-nav-btn')[3]);" style="cursor: pointer; text-align: center; transition: transform 0.15s ease;" onmouseover="this.style.transform='translateY(-5px) scale(1.03)'" onmouseout="this.style.transform=''">
          <svg viewBox="0 0 240 220" style="width: 100%; height: 205px; overflow: visible;">
            <!-- Castle Towers & Red Roofs -->
            <rect x="28" y="55" width="38" height="135" fill="#FDBA74" stroke="#7C2D12" stroke-width="3"/>
            <polygon points="22,55 47,20 72,55" fill="#DC2626" stroke="#7C2D12" stroke-width="3"/>
            <rect x="174" y="55" width="38" height="135" fill="#FDBA74" stroke="#7C2D12" stroke-width="3"/>
            <polygon points="168,55 193,20 218,55" fill="#DC2626" stroke="#7C2D12" stroke-width="3"/>
            <rect x="55" y="45" width="130" height="145" rx="8" fill="#FED7AA" stroke="#7C2D12" stroke-width="3.5"/>
            <!-- Top Meat Medallion -->
            <circle cx="120" cy="40" r="24" fill="#FDE68A" stroke="#7C2D12" stroke-width="3.5"/>
            <ellipse cx="120" cy="40" rx="14" ry="10" fill="#EF4444" stroke="#7C2D12" stroke-width="2.5"/>
            <circle cx="115" cy="38" r="3" fill="#FFFDF0"/>
            <!-- Curved Orange-Red Kingdom Sign -->
            <rect x="38" y="68" width="164" height="48" rx="14" fill="#EA580C" stroke="#451A03" stroke-width="3.5"/>
            <text x="120" y="89" text-anchor="middle" font-family="Fredoka" font-weight="900" font-size="16" fill="#FFFDF0">Kerajaan</text>
            <text x="120" y="109" text-anchor="middle" font-family="Fredoka" font-weight="900" font-size="19" fill="#FEF08A">Karnivora</text>
            <!-- Cream Sub-Banner -->
            <rect x="48" y="114" width="144" height="24" rx="8" fill="#FEF3C7" stroke="#78350F" stroke-width="2.5"/>
            <text x="120" y="130" text-anchor="middle" font-family="Fredoka" font-weight="800" font-size="12.5" fill="#451A03">Pemakan Daging</text>
            <!-- Glowing Gate Archway + Lion Silhouette -->
            <path d="M86 190 L86 158 Q120 132 154 158 L154 190 Z" fill="#FACC15" stroke="#78350F" stroke-width="3"/>
            <circle cx="120" cy="170" r="15" fill="#451A03"/>
          </svg>
        </div>

        <!-- 2. KERAJAAN HERBIVORA CASTLE -->
        <div onclick="playTone(); showZooScreen('s4', document.querySelectorAll('.preview-nav-btn')[3]);" style="cursor: pointer; text-align: center; transition: transform 0.15s ease;" onmouseover="this.style.transform='translateY(-5px) scale(1.03)'" onmouseout="this.style.transform=''">
          <svg viewBox="0 0 240 220" style="width: 100%; height: 205px; overflow: visible;">
            <rect x="28" y="55" width="38" height="135" fill="#FDE68A" stroke="#365314" stroke-width="3"/>
            <rect x="174" y="55" width="38" height="135" fill="#FDE68A" stroke="#365314" stroke-width="3"/>
            <rect x="55" y="45" width="130" height="145" rx="8" fill="#FEF9C3" stroke="#365314" stroke-width="3.5"/>
            <!-- Top Leaf Medallion -->
            <circle cx="120" cy="40" r="24" fill="#ECFCCB" stroke="#365314" stroke-width="3.5"/>
            <path d="M110 48 Q110 28 132 28 Q132 48 110 48 Z" fill="#22C55E" stroke="#14532D" stroke-width="2.5"/>
            <!-- Olive-Green Kingdom Sign -->
            <rect x="38" y="68" width="164" height="48" rx="14" fill="#65A30D" stroke="#1A2E05" stroke-width="3.5"/>
            <text x="120" y="89" text-anchor="middle" font-family="Fredoka" font-weight="900" font-size="16" fill="#FFFDF0">Kerajaan</text>
            <text x="120" y="109" text-anchor="middle" font-family="Fredoka" font-weight="900" font-size="19" fill="#FEF08A">Herbivora</text>
            <!-- Cream Sub-Banner -->
            <rect x="44" y="114" width="152" height="24" rx="8" fill="#FEF3C7" stroke="#365314" stroke-width="2.5"/>
            <text x="120" y="130" text-anchor="middle" font-family="Fredoka" font-weight="800" font-size="12.5" fill="#1A2E05">Pemakan Tumbuhan</text>
            <!-- Glowing Gate Archway + Deer Silhouette -->
            <path d="M86 190 L86 158 Q120 132 154 158 L154 190 Z" fill="#FACC15" stroke="#365314" stroke-width="3"/>
            <circle cx="120" cy="172" r="12" fill="#365314"/>
            <path d="M112 162 L105 148 M128 162 L135 148" stroke="#365314" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- 3. KERAJAAN OMNIVORA CASTLE -->
        <div onclick="playTone(); showZooScreen('s4', document.querySelectorAll('.preview-nav-btn')[3]);" style="cursor: pointer; text-align: center; transition: transform 0.15s ease;" onmouseover="this.style.transform='translateY(-5px) scale(1.03)'" onmouseout="this.style.transform=''">
          <svg viewBox="0 0 240 220" style="width: 100%; height: 205px; overflow: visible;">
            <rect x="28" y="55" width="38" height="135" fill="#E9D5FF" stroke="#4C1D95" stroke-width="3"/>
            <polygon points="22,55 47,20 72,55" fill="#9333EA" stroke="#4C1D95" stroke-width="3"/>
            <rect x="174" y="55" width="38" height="135" fill="#E9D5FF" stroke="#4C1D95" stroke-width="3"/>
            <polygon points="168,55 193,20 218,55" fill="#9333EA" stroke="#4C1D95" stroke-width="3"/>
            <rect x="55" y="45" width="130" height="145" rx="8" fill="#F3E8FF" stroke="#4C1D95" stroke-width="3.5"/>
            <!-- Top Leaf+Meat Medallion -->
            <circle cx="120" cy="40" r="24" fill="#F3E8FF" stroke="#4C1D95" stroke-width="3.5"/>
            <circle cx="114" cy="42" r="8" fill="#22C55E"/>
            <circle cx="126" cy="38" r="7" fill="#EF4444"/>
            <!-- Purple Kingdom Sign -->
            <rect x="38" y="68" width="164" height="48" rx="14" fill="#9333EA" stroke="#3B0764" stroke-width="3.5"/>
            <text x="120" y="89" text-anchor="middle" font-family="Fredoka" font-weight="900" font-size="16" fill="#FFFDF0">Kerajaan</text>
            <text x="120" y="109" text-anchor="middle" font-family="Fredoka" font-weight="900" font-size="19" fill="#FEF08A">Omnivora</text>
            <!-- Cream Sub-Banner -->
            <rect x="36" y="114" width="168" height="24" rx="8" fill="#FEF3C7" stroke="#4C1D95" stroke-width="2.5"/>
            <text x="120" y="130" text-anchor="middle" font-family="Fredoka" font-weight="800" font-size="11.5" fill="#3B0764">Tumbuhan &amp; Hewan</text>
            <!-- Glowing Gate Archway + Bear Silhouette -->
            <path d="M86 190 L86 158 Q120 132 154 158 L154 190 Z" fill="#FACC15" stroke="#4C1D95" stroke-width="3"/>
            <circle cx="120" cy="172" r="13" fill="#3B0764"/>
            <circle cx="110" cy="160" r="5" fill="#3B0764"/>
            <circle cx="130" cy="160" r="5" fill="#3B0764"/>
          </svg>
        </div>

      </div>

      <!-- Bottom-Center Wooden Banner "Selamat Bertualang!" + Right Green CTA -->
      <div style="position: absolute; left: 50%; bottom: 20px; transform: translateX(-50%); background: linear-gradient(180deg, #F59E0B 0%, #B45309 100%); border: 3.5px solid #451A03; border-radius: 18px; padding: 10px 26px; box-shadow: 0 6px 0 #451A03; z-index: 25; display: flex; align-items: center; gap: 10px;">
        <span class="font-cartoon text-stroke-brown" style="font-size: 1.45rem; font-weight: 900; color: #FDE047;">Selamat Bertualang!</span>
      </div>

      <div style="position: absolute; right: 24px; bottom: 18px; z-index: 30;">
        <button class="wood-framed-green-btn" onclick="playTone(); showZooScreen('s4', document.querySelectorAll('.preview-nav-btn')[3]);">
          <div class="green-glossy-inner" style="padding: 8px 24px;">
            <svg width="24" height="24" viewBox="0 0 36 36">
              <path d="M8 6 C8 3 11 2 14 4 L29 14 C32 16 32 20 29 22 L14 32 C11 34 8 33 8 30 Z" fill="#FFFFFF" stroke="#14532D" stroke-width="3"/>
            </svg>
            <div class="green-btn-label" style="font-size: 1.15rem;">Mulai<br>Petualangan</div>
          </div>
        </button>
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- SCREEN 4: STUDIO TANTANGAN KUIS SATWA (Styled to Match 100%!)      -->
    <!-- ================================================================== -->
    <section id="zoo-s4" class="zoo-screen" style="z-index: 10;">
      <!-- Top-Left Hanging Wooden Sign -->
      <div class="wood-hanging-sign">
        <span class="wood-sign-text">Kerajaan Karnivora</span>
      </div>

      <!-- Top-Right Stepping Stones Checkpoint Indicator -->
      <div style="position: absolute; top: 18px; right: 24px; z-index: 30; background: linear-gradient(180deg, #F59E0B 0%, #B45309 100%); border: 3.5px solid #451A03; border-radius: 999px; padding: 6px 18px; box-shadow: 0 5px 0 #451A03; display: flex; align-items: center; gap: 10px;">
        <span class="font-cartoon text-stroke-brown" style="color: #FFFDF0; font-size: 0.95rem; font-weight: 900;">Pos Hewan: 1 / 5</span>
      </div>

      <!-- Center Quiz Stage: Illustrated Animal Frame + Parchment Clue Bubble -->
      <div style="position: absolute; top: 96px; left: 40px; right: 40px; display: grid; grid-template-columns: 230px 1fr; gap: 24px; align-items: center; z-index: 25;">
        
        <!-- Wooden Illustrated Frame with Cute Lion -->
        <div style="background: linear-gradient(180deg, #FEF9C3 0%, #FDE047 100%); border: 6px solid #B45309; outline: 3.5px solid #451A03; border-radius: 28px; padding: 14px; box-shadow: 0 10px 0 #451A03, 0 16px 28px rgba(0,0,0,0.35); text-align: center;">
          <svg viewBox="0 0 120 120" width="165" height="165">
            <circle cx="60" cy="62" r="46" fill="#B45309" stroke="#451A03" stroke-width="3.5"/>
            <circle cx="60" cy="64" r="33" fill="#FBBF24" stroke="#451A03" stroke-width="3"/>
            <circle cx="36" cy="38" r="10" fill="#F59E0B" stroke="#451A03" stroke-width="3"/>
            <circle cx="84" cy="38" r="10" fill="#F59E0B" stroke="#451A03" stroke-width="3"/>
            <circle cx="48" cy="58" r="5.5" fill="#1E293B"/>
            <circle cx="50" cy="56" r="2.2" fill="#FFF"/>
            <circle cx="72" cy="58" r="5.5" fill="#1E293B"/>
            <circle cx="74" cy="56" r="2.2" fill="#FFF"/>
            <polygon points="54,66 66,66 60,73" fill="#78350F"/>
            <path d="M48 76 Q60 90 72 76 Z" fill="#EF4444" stroke="#451A03" stroke-width="2.5"/>
          </svg>
        </div>

        <!-- Parchment Speech Bubble Clue -->
        <div class="parchment-speech-bubble tail-left" style="text-align: left; padding: 22px 28px;">
          <div style="display: inline-block; background: #DC2626; color: #FFFDF0; font-family: 'Fredoka'; font-weight: 900; font-size: 0.85rem; padding: 4px 14px; border-radius: 999px; border: 2px solid #451A03; margin-bottom: 8px;">
            TEKA-TEKI SATWA #1
          </div>
          <h3 class="font-cartoon" style="margin: 0 0 6px 0; font-size: 1.8rem; font-weight: 900; color: #451A03;">
            Siapakah Aku?
          </h3>
          <p class="font-cartoon" style="margin: 0; font-size: 1.25rem; font-weight: 700; color: #5C2D0C; line-height: 1.35;">
            "Aku adalah <span style="color: #DC2626; font-weight: 900;">pemakan daging</span> yang gagah. Aku memiliki <span style="color: #B45309; font-weight: 900;">surai lebat</span> di sekitar kepala dan leherku!"
          </p>
        </div>
      </div>

      <!-- Bottom: 3 Glossy Wooden-Framed Option Buttons -->
      <div style="position: absolute; bottom: 26px; left: 40px; right: 40px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; z-index: 30;">
        <button class="wood-framed-green-btn" onclick="playTone(); showZooScreen('s5', document.querySelectorAll('.preview-nav-btn')[4]);" style="width: 100%;">
          <div class="green-glossy-inner" style="width: 100%; justify-content: center; padding: 12px 18px;">
            <span class="green-btn-label" style="font-size: 1.35rem;">A. Singa</span>
          </div>
        </button>

        <button class="wood-framed-green-btn" onclick="playTone();" style="width: 100%; filter: hue-rotate(-35deg);">
          <div class="green-glossy-inner" style="width: 100%; justify-content: center; padding: 12px 18px; background: linear-gradient(180deg, #FBBF24 0%, #D97706 100%); border-color: #78350F;">
            <span class="green-btn-label" style="font-size: 1.35rem;">B. Harimau</span>
          </div>
        </button>

        <button class="wood-framed-green-btn" onclick="playTone();" style="width: 100%;">
          <div class="green-glossy-inner" style="width: 100%; justify-content: center; padding: 12px 18px; background: linear-gradient(180deg, #FBBF24 0%, #D97706 100%); border-color: #78350F;">
            <span class="green-btn-label" style="font-size: 1.35rem;">C. Serigala</span>
          </div>
        </button>
      </div>
    </section>

    <!-- ================================================================== -->
    <!-- SCREEN 5: ISTANA & KRISTAL PERSATUAN (Matching References 4 & 5)   -->
    <!-- ================================================================== -->
    <section id="zoo-s5" class="zoo-screen" style="z-index: 10; background: radial-gradient(circle at 50% 45%, #FEF08A 0%, #C084FC 45%, #4C1D95 95%);">
      
      <!-- Top Royal Ribbon Banner (Matching Reference 4 & 5) -->
      <div style="position: absolute; top: 16px; left: 50%; transform: translateX(-50%); width: 640px; text-align: center; z-index: 30;">
        <div style="background: linear-gradient(180deg, #DC2626 0%, #991B1B 100%); border: 4px solid #FACC15; border-radius: 22px; padding: 8px 28px; box-shadow: 0 8px 0 #450A0A, 0 14px 28px rgba(0,0,0,0.45);">
          <div class="font-cartoon text-stroke-brown" style="font-size: 1.85rem; font-weight: 900; color: #FFFDF0;">
            Kristal Persatuan Mini Zoo
          </div>
        </div>
        <div style="margin: -8px auto 0 auto; width: 82%; background: linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%); border: 3px solid #92400E; border-radius: 12px; padding: 5px 16px;">
          <span class="font-cartoon" style="font-size: 0.95rem; font-weight: 900; color: #451A03;">
            Simbol persatuan seluruh penghuni Mini Zoo!
          </span>
        </div>
      </div>

      <!-- Center Glowing Golden Altar + 3 Kingdom Crystals + Prismatic Crystal SVG -->
      <svg viewBox="0 0 500 320" style="position: absolute; left: 36%; top: 54%; transform: translate(-50%, -50%); width: 460px; height: 300px; z-index: 20;">
        <!-- Swirling Magical Energy Rings -->
        <ellipse cx="250" cy="145" rx="175" ry="52" fill="none" stroke="#FEF08A" stroke-width="5" opacity="0.7" transform="rotate(-8 250 145)"/>
        <ellipse cx="250" cy="145" rx="155" ry="42" fill="none" stroke="#F472B6" stroke-width="4" opacity="0.6" transform="rotate(10 250 145)"/>

        <!-- Left: Red Ruby Crystal (Karnivora) -->
        <g transform="translate(95, 75)">
          <polygon points="35,0 70,35 55,90 15,90 0,35" fill="#EF4444" stroke="#FEF08A" stroke-width="3.5"/>
          <polygon points="35,0 55,35 35,90 15,35" fill="#F87171" opacity="0.6"/>
          <circle cx="35" cy="48" r="10" fill="#FACC15"/>
        </g>

        <!-- Center: Green Emerald / Rainbow Crystal (Herbivora & Unity) -->
        <g transform="translate(205, 35)">
          <polygon points="45,0 90,45 72,115 18,115 0,45" fill="#22C55E" stroke="#FEF08A" stroke-width="4"/>
          <polygon points="45,0 72,45 45,115 18,45" fill="#86EFAC" opacity="0.65"/>
          <path d="M35 68 Q35 45 58 45 Q58 68 35 68 Z" fill="#14532D"/>
        </g>

        <!-- Right: Purple Amethyst Crystal (Omnivora) -->
        <g transform="translate(335, 75)">
          <polygon points="35,0 70,35 55,90 15,90 0,35" fill="#A855F7" stroke="#FEF08A" stroke-width="3.5"/>
          <polygon points="35,0 55,35 35,90 15,35" fill="#D8B4FE" opacity="0.6"/>
          <circle cx="35" cy="48" r="10" fill="#E9D5FF"/>
        </g>

        <!-- Golden Altar Pedestal -->
        <ellipse cx="250" cy="235" rx="125" ry="26" fill="#FACC15" stroke="#78350F" stroke-width="4"/>
        <rect x="145" y="235" width="210" height="55" rx="12" fill="#EAB308" stroke="#78350F" stroke-width="4"/>
        <circle cx="250" cy="258" r="24" fill="#9333EA" stroke="#FEF08A" stroke-width="3.5"/>
        <circle cx="250" cy="260" r="9" fill="#FACC15"/>
      </svg>

      <!-- Right Parchment Victory Scroll (Matching Reference 5) -->
      <div class="parchment-speech-bubble" style="position: absolute; right: 24px; top: 125px; width: 310px; padding: 18px 22px; z-index: 30;">
        <div class="font-cartoon" style="color: #B91C1C; font-size: 1.2rem; font-weight: 900; margin-bottom: 6px;">
          Selamat, Petualang Hebat!
        </div>
        <p class="font-cartoon" style="margin: 0 0 8px 0; font-size: 0.9rem; font-weight: 800; color: #451A03; line-height: 1.35;">
          Kamu telah menyelesaikan petualangan luar biasa di Mini Zoo! Dengan keberanian, pengetahuan, dan hati yang baik, kini seluruh hewan bersatu dalam harmoni!
        </p>
        <div class="font-cartoon" style="color: #6B21A8; font-size: 0.98rem; font-weight: 900;">
          Mini Zoo selalu lebih kuat bersama!
        </div>
      </div>

      <!-- Bottom-Right Replay Button -->
      <div style="position: absolute; right: 44px; bottom: 24px; z-index: 30;">
        <button class="wood-framed-green-btn" onclick="playTone(); showZooScreen('s1', document.querySelectorAll('.preview-nav-btn')[0]);">
          <div class="green-glossy-inner" style="padding: 8px 28px;">
            <span class="green-btn-label" style="font-size: 1.2rem;">Main Lagi</span>
          </div>
        </button>
      </div>
    </section>

  </div>
</div>

<script>
  function showZooScreen(id, btn) {
    document.querySelectorAll('.zoo-screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.preview-nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('zoo-' + id).classList.add('active');
    btn.classList.add('active');
  }

  function playTone() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.07);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch(e) {}
  }
</script>
`;

const outPath = path.join(__dirname, '..', '.superpowers', 'brainstorm', 'session-1', 'content', 'pure-ui-recreation.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Generated pure-ui-recreation.html:', (fs.statSync(outPath).size / 1024).toFixed(1) + ' KB');
