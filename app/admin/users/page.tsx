import Link from 'next/link';
import { getDb } from '@/lib/db';
import { timeAgo } from '@/lib/utils';
import { FloralOrnament } from '@/components/ui/FloralOrnament';

export const metadata = { title: 'Members · Admin · Marriage Guide' };

export default async function AdminUsersPage() {
  const db = await getDb();
  const users = await db.listUsers();

  return (
    <div className="px-6 md:px-10 py-10">
      <FloralOrnament className="mb-3" />
      <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">Members</span>
      <h1 className="font-display text-4xl text-ink mt-2 mb-8">All Members</h1>

      <div className="paper rounded-2xl border border-crimson/8 shadow-polaroid overflow-hidden">
        <table className="w-full">
          <thead className="bg-crimson/5 border-b border-crimson/10">
            <tr>
              <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Member</th>
              <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Email</th>
              <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Role</th>
              <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Status</th>
              <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className={`border-b border-crimson/5 hover:bg-crimson/3 ${i % 2 === 0 ? 'bg-alabaster' : 'bg-ivory/40'}`}>
                <td className="px-4 py-3 font-display text-base text-ink">{u.name}</td>
                <td className="px-4 py-3 font-serif text-sm text-ink-soft">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-cinzel tracking-wide-cap ${u.role === 'admin' ? 'bg-crimson/15 text-crimson' : 'bg-gold/20 text-gold-dark'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-cinzel tracking-wide-cap ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 font-serif text-xs text-ink-mute italic">{timeAgo(u.joinedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
