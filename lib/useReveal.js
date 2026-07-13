'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Adds the `in` class once a section scrolls into view.
 * Every entrance animation on the site hangs off this.
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setShown(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown];
}

export const lerp  = (a, b, n) => a + (b - a) * n;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
