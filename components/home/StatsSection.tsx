import { Reveal } from '@/components/ui/Reveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';
import { RoyalCartouche } from '@/components/ui/mughal/RoyalCartouche';

const STATS = [
  { end: 680, suffix: '+', label: 'Marriages Celebrated', sub: 'across 14 countries', accent: 'crimson' },
  { end: 2400, suffix: '+', label: 'Handcrafted Matches', sub: 'made with care', accent: 'gold' },
  { end: 42, suffix: '', label: 'Cities & Counting', sub: 'in our network', accent: 'emerald' },
  { end: 11, suffix: ' yrs', label: 'Of Quiet Service', sub: 'since 2014', accent: 'lapis' },
];

const accentMap = {
  crimson: { text: 'text-crimson', shadow: 'rgba(139, 30, 63, 0.3)' },
  gold: { text: 'text-gold-dark', shadow: 'rgba(201, 169, 97, 0.3)' },
  emerald: { text: 'text-emerald', shadow: 'rgba(31, 79, 63, 0.3)' },
  lapis: { text: 'text-lapis', shadow: 'rgba(30, 58, 95, 0.3)' },
} as const;

export function StatsSection() {
  return (
    <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-alabaster via-ivory to-parchment" />
      <div className="absolute inset-0 wedding-rings-bg opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-8">
            <FloralOrnament className="mb-4" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">By the Numbers</span>
            <h2 className="font-display text-4xl md:text-5xl text-ink mt-3">
              A decade of <span className="font-italiana italic text-crimson">quiet</span> work
            </h2>
          </div>
        </Reveal>

        {/* Top pietra dura band */}
        <div className="max-w-2xl mx-auto mb-16">
          <PietraDuraBand />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => {
            const accent = accentMap[s.accent as keyof typeof accentMap];
            return (
              <Reveal key={s.label} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                <div className="relative group">
                  {/* Glow on hover */}
                  <div
                    className="absolute -inset-1 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `radial-gradient(circle, ${accent.shadow} 0%, transparent 70%)` }}
                  />
                  <div className="relative paper rounded-2xl p-8 text-center border-2 border-gold/20 shadow-polaroid group-hover:shadow-polaroid-hover transition-all h-full overflow-hidden">
                    {/* Decorative top corner */}
                    <svg className="absolute top-2 left-2 w-4 h-4 opacity-60" viewBox="0 0 20 20">
                      <path d="M 0 0 L 10 0 Q 0 0 0 10 Z" fill="#C9A961" />
                    </svg>
                    <svg className="absolute top-2 right-2 w-4 h-4 opacity-60" viewBox="0 0 20 20">
                      <path d="M 20 0 L 10 0 Q 20 0 20 10 Z" fill="#C9A961" />
                    </svg>
                    <svg className="absolute bottom-2 left-2 w-4 h-4 opacity-60" viewBox="0 0 20 20">
                      <path d="M 0 20 L 10 20 Q 0 20 0 10 Z" fill="#C9A961" />
                    </svg>
                    <svg className="absolute bottom-2 right-2 w-4 h-4 opacity-60" viewBox="0 0 20 20">
                      <path d="M 20 20 L 10 20 Q 20 20 20 10 Z" fill="#C9A961" />
                    </svg>

                    {/* Arch-shaped top accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 opacity-40">
                      <svg viewBox="0 0 64 32" className="w-full h-full">
                        <path d="M 0 32 Q 32 0 64 32 Z" fill="#C9A961" fillOpacity="0.2" />
                        <path d="M 0 32 Q 32 0 64 32" stroke="#C9A961" strokeWidth="0.8" fill="none" />
                      </svg>
                    </div>

                    <div className={`font-italiana text-5xl md:text-6xl ${accent.text} leading-none pt-4`}>
                      <AnimatedCounter end={s.end} suffix={s.suffix} />
                    </div>
                    <div className="font-display text-lg text-ink mt-4">{s.label}</div>
                    <div className="font-serif italic text-sm text-ink-mute mt-1">{s.sub}</div>
                    <div className="mt-6 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom band */}
        <div className="max-w-2xl mx-auto mt-16">
          <PietraDuraBand />
        </div>
      </div>
    </section>
  );
}
