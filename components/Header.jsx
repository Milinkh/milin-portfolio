'use client';

import Plate from './Plate';

export default function Header() {
  return (
    <section id="header" className="reveal in">
      {/* ' ' (nbsp) between Milin and Khunkhun so the name can only break
          after the comma (before MBA), never mid-name, at any width */}
      <h1><Plate text={'Milin Khunkhun'} /></h1>
      <div className="role">Engineering products that solve user needs and deliver measurable growth.</div>
      <div className="scroll-cue">Scroll<span /></div>
    </section>
  );
}
