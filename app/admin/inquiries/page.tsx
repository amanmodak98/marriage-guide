import { getDb } from '@/lib/db';
import { AdminInquiriesClient } from '@/components/admin/AdminInquiriesClient';
import { FloralOrnament } from '@/components/ui/FloralOrnament';

export const metadata = { title: 'Inquiries · Admin · Marriage Guide' };

export default async function AdminInquiriesPage() {
  const db = await getDb();
  const inquiries = await db.listInquiries();
  return (
    <div className="px-6 md:px-10 py-10">
      <FloralOrnament className="mb-3" />
      <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">Inquiries</span>
      <h1 className="font-display text-4xl text-ink mt-2 mb-6">Inbox</h1>
      <AdminInquiriesClient initial={inquiries} />
    </div>
  );
}
