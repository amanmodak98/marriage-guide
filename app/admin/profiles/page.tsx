import { getDb } from '@/lib/db';
import { AdminProfilesClient } from '@/components/admin/AdminProfilesClient';

export const metadata = { title: 'Profiles · Admin · Marriage Guide' };

export default async function AdminProfilesPage() {
  const db = await getDb();
  const profiles = await db.listProfiles();
  return <AdminProfilesClient initial={profiles} />;
}
