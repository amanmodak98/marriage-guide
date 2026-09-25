'use client';
import { useState } from 'react';
import Link from 'next/link';

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-gradient-to-r from-crimson via-terracotta to-vermilion text-alabaster text-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-8 flex items-center justify-center relative">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-cinzel tracking-wide-cap text-[9px] text-gold">LIMITED</span>
          </span>
          <span className="font-serif italic">
            Spring intake now open — 12 memberships available this month.
          </span>
          <Link
            href="/membership"
            className="font-cinzel tracking-wide-cap text-[9px] underline underline-offset-2 decoration-gold/60 hover:decoration-gold ml-2"
          >
            APPLY →
          </Link>
        </div>
        <button
          aria-label="Dismiss"
          onClick={() => setHidden(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full hover:bg-alabaster/15 flex items-center justify-center text-alabaster/80 hover:text-alabaster"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
