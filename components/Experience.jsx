'use client';

import { useState } from 'react';
import Plate from './Plate';
import { useReveal } from '@/lib/useReveal';
import { EXPERIENCE } from '@/lib/content';

export default function Experience() {
  const [ref, shown] = useReveal();
  const [open, setOpen] = useState(-1);   // one row at a time

  return (
    <section id="experience" ref={ref} className={`reveal ${shown ? 'in' : ''}`}>
      <div className="label"><Plate text="Experience" /></div>

      <div className="list fade">
        {EXPERIENCE.map((job, i) => (
          <article key={job.role} className={`item ${open === i ? 'open' : ''}`}>
            <button
              className="head"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span className="meta">{job.date}</span>
              <span className="name">{job.role}</span>
              <span className="where">{job.where}</span>
              <span className="mark" aria-hidden="true" />
            </button>

            <div className="body">
              <div className="inner">
                <div className="pad">
                  <ul>
                    {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
