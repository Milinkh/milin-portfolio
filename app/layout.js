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
  metadataBase: new URL('https://milinkhunkhun.com'),
  // This title is what appears in the browser tab, in Google results, and as the
  // headline of the link preview card in Slack, LinkedIn, and iMessage.
  title: 'Milin Khunkhun, MBA',
  description:
    'Building new products from first idea to first release.',
  openGraph: {
    title: 'Milin Khunkhun, MBA',
    description: 'Building new products from first idea to first release.',
    url: 'https://milinkhunkhun.com',
    siteName: 'Milin Khunkhun',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milin Khunkhun, MBA',
    description: 'Building new products from first idea to first release.',
  },
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
