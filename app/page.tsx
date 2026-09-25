import { getDb } from '@/lib/db';
import { CinematicHome } from '@/components/cinematic/CinematicHome';
import { seedTestimonials } from '@/lib/data';

export default async function HomePage() {
  const db = await getDb();
  const all = await db.listProfiles();
  const featured = all.filter((p) => p.featured).slice(0, 8);
  const profiles = featured.length >= 4 ? featured : all.slice(0, 8);

  return <CinematicHome profiles={profiles} />;
}
