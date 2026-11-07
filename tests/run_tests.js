/**
 * Petualangan Mini Zoo - Test Runner
 * Lightweight zero-dependency test runner for Node.js
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const SCRIPTS_DIR = path.join(ROOT_DIR, 'scripts');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function describe(suiteName, fn) {
  console.log(`\n--- ${suiteName} ---`);
  fn();
}

function it(testName, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✓ ${testName}`);
  } catch (err) {
    failedTests++;
    console.error(`  ✗ ${testName}`);
    console.error(`    ${err.message}`);
    failureDetails.push({ suiteName: '', testName, error: err });
  }
}

// =============================================================================
// Task 1: Environment Setup & Project Structure Tests
// =============================================================================
describe('Environment & Project Structure', () => {
  it('package.json exists and is valid JSON', () => {
    const pkgPath = path.join(ROOT_DIR, 'package.json');
    assert.ok(fs.existsSync(pkgPath), 'package.json must exist in project root');
    const raw = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(raw);
    assert.strictEqual(pkg.name, 'petualangan-mini-zoo', 'Package name must be petualangan-mini-zoo');
    assert.strictEqual(pkg.version, '2.0.0', 'Package version must be 2.0.0');
    assert.ok(pkg.scripts && pkg.scripts.test, 'package.json must define scripts.test');
    assert.ok(pkg.scripts && pkg.scripts.build, 'package.json must define scripts.build');
  });

  it('src directory exists or is created', () => {
    if (!fs.existsSync(SRC_DIR)) {
      fs.mkdirSync(SRC_DIR, { recursive: true });
    }
    assert.ok(fs.existsSync(SRC_DIR), 'src/ directory must exist');
    assert.ok(fs.statSync(SRC_DIR).isDirectory(), 'src must be a directory');
  });

  it('scripts/build_standalone.js exists and exports compileStandalone', () => {
    const buildScriptPath = path.join(SCRIPTS_DIR, 'build_standalone.js');
    assert.ok(fs.existsSync(buildScriptPath), 'scripts/build_standalone.js must exist');
    const compiler = require(buildScriptPath);
    assert.strictEqual(typeof compiler.compileStandalone, 'function', 'Must export compileStandalone function');
  });
});

// =============================================================================
// Task 1: Standalone Build Compiler Unit Tests
// =============================================================================
describe('Standalone Build Compiler (scripts/build_standalone.js)', () => {
  it('correctly inlines CSS, GameData, and JS into HTML template and strips include tags', () => {
    const buildScriptPath = path.join(SCRIPTS_DIR, 'build_standalone.js');
    assert.ok(fs.existsSync(buildScriptPath), 'scripts/build_standalone.js must exist');
    const { compileStandalone } = require(buildScriptPath);

    const mockIndex = `<!DOCTYPE html>
<html>
<head>
  <title>Test Zoo</title>
  <?!= include('Stylesheet'); ?>
</head>
<body>
  <h1>Zoo</h1>
  <?!= include('GameData'); ?>
  <?!= include('JavaScript'); ?>
</body>
</html>`;

    const mockCSS = '/* Mock CSS */\nbody { background: #000; }';
    const mockGameData = '/* Mock GameData */\nconst GAME_DATA = { test: true };';
    const mockJS = '/* Mock JS */\nconsole.log("ready");';

    const output = compileStandalone({
      indexContent: mockIndex,
      stylesheetContent: mockCSS,
      gameDataContent: mockGameData,
      jsContent: mockJS,
      dryRun: true
    });

    assert.ok(output, 'Compiler must return bundled HTML string');
    assert.ok(!output.includes("<?!="), 'All Apps Script <?!= include(...) ?> tags must be stripped');
    assert.ok(output.includes('<style>'), 'Must inline stylesheet inside <style> tag');
    assert.ok(output.includes('background: #000;'), 'Must include CSS content');
    assert.ok(output.includes('<script>'), 'Must inline scripts inside <script> tag');
    assert.ok(output.includes('const GAME_DATA = { test: true };'), 'Must include GameData');
    assert.ok(output.includes('console.log("ready");'), 'Must include JavaScript code');
  });

  it('handles HTML files that already have <style> and <script> tags without double wrapping', () => {
    const buildScriptPath = path.join(SCRIPTS_DIR, 'build_standalone.js');
    assert.ok(fs.existsSync(buildScriptPath), 'scripts/build_standalone.js must exist');
    const { compileStandalone } = require(buildScriptPath);

    const mockIndex = `<!DOCTYPE html>
<html>
<head><?!= include('Stylesheet'); ?></head>
<body><?!= include('JavaScript'); ?></body>
</html>`;

    const mockCSS = '<style>\n.zoo { color: green; }\n</style>';
    const mockJS = '<script>\nconst x = 1;\n</script>';

    const output = compileStandalone({
      indexContent: mockIndex,
      stylesheetContent: mockCSS,
      jsContent: mockJS,
      dryRun: true
    });

    assert.ok(!output.includes('<style><style>'), 'Should not double wrap <style>');
    assert.ok(!output.includes('<script><script>'), 'Should not double wrap <script>');
    assert.ok(output.includes('.zoo { color: green; }'), 'Should include CSS');
  });
});

// =============================================================================
// Task 2: Verbatim Game Data & High-Fidelity SVG Animal Library
// =============================================================================
describe('GameData: schema and 15 level definitions verified', () => {
  const gameDataPath = path.join(SRC_DIR, 'GameData.html');

  function loadGameDataModule() {
    assert.ok(fs.existsSync(gameDataPath), 'src/GameData.html must exist');
    const content = fs.readFileSync(gameDataPath, 'utf8');
    assert.ok(content.trim().startsWith('<script'), 'src/GameData.html must be enclosed in <script> tags');
    assert.ok(content.trim().endsWith('</script>'), 'src/GameData.html must end with </script>');

    const jsCode = content.replace(/<\/?script[^>]*>/gi, '');
    const moduleContext = { exports: {} };
    const windowContext = {};
    const runFn = new Function('module', 'exports', 'window', jsCode);
    runFn(moduleContext, moduleContext.exports, windowContext);
    return moduleContext.exports.kingdoms ? moduleContext.exports : windowContext.GAME_DATA;
  }

  it('src/GameData.html exists and is wrapped in <script> tags', () => {
    assert.ok(fs.existsSync(gameDataPath), 'src/GameData.html must exist');
    const content = fs.readFileSync(gameDataPath, 'utf8');
    assert.ok(content.trim().startsWith('<script'), 'Must start with <script>');
    assert.ok(content.trim().endsWith('</script>'), 'Must end with </script>');
  });

  it('GAME_DATA exports kingdoms, levels, narratives, crystals, and getAssetSvg', () => {
    const data = loadGameDataModule();
    assert.ok(data, 'GAME_DATA must be defined');
    assert.ok(Array.isArray(data.kingdoms), 'GAME_DATA.kingdoms must be an array');
    assert.ok(Array.isArray(data.levels), 'GAME_DATA.levels must be an array');
    assert.strictEqual(typeof data.narratives, 'object', 'GAME_DATA.narratives must be an object');
    assert.strictEqual(typeof data.crystals, 'object', 'GAME_DATA.crystals must be an object');
    assert.strictEqual(typeof data.getAssetSvg, 'function', 'GAME_DATA.getAssetSvg must be a function');
  });

  it('GAME_DATA.kingdoms has 3 kingdoms with correct ids, names, crystals, and colors', () => {
    const data = loadGameDataModule();
    assert.strictEqual(data.kingdoms.length, 3, 'Must have exactly 3 kingdoms');

    const expectedKingdoms = [
      { id: 'karnivora', name: 'Kerajaan Karnivora', crystal: 'Kristal Keberanian', crystalId: 'kristal_keberanian', color: '#DC2626' },
      { id: 'herbivora', name: 'Kerajaan Herbivora', crystal: 'Kristal Kehidupan', crystalId: 'kristal_kehidupan', color: '#16A34A' },
      { id: 'omnivora', name: 'Kerajaan Omnivora', crystal: 'Kristal Harmoni', crystalId: 'kristal_harmoni', color: '#7C3AED' }
    ];

    expectedKingdoms.forEach((expected, idx) => {
      const k = data.kingdoms[idx];
      assert.strictEqual(k.id, expected.id, `Kingdom ${idx} id mismatch`);
      assert.strictEqual(k.name, expected.name, `Kingdom ${idx} name mismatch`);
      assert.strictEqual(k.crystal, expected.crystal, `Kingdom ${idx} crystal mismatch`);
      assert.strictEqual(k.crystalId, expected.crystalId, `Kingdom ${idx} crystalId mismatch`);
      assert.strictEqual(k.color.toUpperCase(), expected.color.toUpperCase(), `Kingdom ${idx} color mismatch`);
    });
  });

  it('GAME_DATA.levels defines exactly 15 levels with 5 per kingdom in correct order', () => {
    const data = loadGameDataModule();
    assert.strictEqual(data.levels.length, 15, 'Must have exactly 15 levels');

    const karnivoraLevels = data.levels.filter(l => l.kingdomId === 'karnivora');
    const herbivoraLevels = data.levels.filter(l => l.kingdomId === 'herbivora');
    const omnivoraLevels = data.levels.filter(l => l.kingdomId === 'omnivora');

    assert.strictEqual(karnivoraLevels.length, 5, 'Karnivora must have 5 levels');
    assert.strictEqual(herbivoraLevels.length, 5, 'Herbivora must have 5 levels');
    assert.strictEqual(omnivoraLevels.length, 5, 'Omnivora must have 5 levels');

    const expectedOrder = [
      'singa', 'harimau', 'buaya', 'serigala', 'hiu',
      'sapi', 'kelinci', 'jerapah', 'gajah', 'rusa',
      'beruang', 'ayam', 'babi', 'monyet', 'gagak'
    ];

    data.levels.forEach((l, idx) => {
      assert.strictEqual(l.id, expectedOrder[idx], `Level index ${idx} expected id ${expectedOrder[idx]}`);
      assert.strictEqual(l.question, 'Siapakah aku?', `Level ${idx + 1} question must be "Siapakah aku?"`);
      assert.ok(typeof l.clue === 'string' && l.clue.length > 10, `Level ${idx + 1} clue must be non-empty`);
      assert.ok(typeof l.feedback === 'string' && l.feedback.length > 10, `Level ${idx + 1} feedback must be non-empty`);
      assert.ok(['A', 'B', 'C'].includes(l.answer), `Level ${idx + 1} answer must be A, B, or C`);
    });
  });

  it('Verbatim checks for all 15 animals (clues, options, answers)', () => {
    const data = loadGameDataModule();

    const expectedVerbatim = [
      {
        id: 'singa',
        answer: 'B',
        clue: 'Aku pemakan daging. Aku memiliki surai lebat di sekitar kepala dan leher.',
        options: ['A. Harimau', 'B. Singa', 'C. Serigala']
      },
      {
        id: 'harimau',
        answer: 'B',
        clue: 'Aku predator yang lincah, memiliki belang hitam di tubuhku.',
        options: ['A. Singa', 'B. Harimau', 'C. Serigala']
      },
      {
        id: 'buaya',
        answer: 'B',
        clue: 'Aku pemakan daging. Aku hidup di air dan darat serta memiliki rahang kuat dan gigi tajam.',
        options: ['A. Kura-kura', 'B. Buaya', 'C. Katak']
      },
      {
        id: 'serigala',
        answer: 'B',
        clue: 'Aku pemakan daging. Aku hidup di hutan dan memiliki indra penglihatan yang sangat tajam.',
        options: ['A. Rubah', 'B. Serigala', 'C. Anjing']
      },
      {
        id: 'hiu',
        answer: 'B',
        clue: 'Aku pemakan daging. Aku ikan laut yang bernapas dengan insang dan memiliki banyak gigi tajam.',
        options: ['A. Paus', 'B. Hiu', 'C. Lumba-lumba']
      },
      {
        id: 'sapi',
        answer: 'B',
        clue: 'Aku pemakan tumbuhan. Aku menghasilkan susu dan bersuara muuu.',
        options: ['A. Kambing', 'B. Sapi', 'C. Kuda']
      },
      {
        id: 'kelinci',
        answer: 'A',
        clue: 'Aku pemakan tumbuhan. Telingaku panjang dan aku suka melompat.',
        options: ['A. Kelinci', 'B. Kambing', 'C. Rusa']
      },
      {
        id: 'jerapah',
        answer: 'B',
        clue: 'Aku pemakan tumbuhan. Leherku sangat panjang untuk menjangkau daun tinggi.',
        options: ['A. Zebra', 'B. Jerapah', 'C. Kuda']
      },
      {
        id: 'gajah',
        answer: 'B',
        clue: 'Aku pemakan tumbuhan. Tubuhku besar dan aku memiliki belalai panjang.',
        options: ['A. Kuda', 'B. Gajah', 'C. Rusa']
      },
      {
        id: 'rusa',
        answer: 'B',
        clue: 'Aku pemakan tumbuhan. Aku lincah dan rusa jantan memiliki tanduk bercabang.',
        options: ['A. Sapi', 'B. Rusa', 'C. Kelinci']
      },
      {
        id: 'beruang',
        answer: 'A',
        clue: 'Aku pemakan segalanya. Aku suka ikan dan juga madu manis.',
        options: ['A. Beruang', 'B. Serigala', 'C. Kucing']
      },
      {
        id: 'ayam',
        answer: 'A',
        clue: 'Aku ayam yang ceria. Aku suka berkokok di pagi hari dan mencari biji-bijian.',
        options: ['A. Ayam', 'B. Kelinci', 'C. Bebek']
      },
      {
        id: 'babi',
        answer: 'B',
        clue: 'Aku adalah hewan omnivora. Aku bisa makan tumbuhan, buah, akar, dan hewan kecil. Hidungku berbentuk moncong dan tubuhku cukup gemuk.',
        options: ['A. Beruang', 'B. Babi', 'C. Monyet']
      },
      {
        id: 'monyet',
        answer: 'A',
        clue: 'Aku suka memanjat pohon. Aku suka buah-buahan dan sangat lincah.',
        options: ['A. Monyet', 'B. Ayam', 'C. Babi']
      },
      {
        id: 'gagak',
        answer: 'B',
        clue: 'Aku pemakan segalanya. Buluku hitam dan aku memakan biji, buah, serta bangkai hewan.',
        options: ['A. Elang', 'B. Gagak', 'C. Merpati']
      }
    ];

    expectedVerbatim.forEach((expected, i) => {
      const level = data.levels[i];
      assert.strictEqual(level.id, expected.id, `Level ${i + 1} id mismatch`);
      assert.strictEqual(level.answer, expected.answer, `Level ${i + 1} (${expected.id}) answer mismatch`);
      assert.strictEqual(level.clue.trim(), expected.clue.trim(), `Level ${i + 1} (${expected.id}) clue mismatch`);
      assert.deepStrictEqual(level.options, expected.options, `Level ${i + 1} (${expected.id}) options mismatch`);
    });
  });

  it('GAME_DATA.getAssetSvg(key) returns valid SVG for all 15 animals', () => {
    const data = loadGameDataModule();
    const animals = [
      'singa', 'harimau', 'buaya', 'serigala', 'hiu',
      'sapi', 'kelinci', 'jerapah', 'gajah', 'rusa',
      'beruang', 'ayam', 'babi', 'monyet', 'gagak'
    ];

    animals.forEach(animalKey => {
      const svg = data.getAssetSvg(animalKey);
      assert.strictEqual(typeof svg, 'string', `Asset ${animalKey} must return string`);
      assert.ok(svg.includes('<svg'), `Asset ${animalKey} must contain <svg`);
      assert.ok(svg.includes('</svg>'), `Asset ${animalKey} must contain </svg>`);
      assert.ok(svg.includes('viewBox'), `Asset ${animalKey} must specify viewBox`);
      assert.ok(svg.length > 100, `Asset ${animalKey} must be rich vector art (length > 100 bytes)`);
    });
  });

  it('GAME_DATA.getAssetSvg(key) returns valid SVG for character (survivor), 3 castles, and 3 crystals', () => {
    const data = loadGameDataModule();
    const specialAssets = [
      'survivor',
      'karnivora_castle', 'herbivora_castle', 'omnivora_castle',
      'kristal_keberanian', 'kristal_kehidupan', 'kristal_harmoni'
    ];

    specialAssets.forEach(key => {
      const svg = data.getAssetSvg(key);
      assert.strictEqual(typeof svg, 'string', `Asset ${key} must return string`);
      assert.ok(svg.includes('<svg'), `Asset ${key} must contain <svg`);
      assert.ok(svg.includes('</svg>'), `Asset ${key} must contain </svg>`);
      assert.ok(svg.includes('viewBox'), `Asset ${key} must specify viewBox`);
      assert.ok(svg.length > 100, `Asset ${key} must be rich vector art (length > 100 bytes)`);
    });
  });

  it('GAME_DATA.getAssetSvg handles emblems and provides graceful fallback for unknown keys', () => {
    const data = loadGameDataModule();
    ['emblem_karnivora', 'emblem_herbivora', 'emblem_omnivora'].forEach(emblemKey => {
      const svg = data.getAssetSvg(emblemKey);
      assert.ok(svg.includes('<svg'), `Emblem ${emblemKey} must return valid svg`);
      assert.ok(svg.includes('</svg>'), `Emblem ${emblemKey} must return closed svg`);
    });

    const fallback = data.getAssetSvg('unknown_nonexistent_key');
    assert.ok(fallback.includes('<svg'), 'Fallback must return valid svg');
    assert.ok(fallback.includes('?'), 'Fallback should include question mark');
  });

  it('All 15 levels have answer letter that matches the corresponding option label', () => {
    const data = loadGameDataModule();
    data.levels.forEach(level => {
      const matchingOpt = level.options.find(opt => opt.startsWith(level.answer + '.'));
      assert.ok(matchingOpt, `Level ${level.id} answer ${level.answer} must have a matching option in ${JSON.stringify(level.options)}`);
      assert.strictEqual(matchingOpt, `${level.answer}. ${level.name}`, `Option for correct answer must match ${level.answer}. ${level.name}`);
    });
  });

  it('src/GameData.html size is compact and well under Google Apps Script limits (< 200 KB)', () => {
    const stats = fs.statSync(gameDataPath);
    assert.ok(stats.size > 10000, 'GameData.html must contain full data and SVGs (> 10KB)');
    assert.ok(stats.size < 200000, `GameData.html must be lightweight (< 200KB), got ${stats.size} bytes`);
  });

  it('All 15 levels define valid qrImage pointing to existing files in assets/qr', () => {
    const data = loadGameDataModule();
    assert.strictEqual(data.levels.length, 15);
    data.levels.forEach(level => {
      assert.ok(level.qrImage, `Level ${level.id} must define qrImage`);
      assert.ok(level.qrImage.startsWith('assets/qr/'), `Level ${level.id} qrImage must start with assets/qr/`);
      const fullPath = path.join(ROOT_DIR, level.qrImage);
      assert.ok(fs.existsSync(fullPath), `QR image file ${fullPath} must exist on disk`);
    });
  });

  it('GAME_DATA.getAnimalQr returns correct QR image path', () => {
    const data = loadGameDataModule();
    assert.strictEqual(typeof data.getAnimalQr, 'function', 'GAME_DATA.getAnimalQr must be a function');
    assert.strictEqual(data.getAnimalQr('singa'), 'assets/qr/lion.png');
    assert.strictEqual(data.getAnimalQr('rusa'), 'assets/qr/deer.png');
    assert.strictEqual(data.getAnimalQr('monyet'), 'assets/qr/monkey.png');
  });
});

// =============================================================================
// Task 3: Core Game Engine, State Machine & Web Audio Synthesizer
// =============================================================================
describe('Task 3: JavaScript Modules (GameEngine, SoundEffects, MiniMap, Quiz, Navigation)', () => {
  const jsFilePath = path.join(SRC_DIR, 'JavaScript.html');
  const gameDataPath = path.join(SRC_DIR, 'GameData.html');

  // Helper to load GameData and JavaScript into a simulated DOM/Window environment
  function loadGameModules() {
    assert.ok(fs.existsSync(jsFilePath), 'src/JavaScript.html must exist');
    const jsContent = fs.readFileSync(jsFilePath, 'utf8');
    assert.ok(jsContent.trim().startsWith('<script'), 'src/JavaScript.html must start with <script>');
    assert.ok(jsContent.trim().endsWith('</script>'), 'src/JavaScript.html must end with </script>');

    const gameDataContent = fs.readFileSync(gameDataPath, 'utf8');
    const rawDataJs = gameDataContent.replace(/<\/?script[^>]*>/gi, '');
    const rawCodeJs = jsContent.replace(/<\/?script[^>]*>/gi, '');

    // In-memory mock localStorage
    const storageStore = {};
    const mockLocalStorage = {
      getItem: (key) => (Object.prototype.hasOwnProperty.call(storageStore, key) ? storageStore[key] : null),
      setItem: (key, val) => { storageStore[key] = String(val); },
      removeItem: (key) => { delete storageStore[key]; },
      clear: () => { Object.keys(storageStore).forEach(k => delete storageStore[k]); }
    };

    // Minimal DOM element mock
    function createMockElement(id = '', tag = 'div') {
      const children = [];
      const classListSet = new Set();
      const attributes = {};
      const el = {
        id,
        tagName: tag.toUpperCase(),
        children,
        parentElement: null,
        innerHTML: '',
        textContent: '',
        style: {
          setProperty(prop, val) {
            this[prop] = val;
          }
        },
        classList: {
          add: (...classes) => classes.forEach(c => classListSet.add(c)),
          remove: (...classes) => classes.forEach(c => classListSet.delete(c)),
          contains: (c) => classListSet.has(c),
          toggle: (c, force) => {
            if (force === undefined) {
              classListSet.has(c) ? classListSet.delete(c) : classListSet.add(c);
            } else if (force) {
              classListSet.add(c);
            } else {
              classListSet.delete(c);
            }
          }
        },
        setAttribute: (k, v) => { attributes[k] = String(v); },
        getAttribute: (k) => attributes[k] || null,
        appendChild: (child) => {
          child.parentElement = el;
          children.push(child);
          return child;
        },
        closest: function(sel) {
          if (sel.includes('[id]') && this.id) return this;
          if (sel.includes('button') && this.tagName === 'BUTTON') return this;
          if (sel.includes('[data-option-key]') && attributes['data-option-key']) return this;
          if (sel.includes('[data-kingdom-index]') && attributes['data-kingdom-index']) return this;
          if (this.parentElement) return this.parentElement.closest(sel);
          return null;
        },
        querySelector: () => null,
        querySelectorAll: () => []
      };
      return el;
    }

    const elementsMap = {};
    ['screen-splash', 'screen-instructions', 'screen-main-map', 'screen-kingdom-gate',
     'screen-challenge', 'screen-kingdom-reward', 'screen-final-victory',
     'btn-start-adventure', 'btn-resume-adventure', 'btn-new-adventure',
     'quiz-question', 'quiz-clue', 'quiz-animal-visual', 'quiz-options-container',
     'quiz-minimap', 'modal-feedback', 'feedback-title', 'feedback-text',
     'btn-feedback-continue', 'btn-feedback-retry', 'reward-title', 'reward-text',
     'reward-crystal-visual', 'btn-reward-continue', 'victory-confetti'
    ].forEach(id => {
      elementsMap[id] = createMockElement(id);
    });

    const listeners = {};
    const mockDocument = {
      getElementById: (id) => {
        if (!elementsMap[id]) {
          elementsMap[id] = createMockElement(id);
        }
        return elementsMap[id];
      },
      querySelector: (sel) => {
        if (sel.startsWith('#')) {
          const id = sel.slice(1);
          if (!elementsMap[id]) elementsMap[id] = createMockElement(id);
          return elementsMap[id];
        }
        return null;
      },
      querySelectorAll: (sel) => {
        if (sel.includes('.game-screen')) {
          return [
            elementsMap['screen-splash'],
            elementsMap['screen-instructions'],
            elementsMap['screen-main-map'],
            elementsMap['screen-kingdom-gate'],
            elementsMap['screen-challenge'],
            elementsMap['screen-kingdom-reward'],
            elementsMap['screen-final-victory']
          ];
        }
        return [];
      },
      addEventListener: (evt, fn, capture) => {
        listeners[evt] = listeners[evt] || [];
        listeners[evt].push({ fn, capture });
      },
      dispatchEvent: (evt) => {
        const list = listeners[evt.type] || [];
        list.forEach(item => item.fn(evt));
      },
      createElement: (tag) => createMockElement('', tag)
    };

    const mockWindow = {
      localStorage: mockLocalStorage,
      document: mockDocument,
      AudioContext: undefined,
      webkitAudioContext: undefined
    };

    const sandbox = {
      window: mockWindow,
      document: mockDocument,
      localStorage: mockLocalStorage,
      module: { exports: {} },
      exports: {},
      console
    };

    // Run GameData first
    const runGameData = new Function('window', 'document', 'module', 'exports', rawDataJs);
    runGameData(mockWindow, mockDocument, sandbox.module, sandbox.exports);
    mockWindow.GAME_DATA = sandbox.module.exports.kingdoms ? sandbox.module.exports : mockWindow.GAME_DATA;

    // Run JavaScript
    const jsModule = { exports: {} };
    const runJs = new Function('window', 'document', 'localStorage', 'module', 'exports', rawCodeJs);
    runJs(mockWindow, mockDocument, mockLocalStorage, jsModule, jsModule.exports);

    return {
      window: mockWindow,
      document: mockDocument,
      localStorage: mockLocalStorage,
      GAME_DATA: mockWindow.GAME_DATA,
      GameEngine: jsModule.exports.GameEngine || mockWindow.GameEngine,
      SoundEffects: jsModule.exports.SoundEffects || mockWindow.SoundEffects,
      MiniMapComponent: jsModule.exports.MiniMapComponent || mockWindow.MiniMapComponent,
      QuizController: jsModule.exports.QuizController || mockWindow.QuizController,
      RewardController: jsModule.exports.RewardController || mockWindow.RewardController,
      VictoryController: jsModule.exports.VictoryController || mockWindow.VictoryController,
      NavigationRouter: jsModule.exports.NavigationRouter || mockWindow.NavigationRouter
    };
  }

  it('src/JavaScript.html exists and exports all required classes/objects', () => {
    const modules = loadGameModules();
    assert.ok(modules.GameEngine, 'GameEngine must be exported');
    assert.ok(modules.SoundEffects, 'SoundEffects must be exported');
    assert.ok(modules.MiniMapComponent, 'MiniMapComponent must be exported');
    assert.ok(modules.QuizController, 'QuizController must be exported');
    assert.ok(modules.RewardController, 'RewardController must be exported');
    assert.ok(modules.VictoryController, 'VictoryController must be exported');
    assert.ok(modules.NavigationRouter, 'NavigationRouter must be exported');
  });

  it('GameEngine: strict state machine implements Table J2 checkpoints progression', () => {
    const { GameEngine, GAME_DATA } = loadGameModules();
    const engine = new GameEngine(GAME_DATA);

    // Initial state: Level 1 (index 0) of Karnivora (index 0)
    assert.strictEqual(engine.currentKingdomIndex, 0, 'Initial kingdom must be 0 (Karnivora)');
    assert.strictEqual(engine.currentLevelIndex, 0, 'Initial level must be 0');
    assert.strictEqual(engine.getKingdomProgressCount(0), 0, 'Kingdom 0 initial progress must be 0/5');
    assert.strictEqual(engine.isKingdomUnlocked(0), true, 'Kingdom 0 must be unlocked initially');
    assert.strictEqual(engine.isKingdomUnlocked(1), false, 'Kingdom 1 must be locked initially');
    assert.strictEqual(engine.isKingdomUnlocked(2), false, 'Kingdom 2 must be locked initially');

    // Checkpoint 0 active, 1..4 locked
    assert.strictEqual(engine.getCheckpointStatus(0), 'active', 'Level 0 must be active');
    for (let i = 1; i < 5; i++) {
      assert.strictEqual(engine.getCheckpointStatus(i), 'locked', `Level ${i} must be locked at start`);
    }

    // Question 1: Singa (Answer B)
    // Wrong answer 'A' must NOT advance level
    const wrongVal = engine.validateAnswer('A');
    assert.strictEqual(wrongVal.isCorrect, false, 'Option A is incorrect for Singa');
    assert.strictEqual(engine.currentLevelIndex, 0, 'Level must NOT advance on wrong answer');
    assert.strictEqual(engine.getCheckpointStatus(0), 'active');

    // Correct answer 'B' validates true, but does NOT advance level until advanceLevel() is called
    const correctVal = engine.validateAnswer('B');
    assert.strictEqual(correctVal.isCorrect, true, 'Option B is correct for Singa');
    assert.strictEqual(engine.currentLevelIndex, 0, 'Level must NOT advance before advanceLevel()');

    // Now call advanceLevel()
    engine.advanceLevel();
    assert.strictEqual(engine.currentLevelIndex, 1, 'Level must advance to 1');
    assert.strictEqual(engine.getKingdomProgressCount(0), 1, 'Progress should be 1/5');
    assert.strictEqual(engine.getCheckpointStatus(0), 'completed', 'Checkpoint 0 should now be completed');
    assert.strictEqual(engine.getCheckpointStatus(1), 'active', 'Checkpoint 1 should now be active');
    for (let i = 2; i < 5; i++) {
      assert.strictEqual(engine.getCheckpointStatus(i), 'locked', `Checkpoint ${i} must still be locked`);
    }

    // Step through level 2 (Harimau: A), 3 (Buaya: B), 4 (Serigala: C)
    engine.advanceLevel(); // To level 2
    assert.strictEqual(engine.currentLevelIndex, 2);
    assert.strictEqual(engine.getKingdomProgressCount(0), 2);
    assert.strictEqual(engine.getCheckpointStatus(0), 'completed');
    assert.strictEqual(engine.getCheckpointStatus(1), 'completed');
    assert.strictEqual(engine.getCheckpointStatus(2), 'active');

    engine.advanceLevel(); // To level 3
    assert.strictEqual(engine.currentLevelIndex, 3);
    assert.strictEqual(engine.getKingdomProgressCount(0), 3);
    assert.strictEqual(engine.getCheckpointStatus(2), 'completed');
    assert.strictEqual(engine.getCheckpointStatus(3), 'active');

    engine.advanceLevel(); // To level 4 (Level 5 in game, Hiu)
    assert.strictEqual(engine.currentLevelIndex, 4);
    assert.strictEqual(engine.getKingdomProgressCount(0), 4);
    assert.strictEqual(engine.getCheckpointStatus(3), 'completed');
    assert.strictEqual(engine.getCheckpointStatus(4), 'active');

    // Complete Level 5
    const res = engine.advanceLevel();
    assert.strictEqual(engine.currentLevelIndex, 5, 'Level index becomes 5 upon kingdom completion');
    assert.strictEqual(engine.getKingdomProgressCount(0), 5, 'Progress is 5/5');
    assert.strictEqual(res.kingdomCompleted, true, 'advanceLevel returns kingdomCompleted true');
    assert.strictEqual(res.crystal, 'kristal_keberanian', 'Awards Kristal Keberanian');

    // When kingdom completed, all 5 checkpoints are completed
    for (let i = 0; i < 5; i++) {
      assert.strictEqual(engine.getCheckpointStatus(i), 'completed', `Checkpoint ${i} must be completed at 5/5`);
    }

    // Kingdom 1 (Herbivora) is now unlocked!
    assert.strictEqual(engine.isKingdomUnlocked(1), true, 'Herbivora must unlock after Karnivora is 5/5');
    assert.strictEqual(engine.isKingdomUnlocked(2), false, 'Omnivora must still be locked');
  });

  it('GameEngine: Option A shared device persistence with localStorage', () => {
    const { GameEngine, GAME_DATA, localStorage } = loadGameModules();
    const engine1 = new GameEngine(GAME_DATA);

    // Initial hasSavedProgress should be false
    assert.strictEqual(engine1.hasSavedProgress(), false, 'hasSavedProgress must be false initially');

    // Advance 2 levels and save
    engine1.advanceLevel();
    engine1.advanceLevel();
    engine1.saveProgress();

    assert.strictEqual(engine1.hasSavedProgress(), true, 'hasSavedProgress must be true after saving');
    assert.ok(localStorage.getItem('mini_zoo_progress_v2'), 'localStorage must have mini_zoo_progress_v2');

    // Create new engine instance and load progress
    const engine2 = new GameEngine(GAME_DATA);
    const loaded = engine2.loadProgress();
    assert.strictEqual(loaded, true, 'loadProgress must return true when data exists');
    assert.strictEqual(engine2.currentKingdomIndex, 0);
    assert.strictEqual(engine2.currentLevelIndex, 2);
    assert.strictEqual(engine2.getKingdomProgressCount(0), 2);

    // Reset progress
    engine2.resetProgress();
    assert.strictEqual(engine2.currentKingdomIndex, 0);
    assert.strictEqual(engine2.currentLevelIndex, 0);
    assert.strictEqual(engine2.hasSavedProgress(), false, 'hasSavedProgress must be false after reset');
    assert.strictEqual(localStorage.getItem('mini_zoo_progress_v2'), null, 'localStorage item must be removed');
  });

  it('SoundEffects: safely synthesizes audio and supports mute toggle', () => {
    const { SoundEffects } = loadGameModules();
    const sfx = new SoundEffects();

    assert.strictEqual(typeof sfx.init, 'function');
    assert.strictEqual(typeof sfx.play, 'function');
    assert.strictEqual(typeof sfx.toggleMute, 'function');

    // Should not throw even when Web Audio API is absent/headless
    sfx.init();
    ['click', 'correct', 'wrong', 'crystal', 'fanfare'].forEach(name => {
      assert.doesNotThrow(() => sfx.play(name), `play('${name}') should not throw`);
    });

    assert.strictEqual(sfx.isMuted(), false, 'Initially not muted');
    const mutedState = sfx.toggleMute();
    assert.strictEqual(mutedState, true, 'toggleMute should return true (muted)');
    assert.strictEqual(sfx.isMuted(), true);

    // Playing while muted should no-op safely
    assert.doesNotThrow(() => sfx.play('correct'));

    // In-game background music (BGM) API verification
    assert.strictEqual(typeof sfx.startBgm, 'function', 'Must provide startBgm method');
    assert.strictEqual(typeof sfx.pauseBgm, 'function', 'Must provide pauseBgm method');
    assert.strictEqual(typeof sfx.resumeBgm, 'function', 'Must provide resumeBgm method');
    assert.doesNotThrow(() => sfx.startBgm(), 'startBgm should not throw');
    assert.doesNotThrow(() => sfx.pauseBgm(), 'pauseBgm should not throw');
    assert.doesNotThrow(() => sfx.resumeBgm(), 'resumeBgm should not throw');

    sfx.toggleMute();
    assert.strictEqual(sfx.isMuted(), false);
  });

  it('MiniMapComponent: renders 5-step horizontal progression line according to Table J2', () => {
    const { MiniMapComponent } = loadGameModules();
    assert.strictEqual(typeof MiniMapComponent.render, 'function');

    // At Level 1 (currentLevelIdx = 0): Step 1 is active, steps 2-5 are locked
    const html0 = MiniMapComponent.render(null, 0, 0);
    assert.ok(typeof html0 === 'string', 'render should return HTML string');
    assert.ok(html0.includes('0/5') || html0.includes('Checkpoint'), 'Should show progress count');
    assert.ok(html0.includes('active') || html0.includes('gold'), 'Must render active checkpoint');

    // At Level 3 (currentLevelIdx = 2): Steps 1-2 completed, step 3 active, 4-5 locked
    const html2 = MiniMapComponent.render(null, 0, 2);
    assert.ok(html2.includes('completed') || html2.includes('check'), 'Must render completed checkpoint');

    // At Kingdom completed (currentLevelIdx = 5): All completed
    const html5 = MiniMapComponent.render(null, 0, 5);
    assert.ok(html5.includes('5/5'), 'Must render 5/5 completed');
  });

  it('NavigationRouter: bulletproof event capture and screen switching', () => {
    const modules = loadGameModules();
    const { NavigationRouter, GameEngine, SoundEffects, GAME_DATA, window } = modules;
    const engine = new GameEngine(GAME_DATA);
    const sfx = new SoundEffects();
    const router = new NavigationRouter({ engine, sfx });

    assert.strictEqual(typeof router.navigateTo, 'function');
    assert.strictEqual(typeof router.openKingdomGate, 'function');

    // Check screen navigation
    router.navigateTo('screen-instructions');
    assert.strictEqual(router.getCurrentScreen(), 'screen-instructions');

    router.navigateTo('screen-main-map');
    assert.strictEqual(router.getCurrentScreen(), 'screen-main-map');

    // Global window bindings
    assert.strictEqual(typeof window.navigateTo, 'function');
    assert.strictEqual(typeof window.openKingdomGate, 'function');
    assert.strictEqual(typeof window.toggleSound, 'function');
  });

  it('GameEngine: full 15-level game progression across all 3 kingdoms with crystal rewards', () => {
    const { GameEngine, GAME_DATA } = loadGameModules();
    const engine = new GameEngine(GAME_DATA);

    // Kerajaan 1: Karnivora (5 animals: singa, harimau, buaya, serigala, hiu)
    assert.strictEqual(engine.currentKingdomIndex, 0);
    assert.strictEqual(engine.isKingdomUnlocked(0), true);
    assert.strictEqual(engine.isKingdomUnlocked(1), false);
    assert.strictEqual(engine.isKingdomUnlocked(2), false);

    const k1Answers = ['B', 'B', 'B', 'B', 'B'];
    for (let i = 0; i < 5; i++) {
      assert.strictEqual(engine.currentLevelIndex, i);
      const val = engine.validateAnswer(k1Answers[i]);
      assert.strictEqual(val.isCorrect, true, `Kingdom 1 Level ${i + 1} answer must be correct`);
      engine.advanceLevel();
    }
    assert.strictEqual(engine.currentLevelIndex, 5);
    assert.strictEqual(engine.getKingdomProgressCount(0), 5);
    assert.ok(engine.collectedCrystals.includes('kristal_keberanian'), 'Must award Kristal Keberanian');
    assert.strictEqual(engine.isKingdomUnlocked(1), true, 'Herbivora must now be unlocked');
    assert.strictEqual(engine.isKingdomUnlocked(2), false, 'Omnivora must still be locked');

    // Kerajaan 2: Herbivora (5 animals: sapi, kelinci, jerapah, gajah, rusa)
    assert.strictEqual(engine.setKingdom(1), true);
    assert.strictEqual(engine.currentKingdomIndex, 1);
    assert.strictEqual(engine.currentLevelIndex, 0);

    const k2Answers = ['B', 'A', 'B', 'B', 'B'];
    for (let i = 0; i < 5; i++) {
      assert.strictEqual(engine.currentLevelIndex, i);
      const val = engine.validateAnswer(k2Answers[i]);
      assert.strictEqual(val.isCorrect, true, `Kingdom 2 Level ${i + 1} answer must be correct`);
      engine.advanceLevel();
    }
    assert.strictEqual(engine.currentLevelIndex, 5);
    assert.strictEqual(engine.getKingdomProgressCount(1), 5);
    assert.ok(engine.collectedCrystals.includes('kristal_kehidupan'), 'Must award Kristal Kehidupan');
    assert.strictEqual(engine.isKingdomUnlocked(2), true, 'Omnivora must now be unlocked');

    // Kerajaan 3: Omnivora (5 animals: beruang, ayam, babi, monyet, gagak)
    assert.strictEqual(engine.setKingdom(2), true);
    assert.strictEqual(engine.currentKingdomIndex, 2);
    assert.strictEqual(engine.currentLevelIndex, 0);

    const k3Answers = ['A', 'A', 'B', 'A', 'B'];
    for (let i = 0; i < 4; i++) {
      const val = engine.validateAnswer(k3Answers[i]);
      assert.strictEqual(val.isCorrect, true);
      const adv = engine.advanceLevel();
      assert.strictEqual(adv.allCompleted, false);
    }

    // Final 15th level: Gagak
    const finalVal = engine.validateAnswer(k3Answers[4]);
    assert.strictEqual(finalVal.isCorrect, true);
    const finalAdv = engine.advanceLevel();
    assert.strictEqual(finalAdv.kingdomCompleted, true);
    assert.strictEqual(finalAdv.allCompleted, true, 'Game must be marked allCompleted upon finishing level 15');
    assert.ok(engine.collectedCrystals.includes('kristal_harmoni'), 'Must award Kristal Harmoni');
    assert.strictEqual(engine.collectedCrystals.length, 3, 'Must have collected all 3 crystals');
  });

  it('QuizController: challenge loading, option validation, feedback modal, and continuation flow', () => {
    const modules = loadGameModules();
    const { QuizController, GameEngine, SoundEffects, NavigationRouter, GAME_DATA, document } = modules;
    const engine = new GameEngine(GAME_DATA);
    const sfx = new SoundEffects();
    const router = new NavigationRouter({ engine, sfx });
    const quiz = new QuizController(engine, sfx, router);
    router.quizController = quiz;

    // Load initial challenge (Level 1: Singa)
    quiz.loadCurrentChallenge();

    assert.strictEqual(document.getElementById('quiz-question').textContent, 'Siapakah aku?');
    assert.ok(document.getElementById('quiz-clue').textContent.includes('surai lebat'), 'Clue must mention surai lebat');
    assert.ok(document.getElementById('quiz-level-indicator').textContent.includes('1 dari 5'));
    assert.ok(document.getElementById('quiz-options-container').innerHTML.includes('Singa'));

    // Wrong answer 'A' (Harimau)
    quiz.handleOptionSelect('A');
    assert.strictEqual(quiz.isModalOpen, true);
    assert.strictEqual(document.getElementById('feedback-text').textContent, 'Jawabanmu belum tepat. Ayo coba lagi!');
    assert.strictEqual(document.getElementById('btn-feedback-retry').style.display, 'inline-flex');
    assert.strictEqual(document.getElementById('btn-feedback-continue').style.display, 'none');
    assert.strictEqual(engine.currentLevelIndex, 0, 'Level must not change on wrong answer');

    // Retry closes modal
    quiz.closeFeedbackModal();
    assert.strictEqual(quiz.isModalOpen, false);
    assert.strictEqual(document.getElementById('modal-feedback').style.display, 'none');

    // Correct answer 'B' (Singa)
    quiz.handleOptionSelect('B');
    assert.strictEqual(quiz.isModalOpen, true);
    assert.ok(document.getElementById('feedback-text').textContent.includes('Aku adalah singa'), 'Must show verbatim educational text');
    assert.strictEqual(document.getElementById('btn-feedback-continue').style.display, 'inline-flex');
    assert.strictEqual(document.getElementById('btn-feedback-retry').style.display, 'none');
    assert.strictEqual(engine.currentLevelIndex, 0, 'Level must still be 0 before continue is clicked');

    // Click LANJUTKAN via handleContinue
    quiz.handleContinue();
    assert.strictEqual(quiz.isModalOpen, false);
    assert.strictEqual(engine.currentLevelIndex, 1, 'Level must now be 1 (Harimau)');
    assert.ok(document.getElementById('quiz-clue').textContent.includes('belang hitam'), 'Clue must now be Harimau');
    assert.ok(document.getElementById('quiz-level-indicator').textContent.includes('2 dari 5'));
  });

  it('RewardController and VictoryController display verbatim titles, crystals, and conferred title', () => {
    const modules = loadGameModules();
    const { RewardController, VictoryController, GameEngine, SoundEffects, NavigationRouter, GAME_DATA, document } = modules;
    const engine = new GameEngine(GAME_DATA);
    const sfx = new SoundEffects();
    const router = new NavigationRouter({ engine, sfx });
    const reward = new RewardController(engine, sfx, router);
    const victory = new VictoryController(engine, sfx, router);

    // Test Reward screen for Karnivora
    reward.showKingdomReward(0);
    assert.ok(document.getElementById('reward-title').textContent.includes('Kerajaan Karnivora'));
    assert.strictEqual(document.getElementById('reward-crystal-name').textContent, 'Kristal Keberanian × 1');
    assert.ok(document.getElementById('reward-crystal-visual').innerHTML.includes('<svg'));

    // Test Final Victory Screen
    victory.showFinalVictory();
    assert.ok(document.getElementById('victory-title').textContent.includes('SELAMAT!'));
    assert.strictEqual(document.getElementById('victory-grand-title').textContent, 'PENJAGA PENGETAHUAN SATWA MINI ZOO!');
    assert.ok(document.getElementById('victory-survivor-visual').innerHTML.includes('<svg'));
    assert.ok(document.getElementById('victory-crystals-container').innerHTML.includes('Kristal Keberanian'));
    assert.ok(document.getElementById('victory-crystals-container').innerHTML.includes('Kristal Kehidupan'));
    assert.ok(document.getElementById('victory-crystals-container').innerHTML.includes('Kristal Harmoni'));
  });

  it('NavigationRouter: delegates capture clicks on deeply nested button children reliably', () => {
    const modules = loadGameModules();
    const { NavigationRouter, GameEngine, SoundEffects, GAME_DATA, document } = modules;
    const engine = new GameEngine(GAME_DATA);
    const sfx = new SoundEffects();
    const router = new NavigationRouter({ engine, sfx });

    router.navigateTo('screen-splash');
    assert.strictEqual(router.getCurrentScreen(), 'screen-splash');

    // Create a button with nested span child: <button id="btn-start-adventure"><span>Mulai</span></button>
    const btn = document.getElementById('btn-start-adventure');
    btn.tagName = 'BUTTON';
    const innerSpan = document.createElement('span');
    innerSpan.textContent = 'Mulai Petualangan';
    btn.appendChild(innerSpan);

    // Click on inner span, verify delegation resolves to #btn-start-adventure and navigates to instructions
    document.dispatchEvent({ type: 'click', target: innerSpan });
    assert.strictEqual(router.getCurrentScreen(), 'screen-instructions', 'Click on inner span must navigate to screen-instructions');

    // From instructions, click #btn-start-mission
    const btnMission = document.getElementById('btn-start-mission');
    btnMission.tagName = 'BUTTON';
    const missionIcon = document.createElement('svg');
    btnMission.appendChild(missionIcon);
    document.dispatchEvent({ type: 'click', target: missionIcon });
    assert.strictEqual(router.getCurrentScreen(), 'screen-main-map', 'Click on inner icon of mission button must navigate to screen-main-map');

    // Test btn-back-to-gate from gate to map
    router.navigateTo('screen-kingdom-gate');
    assert.strictEqual(router.getCurrentScreen(), 'screen-kingdom-gate');
    const backBtn = document.getElementById('btn-back-to-gate');
    backBtn.tagName = 'BUTTON';
    const backSpan = document.createElement('span');
    backSpan.textContent = 'Peta';
    backBtn.appendChild(backSpan);
    document.dispatchEvent({ type: 'click', target: backSpan });
    assert.strictEqual(router.getCurrentScreen(), 'screen-main-map', 'Click on btn-back-to-gate from gate must navigate to screen-main-map');

    // Test btn-back-to-gate from challenge to gate
    router.navigateTo('screen-challenge');
    assert.strictEqual(router.getCurrentScreen(), 'screen-challenge');
    document.dispatchEvent({ type: 'click', target: backBtn });
    assert.strictEqual(router.getCurrentScreen(), 'screen-kingdom-gate', 'Click on btn-back-to-gate from challenge must navigate to screen-kingdom-gate');
  });
});

// =============================================================================
// Task 4: Responsive Safari Design System & Tactile 3D Styling
// =============================================================================
describe('Task 4: Stylesheet (Responsive 16:9, Claymorphism Tokens & Zero-Jitter Rules)', () => {
  const stylesheetPath = path.join(SRC_DIR, 'Stylesheet.html');

  function getStylesheetContent() {
    assert.ok(fs.existsSync(stylesheetPath), 'src/Stylesheet.html must exist');
    return fs.readFileSync(stylesheetPath, 'utf8');
  }

  it('src/Stylesheet.html exists and is wrapped inside <style> tags', () => {
    assert.ok(fs.existsSync(stylesheetPath), 'src/Stylesheet.html must exist');
    const content = fs.readFileSync(stylesheetPath, 'utf8').trim();
    assert.ok(content.startsWith('<style'), 'src/Stylesheet.html must start with <style>');
    assert.ok(content.endsWith('</style>'), 'src/Stylesheet.html must end with </style>');
  });

  it('Defines required CSS custom properties (colors, wood tones, kingdom themes, typography)', () => {
    const css = getStylesheetContent();

    // Font family check
    assert.ok(css.includes('Fredoka'), 'Must declare Fredoka font in font-family');
    assert.ok(css.includes('Nunito'), 'Must include Nunito font');

    // Forest Green variables
    assert.ok(css.includes('--color-forest-dark: #0B2312') || css.includes('--color-forest-dark:#0B2312'), 'Must define --color-forest-dark: #0B2312');
    assert.ok(css.includes('--color-forest-medium: #1B4323') || css.includes('--color-forest-medium:#1B4323'), 'Must define --color-forest-medium: #1B4323');

    // Safari Timber / Wood variables
    assert.ok(css.includes('--color-wood-dark: #451A03') || css.includes('--color-wood-dark:#451A03'), 'Must define --color-wood-dark: #451A03');
    assert.ok(css.includes('--color-wood-medium: #78350F') || css.includes('--color-wood-medium:#78350F'), 'Must define --color-wood-medium: #78350F');
    assert.ok(css.includes('--color-gold: #F59E0B') || css.includes('--color-gold:#F59E0B'), 'Must define --color-gold: #F59E0B');

    // Karnivora Crimson
    assert.ok(css.includes('--color-karnivora: #DC2626') || css.includes('--color-karnivora:#DC2626'), 'Must define --color-karnivora: #DC2626');
    assert.ok(css.includes('--color-karnivora-bg: #450A0A') || css.includes('--color-karnivora-bg:#450A0A'), 'Must define --color-karnivora-bg: #450A0A');

    // Herbivora Emerald
    assert.ok(css.includes('--color-herbivora: #16A34A') || css.includes('--color-herbivora:#16A34A'), 'Must define --color-herbivora: #16A34A');
    assert.ok(css.includes('--color-herbivora-bg: #052E16') || css.includes('--color-herbivora-bg:#052E16'), 'Must define --color-herbivora-bg: #052E16');

    // Omnivora Purple
    assert.ok(css.includes('--color-omnivora: #7C3AED') || css.includes('--color-omnivora:#7C3AED'), 'Must define --color-omnivora: #7C3AED');
    assert.ok(css.includes('--color-omnivora-bg: #2E1065') || css.includes('--color-omnivora-bg:#2E1065'), 'Must define --color-omnivora-bg: #2E1065');
  });

  it('Defines responsive 16:9 canvas container (.game-canvas-container / .slide-canvas-stage)', () => {
    const css = getStylesheetContent();
    assert.ok(
      css.includes('.game-canvas-container') || css.includes('.slide-canvas-stage'),
      'Must define .game-canvas-container or .slide-canvas-stage'
    );
    assert.ok(
      css.includes('aspect-ratio: 16 / 9') || css.includes('aspect-ratio:16/9') || css.includes('aspect-ratio: 16/9'),
      'Must specify aspect-ratio: 16 / 9'
    );
    assert.ok(
      css.includes('max-width: 1140px') || css.includes('max-width:1140px'),
      'Must specify max-width: 1140px'
    );
  });

  it('Enforces strict zero-jitter button rules preserving translateX(-50%) on base, hover, and active states', () => {
    const css = getStylesheetContent();

    // Check centered CTA selectors
    const requiredSelectors = [
      '.hotspot-splash-start',
      '.hotspot-instructions-start',
      '.hotspot-gate-start',
      '.hotspot-reward-continue',
      '.btn-centered'
    ];

    requiredSelectors.forEach(sel => {
      assert.ok(css.includes(sel), `CSS must include selector ${sel}`);
    });

    // Base state checks: left: 50% and transform: translateX(-50%)
    assert.ok(
      css.includes('left: 50% !important') || css.includes('left:50%!important'),
      'Centered buttons must specify left: 50% !important'
    );
    assert.ok(
      css.includes('transform: translateX(-50%) !important') || css.includes('transform:translateX(-50%)!important'),
      'Centered buttons base must specify transform: translateX(-50%) !important'
    );
    assert.ok(
      css.includes('animation: none !important') || css.includes('animation:none!important'),
      'Centered buttons must have animation: none !important to prevent jumping'
    );

    // Hover state preserves translateX(-50%)
    assert.ok(
      css.includes('transform: translateX(-50%) translateY(-2px) !important') ||
      css.includes('transform:translateX(-50%) translateY(-2px)!important'),
      'Hover state must preserve translateX(-50%) translateY(-2px) !important'
    );

    // Active state preserves translateX(-50%)
    assert.ok(
      css.includes('transform: translateX(-50%) translateY(3px) !important') ||
      css.includes('transform:translateX(-50%) translateY(3px)!important'),
      'Active state must preserve translateX(-50%) translateY(3px) !important'
    );
  });

  it('Sets pointer-events: none on CTA button inner spans and labels to prevent click interception', () => {
    const css = getStylesheetContent();

    const requiredInnerSelectors = [
      '.slide-hotspot-cta span',
      '.pro-game-cta-btn span',
      '.cta-play-icon',
      '.cta-btn-label'
    ];

    requiredInnerSelectors.forEach(sel => {
      assert.ok(css.includes(sel), `CSS must target inner child: ${sel}`);
    });

    assert.ok(
      css.includes('pointer-events: none !important') || css.includes('pointer-events:none!important'),
      'CTA inner spans must set pointer-events: none !important'
    );
  });

  it('Defines 3D tactile button styles (.btn-3d-green, .btn-3d-gold, .btn-3d-wood)', () => {
    const css = getStylesheetContent();

    // Green 3D button
    assert.ok(css.includes('.btn-3d-green'), 'Must define .btn-3d-green');
    assert.ok(css.includes('#66BB6A'), 'Green 3D button gradient must contain #66BB6A');
    assert.ok(css.includes('#2E7D32'), 'Green 3D button gradient must contain #2E7D32');
    assert.ok(css.includes('#1B5E20'), 'Green 3D button gradient must contain #1B5E20');
    assert.ok(css.includes('#FFE082'), 'Green 3D button border must contain #FFE082');

    // Gold 3D button
    assert.ok(css.includes('.btn-3d-gold'), 'Must define .btn-3d-gold');
    assert.ok(css.includes('#FBBF24'), 'Gold 3D button gradient must contain #FBBF24');
    assert.ok(css.includes('#D97706'), 'Gold 3D button gradient must contain #D97706');
    assert.ok(css.includes('#92400E'), 'Gold 3D button gradient must contain #92400E');
    assert.ok(css.includes('#FFFBEB'), 'Gold 3D button border must contain #FFFBEB');

    // Wood 3D button
    assert.ok(css.includes('.btn-3d-wood'), 'Must define .btn-3d-wood');
    assert.ok(css.includes('#B45309'), 'Wood 3D button gradient must contain #B45309');
    assert.ok(css.includes('#78350F'), 'Wood 3D button gradient must contain #78350F');
    assert.ok(css.includes('#451A03'), 'Wood 3D button gradient must contain #451A03');
    assert.ok(css.includes('#FDE68A'), 'Wood 3D button border must contain #FDE68A');
  });

  it('Defines SPA screen visibility rules and feedback modal parchment styling', () => {
    const css = getStylesheetContent();

    // SPA screen display rules
    assert.ok(
      css.includes('.screen {') || css.includes('.game-screen {') || css.includes('.screen,') || css.includes('.game-screen,'),
      'Must define screen hiding rule'
    );
    assert.ok(
      css.includes('display: none !important') || css.includes('display:none!important'),
      'Screen hiding must use display: none !important'
    );
    assert.ok(
      css.includes('.screen.active') || css.includes('.game-screen.active'),
      'Must define active screen rule'
    );
    assert.ok(
      css.includes('display: flex !important') || css.includes('display:flex!important'),
      'Active screen must use display: flex !important'
    );

    // Feedback modal styling
    assert.ok(
      css.includes('#feedback-modal') || css.includes('#modal-feedback'),
      'Must style #feedback-modal / #modal-feedback'
    );
    assert.ok(
      css.includes('#FFFDF0') || css.includes('#fffdf0'),
      'Parchment modal must use background #FFFDF0'
    );
  });
});

// =============================================================================
// Task 5: 16:9 SPA DOM Structure & Google Apps Script Backend
// =============================================================================
describe('Task 5: Google Apps Script Backend (src/Code.gs & src/appsscript.json)', () => {
  const codeGsPath = path.join(SRC_DIR, 'Code.gs');
  const manifestPath = path.join(SRC_DIR, 'appsscript.json');

  it('src/Code.gs exists and implements doGet(e) and include(filename)', () => {
    assert.ok(fs.existsSync(codeGsPath), 'src/Code.gs must exist');
    const content = fs.readFileSync(codeGsPath, 'utf8');

    // doGet checks
    assert.ok(content.includes('function doGet('), 'Must define function doGet(e)');
    assert.ok(content.includes("createTemplateFromFile('Index')"), 'Must create template from Index');
    assert.ok(content.includes('.evaluate()'), 'Must evaluate template');
    assert.ok(content.includes(".setTitle('Petualangan Mini Zoo - Game Edukasi Satwa 3D')"), 'Must set exact page title');
    assert.ok(content.includes(".addMetaTag('viewport'"), 'Must add viewport meta tag');
    assert.ok(content.includes('XFrameOptionsMode.ALLOWALL'), 'Must set XFrameOptionsMode to ALLOWALL');

    // include checks
    assert.ok(content.includes('function include('), 'Must define function include(filename)');
    assert.ok(content.includes('createHtmlOutputFromFile(filename)'), 'Must create HtmlOutput from file');
    assert.ok(content.includes('.getContent()'), 'Must return html content');
  });

  it('src/appsscript.json exists and contains valid manifest properties', () => {
    assert.ok(fs.existsSync(manifestPath), 'src/appsscript.json must exist');
    const raw = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(raw);

    assert.strictEqual(manifest.timeZone, 'Asia/Jakarta', 'timeZone must be Asia/Jakarta');
    assert.strictEqual(manifest.runtimeVersion, 'V8', 'runtimeVersion must be V8');
    assert.ok(manifest.webapp, 'webapp configuration object must exist');
    assert.strictEqual(manifest.webapp.access, 'ANYONE_ANONYMOUS', 'webapp.access must be ANYONE_ANONYMOUS');
    assert.strictEqual(manifest.webapp.executeAs, 'USER_DEPLOYING', 'webapp.executeAs must be USER_DEPLOYING');
  });
});

describe('Task 5: 16:9 SPA HTML Structure (src/Index.html)', () => {
  const indexPath = path.join(SRC_DIR, 'Index.html');

  function getIndexContent() {
    assert.ok(fs.existsSync(indexPath), 'src/Index.html must exist');
    return fs.readFileSync(indexPath, 'utf8');
  }

  it('src/Index.html exists and contains Google Apps Script include tags', () => {
    const html = getIndexContent();
    assert.ok(html.includes("<?!= include('Stylesheet'); ?>"), "Must include Stylesheet in <head>");
    assert.ok(html.includes("<?!= include('GameData'); ?>"), "Must include GameData before </body>");
    assert.ok(html.includes("<?!= include('JavaScript'); ?>"), "Must include JavaScript before </body>");

    // Order check: Stylesheet in head, GameData and JavaScript at end
    const headEnd = html.indexOf('</head>');
    const stylePos = html.indexOf("<?!= include('Stylesheet'); ?>");
    assert.ok(stylePos < headEnd && stylePos > 0, "Stylesheet must be inside <head>");

    const bodyEnd = html.indexOf('</body>');
    const gameDataPos = html.indexOf("<?!= include('GameData'); ?>");
    const jsPos = html.indexOf("<?!= include('JavaScript'); ?>");
    assert.ok(gameDataPos < bodyEnd && gameDataPos > headEnd, "GameData must be before </body>");
    assert.ok(jsPos < bodyEnd && jsPos > gameDataPos, "JavaScript must be after GameData and before </body>");
  });

  it('Top HUD defines 3 crystal slots, sound toggle, and fullscreen button', () => {
    const html = getIndexContent();

    // 3 crystal slots
    assert.ok(html.includes('id="slot-kristal-keberanian"'), 'Must have #slot-kristal-keberanian');
    assert.ok(html.includes('id="slot-kristal-kehidupan"'), 'Must have #slot-kristal-kehidupan');
    assert.ok(html.includes('id="slot-kristal-harmoni"'), 'Must have #slot-kristal-harmoni');

    // Floating controls
    assert.ok(html.includes('id="sound-toggle"'), 'Must have #sound-toggle');
    assert.ok(html.includes('id="btn-fullscreen"'), 'Must have #btn-fullscreen');
  });

  it('Defines all 7 SPA screens with exact required IDs', () => {
    const html = getIndexContent();
    const requiredScreens = [
      'screen-splash',
      'screen-instructions',
      'screen-main-map',
      'screen-kingdom-gate',
      'screen-challenge',
      'screen-kingdom-reward',
      'screen-final-victory'
    ];

    requiredScreens.forEach(screenId => {
      assert.ok(html.includes(`id="${screenId}"`), `Must define screen element with id="${screenId}"`);
    });
  });

  it('Screen 1 (Splash) defines Option A session resumption controls and Survivor art', () => {
    const html = getIndexContent();
    assert.ok(html.includes('id="btn-start-adventure"'), 'Must define #btn-start-adventure');
    assert.ok(html.includes('id="session-resume-box"'), 'Must define #session-resume-box');
    assert.ok(html.includes('id="btn-resume-adventure"'), 'Must define #btn-resume-adventure');
    assert.ok(html.includes('id="btn-new-adventure"'), 'Must define #btn-new-adventure');
    assert.ok(html.includes('id="splash-hero-art"'), 'Must define #splash-hero-art');
    assert.ok(html.includes('PETUALANGAN MINI ZOO'), 'Must include title PETUALANGAN MINI ZOO');
  });

  it('Screen 2 (Instructions) defines verbatim rule cards and navigation buttons', () => {
    const html = getIndexContent();
    assert.ok(html.includes('id="btn-back-splash"'), 'Must define #btn-back-splash');
    assert.ok(html.includes('id="btn-start-mission"'), 'Must define #btn-start-mission');
    assert.ok(html.includes('Kerajaan Karnivora'), 'Must mention Kerajaan Karnivora');
    assert.ok(html.includes('Kerajaan Herbivora'), 'Must mention Kerajaan Herbivora');
    assert.ok(html.includes('Kerajaan Omnivora'), 'Must mention Kerajaan Omnivora');
  });

  it('Screen 3 (Main Map) defines 3 kingdom castle portals and quick start button', () => {
    const html = getIndexContent();
    assert.ok(html.includes('id="card-kingdom-0"'), 'Must define #card-kingdom-0');
    assert.ok(html.includes('id="card-kingdom-1"'), 'Must define #card-kingdom-1');
    assert.ok(html.includes('id="card-kingdom-2"'), 'Must define #card-kingdom-2');
    assert.ok(html.includes('id="btn-map-quick-start"'), 'Must define #btn-map-quick-start');
  });

  it('Screen 4 (Kingdom Gate) defines gate visual, description, and action buttons', () => {
    const html = getIndexContent();
    assert.ok(html.includes('id="gate-castle-visual"'), 'Must define #gate-castle-visual');
    assert.ok(html.includes('id="gate-title"'), 'Must define #gate-title');
    assert.ok(html.includes('id="gate-description"'), 'Must define #gate-description');
    assert.ok(html.includes('id="btn-back-to-map"'), 'Must define #btn-back-to-map');
    assert.ok(html.includes('id="btn-start-challenge"'), 'Must define #btn-start-challenge');
  });

  it('Screen 5 (Challenge) defines checkpoint minimap, clue box, options container, and back button', () => {
    const html = getIndexContent();
    assert.ok(html.includes('id="quiz-minimap"'), 'Must define #quiz-minimap');
    assert.ok(html.includes('id="quiz-animal-visual"'), 'Must define #quiz-animal-visual');
    assert.ok(html.includes('id="quiz-question"'), 'Must define #quiz-question');
    assert.ok(html.includes('id="quiz-clue"'), 'Must define #quiz-clue');
    assert.ok(html.includes('id="quiz-options-container"'), 'Must define #quiz-options-container');
    assert.ok(html.includes('id="btn-back-to-gate"'), 'Must define #btn-back-to-gate');
  });

  it('Screen 6 (Reward) defines crystal showcase, reward text, and continue button', () => {
    const html = getIndexContent();
    assert.ok(html.includes('id="reward-crystal-visual"'), 'Must define #reward-crystal-visual');
    assert.ok(html.includes('id="reward-title"'), 'Must define #reward-title');
    assert.ok(html.includes('id="btn-reward-continue"'), 'Must define #btn-reward-continue');
  });

  it('Screen 7 (Final Victory) defines conferred title and end buttons', () => {
    const html = getIndexContent();
    assert.ok(html.includes('id="victory-title"'), 'Must define #victory-title');
    assert.ok(html.includes('id="victory-grand-title"'), 'Must define #victory-grand-title');
    assert.ok(html.includes('PENJAGA PENGETAHUAN SATWA MINI ZOO!'), 'Must include verbatim conferred title');
    assert.ok(html.includes('id="victory-survivor-visual"'), 'Must define #victory-survivor-visual');
    assert.ok(html.includes('id="victory-crystals-container"'), 'Must define #victory-crystals-container');
    assert.ok(html.includes('id="btn-play-again"'), 'Must define #btn-play-again');
    assert.ok(html.includes('id="btn-finish-game"'), 'Must define #btn-finish-game');
  });

  it('Feedback modal defines required dialog elements', () => {
    const html = getIndexContent();
    assert.ok(html.includes('id="feedback-modal"'), 'Must define #feedback-modal');
    assert.ok(html.includes('id="feedback-title"'), 'Must define #feedback-title');
    assert.ok(html.includes('id="feedback-text"'), 'Must define #feedback-text');
    assert.ok(html.includes('id="feedback-qr-container"'), 'Must define #feedback-qr-container');
    assert.ok(html.includes('id="feedback-qr-image"'), 'Must define #feedback-qr-image');
    assert.ok(html.includes('id="btn-feedback-retry"'), 'Must define #btn-feedback-retry');
    assert.ok(html.includes('id="btn-feedback-continue"'), 'Must define #btn-feedback-continue');
  });

  it('Enforces Anti-Slop: zero generic emojis in visible copy of Index.html', () => {
    const html = getIndexContent();
    const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    assert.strictEqual(emojiRegex.test(html), false, 'src/Index.html must NOT contain generic emoji characters');
  });

  it('Standalone build bundles src/Index.html seamlessly into index.html', () => {
    const { compileStandalone } = require(path.join(SCRIPTS_DIR, 'build_standalone.js'));
    const bundle = compileStandalone({ dryRun: false });
    assert.ok(bundle, 'Standalone bundle must be generated');
    assert.ok(fs.existsSync(path.join(ROOT_DIR, 'index.html')), 'Root index.html must exist');
    assert.ok(!bundle.includes('<?!='), 'Standalone bundle must not contain <?!= tags');
    assert.ok(bundle.includes('screen-splash'), 'Standalone bundle must contain screen-splash');
    assert.ok(bundle.includes('PENJAGA PENGETAHUAN SATWA MINI ZOO!'), 'Standalone bundle must contain final victory title');
  });
});

// =============================================================================
// Task 6: End-to-End Gameplay Simulation & Standalone Bundle Integrity
// =============================================================================
const { runE2ETests } = require(path.join(__dirname, 'e2e_simulation.test.js'));
runE2ETests({ describe, it });

// =============================================================================
// Test Runner Summary & Exit Code
// =============================================================================
console.log('\n========================================');
console.log(`Test Results: ${passedTests}/${totalTests} passed (${failedTests} failed)`);
console.log('========================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
