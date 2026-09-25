import { getDb } from '@/lib/db';
import { DirectoryClient } from '@/components/profiles/DirectoryClient';

export const metadata = {
  title: 'Brides · Marriage Guide',
};

export default async function BridesPage() {
  const db = await getDb();
  const profiles = await db.listProfiles({ type: 'bride' });

  return (
    <DirectoryClient
      type="bride"
      profiles={profiles}
      heading="Brides looking for their forever"
      subheading="A curated collection of accomplished women, each with a story and a heart full of intention. Hand-picked. Hand-presented."
    />
  );
}
