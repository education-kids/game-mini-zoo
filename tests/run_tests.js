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
