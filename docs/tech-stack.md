# Project Requirements & Tech Stack

## 1. Overview

- **Project Name**: showcase-css
- **Core Concept**: Lightweight CSS spotlight library that follows the mouse cursor. One `npm install` + one line of JS to activate. The area around the cursor gets a soft radial gradient "spotlight" effect on the background.
- **Target Audience**: Frontend developers who want a quick, zero-dependency hover/spotlight effect for hero sections, cards, or full-page backgrounds.

## 2. Tech Stack

- **Language**: Vanilla JavaScript (ES6+ modules)
- **Distribution**: npm package (`"type": "module"`)
- **Styling**: CSS custom properties for configuration, injected `<style>` tag for defaults
- **Dependencies**: Zero

## 3. Key Features

- **One-line activation**: `import showcase from 'showcase-css'; showcase();`
- **CSS Custom Properties**: Configure `--spotlight-color`, `--spotlight-radius`, `--spotlight-intensity`, `--spotlight-bg` via CSS or JS options.
- **Performance**: `mousemove` handler throttled via `requestAnimationFrame`.
- **Cleanup**: Returns a destroy function that removes listeners and resets styles.
- **SSR-safe**: No-op when `window`/`document` is undefined.

## 4. CSS Custom Properties

| Property | Default | Description |
|---|---|---|
| `--spotlight-color` | `rgba(255,255,255,0.15)` | Spotlight color |
| `--spotlight-radius` | `300px` | Radius of the gradient |
| `--spotlight-intensity` | `1` | Opacity multiplier (0–1) |
| `--spotlight-bg` | `#1a1a2e` | Base background color |

## 5. Roadmap

### Phase 1: MVP (Done)
- [x] Core `showcase()` function with CSS variable injection
- [x] `requestAnimationFrame` throttling
- [x] Options support (`color`, `radius`, `intensity`, `bg`)
- [x] Cleanup/destroy function
- [x] Demo page
- [x] npm package config

### Phase 2: Enhancements
- [ ] TypeScript type declarations (`.d.ts`)
- [x] Mobile-aware: graceful no-op on touch-primary devices (`hover: none`)
- [ ] Multiple spotlight layers
- [ ] Animation/transition options
