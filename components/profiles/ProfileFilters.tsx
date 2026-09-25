'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { EDUCATIONS, INDIAN_CITIES, RELIGIONS, COMMUNITIES } from '@/lib/utils';

export interface DirectoryFilters {
  search: string;
  ageMin: number;
  ageMax: number;
  city: string;
  religion: string;
  community: string;
  education: string;
  diet: string;
  sort: 'newest' | 'age-asc' | 'age-desc' | 'name';
}

export const defaultFilters: DirectoryFilters = {
  search: '',
  ageMin: 21,
  ageMax: 38,
  city: '',
  religion: '',
  community: '',
  education: '',
  diet: '',
  sort: 'newest',
};

export function ProfileFilters({
  filters,
  onChange,
  resultCount,
}: {
  filters: DirectoryFilters;
  onChange: (next: DirectoryFilters) => void;
  resultCount: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const set = <K extends keyof DirectoryFilters>(key: K, value: DirectoryFilters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <aside className="bg-parchment border border-crimson/10 rounded-2xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display text-xl text-ink">Refine</h3>
          <p className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute mt-1">
            {resultCount} profiles
          </p>
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="md:hidden text-crimson"
          aria-label="Toggle filters"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={cn('space-y-5', !expanded && 'hidden md:block')}>
        <div>
          <label className="block font-cinzel text-[9px] tracking-wide-cap text-ink-soft mb-2">SEARCH</label>
          <input
            type="text"
            placeholder="Name, profession, city..."
            value={filters.search}
            onChange={(e) => set('search', e.target.value)}
            className="w-full bg-alabaster border border-crimson/15 rounded-lg px-3 py-2 text-sm font-serif"
          />
        </div>

        <div>
          <label className="block font-cinzel text-[9px] tracking-wide-cap text-ink-soft mb-2">
            AGE: {filters.ageMin} — {filters.ageMax}
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min={20}
              max={45}
              value={filters.ageMin}
              onChange={(e) => set('ageMin', Math.min(Number(e.target.value), filters.ageMax - 1))}
              className="flex-1 accent-crimson"
            />
            <input
              type="range"
              min={20}
              max={45}
              value={filters.ageMax}
              onChange={(e) => set('ageMax', Math.max(Number(e.target.value), filters.ageMin + 1))}
              className="flex-1 accent-crimson"
            />
          </div>
        </div>

        <Select label="CITY" value={filters.city} onChange={(v) => set('city', v)}>
          <option value="">All Cities</option>
          {INDIAN_CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>

        <Select label="RELIGION" value={filters.religion} onChange={(v) => set('religion', v)}>
          <option value="">All Religions</option>
          {RELIGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </Select>

        <Select label="COMMUNITY" value={filters.community} onChange={(v) => set('community', v)}>
          <option value="">All Communities</option>
          {COMMUNITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>

        <Select label="EDUCATION" value={filters.education} onChange={(v) => set('education', v)}>
          <option value="">All Levels</option>
          {EDUCATIONS.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </Select>

        <Select label="DIET" value={filters.diet} onChange={(v) => set('diet', v)}>
          <option value="">Any</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-vegetarian">Non-vegetarian</option>
          <option value="Pescatarian">Pescatarian</option>
        </Select>

        <Select label="SORT BY" value={filters.sort} onChange={(v) => set('sort', v as DirectoryFilters['sort'])}>
          <option value="newest">Newest First</option>
          <option value="age-asc">Youngest First</option>
          <option value="age-desc">Oldest First</option>
          <option value="name">Name (A–Z)</option>
        </Select>

        <button
          onClick={() => onChange(defaultFilters)}
          className="w-full py-2.5 rounded-full border border-crimson/20 text-crimson font-cinzel text-[9px] tracking-wide-cap hover:bg-crimson hover:text-alabaster transition-colors press"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-cinzel text-[9px] tracking-wide-cap text-ink-soft mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-alabaster border border-crimson/15 rounded-lg px-3 py-2 text-sm font-serif cursor-pointer"
      >
        {children}
      </select>
    </div>
  );
}
