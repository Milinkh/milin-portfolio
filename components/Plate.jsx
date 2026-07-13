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

  /*
   * Group characters into words so a line can only break at a real space, never
   * mid-word. Each .ch is display:inline-block (needed for the transform), and
   * adjacent inline-blocks would otherwise break between any two glyphs. Wrapping
   * each word's glyphs in a nowrap .wg keeps words intact; a plain breakable space
   * sits between words. Per-glyph animation (scatter + i*42ms stagger) is unchanged
   * — the global index i still drives it, spaces just don't get an animated span.
   */
  const nodes = [];
  let word = [];
  const flush = i => {
    if (word.length) nodes.push(<span className="wg" key={`w${i}`}>{word}</span>);
    word = [];
  };
  chars.forEach(({ ch, i, dx, dy, r }) => {
    if (ch === ' ') {
      flush(i);
      nodes.push(' ');            // breakable space between words
    } else {
      word.push(
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
      );
    }
  });
  flush('last');

  return <span className="plate">{nodes}</span>;
}
