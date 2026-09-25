import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { getDb } from '@/lib/db';

export const metadata = { title: 'Journal · Marriage Guide' };

export default async function JournalPage() {
  const db = await getDb();
  const entries = await db.listJournal();
  const featured = entries[0];
  const rest = entries.slice(1);

  return (
    <>
      <section className="relative pt-40 pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory to-alabaster" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <FloralOrnament className="mb-6" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">The Journal</span>
            <h1 className="font-display text-5xl md:text-7xl text-ink mt-4 leading-tight">
              On <span className="font-italiana italic text-crimson">love</span>, craft, & tradition
            </h1>
            <p className="font-serif text-xl text-ink-soft mt-6 italic max-w-2xl mx-auto leading-relaxed">
              A monthly letter on matchmaking, weddings, and the small decisions that shape a partnership.
            </p>
          </Reveal>
        </div>
      </section>

      {featured && (
        <section className="px-6 lg:px-10 pb-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <Link href={`/journal/${featured.slug}`} className="block group">
                <div className="grid lg:grid-cols-2 gap-10 paper p-3 rounded-sm shadow-polaroid">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <span className="font-cinzel text-[10px] tracking-wide-cap text-crimson">Featured</span>
                    <h2 className="font-display text-3xl md:text-4xl text-ink mt-3 leading-tight group-hover:text-crimson transition-colors">{featured.title}</h2>
                    <p className="font-serif text-lg text-ink-soft mt-4 italic">{featured.excerpt}</p>
                    <div className="mt-6 flex items-center gap-3 text-xs font-cinzel tracking-wide-cap text-ink-mute">
                      <span>{featured.author}</span>
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      <span>{new Date(featured.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((entry, i) => (
            <Reveal key={entry.id} delay={((i % 3 + 1) as 1 | 2 | 3)}>
              <Link href={`/journal/${entry.slug}`} className="block group">
                <div className="paper rounded-sm shadow-polaroid group-hover:shadow-polaroid-hover transition-shadow h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={entry.cover} alt={entry.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[9px] font-cinzel tracking-wide-cap text-ink-mute">
                      {entry.tags.map((t) => <span key={t}>{t.toUpperCase()}</span>)}
                    </div>
                    <h3 className="font-display text-xl text-ink mt-3 leading-tight group-hover:text-crimson transition-colors">{entry.title}</h3>
                    <p className="font-serif text-sm text-ink-soft mt-3 italic line-clamp-3 flex-1">{entry.excerpt}</p>
                    <div className="mt-4 pt-3 border-t border-crimson/10 flex items-center justify-between text-[9px] font-cinzel tracking-wide-cap text-ink-mute">
                      <span>{entry.readTime}</span>
                      <span>{new Date(entry.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
