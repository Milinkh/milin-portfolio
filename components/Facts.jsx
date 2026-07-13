'use client';

import { useEffect, useRef } from 'react';
import { clamp } from '@/lib/useReveal';
import { FACTS } from '@/lib/content';

/* Three shapes, three strokes each, so they morph one-to-one. */
const SHAPES = [
  [ // 01 · graduation cap
    'M20 88 L125 44 L230 88 L125 132 Z',
    'M62 106 C62 106 62 160 62 160 C62 180 90 194 125 194 C160 194 188 180 188 160 C188 160 188 106 188 106',
    'M222 94 C222 94 222 140 222 140 C222 156 214 168 208 178',
  ],
  [ // 02 · open book
    'M28 70 C58 54 96 54 125 74 C154 54 192 54 222 70 L222 176 C192 160 154 160 125 180 C96 160 58 160 28 176 Z',
    'M125 74 C125 74 125 128 125 128 C125 148 125 164 125 180',
    'M28 176 C58 166 96 166 125 186 C154 166 192 166 222 176 C222 176 222 182 222 182',
  ],
  [ // 03 · chef's hat
    "M70 128 C28 122 24 62 66 54 C66 22 124 12 140 40 C182 22 220 58 196 96 C196 96 176 118 168 126 Z",
    'M70 130 C70 130 70 186 70 186 C70 198 92 204 122 204 C152 204 174 198 174 186 C174 186 174 130 174 130',
    'M70 152 C104 162 140 162 174 152 C174 152 174 158 174 158',
  ],
];

const N = 200;

export default function Facts() {
  const secRef  = useRef(null);
  const pathRef = useRef([]);
  const textRef = useRef([]);
  const srcRef  = useRef(null);

  useEffect(() => {
    const src = srcRef.current;
    const sec = secRef.current;
    if (!src || !sec) return;

    // sample every stroke into the same number of points
    const sampled = SHAPES.map((strokes, si) =>
      strokes.map((_, ki) => {
        const p = src.querySelector(`#s${si}${ki}`);
        const L = p.getTotalLength();
        const pts = [];
        for (let i = 0; i < N; i++) {
          const q = p.getPointAtLength((L * i) / (N - 1));
          pts.push([q.x, q.y]);
        }
        return pts;
      })
    );

    /* The morph only reads cleanly if corresponding points start in corresponding
       places — so re-index each stroke (rotate its start, reverse if it helps) to
       line up with the same stroke in the shape before it. */
    const cost = (A, B) => {
      let s = 0;
      for (let i = 0; i < N; i += 5) {
        const dx = A[i][0] - B[i][0], dy = A[i][1] - B[i][1];
        s += dx * dx + dy * dy;
      }
      return s;
    };
    const rot = (P, k) => P.slice(k).concat(P.slice(0, k));

    for (let s = 1; s < 3; s++) {
      for (let k = 0; k < 3; k++) {
        const ref = sampled[s - 1][k];
        let best = sampled[s][k], bestCost = Infinity;
        for (const cand of [sampled[s][k], [...sampled[s][k]].reverse()]) {
          for (let r = 0; r < N; r += 4) {
            const cRot = rot(cand, r);
            const c = cost(ref, cRot);
            if (c < bestCost) { bestCost = c; best = cRot; }
          }
        }
        sampled[s][k] = best;
      }
    }

    const eio = t => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

    // scroll → shape index, with holds so each fact sits still to be read
    const mapF = q => {
      if (q <= 0.16) return 0;
      if (q <  0.42) return eio((q - 0.16) / 0.26);
      if (q <  0.60) return 1;
      if (q <  0.86) return 1 + eio((q - 0.60) / 0.26);
      return 2;
    };

    let raf;
    const frame = () => {
      const r = sec.getBoundingClientRect();
      const total = sec.offsetHeight - innerHeight;
      const q = clamp(-r.top / (total || 1), 0, 1);
      const f = mapF(q);

      const i0 = Math.min(1, Math.floor(f));
      const i1 = Math.min(2, i0 + 1);
      const t  = clamp(f - i0, 0, 1);

      for (let k = 0; k < 3; k++) {
        const A = sampled[i0][k], B = sampled[i1][k];
        const P = new Array(N);
        for (let i = 0; i < N; i++) {
          P[i] = [
            A[i][0] + (B[i][0] - A[i][0]) * t,
            A[i][1] + (B[i][1] - A[i][1]) * t,
          ];
        }
        // a smoothed curve through the points, not a polyline
        let d = `M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
        for (let i = 1; i < N - 1; i++) {
          const mx = (P[i][0] + P[i + 1][0]) / 2;
          const my = (P[i][1] + P[i + 1][1]) / 2;
          d += `Q${P[i][0].toFixed(1)} ${P[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
        }
        d += `L${P[N - 1][0].toFixed(1)} ${P[N - 1][1].toFixed(1)}`;

        const el = pathRef.current[k];
        if (!el) continue;
        el.setAttribute('d', d);

        // mid-morph the line thins and warms — the drawing is hot while it changes
        const mid = 1 - Math.abs(t - 0.5) * 2;
        el.style.strokeOpacity = (0.6 - mid * 0.16).toFixed(3);
        el.style.stroke = mid > 0.02
          ? `color-mix(in srgb, var(--heat) ${(mid * 70).toFixed(0)}%, var(--ink))`
          : 'var(--ink)';
      }

      FACTS.forEach((_, i) => {
        const el = textRef.current[i];
        if (!el) return;
        el.style.opacity = clamp(1 - Math.abs(f - i) * 2.1, 0, 1).toFixed(3);
        el.style.transform = `translateY(${((f - i) * -28).toFixed(1)}px)`;
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="facts" ref={secRef} className="reveal">
      <div className="track">
        <div className="pin">
          <div className="fx-art">
            <svg viewBox="0 0 250 250" aria-hidden="true">
              {[0, 1, 2].map(k => (
                <path key={k} ref={el => (pathRef.current[k] = el)} />
              ))}
            </svg>
          </div>

          <div className="fx-txt">
            {FACTS.map((f, i) => (
              <div className="fx" key={f.lab} ref={el => (textRef.current[i] = el)}>
                <div className="lab">{f.lab}</div>
                <div className="line" dangerouslySetInnerHTML={{ __html: f.line }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* source geometry, never rendered */}
      <svg id="fx-src" viewBox="0 0 250 250" ref={srcRef} aria-hidden="true">
        {SHAPES.map((strokes, si) =>
          strokes.map((d, ki) => <path key={`${si}${ki}`} id={`s${si}${ki}`} d={d} />)
        )}
      </svg>
    </section>
  );
}
