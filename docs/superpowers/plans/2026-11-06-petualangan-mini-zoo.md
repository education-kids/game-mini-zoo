# Petualangan Mini Zoo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build a robust, 100% naskah-compliant, bug-free interactive educational game for Google Apps Script Web App and standalone browsers based on `NASKAH ALUR PERMAINAN.docx`.

**Architecture:** Single-Page Application (SPA) inside a 16:9 responsive canvas with Claymorphism Safari adventure design. Includes a self-contained Web Audio synthesizer, deterministic checkpoint state machine (Table J2), high-resolution vector SVG animal art, shared-device session management (`localStorage` Option A), and bulletproof event capture delegation for Google Apps Script sandboxed iframes.

**Tech Stack:** HTML5, CSS3 (Claymorphism & 16:9 Aspect Ratio), JavaScript ES6+ (Web Audio API, DOM Event Delegation, LocalStorage), Google Apps Script HtmlService.

**Spec:** `docs/superpowers/specs/2026-11-06-petualangan-mini-zoo-design.md`

## Global Constraints
- Target audience: Grade 4 Elementary School students (Siswa kelas 4 SD).
- Verbatim narrative copy for all 15 animals, questions, options, feedback, and dialogues from `NASKAH ALUR PERMAINAN.docx`.
- Zero emojis in visible UI copy (adhering to `/antislop`).
- Zero button jitter on centered CTA buttons (`translateX(-50%)` must be preserved on `:hover` and `:active`).
- Zero broken images in Google Apps Script (100% self-contained vector SVGs; total bundle < 1 MB).
- Strict progression gating: No skipping kingdoms; wrong answers never advance checkpoint; correct answer advances only upon clicking `LANJUTKAN`.

## Review Focus
1. Centered CTA buttons on hover/active: verify cursor never detaches or triggers click cancellation.
2. Google Apps Script iframe click reliability: verify clicks register even when sandboxing or event propagation differs.
3. Option A session resumption: verify "Lanjutkan Petualangan" correctly resumes exact kingdom/level, and "Mulai Petualangan Baru" resets to Level 1.
4. Table J2 Mini Map progression: verify exactly one checkpoint is active, preceding checkpoints are completed, and subsequent checkpoints are locked.
5. Audio synthesizer compatibility: verify sound triggers safely even if browser audio context is suspended prior to user gesture.

---

### Task 1: Environment Setup, Test Runner & Build Compiler

**Files:**
- Create: `package.json`
- Create: `scripts/build_standalone.js`
- Create: `tests/run_tests.js`

**Interfaces:**
- Produces: Test runner CLI (`node tests/run_tests.js`) and Standalone bundle generator (`node scripts/build_standalone.js`).

- [x] **Step 1: Write failing test runner in `tests/run_tests.js`**
- [x] **Step 2: Run `node tests/run_tests.js` to verify failure**
- [x] **Step 3: Implement `package.json`, `scripts/build_standalone.js`, and initial test harness**
- [x] **Step 4: Run `node tests/run_tests.js` to verify PASS**
- [x] **Step 5: Commit**
  ```bash
  git add package.json scripts/build_standalone.js tests/run_tests.js
  git commit -m "chore: setup test runner and standalone build compiler"
  ```

---

### Task 2: Verbatim Game Data & High-Fidelity SVG Animal Library (`src/GameData.html`)

**Files:**
- Create: `src/GameData.html`
- Modify: `tests/run_tests.js`

**Interfaces:**
- Produces: Global `GAME_DATA` object containing `kingdoms`, `levels` (15 animals), `narratives`, `crystals`, and `getAssetSvg(key)`.

- [x] **Step 1: Add unit tests for all 15 levels, verbatim questions, keys, and SVG manifest in `tests/run_tests.js`**
- [x] **Step 2: Run tests to verify failure**
- [x] **Step 3: Implement `src/GameData.html` with all 15 animals verbatim and rich SVG art**
- [x] **Step 4: Run tests to verify PASS**
- [x] **Step 5: Commit**
  ```bash
  git add src/GameData.html tests/run_tests.js
  git commit -m "feat(data): implement verbatim game data and svg asset library"
  ```

---

### Task 3: Core Game Engine, State Machine & Web Audio Synthesizer (`src/JavaScript.html`)

**Files:**
- Create: `src/JavaScript.html`
- Modify: `tests/run_tests.js`

**Interfaces:**
- Produces: `GameEngine`, `SoundEffects`, `NavigationRouter`, `MiniMapComponent`, `QuizController`, `RewardController`, `VictoryController`.

- [x] **Step 1: Add unit tests for GameEngine state transitions (Table J2), Option A session storage, and Audio synthesizer**
- [x] **Step 2: Run tests to verify failure**
- [x] **Step 3: Implement `GameEngine`, `SoundEffects`, `MiniMapComponent`, `QuizController`, and `NavigationRouter` in `src/JavaScript.html`**
- [x] **Step 4: Run tests to verify PASS**
- [x] **Step 5: Commit**
  ```bash
  git add src/JavaScript.html tests/run_tests.js
  git commit -m "feat(engine): implement game state machine, audio synthesizer, and navigation router"
  ```

---

### Task 4: Responsive Safari Design System & Tactile 3D Styling (`src/Stylesheet.html`)

**Files:**
- Create: `src/Stylesheet.html`
- Modify: `tests/run_tests.js`

**Interfaces:**
- Produces: Responsive 16:9 CSS layout, Claymorphism button styling, zero-jitter transform rules, and high-contrast accessibility themes.

- [x] **Step 1: Add CSS unit tests checking 16:9 canvas, contrast tokens, and absence of button jitter**
- [x] **Step 2: Run tests to verify failure**
- [x] **Step 3: Implement complete stylesheet in `src/Stylesheet.html`**
- [x] **Step 4: Run tests to verify PASS**
- [x] **Step 5: Commit**
  ```bash
  git add src/Stylesheet.html tests/run_tests.js
  git commit -m "feat(ui): implement responsive 16:9 claymorphism safari stylesheet"
  ```

---

### Task 5: 16:9 SPA DOM Structure & Google Apps Script Backend (`src/Index.html` & `src/Code.gs`)

**Files:**
- Create: `src/Index.html`
- Create: `src/Code.gs`
- Create: `src/appsscript.json`
- Modify: `tests/run_tests.js`

**Interfaces:**
- Produces: Complete SPA views (Splash with Option A buttons, Instructions, Main Map, Kingdom Gate, Quiz Challenge, Kingdom Reward, Final Victory).

- [x] **Step 1: Add tests verifying DOM element presence, accessibility roles, and GAS entry point**
- [x] **Step 2: Run tests to verify failure**
- [x] **Step 3: Implement `src/Index.html`, `src/Code.gs`, and `src/appsscript.json`**
- [x] **Step 4: Run tests to verify PASS**
- [x] **Step 5: Commit**
  ```bash
  git add src/Index.html src/Code.gs src/appsscript.json tests/run_tests.js
  git commit -m "feat(dom): implement spa markup and google apps script entry point"
  ```

---

### Task 6: Standalone Bundle Build, End-to-End Simulation & Verification

**Files:**
- Modify: `index.html` (generated bundle)
- Create: `tests/e2e_simulation.test.js`
- Modify: `tests/run_tests.js`

**Interfaces:**
- Produces: Single-file `index.html` bundle (<1 MB) ready for 1-click paste into Google Apps Script.

- [x] **Step 1: Write comprehensive end-to-end simulation test simulating complete player journey from Splash to Final Victory**
- [x] **Step 2: Run test suite to verify end-to-end progression and Option A session resume**
- [x] **Step 3: Run `node scripts/build_standalone.js` to generate standalone `index.html`**
- [x] **Step 4: Verify standalone bundle size, asset completeness, and zero console errors**
- [x] **Step 5: Commit**
  ```bash
  git add index.html tests/e2e_simulation.test.js tests/run_tests.js
  git commit -m "test(e2e): verify full gameplay journey and build standalone bundle"
  ```
