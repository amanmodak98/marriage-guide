import { notFound } from 'next/navigation';
import { getDb } from '@/lib/db';
import { BiodataPanel } from '@/components/profiles/BiodataPanel';
import { ProfileCard } from '@/components/profiles/ProfileCard';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const profile = await db.getProfile(id);
  if (!profile) return { title: 'Profile · Marriage Guide' };
  return { title: `${profile.name} · Marriage Guide`, description: profile.headline };
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const profile = await db.getProfile(id);
  if (!profile) notFound();

  const all = await db.listProfiles();
  const similar = all.filter((p) => p.id !== profile.id && p.type === profile.type).slice(0, 4);

  return (
    <>
      <BiodataPanel profile={profile} />

      {similar.length > 0 && (
        <section className="relative py-20 px-6 lg:px-10 bg-ivory">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">Similar Profiles</span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mt-2">You may also like</h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similar.map((p, i) => (
                <Reveal key={p.id} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                  <ProfileCard profile={p} index={i} variant="feature" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
