import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { seedSuccessStories } from '@/lib/data';

export const metadata = { title: 'Success Stories · Marriage Guide' };

export default function SuccessStoriesPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory to-alabaster" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <FloralOrnament className="mb-6" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">Success Stories</span>
            <h1 className="font-display text-5xl md:text-7xl text-ink mt-4 leading-tight">
              Letters from <span className="font-italiana italic text-crimson">newlyweds</span>
            </h1>
            <p className="font-serif text-xl text-ink-soft mt-6 italic max-w-2xl mx-auto leading-relaxed">
              Each story here began with a single introduction. Each is the result of patience, intention, and a little bit of luck.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-7xl mx-auto space-y-12">
          {seedSuccessStories.map((s, i) => (
            <Reveal key={s.id} delay={((i % 3 + 1) as 1 | 2 | 3)}>
              <div className={`grid lg:grid-cols-2 gap-10 items-center paper p-3 rounded-sm shadow-polaroid ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''} rounded-sm overflow-hidden aspect-[4/3]`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.photo} alt={`${s.bride} & ${s.groom}`} className="w-full h-full object-cover" />
                </div>
                <div className={`p-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-rose/15 text-rose font-cinzel text-[9px] tracking-wide-cap">BRIDE</span>
                    <span className="font-display text-lg text-crimson">{s.bride}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold-dark font-cinzel text-[9px] tracking-wide-cap">GROOM</span>
                    <span className="font-display text-lg text-crimson">{s.groom}</span>
                  </div>
                  <p className="font-serif text-lg text-ink leading-relaxed italic">&ldquo;{s.story}&rdquo;</p>
                  <div className="mt-6 pt-4 border-t border-crimson/10 flex items-center justify-between">
                    <span className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute">MARRIED IN {s.city.toUpperCase()}</span>
                    <span className="font-italiana text-lg text-gold-dark">{new Date(s.weddingDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
