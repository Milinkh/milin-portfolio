'use client';

import { useEffect, useRef } from 'react';
import Plate from './Plate';
import { useReveal, lerp } from '@/lib/useReveal';
import { PROJECTS } from '@/lib/content';

export default function Projects() {
  const [ref, shown] = useReveal();
  const boardRef = useRef(null);

  /*
   * The board is material. On pointer devices the tiles tilt toward the cursor
   * and lift as it nears. Touch devices can't hover, so there the tiles instead
   * tilt and lift based on their position in the viewport as you scroll.
   */
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const tiles = [...board.querySelectorAll('.tile')];
    const canHover = window.matchMedia('(hover: hover)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- pointer devices: tilt toward the cursor ---- */
    if (canHover) {
      const st = tiles.map(() => ({ rx: 0, ry: 0, z: 0, trx: 0, try_: 0, tz: 0 }));
      let mx = -9999, my = -9999, inside = false, raf;

      const onMove = e => {
        const b = board.getBoundingClientRect();
        mx = e.clientX - b.left; my = e.clientY - b.top; inside = true;
      };
      const onLeave = () => { inside = false; };
      board.addEventListener('mousemove', onMove);
      board.addEventListener('mouseleave', onLeave);

      const frame = () => {
        const bb = board.getBoundingClientRect();
        tiles.forEach((tile, i) => {
          const r  = tile.getBoundingClientRect();
          const cx = r.left - bb.left + r.width  / 2;
          const cy = r.top  - bb.top  + r.height / 2;
          const dx = mx - cx, dy = my - cy;
          const d  = Math.hypot(dx, dy);
          const near = inside && d < 340;

          st[i].trx  = near ? (-dy / r.height) * 14 : 0;
          st[i].try_ = near ? ( dx / r.width  ) * 14 : 0;
          st[i].tz   = near ? Math.max(0, 30 * (1 - d / 340)) : 0;

          st[i].rx = lerp(st[i].rx, st[i].trx,  0.09);
          st[i].ry = lerp(st[i].ry, st[i].try_, 0.09);
          st[i].z  = lerp(st[i].z,  st[i].tz,   0.09);

          tile.style.transform =
            `rotateX(${st[i].rx.toFixed(2)}deg) rotateY(${st[i].ry.toFixed(2)}deg) translateZ(${st[i].z.toFixed(1)}px)`;
        });
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(raf);
        board.removeEventListener('mousemove', onMove);
        board.removeEventListener('mouseleave', onLeave);
      };
    }

    /* ---- touch devices: the same tilt/lift, driven by scroll ---- */
    if (reduce) return;
    const st = tiles.map(() => ({ rx: 0, ry: 0, z: 0, trx: 0, try_: 0, tz: 0 }));
    let raf = 0;

    const frame = () => {
      // A virtual pointer sits at the centre of the viewport; scrolling moves the
      // tiles past it, so each reacts exactly as it would to a cursor there.
      const px = window.innerWidth / 2, py = window.innerHeight / 2;
      tiles.forEach((tile, i) => {
        const r  = tile.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = px - cx, dy = py - cy;
        const d  = Math.hypot(dx, dy);
        const near = d < 340;

        st[i].trx  = near ? (-dy / r.height) * 14 : 0;
        st[i].try_ = near ? ( dx / r.width  ) * 14 : 0;
        st[i].tz   = near ? Math.max(0, 30 * (1 - d / 340)) : 0;

        st[i].rx = lerp(st[i].rx, st[i].trx,  0.09);
        st[i].ry = lerp(st[i].ry, st[i].try_, 0.09);
        st[i].z  = lerp(st[i].z,  st[i].tz,   0.09);

        tile.style.transform =
          `rotateX(${st[i].rx.toFixed(2)}deg) rotateY(${st[i].ry.toFixed(2)}deg) translateZ(${st[i].z.toFixed(1)}px)`;
      });
      raf = requestAnimationFrame(frame);
    };

    // only run the loop while the board is on-screen
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!raf) raf = requestAnimationFrame(frame); }
      else { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0 });
    io.observe(board);

    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  return (
    <section id="projects" ref={ref} className={`reveal ${shown ? 'in' : ''}`}>
      <div className="label"><Plate text="Projects" /></div>

      <div className="board" ref={boardRef}>
        {PROJECTS.map(p => (
          <article key={p.name} className="tile">
            <div className="flipper">
              <div className="face front">
                <span className="pnum">{p.num}</span>
                <svg
                  className="vessel"
                  viewBox="0 0 120 120"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: p.art }}
                />
                <div className="pname">{p.name}</div>
                <div className="pcat">{p.category}</div>
              </div>

              <div className="face back">
                <div>
                  <div className="bname">{p.name}</div>
                  {p.body.map((t, i) => <p key={i}>{t}</p>)}
                </div>
                <div className="stack">{p.stack}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
