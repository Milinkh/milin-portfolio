'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Plate from './Plate';
import { useReveal } from '@/lib/useReveal';
import { ABOUT } from '@/lib/content';

export default function About() {
  const [ref, shown] = useReveal();
  const secRef = useRef(null);
  const [cutting, setCutting] = useState(false);

  /* On desktop the knife re-cuts every time the section re-enters view. When the
     certs are stacked (<=900px) the taller section crosses the threshold
     repeatedly, so there the knife cuts once and stays open. */
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const stacked = window.matchMedia('(max-width: 900px)');
    let hasCut = false;
    const io = new IntersectionObserver(([e]) => {
      const once = stacked.matches;
      if (e.isIntersecting) {
        if (once && hasCut) return;   // stacked: only the first entry cuts
        hasCut = true;
        setCutting(false);
        requestAnimationFrame(() => requestAnimationFrame(() => setCutting(true)));
      } else if (!once) {
        setCutting(false);            // desktop: reset so it re-cuts on re-entry
      }
      // stacked + already cut: leave it open, don't restart
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const setRefs = node => {
    secRef.current = node;
    ref.current = node;
  };

  return (
    <section
      id="about"
      ref={setRefs}
      className={`reveal ${shown ? 'in' : ''} ${cutting ? 'cutting' : ''}`}
    >
      <div className="label"><Plate text="About Me" /></div>

      <div className="about-grid">
        <div className="about-left">
          <p
            className="about-copy fade"
            dangerouslySetInnerHTML={{ __html: ABOUT.copy }}
          />

          <p className="prep">
            {ABOUT.skills.map((s, i) => (
              <Fragment key={s}>
                <span className="it">
                  {s}{i < ABOUT.skills.length - 1 && <i>·</i>}
                </span>
                {/* zero-width break opportunity so the list wraps between items
                    (the nowrap span keeps each "word·" unit intact) */}
                {i < ABOUT.skills.length - 1 && <wbr />}
              </Fragment>
            ))}
          </p>
        </div>

        <div className="portrait fade">
          <Image
            src="/portrait.jpg"
            alt="Milin Khunkhun"
            fill
            sizes="(max-width:900px) 300px, 380px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* certifications, cut open by the knife */}
      <div className="cuts">
        {ABOUT.certs.map(c => (
          <div className="cut" key={c.abbr}>
            <div className="half t" aria-hidden="true"><span>{c.abbr}</span></div>
            <div className="half b" aria-hidden="true"><span>{c.abbr}</span></div>
            <div className="full">{c.full}</div>
            <span className="sr-only">{c.sr}</span>
          </div>
        ))}

        <svg className="blade" viewBox="0 0 120 40" aria-hidden="true">
          <path d="M4 30 C 28 26, 58 18, 84 8 C 88 6, 90 8, 88 12 C 82 24, 70 30, 56 32 L 8 34 Z" />
          <path d="M88 12 L 112 8 C 116 7, 118 10, 116 13 L 94 20" />
          <path d="M92 13 l 6 -1 M96 16 l 6 -1" />
        </svg>
      </div>
    </section>
  );
}
