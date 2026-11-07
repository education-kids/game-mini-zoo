/**
 * Prepares the clean `www` web directory for Android Capacitor packaging.
 * Ensures the APK only packages lightweight game runtime assets (< 3MB)
 * without bloating from docx, zip, node_modules, or source code.
 */

const fs = require('fs');
const path = require('path');
const { compileStandalone } = require('./build_standalone');

const ROOT_DIR = path.resolve(__dirname, '..');
const WWW_DIR = path.join(ROOT_DIR, 'www');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function prepareWww() {
  console.log('[build-www] Compiling standalone HTML bundle...');
  compileStandalone();

  if (!fs.existsSync(WWW_DIR)) {
    fs.mkdirSync(WWW_DIR, { recursive: true });
  }

  // Copy compiled index.html
  fs.copyFileSync(path.join(ROOT_DIR, 'index.html'), path.join(WWW_DIR, 'index.html'));

  // Copy manifest.json & sw.js
  if (fs.existsSync(path.join(ROOT_DIR, 'manifest.json'))) {
    fs.copyFileSync(path.join(ROOT_DIR, 'manifest.json'), path.join(WWW_DIR, 'manifest.json'));
  }
  if (fs.existsSync(path.join(ROOT_DIR, 'sw.js'))) {
    fs.copyFileSync(path.join(ROOT_DIR, 'sw.js'), path.join(WWW_DIR, 'sw.js'));
  }

  // Copy assets/animals
  const animalsSrc = path.join(ROOT_DIR, 'assets', 'animals');
  const animalsDest = path.join(WWW_DIR, 'assets', 'animals');
  if (fs.existsSync(animalsSrc)) {
    copyDirRecursive(animalsSrc, animalsDest);
  }

  // Copy assets/slides (Google Drive authentic designs)
  const slidesSrc = path.join(ROOT_DIR, 'assets', 'slides');
  const slidesDest = path.join(WWW_DIR, 'assets', 'slides');
  if (fs.existsSync(slidesSrc)) {
    copyDirRecursive(slidesSrc, slidesDest);
  }

  // Copy assets/minimaps (Google Drive authentic minimap checkpoints)
  const minimapsSrc = path.join(ROOT_DIR, 'assets', 'minimaps');
  const minimapsDest = path.join(WWW_DIR, 'assets', 'minimaps');
  if (fs.existsSync(minimapsSrc)) {
    copyDirRecursive(minimapsSrc, minimapsDest);
  }

  // Copy assets/qr (Assemblr Edu AR 3D QR Codes)
  const qrSrc = path.join(ROOT_DIR, 'assets', 'qr');
  const qrDest = path.join(WWW_DIR, 'assets', 'qr');
  if (fs.existsSync(qrSrc)) {
    copyDirRecursive(qrSrc, qrDest);
  }

  // Copy assets/audio (In-game background music)
  const audioSrc = path.join(ROOT_DIR, 'assets', 'audio');
  const audioDest = path.join(WWW_DIR, 'assets', 'audio');
  if (fs.existsSync(audioSrc)) {
    copyDirRecursive(audioSrc, audioDest);
  }

  console.log(`[build-www] Successfully prepared clean web assets in: ${WWW_DIR}`);
}

if (require.main === module) {
  prepareWww();
}

module.exports = { prepareWww };
