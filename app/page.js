import KitchenField from '@/components/KitchenField';
import TicketNav from '@/components/TicketNav';
import Header from '@/components/Header';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Facts from '@/components/Facts';
import Contact from '@/components/Contact';

export default function Page() {
  return (
    <>
      <KitchenField />
      <TicketNav />

      <main>
        <Header />
        <Experience />
        <Projects />
        <About />
        <Facts />
        <Contact />
      </main>
    </>
  );
}
