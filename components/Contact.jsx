'use client';

import Plate from './Plate';
import { useReveal } from '@/lib/useReveal';
import { CONTACT } from '@/lib/content';

export default function Contact() {
  const [ref, shown] = useReveal();

  return (
    <section id="contact" ref={ref} className={`reveal ${shown ? 'in' : ''}`}>
      <div className="label"><Plate text="Contact" /></div>
      <p className="intro fade">{CONTACT.intro}</p>

      <div className="rows fade">
        {CONTACT.rows.map(r => {
          const external = r.href.startsWith('http');
          return (
            <a
              className="row"
              key={r.k}
              href={r.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div>
                <span className="k">{r.k}</span>
                <span className="v">{r.v}</span>
              </div>
              <span className="arrow">→</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
