'use client';

import Plate from './Plate';

export default function Header() {
  return (
    <section id="header" className="reveal in">
      {/* ' ' (nbsp) between Milin and Khunkhun so the name can only break
          after the comma (before MBA), never mid-name, at any width */}
      <h1><Plate text={'Milin Khunkhun, MBA'} /></h1>
      <div className="role"><span>Product Manager</span><span>Developer</span></div>
      <div className="scroll-cue">Scroll<span /></div>
    </section>
  );
}
