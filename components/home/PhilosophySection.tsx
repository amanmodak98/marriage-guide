import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { Heart3D } from '@/components/ui/Heart3D';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { PaisleyCorners } from '@/components/ui/mughal/PaisleyOrnament';
import { GoldText } from '@/components/ui/mughal/GoldText';

export function PhilosophySection() {
  return (
    <section className="relative py-32 px-6 lg:px-10 overflow-hidden bg-gradient-to-br from-ink via-ink-soft to-ink text-alabaster">
      {/* Jali overlay */}
      <JaliPattern density="medium" color="#E8C77C" opacity={0.05} className="absolute inset-0" />

      {/* Paisley corners */}
      <PaisleyCorners size={50} color="#C9A961" />

      {/* Heart centerpiece */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
        <Heart3D size={500} />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <FloralOrnament color="#C9A961" className="mb-6" />
          <span className="font-cinzel text-[10px] tracking-wide-cap text-gold tracking-mughal">Our Philosophy</span>
        </Reveal>
        <Reveal delay={2}>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mt-4 leading-[1.05]">
            We believe marriage is a{' '}
            <GoldText as="span" className="font-italiana italic">craft</GoldText>,
            <br className="hidden md:block" />
            not a transaction.
          </h2>
        </Reveal>
        <Reveal delay={3}>
          <p className="font-serif text-xl md:text-2xl text-ivory/85 mt-8 italic leading-relaxed max-w-3xl mx-auto">
            Every introduction we make is the result of careful listening, patient curation, and the quiet belief that two thoughtful people, given the right space, will find each other.
          </p>
        </Reveal>
        <Reveal delay={4}>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-ivory/60">
            <Value label="PATIENCE" />
            <span className="w-px h-10 bg-gold/30" />
            <Value label="INTENTION" />
            <span className="w-px h-10 bg-gold/30" />
            <Value label="BEAUTY" />
            <span className="w-px h-10 bg-gold/30" />
            <Value label="TRUST" />
          </div>
        </Reveal>
        <Reveal delay={5}>
          <Link
            href="/about"
            className="inline-flex items-center mt-12 px-7 py-3 rounded-full border-2 border-gold/40 text-gold font-cinzel text-[10px] tracking-wide-cap hover:bg-gold hover:text-ink transition-all press tracking-mughal"
          >
            Read Our Story
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Value({ label }: { label: string }) {
  return (
    <span className="font-cinzel text-xs tracking-wide-cap text-gold tracking-mughal">{label}</span>
  );
}
