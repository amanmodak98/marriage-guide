import './globals.css';
import { Playfair_Display, Cormorant_Garamond, Cinzel, Italiana } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italiana',
  display: 'swap',
});

export const metadata = {
  title: 'Marriage Guide — Handcrafted Matchmaking',
  description:
    'A bespoke matrimonial atelier connecting thoughtful hearts. Hand-curated profiles, guided introductions, and a process rooted in tradition and intention.',
  keywords: ['matrimonial', 'matchmaking', 'Indian weddings', 'marriage bureau', 'shaadi'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${cinzel.variable} ${italiana.variable}`}>
      <body className="relative bg-alabaster text-ink">
        <AnnouncementBar />
        <div className="relative z-10 pt-8">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
