import Link from 'next/link';
import { getDb } from '@/lib/db';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { LogoMark } from '@/components/Logo';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';
import { RoyalCartouche } from '@/components/ui/mughal/RoyalCartouche';

export const metadata = { title: 'Royal Studio · Marriage Guide' };

export default async function AdminDashboard() {
  const db = await getDb();
  const [profiles, inquiries, users] = await Promise.all([
    db.listProfiles(),
    db.listInquiries(),
    db.listUsers(),
  ]);

  const brides = profiles.filter((p) => p.type === 'bride').length;
  const grooms = profiles.filter((g) => g.type === 'groom').length;
  const newThisWeek = profiles.filter((p) => {
    const days = (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return days <= 7;
  }).length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;
  const activeMembers = users.filter((u) => u.status === 'active').length;

  return (
    <div className="relative min-h-screen px-6 md:px-10 py-10">
      {/* Subtle jali */}
      <JaliPattern density="medium" color="#C9A961" opacity={0.03} className="absolute inset-0 pointer-events-none" />

      <div className="relative">
        <div className="mb-10 flex items-start gap-6 flex-wrap">
          <LogoMark size={80} />
          <div>
            <FloralOrnament className="mb-2" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">Royal Studio</span>
            <h1 className="font-display text-4xl text-ink mt-2">Welcome back, Aanya</h1>
            <p className="font-serif italic text-ink-soft mt-2">A quiet Monday morning. Here&apos;s the state of the royal atelier.</p>
          </div>
        </div>

        <div className="max-w-2xl mb-10">
          <PietraDuraBand />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard label="Total Profiles" value={profiles.length} delta="+12%" trend="up" accent="crimson" />
          <StatCard label="New This Week" value={newThisWeek} delta={`+${newThisWeek}`} trend="up" accent="gold" />
          <StatCard label="Open Inquiries" value={newInquiries} delta={`${inquiries.length} total`} trend="neutral" accent="rose" />
          <StatCard label="Active Members" value={activeMembers} delta={`${users.length} total`} trend="up" accent="emerald" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 paper rounded-2xl p-6 border-2 border-gold/20 shadow-polaroid relative overflow-hidden">
            <svg className="absolute top-2 right-2 w-5 h-5 opacity-50" viewBox="0 0 20 20">
              <path d="M 20 0 L 8 0 Q 20 0 20 12 Z" fill="#C9A961" />
            </svg>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl text-ink">Recent Profiles</h2>
              <Link href="/admin/profiles" className="font-cinzel text-[10px] tracking-wide-cap text-crimson hover:text-vermilion tracking-mughal">View all →</Link>
            </div>
            <div className="space-y-3">
              {profiles.slice(0, 5).map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/profiles/${p.id}/edit`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gold/5 transition-colors group border border-transparent hover:border-gold/20"
                >
                  {/* Arch-frame thumbnail */}
                  <div className="relative w-12 h-14 shrink-0">
                    <svg viewBox="0 0 48 56" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                      <path d="M 4 56 L 4 22 C 4 16, 10 8, 16 4 Q 22 1, 24 2 Q 26 1, 32 4 C 38 8, 44 16, 44 22 L 44 56 Z" fill="none" stroke="#C9A961" strokeWidth="0.8" />
                      <circle cx="24" cy="2" r="1" fill="#C9A961" />
                    </svg>
                    <div className="absolute inset-1 overflow-hidden bg-ivory" style={{ clipPath: 'polygon(15% 30%, 30% 12%, 50% 8%, 70% 12%, 85% 30%, 85% 100%, 15% 100%)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base text-ink truncate">{p.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-cinzel tracking-wide-cap border tracking-mughal ${p.type === 'bride' ? 'bg-rose/15 text-rose border-rose/30' : 'bg-gold/20 text-gold-dark border-gold/30'}`}>
                        {p.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-serif text-xs text-ink-soft truncate mt-0.5">{p.profession.title} · {p.location.city}</p>
                  </div>
                  <span className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute opacity-0 group-hover:opacity-100 tracking-mughal">EDIT →</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="paper rounded-2xl p-6 border-2 border-gold/20 shadow-polaroid relative overflow-hidden">
            <svg className="absolute top-2 left-2 w-5 h-5 opacity-50" viewBox="0 0 20 20">
              <path d="M 0 0 L 12 0 Q 0 0 0 12 Z" fill="#C9A961" />
            </svg>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl text-ink">Inquiries</h2>
              <Link href="/admin/inquiries" className="font-cinzel text-[10px] tracking-wide-cap text-crimson hover:text-vermilion tracking-mughal">All →</Link>
            </div>
            <div className="space-y-3">
              {inquiries.slice(0, 5).map((i) => (
                <div key={i.id} className="p-3 rounded-xl bg-gold/5 border border-gold/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-sm text-ink">{i.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-cinzel tracking-wide-cap border tracking-mughal ${i.status === 'new' ? 'bg-vermilion/20 text-vermilion border-vermilion/30' : 'bg-gold/20 text-gold-dark border-gold/30'}`}>
                      {i.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-serif text-xs text-ink-soft line-clamp-2 italic">{i.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-8">
          <div className="paper p-6 rounded-2xl border-2 border-gold/20 relative overflow-hidden">
            <svg className="absolute top-2 right-2 w-5 h-5 opacity-50" viewBox="0 0 20 20">
              <path d="M 20 0 L 8 0 Q 20 0 20 12 Z" fill="#C9A961" />
            </svg>
            <div className="font-cinzel text-[10px] tracking-wide-cap text-crimson mb-3 tracking-mughal">Brides</div>
            <div className="font-italiana text-4xl text-crimson">{brides}</div>
            <div className="font-serif text-sm text-ink-mute italic mt-1">profiles in the atelier</div>
          </div>
          <div className="paper p-6 rounded-2xl border-2 border-gold/20 relative overflow-hidden">
            <svg className="absolute top-2 right-2 w-5 h-5 opacity-50" viewBox="0 0 20 20">
              <path d="M 20 0 L 8 0 Q 20 0 20 12 Z" fill="#C9A961" />
            </svg>
            <div className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark mb-3 tracking-mughal">Grooms</div>
            <div className="font-italiana text-4xl text-gold-dark">{grooms}</div>
            <div className="font-serif text-sm text-ink-mute italic mt-1">profiles in the atelier</div>
          </div>
          <div className="paper p-6 rounded-2xl border-2 border-gold/20 relative overflow-hidden">
            <svg className="absolute top-2 right-2 w-5 h-5 opacity-50" viewBox="0 0 20 20">
              <path d="M 20 0 L 8 0 Q 20 0 20 12 Z" fill="#C9A961" />
            </svg>
            <div className="font-cinzel text-[10px] tracking-wide-cap text-rose mb-3 tracking-mughal">Featured</div>
            <div className="font-italiana text-4xl text-rose">{profiles.filter((p) => p.featured).length}</div>
            <div className="font-serif text-sm text-ink-mute italic mt-1">curated for homepage</div>
          </div>
        </div>

        <div className="mt-10 paper p-8 rounded-2xl border-2 border-gold/30 shadow-polaroid relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gold/15 to-transparent rounded-full -translate-y-12 translate-x-12" />
          <svg className="absolute bottom-3 left-3 w-6 h-6 opacity-50" viewBox="0 0 24 24">
            <path d="M 0 24 L 16 24 Q 0 24 0 8 Z" fill="#C9A961" />
            <circle cx="2" cy="22" r="1.2" fill="#E8C77C" />
          </svg>
          <h2 className="font-display text-2xl text-ink mb-2">Quick actions</h2>
          <p className="font-serif italic text-ink-soft mb-6">The most common tasks for a busy Monday.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/profiles/new" className="px-5 py-3 rounded-full bg-gradient-to-br from-crimson via-crimson-deep to-vermilion text-alabaster font-cinzel text-[10px] tracking-wide-cap press border-2 border-gold/40 tracking-mughal">
              + Add New Profile
            </Link>
            <Link href="/admin/profiles" className="px-5 py-3 rounded-full border-2 border-crimson text-crimson font-cinzel text-[10px] tracking-wide-cap hover:bg-crimson hover:text-alabaster transition-colors press tracking-mughal">
              Manage Profiles
            </Link>
            <Link href="/admin/inquiries" className="px-5 py-3 rounded-full border-2 border-crimson text-crimson font-cinzel text-[10px] tracking-wide-cap hover:bg-crimson hover:text-alabaster transition-colors press tracking-mughal">
              View Inquiries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  trend,
  accent,
}: {
  label: string;
  value: number;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
  accent: 'crimson' | 'gold' | 'rose' | 'emerald';
}) {
  const accentClass = {
    crimson: 'text-crimson',
    gold: 'text-gold-dark',
    rose: 'text-rose',
    emerald: 'text-emerald',
  }[accent];
  return (
    <div className="paper p-5 rounded-2xl border-2 border-gold/20 shadow-polaroid hover:shadow-polaroid-hover transition-shadow relative overflow-hidden">
      <svg className="absolute top-2 left-2 w-4 h-4 opacity-50" viewBox="0 0 20 20">
        <path d="M 0 0 L 10 0 Q 0 0 0 10 Z" fill="#C9A961" />
      </svg>
      <svg className="absolute bottom-2 right-2 w-4 h-4 opacity-50" viewBox="0 0 20 20">
        <path d="M 20 20 L 10 20 Q 20 20 20 10 Z" fill="#C9A961" />
      </svg>
      <div className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute tracking-mughal">{label}</div>
      <div className={`font-italiana text-4xl mt-2 ${accentClass}`}>{value}</div>
      <div className={`font-cinzel text-[9px] tracking-wide-cap mt-1 tracking-mughal ${trend === 'up' ? 'text-gold-dark' : 'text-ink-mute'}`}>
        {delta}
      </div>
    </div>
  );
}
