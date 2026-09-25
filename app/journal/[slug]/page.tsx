import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDb } from '@/lib/db';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getDb();
  const entry = await db.getJournal(slug);
  return { title: entry ? `${entry.title} · Marriage Guide Journal` : 'Journal · Marriage Guide' };
}

export default async function JournalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getDb();
  const entry = await db.getJournal(slug);
  if (!entry) notFound();

  const all = await db.listJournal();
  const related = all.filter((e) => e.id !== entry.id).slice(0, 3);

  return (
    <article className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal>
          <Link href="/journal" className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-wide-cap text-crimson hover:text-vermilion mb-8">
            ← Back to Journal
          </Link>
          <div className="flex items-center gap-2 text-[9px] font-cinzel tracking-wide-cap text-gold-dark">
            {entry.tags.map((t) => <span key={t}>{t.toUpperCase()}</span>)}
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-ink mt-3 leading-tight">{entry.title}</h1>
          <div className="flex items-center gap-3 mt-6 pb-6 border-b border-crimson/15 text-sm font-cinzel tracking-wide-cap text-ink-mute">
            <span>{entry.author}</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>{new Date(entry.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>{entry.readTime}</span>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="aspect-[16/9] my-10 paper p-3 rounded-sm shadow-polaroid">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.cover} alt={entry.title} className="w-full h-full object-cover rounded-sm" />
          </div>
        </Reveal>

        <Reveal delay={3}>
          <div className="font-serif text-lg text-ink leading-relaxed space-y-6">
            <p className="font-italiana text-2xl text-crimson italic">{entry.excerpt}</p>
            <p>{entry.body}</p>
            <p>
              In our work at Marriage Guide, we often return to a single idea: that the best partnerships are made, not found. They are the result of two people showing up, with intention, again and again. Whatever stage you are at, we hope this letter finds you well.
            </p>
            <p className="font-display text-xl text-crimson italic pt-6 border-t border-crimson/15">— Aanya, for the Marriage Guide team</p>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="px-6 lg:px-10 mt-24 pt-16 border-t border-crimson/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl text-ink mb-8 text-center">Continue reading</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                  <Link href={`/journal/${r.slug}`} className="block group">
                    <div className="paper rounded-sm shadow-polaroid group-hover:shadow-polaroid-hover transition-shadow">
                      <div className="aspect-[4/3] overflow-hidden rounded-t-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={r.cover} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg text-ink group-hover:text-crimson transition-colors">{r.title}</h3>
                        <div className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute mt-2">{r.readTime}</div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
