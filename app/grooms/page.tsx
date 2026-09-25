import { getDb } from '@/lib/db';
import { DirectoryClient } from '@/components/profiles/DirectoryClient';

export const metadata = {
  title: 'Grooms · Marriage Guide',
};

export default async function GroomsPage() {
  const db = await getDb();
  const profiles = await db.listProfiles({ type: 'groom' });

  return (
    <DirectoryClient
      type="groom"
      profiles={profiles}
      heading="Grooms looking for their forever"
      subheading="A curated collection of accomplished men, each thoughtful, each looking for a real partner. Hand-picked. Hand-presented."
    />
  );
}
