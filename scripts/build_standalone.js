/**
 * Petualangan Mini Zoo - Standalone Bundle Compiler
 * Inlines Apps Script HTML partials (Stylesheet, GameData, JavaScript)
 * into a single self-contained index.html file for standard browsers.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_SRC_DIR = path.join(ROOT_DIR, 'src');
const DEFAULT_DEST_PATH = path.join(ROOT_DIR, 'index.html');

/**
 * Normalizes content into `<style>` block if not already wrapped
 */
function wrapStyle(content) {
  if (!content) return '';
  const trimmed = content.trim();
  if (trimmed.startsWith('<style') && trimmed.endsWith('</style>')) {
    return trimmed;
  }
  return `<style>\n${trimmed}\n</style>`;
}

/**
 * Normalizes content into `<script>` block if not already wrapped
 */
function wrapScript(content) {
  if (!content) return '';
  const trimmed = content.trim();
  if (trimmed.startsWith('<script') && trimmed.endsWith('</script>')) {
    return trimmed;
  }
  return `<script>\n${trimmed}\n</script>`;
}

/**
 * Compiles a standalone HTML bundle from source files or strings.
 * @param {Object} options
 * @param {string} [options.srcDir] - Directory containing source partials
 * @param {string} [options.destPath] - Output file path
 * @param {string} [options.indexContent] - Direct Index.html content (optional)
 * @param {string} [options.stylesheetContent] - Direct Stylesheet.html content (optional)
 * @param {string} [options.gameDataContent] - Direct GameData.html content (optional)
 * @param {string} [options.jsContent] - Direct JavaScript.html content (optional)
 * @param {boolean} [options.dryRun=false] - If true, skips writing to disk
 * @returns {string|null} The bundled HTML string, or null if source Index is missing
 */
function compileStandalone(options = {}) {
  const srcDir = options.srcDir || DEFAULT_SRC_DIR;
  const destPath = options.destPath || DEFAULT_DEST_PATH;
  const dryRun = Boolean(options.dryRun);

  let indexHtml = options.indexContent;
  let stylesheet = options.stylesheetContent;
  let gameData = options.gameDataContent;
  let js = options.jsContent;

  const indexPath = path.join(srcDir, 'Index.html');
  const stylesheetPath = path.join(srcDir, 'Stylesheet.html');
  const gameDataPath = path.join(srcDir, 'GameData.html');
  const jsPath = path.join(srcDir, 'JavaScript.html');

  if (indexHtml === undefined) {
    if (fs.existsSync(indexPath)) {
      indexHtml = fs.readFileSync(indexPath, 'utf8');
    } else {
      console.warn(`[build] Notice: "${indexPath}" not found. Cannot compile bundle.`);
      return null;
    }
  }

  if (stylesheet === undefined && fs.existsSync(stylesheetPath)) {
    stylesheet = fs.readFileSync(stylesheetPath, 'utf8');
  }

  if (gameData === undefined && fs.existsSync(gameDataPath)) {
    gameData = fs.readFileSync(gameDataPath, 'utf8');
  }

  if (js === undefined && fs.existsSync(jsPath)) {
    js = fs.readFileSync(jsPath, 'utf8');
  }

  let bundle = indexHtml;

  // Track whether replacements took place
  let replacedStylesheet = false;
  let replacedGameData = false;
  let replacedJs = false;

  const styleBlock = stylesheet ? wrapStyle(stylesheet) : '';
  const gameDataBlock = gameData ? wrapScript(gameData) : '';
  const jsBlock = js ? wrapScript(js) : '';

  // 1. Replace include('Stylesheet')
  const styleRegex = /<\?!\s*=\s*include\(['"](?:src\/)?Stylesheet(?:\.html)?['"]\);?\s*\?>/gi;
  if (styleRegex.test(bundle)) {
    bundle = bundle.replace(styleRegex, () => {
      replacedStylesheet = true;
      return styleBlock;
    });
  }

  // 2. Replace include('GameData')
  const gameDataRegex = /<\?!\s*=\s*include\(['"](?:src\/)?GameData(?:\.html)?['"]\);?\s*\?>/gi;
  if (gameDataRegex.test(bundle)) {
    bundle = bundle.replace(gameDataRegex, () => {
      replacedGameData = true;
      return gameDataBlock;
    });
  }

  // 3. Replace include('JavaScript')
  const jsRegex = /<\?!\s*=\s*include\(['"](?:src\/)?JavaScript(?:\.html)?['"]\);?\s*\?>/gi;
  if (jsRegex.test(bundle)) {
    bundle = bundle.replace(jsRegex, () => {
      replacedJs = true;
      return jsBlock;
    });
  }

  // Fallback inlining if include tags were not present
  if (!replacedStylesheet && styleBlock) {
    if (bundle.includes('</head>')) {
      bundle = bundle.replace('</head>', `${styleBlock}\n</head>`);
    } else {
      bundle = styleBlock + '\n' + bundle;
    }
  }

  if (!replacedGameData && gameDataBlock) {
    if (bundle.includes('</body>')) {
      bundle = bundle.replace('</body>', `${gameDataBlock}\n</body>`);
    } else {
      bundle = bundle + '\n' + gameDataBlock;
    }
  }

  if (!replacedJs && jsBlock) {
    if (bundle.includes('</body>')) {
      bundle = bundle.replace('</body>', `${jsBlock}\n</body>`);
    } else {
      bundle = bundle + '\n' + jsBlock;
    }
  }

  // Strip any remaining Apps Script scriptlet include tags: <?!= ... ?> or <?= ... ?>
  bundle = bundle.replace(/<\?!=?\s*include\(['"][^'"]+['"]\);?\s*\?>/gi, '');
  bundle = bundle.replace(/<\?!=[\s\S]*?\?>/g, '');

  const bytes = Buffer.byteLength(bundle, 'utf8');
  const sizeKb = (bytes / 1024).toFixed(2);

  if (!dryRun) {
    fs.writeFileSync(destPath, bundle, 'utf8');
    console.log(`[build] Standalone bundle generated: ${destPath} (${sizeKb} KB, ${bytes} bytes)`);
    if (bytes > 1024 * 1024) {
      console.warn(`[build] Warning: Bundle size exceeds 1 MB limit (${sizeKb} KB)`);
    }
  }

  return bundle;
}

if (require.main === module) {
  compileStandalone();
}

module.exports = {
  compileStandalone,
  wrapStyle,
  wrapScript
};
