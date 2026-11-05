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
        answer: 'A',
        clue: 'Aku pemakan daging. Tubuhku memiliki belang hitam dan oranye.',
        options: ['A. Harimau', 'B. Kelinci', 'C. Kambing']
      },
      {
        id: 'buaya',
        answer: 'B',
        clue: 'Aku pemakan daging. Aku hidup di air dan darat serta memiliki rahang kuat dan gigi tajam.',
        options: ['A. Kura-kura', 'B. Buaya', 'C. Katak']
      },
      {
        id: 'serigala',
        answer: 'C',
        clue: 'Aku pemakan daging. Aku sering hidup berkelompok dan berkomunikasi dengan lolongan.',
        options: ['A. Rubah', 'B. Anjing', 'C. Serigala']
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
        answer: 'B',
        clue: 'Aku pemakan segalanya. Aku memakan biji-bijian dan juga cacing tanah.',
        options: ['A. Bebek', 'B. Ayam', 'C. Angsa']
      },
      {
        id: 'babi',
        answer: 'C',
        clue: 'Aku pemakan segalanya. Hidungku bulat dan aku memakan umbi serta sisa makanan.',
        options: ['A. Kuda', 'B. Kambing', 'C. Babi']
      },
      {
        id: 'monyet',
        answer: 'A',
        clue: 'Aku pemakan segalanya. Aku suka buah, biji, dan serangga kecil di pohon.',
        options: ['A. Monyet', 'B. Kelinci', 'C. Rusa']
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
});

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
