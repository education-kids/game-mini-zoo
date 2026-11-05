/**
 * Petualangan Mini Zoo - Comprehensive End-to-End Simulation Test Suite
 *
 * Verifies:
 * 1. Complete end-to-end player journey:
 *    Splash -> Instructions -> Main Map -> Gate -> Challenge -> Reward -> Victory.
 * 2. Table J2 Checkpoint Progression & Invariance:
 *    - Wrong answer does NOT advance level or checkpoints (remains strictly locked/active).
 *    - Correct answer shows feedback modal but does NOT advance level until 'LANJUTKAN' is clicked.
 *    - Advancing updates 5-checkpoint horizontal line and progress counts accurately.
 * 3. Option A Session Management & Persistence:
 *    - Mid-game persistence in localStorage ('mini_zoo_progress_v2').
 *    - Splash screen dynamic detection of saved progress (Resume box vs Start button).
 *    - Resuming session restores exact kingdom and challenge level.
 *    - 'Mulai dari Awal' resets state cleanly.
 * 4. Full 15-Level Gameplay across all 3 Kingdoms:
 *    - Kerajaan Karnivora (Levels 1-5): Singa, Harimau, Buaya, Serigala, Hiu -> Kristal Keberanian.
 *    - Kerajaan Herbivora (Levels 6-10): Sapi, Kelinci, Jerapah, Gajah, Rusa -> Kristal Kehidupan.
 *    - Kerajaan Omnivora (Levels 11-15): Beruang, Ayam, Babi, Monyet, Gagak -> Kristal Harmoni.
 * 5. Final Victory & Conferred Title:
 *    - Collection of all 3 crystals verified in Top HUD and Victory showcase.
 *    - Verbatim grand title: "PENJAGA PENGETAHUAN SATWA MINI ZOO!".
 *    - Survivor vector visual and celebratory confetti particles.
 * 6. Standalone Bundle Build & HTML/SVG Asset Integrity:
 *    - Verifies index.html build size < 1 MB.
 *    - Zero un-evaluated Apps Script tags (<?!=, <?=, <?) in bundle.
 *    - Valid HTML5 structure, claymorphism styling, and SVG vector art.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const SCRIPTS_DIR = path.join(ROOT_DIR, 'scripts');

/**
 * Creates a fully functioning mock browser/DOM simulation environment
 * that replicates Google Apps Script sandboxed iframe & browser globals.
 */
function createSimulationEnvironment() {
  const gameDataPath = path.join(SRC_DIR, 'GameData.html');
  const jsFilePath = path.join(SRC_DIR, 'JavaScript.html');

  assert.ok(fs.existsSync(gameDataPath), 'src/GameData.html must exist');
  assert.ok(fs.existsSync(jsFilePath), 'src/JavaScript.html must exist');

  const gameDataContent = fs.readFileSync(gameDataPath, 'utf8');
  const jsContent = fs.readFileSync(jsFilePath, 'utf8');

  const rawDataJs = gameDataContent.replace(/<\/?script[^>]*>/gi, '');
  const rawCodeJs = jsContent.replace(/<\/?script[^>]*>/gi, '');

  // In-memory mock localStorage
  const storageStore = {};
  const mockLocalStorage = {
    getItem: (key) => (Object.prototype.hasOwnProperty.call(storageStore, key) ? storageStore[key] : null),
    setItem: (key, val) => { storageStore[key] = String(val); },
    removeItem: (key) => { delete storageStore[key]; },
    clear: () => { Object.keys(storageStore).forEach(k => delete storageStore[k]); },
    _dump: () => ({ ...storageStore })
  };

  /**
   * Parses basic HTML tags into mock element child trees
   */
  function parseHtmlChildren(html, parent) {
    const children = [];
    if (!html || typeof html !== 'string') return children;

    // Match top tags like <button ...>...</button>, <div ...>...</div>
    const tagRegex = /<([a-zA-Z0-9_-]+)([^>]*)>([\s\S]*?)<\/\1>|<([a-zA-Z0-9_-]+)([^>]*)\/>/gi;
    let match;
    while ((match = tagRegex.exec(html)) !== null) {
      const tagName = match[1] || match[4];
      const attrStr = match[2] || match[5] || '';
      const innerHtml = match[3] || '';

      const el = createMockElement('', tagName);
      el.parentElement = parent;

      // Extract attributes
      const attrRegex = /([a-zA-Z0-9_-]+)=["']([^"']*)["']/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attrStr)) !== null) {
        const attrName = attrMatch[1];
        const attrVal = attrMatch[2];
        el.setAttribute(attrName, attrVal);
        if (attrName === 'id') el.id = attrVal;
        if (attrName === 'class') {
          attrVal.split(/\s+/).filter(Boolean).forEach(c => el.classList.add(c));
        }
      }

      if (innerHtml) {
        el._rawInnerHTML = innerHtml;
        // Recursively parse children if it contains HTML tags
        if (innerHtml.includes('<')) {
          el.children = parseHtmlChildren(innerHtml, el);
        } else {
          el.textContent = innerHtml.trim();
        }
      }

      children.push(el);
    }
    return children;
  }

  // Mock Element Factory
  function createMockElement(id = '', tag = 'div') {
    const classListSet = new Set();
    const attributes = {};
    let _text = '';
    let _innerHtml = '';

    const el = {
      id,
      tagName: tag.toUpperCase(),
      children: [],
      parentElement: null,
      style: {},

      get textContent() {
        if (_text) return _text;
        if (el.children.length > 0) {
          return el.children.map(c => c.textContent).join(' ').trim();
        }
        return _innerHtml.replace(/<[^>]*>/g, '').trim();
      },
      set textContent(val) {
        _text = String(val || '');
        _innerHtml = String(val || '');
        el.children.length = 0;
      },

      get innerHTML() {
        return _innerHtml;
      },
      set innerHTML(val) {
        _innerHtml = String(val || '');
        _text = '';
        el.children = parseHtmlChildren(_innerHtml, el);
      },

      classList: {
        add: (...classes) => classes.forEach(c => { if (c) classListSet.add(c); }),
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

      setAttribute: (k, v) => {
        attributes[k] = String(v);
        if (k === 'id') el.id = String(v);
      },
      getAttribute: (k) => (Object.prototype.hasOwnProperty.call(attributes, k) ? attributes[k] : null),
      hasAttribute: (k) => Object.prototype.hasOwnProperty.call(attributes, k),
      removeAttribute: (k) => { delete attributes[k]; },

      appendChild: (child) => {
        child.parentElement = el;
        el.children.push(child);
        return child;
      },

      closest: function (sel) {
        let current = this;
        while (current) {
          if (matchesSelector(current, sel)) {
            return current;
          }
          current = current.parentElement;
        }
        return null;
      },

      querySelector: function (sel) {
        return findDescendant(this, sel);
      },

      querySelectorAll: function (sel) {
        return findAllDescendants(this, sel);
      },

      click: function () {
        if (mockDocument && mockDocument.dispatchEvent) {
          mockDocument.dispatchEvent({ type: 'click', target: this });
        }
      }
    };

    return el;
  }

  function matchesSelector(el, sel) {
    if (!el || !sel) return false;
    const parts = sel.split(',').map(s => s.trim());
    for (const part of parts) {
      if (part === '[id]' && el.id) return true;
      if (part.startsWith('#') && el.id === part.slice(1)) return true;
      if (part.startsWith('.') && el.classList && el.classList.contains(part.slice(1))) return true;
      if (part.toUpperCase() === el.tagName) return true;

      // Attribute match: [data-attr="val"] or [data-attr]
      const attrMatch = part.match(/^\[([a-zA-Z0-9_-]+)(?:=["']?([^"']*)["']?)?\]$/);
      if (attrMatch) {
        const attrName = attrMatch[1];
        const expectedVal = attrMatch[2];
        if (expectedVal !== undefined) {
          if (el.getAttribute(attrName) === expectedVal) return true;
        } else {
          if (el.hasAttribute(attrName)) return true;
        }
      }
    }
    return false;
  }

  function findDescendant(root, sel) {
    for (const child of root.children) {
      if (matchesSelector(child, sel)) return child;
      const found = findDescendant(child, sel);
      if (found) return found;
    }
    return null;
  }

  function findAllDescendants(root, sel, results = []) {
    for (const child of root.children) {
      if (matchesSelector(child, sel)) results.push(child);
      findAllDescendants(child, sel, results);
    }
    return results;
  }

  // Pre-seed known DOM Elements from src/Index.html
  const elementsMap = {};
  const knownIds = [
    // HUD
    'game-hud', 'slot-kristal-keberanian', 'slot-kristal-kehidupan', 'slot-kristal-harmoni',
    'sound-toggle', 'btn-fullscreen',

    // Screens
    'screen-splash', 'screen-instructions', 'screen-main-map',
    'screen-kingdom-gate', 'screen-challenge', 'screen-kingdom-reward', 'screen-final-victory',

    // Screen 1: Splash
    'splash-hero-art', 'splash-saved-info', 'session-resume-box',
    'btn-start-adventure', 'btn-resume-adventure', 'btn-new-adventure',

    // Screen 2: Instructions
    'btn-back-splash', 'btn-start-mission',

    // Screen 3: Main Map
    'card-kingdom-0', 'card-kingdom-1', 'card-kingdom-2', 'btn-map-quick-start',

    // Screen 4: Gate
    'gate-castle-visual', 'gate-title', 'gate-description', 'gate-minimap',
    'btn-back-to-map', 'btn-start-challenge',

    // Screen 5: Challenge
    'btn-back-to-gate', 'quiz-kingdom-badge', 'quiz-level-indicator', 'quiz-minimap',
    'quiz-animal-visual', 'quiz-question', 'quiz-clue', 'quiz-options-container',

    // Screen 6: Reward
    'reward-crystal-visual', 'reward-title', 'reward-crystal-name', 'reward-text',
    'reward-minimap', 'btn-reward-continue',

    // Screen 7: Victory
    'victory-confetti', 'victory-title', 'victory-grand-title', 'victory-survivor-visual',
    'victory-crystals-container', 'btn-play-again', 'btn-finish-game',

    // Modals
    'modal-feedback', 'feedback-modal', 'feedback-title', 'feedback-text',
    'feedback-animal-info', 'btn-feedback-retry', 'btn-feedback-continue', 'btn-feedback-close'
  ];

  knownIds.forEach(id => {
    let tag = 'div';
    if (id.startsWith('btn-') || id === 'sound-toggle') tag = 'button';
    if (id.startsWith('screen-')) tag = 'section';
    if (id.endsWith('-title')) tag = 'h2';
    const el = createMockElement(id, tag);
    if (id.startsWith('screen-')) {
      el.classList.add('game-screen', 'screen');
    }
    elementsMap[id] = el;
  });

  // Setup initial active screen: screen-splash
  elementsMap['screen-splash'].classList.add('active');
  elementsMap['screen-splash'].style.display = 'flex';

  // Seed kingdom cards with badges
  for (let i = 0; i < 3; i++) {
    const card = elementsMap[`card-kingdom-${i}`];
    card.setAttribute('data-kingdom-index', String(i));
    const badge = createMockElement('', 'span');
    badge.classList.add('kingdom-progress-badge');
    badge.textContent = '0/5 Selesai';
    card.appendChild(badge);

    const statusLabel = createMockElement('', 'span');
    statusLabel.classList.add('kingdom-status-label');
    statusLabel.textContent = i === 0 ? 'Terbuka' : 'Terkunci';
    card.appendChild(statusLabel);
  }

  // Document Listener registry
  const captureListeners = {};
  const bubbleListeners = {};

  const mockDocument = {
    getElementById: (id) => {
      if (!elementsMap[id]) {
        elementsMap[id] = createMockElement(id);
      }
      return elementsMap[id];
    },
    querySelector: (sel) => {
      if (sel.startsWith('#')) {
        return mockDocument.getElementById(sel.slice(1));
      }
      for (const id in elementsMap) {
        if (matchesSelector(elementsMap[id], sel)) return elementsMap[id];
      }
      return null;
    },
    querySelectorAll: (sel) => {
      if (sel.includes('.game-screen') || sel.includes('.screen')) {
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
      const results = [];
      for (const id in elementsMap) {
        if (matchesSelector(elementsMap[id], sel)) results.push(elementsMap[id]);
      }
      return results;
    },
    createElement: (tag) => createMockElement('', tag),
    addEventListener: (type, fn, options) => {
      const isCapture = typeof options === 'boolean' ? options : Boolean(options && options.capture);
      const registry = isCapture ? captureListeners : bubbleListeners;
      registry[type] = registry[type] || [];
      registry[type].push(fn);
    },
    dispatchEvent: (evt) => {
      const type = evt.type;
      const target = evt.target;
      const eventObj = {
        type,
        target,
        preventDefault: () => {},
        stopPropagation: () => {}
      };

      // 1. Capture phase listeners
      if (captureListeners[type]) {
        [...captureListeners[type]].forEach(fn => fn(eventObj));
      }
      // 2. Bubble phase listeners
      if (bubbleListeners[type]) {
        [...bubbleListeners[type]].forEach(fn => fn(eventObj));
      }
    }
  };

  // Mock AudioContext
  class MockAudioContext {
    constructor() {
      this.state = 'running';
      this.currentTime = 0;
      this.destination = {};
    }
    createOscillator() {
      return {
        type: 'sine',
        frequency: {
          setValueAtTime: () => {},
          exponentialRampToValueAtTime: () => {}
        },
        connect: () => {},
        start: () => {},
        stop: () => {}
      };
    }
    createGain() {
      return {
        gain: {
          setValueAtTime: () => {},
          exponentialRampToValueAtTime: () => {}
        },
        connect: () => {}
      };
    }
    resume() {
      return Promise.resolve();
    }
  }

  const mockWindow = {
    localStorage: mockLocalStorage,
    document: mockDocument,
    AudioContext: MockAudioContext,
    webkitAudioContext: MockAudioContext,
    alert: () => {},
    console
  };

  // Execute GameData first
  const runGameData = new Function('window', 'document', 'module', 'exports', rawDataJs);
  const dataModule = { exports: {} };
  runGameData(mockWindow, mockDocument, dataModule, dataModule.exports);
  mockWindow.GAME_DATA = dataModule.exports.kingdoms ? dataModule.exports : mockWindow.GAME_DATA;

  // Execute JavaScript module
  const runJs = new Function('window', 'document', 'localStorage', 'module', 'exports', rawCodeJs);
  const codeModule = { exports: {} };
  runJs(mockWindow, mockDocument, mockLocalStorage, codeModule, codeModule.exports);

  return {
    window: mockWindow,
    document: mockDocument,
    localStorage: mockLocalStorage,
    GAME_DATA: mockWindow.GAME_DATA,
    GameEngine: codeModule.exports.GameEngine || mockWindow.GameEngine,
    SoundEffects: codeModule.exports.SoundEffects || mockWindow.SoundEffects,
    MiniMapComponent: codeModule.exports.MiniMapComponent || mockWindow.MiniMapComponent,
    QuizController: codeModule.exports.QuizController || mockWindow.QuizController,
    RewardController: codeModule.exports.RewardController || mockWindow.RewardController,
    VictoryController: codeModule.exports.VictoryController || mockWindow.VictoryController,
    NavigationRouter: codeModule.exports.NavigationRouter || mockWindow.NavigationRouter,
    initApp: codeModule.exports.initApp || mockWindow.initApp,
    elements: elementsMap
  };
}

/**
 * Boots a clean application instance connected with controllers and navigation router.
 */
function createGameApp() {
  const env = createSimulationEnvironment();
  const { GameEngine, SoundEffects, QuizController, RewardController, VictoryController, NavigationRouter, GAME_DATA } = env;

  const engine = new GameEngine(GAME_DATA);
  const sfx = new SoundEffects();
  const quizController = new QuizController(engine, sfx, null);
  const rewardController = new RewardController(engine, sfx, null);
  const victoryController = new VictoryController(engine, sfx, null);

  const router = new NavigationRouter({
    engine,
    sfx,
    quizController,
    rewardController,
    victoryController
  });

  quizController.router = router;
  rewardController.router = router;
  victoryController.router = router;

  router.quizController = quizController;
  router.rewardController = rewardController;
  router.victoryController = victoryController;

  env.window.gameEngine = engine;
  env.window.soundEffects = sfx;
  env.window.navigationRouter = router;
  env.window.quizController = quizController;
  env.window.rewardController = rewardController;
  env.window.victoryController = victoryController;

  router.navigateTo('screen-splash');

  return {
    ...env,
    engine,
    sfx,
    router,
    quizController,
    rewardController,
    victoryController
  };
}

/**
 * Main E2E Test Suite Definitions
 */
function runE2ETests(runner) {
  const { describe, it } = runner;

  // ===========================================================================
  // SUITE 1: DOM & Environment Initial State
  // ===========================================================================
  describe('E2E Simulation: Bootstrapping & Initial State', () => {
    it('boots safely into screen-splash with sound ready and zero crystals collected', () => {
      const app = createGameApp();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-splash');
      assert.strictEqual(app.elements['screen-splash'].style.display, 'flex');
      assert.strictEqual(app.elements['screen-splash'].classList.contains('active'), true);
      assert.strictEqual(app.engine.collectedCrystals.length, 0);

      // Verify crystal slots are empty
      assert.strictEqual(app.elements['slot-kristal-keberanian'].classList.contains('crystal-empty'), true);
      assert.strictEqual(app.elements['slot-kristal-kehidupan'].classList.contains('crystal-empty'), true);
      assert.strictEqual(app.elements['slot-kristal-harmoni'].classList.contains('crystal-empty'), true);
    });

    it('initial Option A state: Start button is visible while Resume box is hidden', () => {
      const app = createGameApp();
      assert.strictEqual(app.engine.hasSavedProgress(), false);
      assert.strictEqual(app.elements['btn-start-adventure'].style.display, 'inline-flex');
      assert.strictEqual(app.elements['session-resume-box'].style.display, 'none');
    });
  });

  // ===========================================================================
  // SUITE 2: Navigation Journey (Splash -> Instructions -> Main Map -> Gate -> Challenge)
  // ===========================================================================
  describe('E2E Simulation: Navigation Flow to Challenge', () => {
    it('Splash -> Instructions: clicking btn-start-adventure transitions screens', () => {
      const app = createGameApp();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-splash');

      // Click Start Adventure button
      app.elements['btn-start-adventure'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-instructions');
      assert.strictEqual(app.elements['screen-instructions'].style.display, 'flex');
      assert.strictEqual(app.elements['screen-splash'].style.display, 'none');
    });

    it('Instructions -> Main Map: clicking btn-start-mission navigates to map', () => {
      const app = createGameApp();
      app.elements['btn-start-adventure'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-instructions');

      // Click Start Mission button
      app.elements['btn-start-mission'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-main-map');
      assert.strictEqual(app.elements['screen-main-map'].style.display, 'flex');
    });

    it('Main Map locks: Kingdom 0 unlocked, Kingdoms 1 & 2 locked', () => {
      const app = createGameApp();
      app.router.navigateTo('screen-main-map');

      assert.strictEqual(app.engine.isKingdomUnlocked(0), true, 'Karnivora must be unlocked');
      assert.strictEqual(app.engine.isKingdomUnlocked(1), false, 'Herbivora must be locked');
      assert.strictEqual(app.engine.isKingdomUnlocked(2), false, 'Omnivora must be locked');

      // Click on locked Kingdom 1 card: should NOT navigate away from main map
      app.elements['card-kingdom-1'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-main-map', 'Clicking locked kingdom must not open gate');

      // Click on locked Kingdom 2 card: should NOT navigate away from main map
      app.elements['card-kingdom-2'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-main-map');
    });

    it('Main Map -> Kingdom Gate: clicking unlocked Kingdom 0 opens Karnivora gate', () => {
      const app = createGameApp();
      app.router.navigateTo('screen-main-map');

      // Click unlocked Kingdom 0 card
      app.elements['card-kingdom-0'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-kingdom-gate');
      assert.ok(app.elements['gate-title'].textContent.includes('Karnivora'));
      assert.ok(app.elements['gate-castle-visual'].innerHTML.includes('<svg'));
    });

    it('Kingdom Gate -> Challenge: clicking btn-start-challenge opens Level 1 challenge', () => {
      const app = createGameApp();
      app.router.navigateTo('screen-main-map');
      app.elements['card-kingdom-0'].click();

      // Click Start Challenge
      app.elements['btn-start-challenge'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-challenge');
      assert.strictEqual(app.elements['quiz-question'].textContent, 'Siapakah aku?');
      assert.ok(app.elements['quiz-clue'].textContent.includes('surai lebat'), 'Clue must mention surai lebat');
      assert.ok(app.elements['quiz-animal-visual'].innerHTML.includes('<svg'));
    });
  });

  // ===========================================================================
  // SUITE 3: Table J2 Checkpoint Invariance & Feedback Mechanics
  // ===========================================================================
  describe('E2E Simulation: Table J2 Checkpoint Progression & Strict Invariance', () => {
    it('Wrong answer simulation: level and checkpoints do NOT advance', () => {
      const app = createGameApp();
      app.router.navigateTo('screen-challenge');

      assert.strictEqual(app.engine.currentKingdomIndex, 0);
      assert.strictEqual(app.engine.currentLevelIndex, 0);
      assert.strictEqual(app.engine.getKingdomProgressCount(0), 0);
      assert.strictEqual(app.engine.getCheckpointStatus(0), 'active');
      assert.strictEqual(app.engine.getCheckpointStatus(1), 'locked');

      // Level 1: Singa (Correct: B). User clicks option A (Harimau)
      const optA = app.elements['quiz-options-container'].querySelector('[data-option-key="A"]');
      assert.ok(optA, 'Option A button must exist');
      optA.click();

      // Modal opens with error feedback
      assert.strictEqual(app.quizController.isModalOpen, true);
      assert.strictEqual(app.elements['feedback-title'].textContent, 'Coba Lagi!');
      assert.strictEqual(app.elements['btn-feedback-retry'].style.display, 'inline-flex');
      assert.strictEqual(app.elements['btn-feedback-continue'].style.display, 'none');

      // STRICT TABLE J2 INVARIANCE CHECK: Level MUST NOT advance!
      assert.strictEqual(app.engine.currentLevelIndex, 0, 'Level index must remain 0 on wrong answer');
      assert.strictEqual(app.engine.getKingdomProgressCount(0), 0, 'Progress must remain 0/5');
      assert.strictEqual(app.engine.getCheckpointStatus(0), 'active', 'Checkpoint 0 must remain active');
      assert.strictEqual(app.engine.getCheckpointStatus(1), 'locked', 'Checkpoint 1 must remain locked');

      // Click Coba Lagi
      app.elements['btn-feedback-retry'].click();
      assert.strictEqual(app.quizController.isModalOpen, false);
      assert.strictEqual(app.elements['feedback-modal'].style.display, 'none');

      // Still on Level 1 (Singa)
      assert.strictEqual(app.engine.currentLevelIndex, 0);
      assert.ok(app.elements['quiz-clue'].textContent.includes('surai lebat'));
    });

    it('Correct answer simulation: confirms feedback modal, advances level upon LANJUTKAN', () => {
      const app = createGameApp();
      app.router.navigateTo('screen-challenge');

      // Level 1: Singa. User clicks correct option B
      const optB = app.elements['quiz-options-container'].querySelector('[data-option-key="B"]');
      assert.ok(optB, 'Option B button must exist');
      optB.click();

      // Modal opens with success feedback
      assert.strictEqual(app.quizController.isModalOpen, true);
      assert.strictEqual(app.elements['feedback-title'].textContent, 'Hebat! Jawabanmu Benar!');
      assert.ok(app.elements['feedback-text'].textContent.includes('Aku adalah singa'));
      assert.strictEqual(app.elements['btn-feedback-continue'].style.display, 'inline-flex');
      assert.strictEqual(app.elements['btn-feedback-retry'].style.display, 'none');

      // Crucial check: Level MUST NOT advance yet before continue button is clicked
      assert.strictEqual(app.engine.currentLevelIndex, 0, 'Level must not advance prior to LANJUTKAN click');

      // User clicks LANJUTKAN
      app.elements['btn-feedback-continue'].click();

      // Modal closes and game advances to Level 2 (Harimau)
      assert.strictEqual(app.quizController.isModalOpen, false);
      assert.strictEqual(app.engine.currentLevelIndex, 1, 'Level index must now be 1 (Harimau)');
      assert.strictEqual(app.engine.getKingdomProgressCount(0), 1, 'Progress count must now be 1/5');
      assert.strictEqual(app.engine.getCheckpointStatus(0), 'completed', 'Checkpoint 0 is now completed');
      assert.strictEqual(app.engine.getCheckpointStatus(1), 'active', 'Checkpoint 1 is now active');
      assert.strictEqual(app.engine.getCheckpointStatus(2), 'locked', 'Checkpoint 2 remains locked');

      // UI Challenge screen reflects Level 2 (Harimau)
      assert.ok(app.elements['quiz-clue'].textContent.includes('belang hitam dan oranye'), 'Clue must update to Harimau');
      assert.ok(app.elements['quiz-level-indicator'].textContent.includes('2 dari 5'));
    });
  });

  // ===========================================================================
  // SUITE 4: Option A Session Management & Persistence
  // ===========================================================================
  describe('E2E Simulation: Option A Session Persistence & Resumption', () => {
    it('mid-game save is written to localStorage and detected on Splash screen', () => {
      const app = createGameApp();
      app.router.navigateTo('screen-challenge');

      // Advance 2 levels (Harimau, then Buaya)
      const optB = app.elements['quiz-options-container'].querySelector('[data-option-key="B"]');
      optB.click();
      app.elements['btn-feedback-continue'].click(); // to level 2 (Harimau)

      const optA = app.elements['quiz-options-container'].querySelector('[data-option-key="A"]');
      optA.click();
      app.elements['btn-feedback-continue'].click(); // to level 3 (Buaya)

      assert.strictEqual(app.engine.currentLevelIndex, 2);
      assert.strictEqual(app.engine.getKingdomProgressCount(0), 2);

      // Verify localStorage was populated
      assert.strictEqual(app.engine.hasSavedProgress(), true);
      const rawStored = app.localStorage.getItem('mini_zoo_progress_v2');
      assert.ok(rawStored, 'Storage key mini_zoo_progress_v2 must exist');
      const parsed = JSON.parse(rawStored);
      assert.strictEqual(parsed.currentKingdomIndex, 0);
      assert.strictEqual(parsed.currentLevelIndex, 2);

      // Navigate back to splash (simulate returning user)
      app.router.navigateTo('screen-splash');
      assert.strictEqual(app.elements['btn-start-adventure'].style.display, 'none');
      assert.strictEqual(app.elements['session-resume-box'].style.display, 'flex');
      assert.strictEqual(app.elements['btn-resume-adventure'].style.display, 'inline-flex');
      assert.strictEqual(app.elements['btn-new-adventure'].style.display, 'inline-flex');
      assert.ok(app.elements['splash-saved-info'].textContent.includes('Kerajaan Karnivora'));
      assert.ok(app.elements['splash-saved-info'].textContent.includes('3/5'));
    });

    it('resume button restores player directly into current challenge in progress', () => {
      const app = createGameApp();
      app.router.navigateTo('screen-challenge');

      // Complete Level 1 (Singa)
      app.elements['quiz-options-container'].querySelector('[data-option-key="B"]').click();
      app.elements['btn-feedback-continue'].click();

      // Return to Splash
      app.router.navigateTo('screen-splash');
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-splash');

      // Click Lanjutkan Petualangan (Resume)
      app.elements['btn-resume-adventure'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-challenge');
      assert.strictEqual(app.engine.currentLevelIndex, 1);
      assert.ok(app.elements['quiz-clue'].textContent.includes('belang hitam dan oranye'));
    });

    it('new adventure button resets progress and starts fresh from instructions', () => {
      const app = createGameApp();
      app.router.navigateTo('screen-challenge');

      // Advance 1 level
      app.elements['quiz-options-container'].querySelector('[data-option-key="B"]').click();
      app.elements['btn-feedback-continue'].click();

      // Return to splash
      app.router.navigateTo('screen-splash');

      // Click Mulai dari Awal
      app.elements['btn-new-adventure'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-instructions');
      assert.strictEqual(app.engine.currentKingdomIndex, 0);
      assert.strictEqual(app.engine.currentLevelIndex, 0);
      assert.strictEqual(app.engine.hasSavedProgress(), false);
      assert.strictEqual(app.localStorage.getItem('mini_zoo_progress_v2'), null);
    });
  });

  // ===========================================================================
  // SUITE 5: Full 15-Level Journey Across 3 Kingdoms & Final Victory
  // ===========================================================================
  describe('E2E Simulation: Full 15-Level Journey Across All 3 Kingdoms', () => {
    it('plays through all 15 levels, collects 3 crystals, and confers grand victory title', () => {
      const app = createGameApp();
      const verbatimData = app.GAME_DATA;

      // Kingdom 1: Karnivora (Levels 1-5: Singa, Harimau, Buaya, Serigala, Hiu)
      app.router.navigateTo('screen-main-map');
      app.elements['card-kingdom-0'].click();
      app.elements['btn-start-challenge'].click();

      const k1Answers = ['B', 'A', 'B', 'C', 'B'];
      for (let i = 0; i < 5; i++) {
        assert.strictEqual(app.router.getCurrentScreen(), 'screen-challenge');
        assert.strictEqual(app.engine.currentLevelIndex, i);

        // Select correct option
        const optKey = k1Answers[i];
        const optBtn = app.elements['quiz-options-container'].querySelector(`[data-option-key="${optKey}"]`);
        assert.ok(optBtn, `Kingdom 1 Level ${i + 1} option ${optKey} button must exist`);
        optBtn.click();

        // Click LANJUTKAN
        assert.strictEqual(app.quizController.isModalOpen, true);
        app.elements['btn-feedback-continue'].click();
      }

      // Check Kingdom 1 Completion Reward Screen
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-kingdom-reward');
      assert.strictEqual(app.engine.getKingdomProgressCount(0), 5);
      assert.ok(app.engine.collectedCrystals.includes('kristal_keberanian'), 'Must award Kristal Keberanian');
      assert.ok(app.elements['reward-title'].textContent.includes('Karnivora'));
      assert.strictEqual(app.elements['reward-crystal-name'].textContent, 'Kristal Keberanian × 1');

      // Top HUD reflects Kristal Keberanian collected
      assert.strictEqual(app.elements['slot-kristal-keberanian'].classList.contains('crystal-collected'), true);
      assert.ok(app.elements['slot-kristal-keberanian'].innerHTML.includes('<svg'));

      // Click LANJUT KE KERAJAAN HERBIVORA
      app.elements['btn-reward-continue'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-main-map');

      // Verify Kingdom 1 (Herbivora) is now unlocked on Main Map
      assert.strictEqual(app.engine.isKingdomUnlocked(1), true, 'Herbivora must now be unlocked');
      assert.strictEqual(app.engine.isKingdomUnlocked(2), false, 'Omnivora must still be locked');

      // Kingdom 2: Herbivora (Levels 6-10: Sapi, Kelinci, Jerapah, Gajah, Rusa)
      app.elements['card-kingdom-1'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-kingdom-gate');
      assert.ok(app.elements['gate-title'].textContent.includes('Herbivora'));
      app.elements['btn-start-challenge'].click();

      const k2Answers = ['B', 'A', 'B', 'B', 'B'];
      for (let i = 0; i < 5; i++) {
        assert.strictEqual(app.router.getCurrentScreen(), 'screen-challenge');
        assert.strictEqual(app.engine.currentKingdomIndex, 1);
        assert.strictEqual(app.engine.currentLevelIndex, i);

        const optKey = k2Answers[i];
        const optBtn = app.elements['quiz-options-container'].querySelector(`[data-option-key="${optKey}"]`);
        assert.ok(optBtn, `Kingdom 2 Level ${i + 1} option ${optKey} button must exist`);
        optBtn.click();

        app.elements['btn-feedback-continue'].click();
      }

      // Check Kingdom 2 Completion Reward Screen
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-kingdom-reward');
      assert.strictEqual(app.engine.getKingdomProgressCount(1), 5);
      assert.ok(app.engine.collectedCrystals.includes('kristal_kehidupan'), 'Must award Kristal Kehidupan');
      assert.ok(app.elements['reward-title'].textContent.includes('Herbivora'));
      assert.strictEqual(app.elements['reward-crystal-name'].textContent, 'Kristal Kehidupan × 1');

      // Top HUD reflects both Kristal Keberanian & Kehidupan
      assert.strictEqual(app.elements['slot-kristal-keberanian'].classList.contains('crystal-collected'), true);
      assert.strictEqual(app.elements['slot-kristal-kehidupan'].classList.contains('crystal-collected'), true);

      // Click LANJUT KE KERAJAAN OMNIVORA
      app.elements['btn-reward-continue'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-main-map');

      // Verify Kingdom 2 (Omnivora) is now unlocked on Main Map
      assert.strictEqual(app.engine.isKingdomUnlocked(2), true, 'Omnivora must now be unlocked');

      // Kingdom 3: Omnivora (Levels 11-15: Beruang, Ayam, Babi, Monyet, Gagak)
      app.elements['card-kingdom-2'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-kingdom-gate');
      assert.ok(app.elements['gate-title'].textContent.includes('Omnivora'));
      app.elements['btn-start-challenge'].click();

      const k3Answers = ['A', 'B', 'C', 'A', 'B'];
      // Play levels 11 to 14
      for (let i = 0; i < 4; i++) {
        assert.strictEqual(app.router.getCurrentScreen(), 'screen-challenge');
        assert.strictEqual(app.engine.currentKingdomIndex, 2);
        assert.strictEqual(app.engine.currentLevelIndex, i);

        const optKey = k3Answers[i];
        const optBtn = app.elements['quiz-options-container'].querySelector(`[data-option-key="${optKey}"]`);
        assert.ok(optBtn, `Kingdom 3 Level ${i + 1} option ${optKey} button must exist`);
        optBtn.click();

        app.elements['btn-feedback-continue'].click();
      }

      // Final 15th Level: Gagak (Omnivora 5)
      assert.strictEqual(app.engine.currentLevelIndex, 4);
      assert.ok(app.elements['quiz-clue'].textContent.includes('Buluku hitam'));
      const gagakOptBtn = app.elements['quiz-options-container'].querySelector('[data-option-key="B"]');
      gagakOptBtn.click();

      // Click LANJUTKAN to trigger FINAL VICTORY!
      app.elements['btn-feedback-continue'].click();

      // =======================================================================
      // FINAL VICTORY VERIFICATIONS
      // =======================================================================
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-final-victory');
      assert.strictEqual(app.elements['screen-final-victory'].style.display, 'flex');

      // Crystals collected: exactly 3 crystals
      assert.strictEqual(app.engine.collectedCrystals.length, 3);
      assert.ok(app.engine.collectedCrystals.includes('kristal_keberanian'));
      assert.ok(app.engine.collectedCrystals.includes('kristal_kehidupan'));
      assert.ok(app.engine.collectedCrystals.includes('kristal_harmoni'));

      // Top HUD: all 3 slots filled
      assert.strictEqual(app.elements['slot-kristal-keberanian'].classList.contains('crystal-collected'), true);
      assert.strictEqual(app.elements['slot-kristal-kehidupan'].classList.contains('crystal-collected'), true);
      assert.strictEqual(app.elements['slot-kristal-harmoni'].classList.contains('crystal-collected'), true);

      // Final Conferred Title Verbatim Check:
      assert.strictEqual(
        app.elements['victory-grand-title'].textContent.trim(),
        'PENJAGA PENGETAHUAN SATWA MINI ZOO!',
        'Final grand title must match verbatim'
      );

      // Survivor art and crystal cards in victory screen
      assert.ok(app.elements['victory-survivor-visual'].innerHTML.includes('<svg'));
      const crystalsContainerHtml = app.elements['victory-crystals-container'].innerHTML;
      assert.ok(crystalsContainerHtml.includes('Kristal Keberanian'));
      assert.ok(crystalsContainerHtml.includes('Kristal Kehidupan'));
      assert.ok(crystalsContainerHtml.includes('Kristal Harmoni'));

      // Confetti elements created
      assert.ok(app.elements['victory-confetti'].children.length >= 30, 'Confetti particles must be spawned');

      // Click Main Lagi resets and returns to splash
      app.elements['btn-play-again'].click();
      assert.strictEqual(app.router.getCurrentScreen(), 'screen-splash');
      assert.strictEqual(app.engine.currentKingdomIndex, 0);
      assert.strictEqual(app.engine.currentLevelIndex, 0);
      assert.strictEqual(app.engine.collectedCrystals.length, 0);
      assert.strictEqual(app.engine.hasSavedProgress(), false);
    });
  });

  // ===========================================================================
  // SUITE 6: Standalone Bundle Build & HTML/SVG Asset Integrity
  // ===========================================================================
  describe('E2E Simulation: Standalone Bundle Build & Integrity Verification', () => {
    it('scripts/build_standalone.js compiles valid standalone index.html under 1 MB', () => {
      const { compileStandalone } = require(path.join(SCRIPTS_DIR, 'build_standalone.js'));
      const bundle = compileStandalone({ dryRun: false });

      assert.ok(bundle, 'compileStandalone must return bundled HTML string');
      const bundlePath = path.join(ROOT_DIR, 'index.html');
      assert.ok(fs.existsSync(bundlePath), 'index.html must exist at project root');

      const stats = fs.statSync(bundlePath);
      const sizeBytes = stats.size;
      const sizeKb = sizeBytes / 1024;
      const oneMbBytes = 1024 * 1024;

      assert.ok(sizeBytes > 50000, `Bundle must be comprehensive (> 50 KB), got ${sizeKb.toFixed(1)} KB`);
      assert.ok(sizeBytes < oneMbBytes, `Bundle must be strictly under 1 MB, got ${sizeKb.toFixed(1)} KB (${sizeBytes} bytes)`);
    });

    it('Standalone bundle contains ZERO un-evaluated Apps Script tags', () => {
      const bundlePath = path.join(ROOT_DIR, 'index.html');
      assert.ok(fs.existsSync(bundlePath));
      const content = fs.readFileSync(bundlePath, 'utf8');

      assert.strictEqual(content.includes('<?!='), false, 'Bundle must NOT contain <?!= tags');
      assert.strictEqual(content.includes('<?='), false, 'Bundle must NOT contain <?= tags');
      assert.strictEqual(content.includes('<?'), false, 'Bundle must NOT contain <? tags');
    });

    it('Standalone bundle contains valid HTML5 doctype, CSS variables, and all 7 screens', () => {
      const bundlePath = path.join(ROOT_DIR, 'index.html');
      const content = fs.readFileSync(bundlePath, 'utf8');

      // Doctype
      assert.ok(content.startsWith('<!DOCTYPE html>'), 'Bundle must start with <!DOCTYPE html>');

      // Inlined CSS in <style>
      assert.ok(content.includes('<style>'), 'Must include <style> block');
      assert.ok(content.includes('--color-forest-dark: #0B2312') || content.includes('--color-forest-dark:#0B2312'));
      assert.ok(content.includes('--color-karnivora: #DC2626') || content.includes('--color-karnivora:#DC2626'));
      assert.ok(content.includes('--color-herbivora: #16A34A') || content.includes('--color-herbivora:#16A34A'));
      assert.ok(content.includes('--color-omnivora: #7C3AED') || content.includes('--color-omnivora:#7C3AED'));

      // All 7 screens
      const screens = [
        'screen-splash', 'screen-instructions', 'screen-main-map',
        'screen-kingdom-gate', 'screen-challenge', 'screen-kingdom-reward', 'screen-final-victory'
      ];
      screens.forEach(s => {
        assert.ok(content.includes(`id="${s}"`), `Bundle must contain #${s}`);
      });
    });

    it('Standalone bundle contains all 15 animal SVGs, 3 crystal SVGs, and conferred title', () => {
      const bundlePath = path.join(ROOT_DIR, 'index.html');
      const content = fs.readFileSync(bundlePath, 'utf8');

      // Animals
      const animals = [
        'singa', 'harimau', 'buaya', 'serigala', 'hiu',
        'sapi', 'kelinci', 'jerapah', 'gajah', 'rusa',
        'beruang', 'ayam', 'babi', 'monyet', 'gagak'
      ];
      animals.forEach(a => {
        const found = content.includes(`id: '${a}'`) ||
                      content.includes(`assetKey: '${a}'`) ||
                      content.includes(`${a}: \`<svg`) ||
                      content.includes(`'${a}':`) ||
                      content.includes(`"${a}":`);
        assert.ok(found, `Bundle must contain data/asset for animal ${a}`);
      });

      // Crystals
      assert.ok(content.includes('kristal_keberanian'), 'Must contain kristal_keberanian');
      assert.ok(content.includes('kristal_kehidupan'), 'Must contain kristal_kehidupan');
      assert.ok(content.includes('kristal_harmoni'), 'Must contain kristal_harmoni');

      // Conferred title verbatim
      assert.ok(
        content.includes('PENJAGA PENGETAHUAN SATWA MINI ZOO!'),
        'Bundle must contain conferred title PENJAGA PENGETAHUAN SATWA MINI ZOO!'
      );
    });
  });
}

// Standalone execution support
if (require.main === module) {
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  const runner = {
    describe: (name, fn) => {
      console.log(`\n--- ${name} ---`);
      fn();
    },
    it: (name, fn) => {
      totalTests++;
      try {
        fn();
        passedTests++;
        console.log(`  ✓ ${name}`);
      } catch (err) {
        failedTests++;
        console.error(`  ✗ ${name}`);
        console.error(`    ${err.message}`);
      }
    }
  };

  runE2ETests(runner);

  console.log('\n========================================');
  console.log(`E2E Simulation Results: ${passedTests}/${totalTests} passed (${failedTests} failed)`);
  console.log('========================================\n');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

module.exports = {
  runE2ETests,
  createSimulationEnvironment,
  createGameApp
};
