'use client';

import Plate from './Plate';

export default function Header() {
  return (
    <section id="header" className="reveal in">
      <h1><Plate text="Milin Khunkhun, MBA" /></h1>
      <div className="role">Product Manager &nbsp;&nbsp;&nbsp;&nbsp; Developer</div>
      <div className="scroll-cue">Scroll<span /></div>
    </section>
  );
}
