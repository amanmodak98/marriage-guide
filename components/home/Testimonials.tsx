import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';
import type { Testimonial } from '@/lib/types';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="relative py-32 px-6 lg:px-10 bg-ivory overflow-hidden">
      <JaliPattern density="medium" color="#C9A961" opacity={0.03} className="absolute inset-0" />

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <FloralOrnament className="mb-6" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">In Their Words</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-ink leading-tight">
              Letters from <span className="font-italiana italic text-crimson">newlyweds</span>
            </h2>
          </div>
        </Reveal>

        <div className="max-w-2xl mx-auto mb-12">
          <PietraDuraBand />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={((i % 3 + 1) as 1 | 2 | 3)}>
              <article className="break-inside-avoid paper p-8 rounded-sm shadow-polaroid relative border-2 border-gold/20">
                {/* Gold filigree corners */}
                <svg className="absolute top-2 left-2 w-4 h-4 opacity-60" viewBox="0 0 20 20">
                  <path d="M 0 0 L 12 0 Q 0 0 0 12 Z" fill="#C9A961" />
                  <circle cx="2" cy="2" r="1" fill="#E8C77C" />
                </svg>
                <svg className="absolute top-2 right-2 w-4 h-4 opacity-60" viewBox="0 0 20 20">
                  <path d="M 20 0 L 8 0 Q 20 0 20 12 Z" fill="#C9A961" />
                  <circle cx="18" cy="2" r="1" fill="#E8C77C" />
                </svg>

                {/* Paisley quote icon */}
                <svg className="absolute top-4 right-4 text-gold opacity-30" width="32" height="32" viewBox="0 0 32 32">
                  <path
                    d="M 16 4 C 10 6, 6 12, 8 18 C 9 22, 13 24, 16 24 C 19 24, 22 22, 23 18 C 24 14, 22 10, 18 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="14" cy="14" r="1" fill="currentColor" />
                </svg>

                <p className="font-serif italic text-ink leading-relaxed text-lg mb-6 relative">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gold/20">
                  {/* Gold filigree circular frame around avatar */}
                  <div className="relative w-14 h-14 shrink-0">
                    <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full">
                      <circle cx="28" cy="28" r="27" fill="none" stroke="#C9A961" strokeWidth="1" />
                      <circle cx="28" cy="28" r="26" fill="none" stroke="#C9A961" strokeWidth="0.4" strokeDasharray="1 2" />
                      {Array.from({ length: 8 }).map((_, k) => {
                        const a = (k / 8) * Math.PI * 2;
                        return (
                          <circle
                            key={k}
                            cx={28 + Math.cos(a) * 26}
                            cy={28 + Math.sin(a) * 26}
                            r="1"
                            fill="#C9A961"
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-1 rounded-full overflow-hidden bg-ivory">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.photo} alt={t.couple} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-base text-crimson">{t.couple}</div>
                    <div className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute mt-0.5 tracking-mughal">
                      Married · {new Date(t.date).getFullYear()}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3}>
          <div className="text-center mt-16">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-wide-cap text-crimson hover:text-vermilion tracking-mughal"
            >
              Read more stories
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
