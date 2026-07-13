'use client';

import { useEffect, useRef } from 'react';
import { lerp } from '@/lib/useReveal';

/* The drawn objects, in the same engraving hand as the pattern reference. */
const SPRITES = {
  'i-knife':  [120, 40, `<path d="M4 30 C 28 26, 58 18, 84 8 C 88 6, 90 8, 88 12 C 82 24, 70 30, 56 32 L 8 34 Z"/><path d="M88 12 L 112 8 C 116 7, 118 10, 116 13 L 94 20"/><path d="M92 13 l 6 -1 M96 16 l 6 -1"/>`],
  'i-pot':    [120, 90, `<path d="M18 34 L 24 78 C 24 84, 30 86, 60 86 C 90 86, 96 84, 96 78 L 102 34"/><path d="M12 34 C 12 28, 30 24, 60 24 C 90 24, 108 28, 108 34 C 108 39, 90 42, 60 42 C 30 42, 12 39, 12 34 Z"/><path d="M56 24 L 56 16 C 56 12, 64 12, 64 16 L 64 24"/><path d="M12 44 C 4 46, 4 58, 14 58 M108 44 C 116 46, 116 58, 106 58"/>`],
  'i-whisk':  [60, 120, `<path d="M26 4 L 26 40 M34 4 L 34 40"/><path d="M26 6 C 20 6, 20 2, 30 2 C 40 2, 40 6, 34 6"/><path d="M28 42 C 8 56, 6 92, 30 116 C 54 92, 52 56, 32 42"/><path d="M28 42 C 18 58, 18 96, 30 116 M32 42 C 42 58, 42 96, 30 116"/><path d="M30 42 L 30 116"/>`],
  'i-tomato': [90, 90,  `<path d="M45 22 C 68 22, 82 38, 82 56 C 82 74, 66 84, 45 84 C 24 84, 8 74, 8 56 C 8 38, 22 22, 45 22 Z"/><path d="M45 22 L 45 10"/><path d="M45 20 L 26 12 M45 20 L 64 12 M45 20 L 32 26 M45 20 L 58 26"/><path d="M24 42 C 20 48, 19 56, 21 62"/>`],
  'i-hat':    [100, 100,`<path d="M24 58 C 6 56, 4 30, 22 26 C 22 8, 50 4, 58 16 C 76 8, 94 24, 84 42 C 92 52, 82 60, 74 58"/><path d="M24 58 L 24 84 C 24 88, 30 90, 49 90 C 68 90, 74 88, 74 84 L 74 58"/><path d="M24 66 C 40 70, 58 70, 74 66"/>`],
  'i-pin':    [130, 34, `<rect x="30" y="8" width="70" height="18" rx="9"/><path d="M30 17 L 10 17 M8 12 L 8 22 M100 17 L 120 17 M122 12 L 122 22"/><path d="M42 10 L 42 24 M88 10 L 88 24"/>`],
  'i-spoon':  [34, 110, `<path d="M17 40 C 4 40, 2 20, 8 10 C 12 3, 22 3, 26 10 C 32 20, 30 40, 17 40 Z"/><path d="M17 40 L 17 104 C 17 108, 13 108, 13 104 L 13 42"/>`],
  'i-fork':   [34, 110, `<path d="M6 4 L 6 28 M14 4 L 14 28 M22 4 L 22 28 M30 4 L 30 28"/><path d="M2 28 C 2 40, 10 44, 16 44 C 24 44, 32 40, 32 28"/><path d="M16 44 L 16 106"/>`],
  'i-mortar': [100, 90, `<path d="M14 44 L 22 76 C 24 84, 32 86, 50 86 C 68 86, 76 84, 78 76 L 86 44 Z"/><path d="M8 44 L 92 44"/><path d="M60 42 L 82 12 C 86 6, 94 10, 90 16 L 70 44"/><path d="M58 8 C 62 4, 70 4, 72 10"/>`],
  'i-bread':  [130, 44, `<path d="M10 30 C 4 20, 14 6, 34 6 L 100 6 C 122 6, 130 20, 120 32 C 112 40, 96 40, 76 38 L 26 38 C 16 38, 12 34, 10 30 Z"/><path d="M34 14 L 26 24 M56 12 L 46 24 M78 12 L 68 24 M100 14 L 90 26"/>`],
  'i-salt':   [50, 90,  `<path d="M12 30 C 12 20, 20 16, 25 16 C 30 16, 38 20, 38 30 L 40 80 C 40 85, 36 86, 25 86 C 14 86, 10 85, 10 80 Z"/><path d="M12 34 L 38 34"/><circle cx="20" cy="24" r="1"/><circle cx="25" cy="21" r="1"/><circle cx="30" cy="24" r="1"/>`],
  'i-cup':    [100, 80, `<path d="M16 14 L 24 66 C 25 72, 32 74, 48 74 C 64 74, 70 72, 72 66 L 80 14 Z"/><path d="M10 14 L 86 14"/><path d="M80 24 C 92 26, 94 44, 78 48"/><path d="M28 34 L 40 34 M30 48 L 42 48"/>`],
};

const IDS = Object.keys(SPRITES);
const COUNT = 20;
const PAD = 26;

export default function KitchenField() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const objs = [];
    const placed = [];

    // No two objects may overlap, and the middle stays clear for the name.
    const collides = (x, y, w, h) => {
      const cw = innerWidth * 0.52, ch = innerHeight * 0.42;
      const cx0 = (innerWidth - cw) / 2, cy0 = (innerHeight - ch) / 2;
      if (x < cx0 + cw && x + w > cx0 && y < cy0 + ch && y + h > cy0) return true;
      return placed.some(r =>
        x - PAD < r.x + r.w && x + w + PAD > r.x &&
        y - PAD < r.y + r.h && y + h + PAD > r.y
      );
    };

    for (let i = 0; i < COUNT; i++) {
      const id = IDS[i % IDS.length];
      const [vw, vh, art] = SPRITES[id];
      const scale = 0.72 + Math.random() * 0.95;
      const w = vw * scale, h = vh * scale;

      let bx = 0, by = 0, ok = false;
      for (let t = 0; t < 300; t++) {
        const x = 8 + Math.random() * (innerWidth  - w - 16);
        const y = 8 + Math.random() * (innerHeight - h - 16);
        if (!collides(x, y, w, h)) { bx = x; by = y; ok = true; break; }
      }
      if (!ok) continue;
      placed.push({ x: bx, y: by, w, h });

      const el = document.createElement('div');
      el.className = 'obj';
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.innerHTML = `<svg viewBox="0 0 ${vw} ${vh}">${art}</svg>`;
      host.appendChild(el);

      const dx = (bx + w / 2) - innerWidth / 2;
      const dy = (by + h / 2) - innerHeight / 2;
      const m = Math.hypot(dx, dy) || 1;

      objs.push({
        el, bx, by, w, h, px: 0, py: 0,
        ux: dx / m, uy: dy / m,
        rot: Math.random() * 34 - 17,
        spd: 0.15 + Math.random() * 0.32,
        amp: 4 + Math.random() * 8,
        ph:  Math.random() * Math.PI * 2,
        op:  0.55 + Math.random() * 0.4,
        par: 0.06 + Math.random() * 0.20,   // its own parallax rate
      });
    }

    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, t = 0, raf;
    const onMove = e => { mx = e.clientX; my = e.clientY; };
    addEventListener('mousemove', onMove);

    // leaves the top → re-enters at the bottom
    const wrapV = (v, min, max) => {
      const r = max - min;
      return ((v - min) % r + r) % r + min;
    };

    const frame = () => {
      t += 0.016;
      cx = lerp(cx, mx, 0.18);
      cy = lerp(cy, my, 0.18);

      const disperse = Math.min(1, scrollY / (innerHeight * 0.9));

      if (!reduce) {
        for (const o of objs) {
          const dax = Math.sin(t * o.spd + o.ph) * o.amp;
          const day = Math.cos(t * o.spd * 0.8 + o.ph) * o.amp * 0.7;

          // ingredients cleared out of the cursor's way
          const dx = (o.bx + o.w / 2) - cx;
          const dy = (o.by + o.h / 2) - cy;
          const d  = Math.hypot(dx, dy);
          const R  = 260;
          let tpx = 0, tpy = 0;
          if (d < R && d > 0.01) {
            const f = (1 - d / R) ** 2 * 130;
            tpx = (dx / d) * f;
            tpy = (dy / d) * f;
          }
          o.px = lerp(o.px, tpx, 0.09);
          o.py = lerp(o.py, tpy, 0.09);

          const fx = o.ux * disperse * innerWidth  * 0.26;
          const fy = o.uy * disperse * innerHeight * 0.22;

          const X = o.bx + dax + o.px + fx;
          const yRaw = o.by + day + o.py + fy - scrollY * o.par;
          const Y = wrapV(yRaw, -o.h - 40, innerHeight + 40);

          o.el.style.transform =
            `translate(${X}px, ${Y}px) rotate(${(o.rot + scrollY * o.par * 0.02).toFixed(2)}deg)`;
          o.el.style.opacity = (o.op * (1 - disperse * 0.45)).toFixed(3);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', onMove);
      objs.forEach(o => o.el.remove());
    };
  }, []);

  return <div id="kitchen" ref={hostRef} aria-hidden="true" />;
}
