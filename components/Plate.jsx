'use client';

import { useMemo } from 'react';

/**
 * Kinetic type — each glyph arrives from a different edge, overshoots, settles.
 *
 * The scatter must be DETERMINISTIC. Next renders this HTML once on the server and
 * again in the browser; if the two disagree, React throws a hydration error. So
 * instead of Math.random() we hash the text and index into a stable pseudo-random
 * number — same input, same output, every time, but still scattered to the eye.
 */
function seeded(str, i, salt) {
  let h = 2166136261 ^ salt;
  for (let k = 0; k < str.length; k++) {
    h ^= str.charCodeAt(k);
    h = Math.imul(h, 16777619);
  }
  h ^= i;
  h = Math.imul(h, 16777619);
  h ^= h >>> 15;
  return ((h >>> 0) % 100000) / 100000;   // 0 → 1
}

export default function Plate({ text }) {
  const chars = useMemo(
    () =>
      [...text].map((ch, i) => {
        const angle = seeded(text, i, 1) * Math.PI * 2;
        const dist  = 60 + seeded(text, i, 2) * 120;
        return {
          ch,
          i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          r:  seeded(text, i, 3) * 24 - 12,
        };
      }),
    [text]
  );

  return (
    <span className="plate">
      {chars.map(({ ch, i, dx, dy, r }) => (
        <span
          key={i}
          className="ch"
          style={{
            '--dx': `${dx.toFixed(2)}px`,
            '--dy': `${dy.toFixed(2)}px`,
            '--r': `${r.toFixed(2)}deg`,
            transitionDelay: `${i * 42}ms`,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
