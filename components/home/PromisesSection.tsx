import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { RoyalSeal } from '@/components/ui/mughal/RoyalSeal';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';

const COMMITMENTS = [
  { title: 'We will never share your story without asking.', body: 'Every introduction happens only after both sides have said yes, in writing.' },
  { title: 'We will not show your profile to anyone we have not met.', body: 'Our network is small, private, and curated. We never post profiles publicly.' },
  { title: 'We will always tell you the truth.', body: 'If we don\'t think we are the right fit, we will say so. If a profile isn\'t right, we will say so.' },
  { title: 'We will be with you for the long arc.', body: 'Engagement. Sangeet. Mandap. We are a quiet presence through the entire story.' },
];

const SEAL_TEXTS = ['DISCRETION', 'TRUST', 'HONESTY', 'CARE'];

export function PromisesSection() {
  return (
    <section className="relative py-32 px-6 lg:px-10 bg-gradient-to-br from-parchment via-ivory to-parchment overflow-hidden">
      <JaliPattern density="medium" color="#C9A961" opacity={0.04} className="absolute inset-0" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.04] pointer-events-none">
        <svg width="500" height="500" viewBox="0 0 500 500">
          <g fill="none" stroke="#8B1E3F" strokeWidth="1">
            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx="250" cy="250" r={40 + i * 22} />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <FloralOrnament className="mb-4" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">Our Promise</span>
            <h2 className="font-display text-4xl md:text-5xl text-ink mt-3">
              Four small <span className="font-italiana italic text-crimson">promises</span>
            </h2>
            <p className="font-serif text-lg text-ink-soft italic mt-4 max-w-xl mx-auto">
              These are not slogans. They are the things we say to ourselves every Monday morning at the royal studio.
            </p>
          </div>
        </Reveal>

        <div className="max-w-2xl mx-auto mb-16">
          <PietraDuraBand />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {COMMITMENTS.map((c, i) => (
            <Reveal key={c.title} delay={((i % 3 + 1) as 1 | 2 | 3)}>
              <div className="paper p-6 md:p-8 rounded-2xl border-2 border-gold/20 shadow-polaroid hover:shadow-polaroid-hover transition-shadow group flex items-start gap-6 relative overflow-hidden">
                {/* Decorative gold corner */}
                <svg className="absolute top-2 right-2 w-6 h-6 opacity-50" viewBox="0 0 24 24">
                  <path d="M 24 0 L 12 0 Q 24 0 24 12 Z" fill="#C9A961" />
                  <circle cx="22" cy="2" r="1.2" fill="#E8C77C" />
                </svg>

                {/* Royal seal */}
                <div className="shrink-0 transition-transform group-hover:scale-105">
                  <RoyalSeal text={SEAL_TEXTS[i]} size={80} />
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl text-ink">{c.title}</h3>
                  <p className="font-serif text-base md:text-lg text-ink-soft italic mt-2 leading-relaxed">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3}>
          <div className="text-center mt-16">
            <Link
              href="/membership"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-br from-crimson via-crimson-deep to-vermilion text-alabaster font-cinzel text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press border-2 border-gold/40 tracking-mughal"
            >
              Begin Your Handcrafted Journey
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
