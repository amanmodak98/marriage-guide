'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { ProfileCard } from '@/components/profiles/ProfileCard';
import { Reveal } from '@/components/ui/Reveal';
import type { Profile } from '@/lib/types';

export function FeaturedMatches({ profiles }: { profiles: Profile[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 'left' | 'right') => {
    if (!scrollerRef.current) return;
    const amount = 380;
    scrollerRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="relative py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-16 gap-6 flex-wrap">
            <div>
              <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">Featured This Month</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3 text-ink leading-tight">
                Handpicked <span className="font-italiana italic text-crimson">Hearts</span>
              </h2>
              <p className="font-serif text-lg text-ink-soft mt-3 max-w-xl italic">
                A small selection of profiles our matchmakers are particularly excited about this month.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollBy('left')}
                aria-label="Scroll left"
                className="w-12 h-12 rounded-full bg-alabaster border border-crimson/20 flex items-center justify-center text-crimson hover:bg-crimson hover:text-alabaster transition-colors press"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scrollBy('right')}
                aria-label="Scroll right"
                className="w-12 h-12 rounded-full bg-alabaster border border-crimson/20 flex items-center justify-center text-crimson hover:bg-crimson hover:text-alabaster transition-colors press"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <Link
                href="/brides"
                className="font-cinzel text-[10px] tracking-wide-cap text-crimson hover:text-vermilion ml-2"
              >
                See All →
              </Link>
            </div>
          </div>
        </Reveal>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {profiles.map((p, i) => (
            <div
              key={p.id}
              className="snap-start shrink-0 w-72 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <ProfileCard profile={p} index={i} variant="feature" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
