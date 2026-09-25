import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { MandalaSVG } from '@/components/ui/MandalaSVG';
import { RoyalCartouche } from '@/components/ui/mughal/RoyalCartouche';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';

const JOURNEY = [
  { era: 'Day One', title: 'A First Conversation', text: 'A long video call with one of our matchmakers. We listen. We ask questions. We learn what you actually want.' },
  { era: 'Week Two', title: 'Your Dossier', text: 'Three to five profiles, each with a handwritten note explaining why we chose them for you.' },
  { era: 'Month One', title: 'First Conversations', text: 'We coordinate the first meetings. We are on hand for counsel, nerves, logistics, anything.' },
  { era: 'Month Three', title: 'Family Meetings', text: 'When the time feels right, we facilitate the family introductions. Small ceremonies, big meaning.' },
  { era: 'Month Six', title: 'The Engagement', text: 'You tell us. We celebrate. We send a small gift and a card, and we start planning the wedding.' },
  { era: 'The Wedding', title: 'The Mandap', text: 'We are there if you want us. A small, quiet presence on the day everything begins.' },
];

export function JourneyTimeline() {
  return (
    <section className="relative py-32 px-6 lg:px-10 bg-gradient-to-b from-ivory to-alabaster overflow-hidden">
      <JaliPattern density="medium" color="#C9A961" opacity={0.04} className="absolute inset-0" />

      <div className="absolute -top-20 -right-40 opacity-[0.05] pointer-events-none">
        <MandalaSVG size={500} rings={8} petals={12} speed="slow" />
      </div>
      <div className="absolute -bottom-20 -left-40 opacity-[0.05] pointer-events-none">
        <MandalaSVG size={500} rings={8} petals={12} speed="slow" reverse />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-20">
            <FloralOrnament className="mb-4" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">A Year With Us</span>
            <h2 className="font-display text-4xl md:text-5xl text-ink mt-3">
              Six small <span className="font-italiana italic text-crimson">moments</span>
            </h2>
            <p className="font-serif text-lg text-ink-soft italic mt-4 max-w-xl mx-auto">
              The arc of a Marriage Guide membership, from the first call to the wedding day.
            </p>
          </div>
        </Reveal>

        <div className="max-w-2xl mx-auto mb-16">
          <PietraDuraBand />
        </div>

        <div className="relative">
          {/* Gold jali chain timeline (centered vertical line) */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block w-px">
            <svg width="2" height="100%" preserveAspectRatio="none">
              <line x1="1" y1="0" x2="1" y2="100%" stroke="#C9A961" strokeWidth="1.5" strokeDasharray="3 5" />
            </svg>
          </div>

          <div className="space-y-16">
            {JOURNEY.map((j, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={j.title} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                  <div className="md:grid md:grid-cols-2 md:gap-12 items-center relative">
                    <div className={`${left ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'} mb-4 md:mb-0`}>
                      <div className="font-italiana text-2xl text-crimson mb-1">{j.era}</div>
                      <h3 className="font-display text-2xl md:text-3xl text-ink">{j.title}</h3>
                      <p className="font-serif text-lg text-ink-soft italic mt-3 leading-relaxed">{j.text}</p>
                    </div>
                    <div className={`${left ? 'md:order-2 md:pl-12' : 'md:pr-12'} relative`}>
                      <div className={`relative paper p-8 rounded-2xl border-2 border-gold/20 shadow-polaroid ${left ? '' : 'rotate-1'}`}>
                        {/* Gold corner */}
                        <svg className="absolute top-2 left-2 w-5 h-5 opacity-50" viewBox="0 0 20 20">
                          <path d="M 0 0 L 12 0 Q 0 0 0 12 Z" fill="#C9A961" />
                        </svg>
                        <svg className="absolute bottom-2 right-2 w-5 h-5 opacity-50" viewBox="0 0 20 20">
                          <path d="M 20 20 L 8 20 Q 20 20 20 8 Z" fill="#C9A961" />
                        </svg>

                        <div className="aspect-video bg-gradient-to-br from-ivory to-parchment rounded-lg flex items-center justify-center overflow-hidden border border-gold/30">
                          <MandalaSVG size={180} color="#8B1E3F" rings={5} petals={8} speed="normal" />
                        </div>
                      </div>
                    </div>
                    {/* Center cartouche dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                      <RoyalCartouche size="sm">{`${i + 1}`}</RoyalCartouche>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={3}>
          <div className="text-center mt-20">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-wide-cap text-crimson hover:text-vermilion tracking-mughal"
            >
              See the complete process
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
