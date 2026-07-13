'use client';

import { useEffect, useState } from 'react';
import { NAV } from '@/lib/content';

/** The kitchen-ticket index down the right-hand edge. */
export default function TicketNav() {
  const [active, setActive] = useState('header');

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('main > section').forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Scroll to the section without writing the hash to the URL. preventDefault
     stops the native anchor jump (which would append #id); we scroll manually.
     href is kept so the links stay real, focusable, and open-in-new-tab works. */
  const go = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView();
  };

  return (
    <nav id="ticket" aria-label="Sections">
      {NAV.map(({ id, n, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? 'on' : ''}
          onClick={e => go(e, id)}
        >
          {n}&nbsp;&nbsp;{label}
        </a>
      ))}
    </nav>
  );
}
