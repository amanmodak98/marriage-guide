import { ProfileForm } from '@/components/admin/ProfileForm';

export const metadata = { title: 'New Profile · Admin · Marriage Guide' };

export default function NewProfilePage() {
  return <ProfileForm mode="create" />;
}
