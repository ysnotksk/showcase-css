/**
 * showcase-css
 * Lightweight CSS spotlight effect that follows the mouse cursor.
 * Zero dependencies — pure vanilla JS + CSS custom properties.
 */

const GRADIENT_BG =
  "radial-gradient(circle var(--spotlight-radius) at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent), var(--spotlight-bg)";

const DEFAULTS = {
  "--spotlight-x": "50%",
  "--spotlight-y": "50%",
  "--spotlight-color": "rgba(255, 255, 255, 0.15)",
  "--spotlight-radius": "300px",
  "--spotlight-intensity": "1",
  "--spotlight-bg": "#1a1a2e",
};

/**
 * Apply a mouse-following spotlight effect to an element.
 *
 * @param {HTMLElement} [target=document.body] - Element to attach the effect to.
 * @param {Object}      [options]
 * @param {string}      [options.color]     - Spotlight color (CSS color value).
 * @param {string}      [options.radius]    - Spotlight radius (CSS length).
 * @param {number}      [options.intensity] - Opacity multiplier 0–1.
 * @param {string}      [options.bg]        - Base background color.
 * @param {number}      [options.smoothing] - Easing factor 0–1 (0 = max lag, 1 = instant). Default 0.15.
 * @returns {{ destroy: () => void, setOptions: (opts: Object) => void }} Controller object.
 */
export default function showcase(target, options) {
  // SSR guard
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { destroy() {}, setOptions() {} };
  }

  // Touch-primary devices: skip the effect entirely.
  // The spotlight is a hover/cursor experience; on touch devices it adds
  // no value and can interfere with scrolling and native gestures.
  if (window.matchMedia("(hover: none)").matches) {
    return { destroy() {}, setOptions() {} };
  }

  // Allow calling as showcase(options) without a target
  if (target && !(target instanceof HTMLElement)) {
    options = target;
    target = undefined;
  }

  const el = target || document.body;
  const opts = options || {};

  el.setAttribute("data-spotlight", "");

  function applyOptions(o) {
    if (o.color) el.style.setProperty("--spotlight-color", o.color);
    if (o.radius) el.style.setProperty("--spotlight-radius", o.radius);
    if (o.intensity != null)
      el.style.setProperty("--spotlight-intensity", String(o.intensity));
    if (o.bg) el.style.setProperty("--spotlight-bg", o.bg);
  }

  // Apply defaults, then override with user options — all inline
  for (const [prop, val] of Object.entries(DEFAULTS)) {
    el.style.setProperty(prop, val);
  }
  applyOptions(opts);

  el.style.setProperty("background", GRADIENT_BG);
  el.style.setProperty("opacity", "var(--spotlight-intensity)");

  const smoothing = opts.smoothing != null ? opts.smoothing : 0.15;

  // Current (rendered) and target (mouse) positions
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let animating = false;

  function tick() {
    const dx = targetX - currentX;
    const dy = targetY - currentY;

    // Stop animating when close enough
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      currentX = targetX;
      currentY = targetY;
      el.style.setProperty("--spotlight-x", `${currentX}px`);
      el.style.setProperty("--spotlight-y", `${currentY}px`);
      animating = false;
      return;
    }

    currentX += dx * smoothing;
    currentY += dy * smoothing;
    el.style.setProperty("--spotlight-x", `${currentX}px`);
    el.style.setProperty("--spotlight-y", `${currentY}px`);
    requestAnimationFrame(tick);
  }

  function onMouseMove(e) {
    const rect = el.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;

    if (!animating) {
      animating = true;
      requestAnimationFrame(tick);
    }
  }

  el.addEventListener("mousemove", onMouseMove);

  return {
    destroy() {
      el.removeEventListener("mousemove", onMouseMove);
      animating = false;
      el.removeAttribute("data-spotlight");
      for (const prop of Object.keys(DEFAULTS)) {
        el.style.removeProperty(prop);
      }
      el.style.removeProperty("background");
      el.style.removeProperty("opacity");
    },
    setOptions(newOpts) {
      applyOptions(newOpts);
    },
  };
}
