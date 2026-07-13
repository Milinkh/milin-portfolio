import { Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--mono',
  display: 'swap',
});

export const metadata = {
  title: 'Milin Khunkhun, MBA — Product Manager and Developer',
  description:
    'Product Manager focused on Product Strategy and Artificial Intelligence.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      {/* Browser extensions (password managers, Grammarly, Web of Trust) inject
          attributes onto <body> before React loads, which trips the hydration
          check. This tells React to ignore attribute differences on this one
          element — it does not disable hydration checking anywhere else. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
