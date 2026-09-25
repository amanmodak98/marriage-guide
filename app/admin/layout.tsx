import { AdminSidebar, AdminMobileBar } from '@/components/layout/AdminSidebar';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    // For demo: allow access. In production, redirect('/login').
    // redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-alabaster">
      <AdminSidebar />
      <main className="flex-1 min-w-0 pb-24 md:pb-0">
        {children}
      </main>
      <AdminMobileBar />
    </div>
  );
}
