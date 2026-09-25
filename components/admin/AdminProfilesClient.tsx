'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Reveal } from '@/components/ui/Reveal';
import type { Profile } from '@/lib/types';

export function AdminProfilesClient({ initial }: { initial: Profile[] }) {
  const router = useRouter();
  const [profiles, setProfiles] = useState(initial);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'bride' | 'groom'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = profiles.filter((p) => {
    if (typeFilter !== 'all' && p.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const hay = `${p.name} ${p.location.city} ${p.profession.title} ${p.religion.community}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete profile for ${name}? This cannot be undone.`)) return;
    setDeleting(id);
    const res = await fetch(`/api/profiles/${id}`, { method: 'DELETE' });
    setDeleting(null);
    if (res.ok) {
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } else {
      alert('Failed to delete profile');
    }
  };

  return (
    <div className="px-6 md:px-10 py-10">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">Manage</span>
          <h1 className="font-display text-4xl text-ink mt-2">Profiles</h1>
          <p className="font-serif italic text-ink-soft mt-1">{filtered.length} of {profiles.length} profiles</p>
        </div>
        <Link
          href="/admin/profiles/new"
          className="px-6 py-3 rounded-full bg-gradient-to-br from-crimson to-vermilion text-alabaster font-cinzel text-[10px] tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press"
        >
          + Add New Profile
        </Link>
      </div>

      <div className="paper rounded-2xl border border-crimson/8 shadow-polaroid p-4 mb-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by name, city, profession..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] bg-ivory border border-crimson/15 rounded-lg px-4 py-2 text-sm font-serif"
        />
        <div className="flex gap-2">
          {(['all', 'bride', 'groom'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-full font-cinzel text-[10px] tracking-wide-cap transition-colors press ${
                typeFilter === t
                  ? 'bg-crimson text-alabaster'
                  : 'bg-ivory text-crimson border border-crimson/15'
              }`}
            >
              {t === 'all' ? 'All' : t === 'bride' ? 'Brides' : 'Grooms'}
            </button>
          ))}
        </div>
      </div>

      <div className="paper rounded-2xl border border-crimson/8 shadow-polaroid overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-crimson/5 border-b border-crimson/10">
              <tr>
                <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Profile</th>
                <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Type</th>
                <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Profession</th>
                <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">City</th>
                <th className="text-left px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Featured</th>
                <th className="text-right px-4 py-3 font-cinzel text-[10px] tracking-wide-cap text-ink-soft">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 font-serif italic text-ink-mute">
                    No profiles match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => (
                  <tr key={p.id} className={`border-b border-crimson/5 hover:bg-crimson/3 transition-colors ${i % 2 === 0 ? 'bg-alabaster' : 'bg-ivory/40'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 overflow-hidden rounded-sm bg-ivory shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-display text-base text-ink">{p.name}</div>
                          <div className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute">{p.age} yrs · {p.height}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-cinzel tracking-wide-cap ${p.type === 'bride' ? 'bg-rose/15 text-rose' : 'bg-gold/20 text-gold-dark'}`}>
                        {p.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-serif text-sm text-ink">{p.profession.title}</td>
                    <td className="px-4 py-3 font-serif text-sm text-ink-soft">{p.location.city}</td>
                    <td className="px-4 py-3">
                      {p.featured ? (
                        <span className="text-gold-dark">★</span>
                      ) : (
                        <span className="text-ink-mute/30">☆</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/profile/${p.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-full text-[9px] font-cinzel tracking-wide-cap border border-crimson/20 text-crimson hover:bg-crimson hover:text-alabaster transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/profiles/${p.id}/edit`}
                          className="px-3 py-1.5 rounded-full text-[9px] font-cinzel tracking-wide-cap bg-crimson text-alabaster hover:bg-vermilion transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          disabled={deleting === p.id}
                          className="px-3 py-1.5 rounded-full text-[9px] font-cinzel tracking-wide-cap border border-vermilion/30 text-vermilion hover:bg-vermilion hover:text-alabaster transition-colors disabled:opacity-50"
                        >
                          {deleting === p.id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
