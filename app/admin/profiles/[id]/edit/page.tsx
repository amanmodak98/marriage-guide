import { notFound } from 'next/navigation';
import { getDb } from '@/lib/db';
import { ProfileForm } from '@/components/admin/ProfileForm';

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const profile = await db.getProfile(id);
  if (!profile) notFound();
  return <ProfileForm mode="edit" initial={profile} />;
}
