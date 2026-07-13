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

  return (
    <nav id="ticket" aria-label="Sections">
      {NAV.map(({ id, n, label }) => (
        <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>
          {n}&nbsp;&nbsp;{label}
        </a>
      ))}
    </nav>
  );
}
