import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';
import { RoyalCartouche } from '@/components/ui/mughal/RoyalCartouche';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';

const STEPS = [
  {
    title: 'Discovery',
    subtitle: 'A long conversation',
    description:
      'We meet with you (and your family, if you wish) to understand your story, your values, the texture of the life you are building. No questionnaires, no checklists — just a real conversation.',
    icon: 'lotus',
  },
  {
    title: 'Curation',
    subtitle: 'Hand-picked profiles',
    description:
      'Our matchmakers sift through our network to find the small handful of people who feel right. You receive a private dossier of 3-5 profiles with thoughtful notes on each.',
    icon: 'scroll',
  },
  {
    title: 'Introduction',
    subtitle: 'A guided first step',
    description:
      'We arrange the first conversation — a quiet coffee or video call. Our team is on hand throughout, helping with logistics, expectations, and gentle guidance.',
    icon: 'ring',
  },
  {
    title: 'Celebration',
    subtitle: 'A wedding, our joy',
    description:
      'When two of our matches find each other, we celebrate alongside them. From the first meeting to the wedding mandap, our team remains a quiet, supportive presence.',
    icon: 'mandala',
  },
];

export function HandcraftedProcess() {
  return (
    <section className="relative py-32 px-6 lg:px-10 overflow-hidden bg-gradient-to-b from-alabaster via-ivory to-alabaster">
      <JaliPattern density="medium" color="#C9A961" opacity={0.04} className="absolute inset-0" />

      {/* Decorative arabesque curves */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none">
        <svg width="500" height="500" viewBox="0 0 500 500">
          <g fill="none" stroke="#8B1E3F" strokeWidth="1">
            {Array.from({ length: 8 }).map((_, i) => (
              <circle key={i} cx="250" cy="250" r={50 + i * 28} />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <FloralOrnament className="mb-6" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">The Process</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-ink leading-tight max-w-2xl mx-auto">
              Four small <span className="font-italiana italic text-crimson">deliberate</span> steps
            </h2>
            <p className="font-serif text-lg text-ink-soft mt-4 max-w-2xl mx-auto italic">
              We do not believe in algorithms or hurry. We believe in people, conversation, and care.
            </p>
          </div>
        </Reveal>

        <div className="max-w-2xl mx-auto mb-16">
          <PietraDuraBand />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px">
            <svg width="100%" height="2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="100%" y2="1" stroke="#C9A961" strokeWidth="1" strokeDasharray="4 6" />
            </svg>
          </div>

          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={((i + 1) as 1 | 2 | 3 | 4)}>
              <div className="relative text-center group">
                {/* Royal cartouche */}
                <div className="flex justify-center mb-6">
                  <RoyalCartouche size="lg">{`0${i + 1}`}</RoyalCartouche>
                </div>

                {/* Icon with arch frame */}
                <div className="relative inline-flex w-24 h-24 items-center justify-center mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-crimson/10 to-gold/10 group-hover:from-crimson/20 group-hover:to-gold/20 transition-colors" />
                  <div className="absolute inset-2 rounded-full bg-alabaster border-2 border-gold/30 group-hover:border-gold transition-colors" />
                  <StepIcon icon={step.icon} className="relative w-8 h-8 text-crimson" />
                  {/* Tiny dots around */}
                  {Array.from({ length: 8 }).map((_, j) => {
                    const a = (j / 8) * Math.PI * 2;
                    return (
                      <span
                        key={j}
                        className="absolute w-1 h-1 rounded-full bg-gold"
                        style={{
                          left: `${50 + Math.cos(a) * 48}%`,
                          top: `${50 + Math.sin(a) * 48}%`,
                        }}
                      />
                    );
                  })}
                </div>

                <h3 className="font-display text-2xl text-ink">{step.title}</h3>
                <div className="font-cinzel text-[9px] tracking-wide-cap text-crimson mt-1 mb-3 tracking-mughal">{step.subtitle}</div>
                <p className="font-serif text-ink-soft leading-relaxed">{step.description}</p>

                {/* Decorative ornament below */}
                <div className="mt-4 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3}>
          <div className="text-center mt-16">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-wide-cap text-crimson hover:text-vermilion tracking-mughal"
            >
              Read the full process
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

function StepIcon({ icon, className }: { icon: string; className?: string }) {
  const common = { width: 32, height: 32, viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className };
  switch (icon) {
    case 'lotus':
      return (
        <svg {...common}>
          {/* Imperial lotus */}
          <path d="M 16 6 Q 16 16 16 22 M 16 22 C 12 22, 10 18, 10 14 C 10 10, 12 8, 14 8 Q 16 8, 16 12 Q 16 8, 18 8 Q 20 8, 22 14 C 22 18, 20 22, 16 22 M 16 6 C 14 8, 14 12, 16 14 M 16 6 C 18 8, 18 12, 16 14 M 8 14 C 8 18, 12 22, 16 24 M 24 14 C 24 18, 20 22, 16 24" />
          <circle cx="16" cy="14" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'scroll':
      return (
        <svg {...common}>
          <path d="M 9 6 H 23 V 22 H 9 V 18 C 9 20, 7 22, 5 22 C 3 22, 3 20, 3 20 V 8 C 3 8, 3 6, 5 6 C 7 6, 9 8, 9 8 Z" />
          <line x1="13" y1="11" x2="19" y2="11" />
          <line x1="13" y1="14" x2="19" y2="14" />
          <line x1="13" y1="17" x2="17" y2="17" />
        </svg>
      );
    case 'ring':
      return (
        <svg {...common}>
          <circle cx="16" cy="18" r="6" />
          <path d="M 11 14 L 13 9 L 19 9 L 21 14" />
          <path d="M 13 9 L 16 6 L 19 9" />
          <circle cx="16" cy="18" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="16" cy="18" r="1" fill="#E8C77C" />
        </svg>
      );
    case 'mandala':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" />
          <circle cx="16" cy="16" r="7" />
          <circle cx="16" cy="16" r="3" fill="currentColor" fillOpacity="0.3" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={16 + Math.cos(a) * 3}
                y1={16 + Math.sin(a) * 3}
                x2={16 + Math.cos(a) * 11}
                y2={16 + Math.sin(a) * 11}
              />
            );
          })}
        </svg>
      );
    default:
      return null;
  }
}
