'use client';

import { useEffect, useRef, useState } from 'react';
import Plate from './Plate';
import { useReveal } from '@/lib/useReveal';
import { ABOUT } from '@/lib/content';

export default function About() {
  const [ref, shown] = useReveal();
  const secRef = useRef(null);
  const [cutting, setCutting] = useState(false);

  /* The knife re-cuts every time the section comes back into view. */
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setCutting(false);
        requestAnimationFrame(() => requestAnimationFrame(() => setCutting(true)));
      } else {
        setCutting(false);
      }
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
              <span className="it" key={s}>
                {s}{i < ABOUT.skills.length - 1 && <i>·</i>}
              </span>
            ))}
          </p>
        </div>

        <div className="portrait fade">
          {/* Drop portrait.jpg in /public and swap this for:
              <Image src="/portrait.jpg" alt="Milin Khunkhun" fill style={{objectFit:'cover'}} /> */}
          <div className="ph">Portrait<br />4 : 5</div>
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
