import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-italiana text-9xl text-crimson">404</div>
        <h1 className="font-display text-3xl text-ink mt-4">This page seems to have eloped.</h1>
        <p className="font-serif italic text-ink-soft mt-3">
          We can&apos;t find what you&apos;re looking for. Perhaps a return to home is in order.
        </p>
        <Link
          href="/"
          className="inline-flex items-center mt-8 px-7 py-3 rounded-full bg-gradient-to-br from-crimson to-vermilion text-alabaster font-cinzel text-xs tracking-wide-cap press shadow-polaroid"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
