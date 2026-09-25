'use client';
import { useState, useEffect } from 'react';
import { ProfileCard } from '@/components/profiles/ProfileCard';
import { ProfileFilters, defaultFilters, type DirectoryFilters } from '@/components/profiles/ProfileFilters';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import type { Profile } from '@/lib/types';

interface DirectoryClientProps {
  type: 'bride' | 'groom';
  profiles: Profile[];
  heading: string;
  subheading: string;
}

export function DirectoryClient({ type, profiles, heading, subheading }: DirectoryClientProps) {
  const [filters, setFilters] = useState<DirectoryFilters>(defaultFilters);

  const filtered = profiles.filter((p) => {
    if (filters.ageMin && p.age < filters.ageMin) return false;
    if (filters.ageMax && p.age > filters.ageMax) return false;
    if (filters.city && p.location.city !== filters.city) return false;
    if (filters.religion && p.religion.religion !== filters.religion) return false;
    if (filters.community && p.religion.community !== filters.community) return false;
    if (filters.education && !p.education.degree.includes(filters.education)) return false;
    if (filters.diet && !p.lifestyle.diet.toLowerCase().includes(filters.diet.toLowerCase())) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = `${p.name} ${p.profession.title} ${p.profession.company} ${p.location.city} ${p.headline}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case 'age-asc':
        return a.age - b.age;
      case 'age-desc':
        return b.age - a.age;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <>
      <section className="relative pt-36 pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-alabaster to-ivory" />
        <div className="absolute top-10 right-10 opacity-[0.05]">
          <svg width="300" height="300" viewBox="0 0 300 300">
            <g fill="none" stroke="#8B1E3F" strokeWidth="0.8">
              {Array.from({ length: 6 }).map((_, i) => (
                <circle key={i} cx="150" cy="150" r={30 + i * 22} />
              ))}
            </g>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <Reveal>
            <FloralOrnament className="mb-4" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">
              {type === 'bride' ? 'The Brides' : 'The Grooms'}
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-ink mt-3 leading-tight">{heading}</h1>
            <p className="font-serif italic text-ink-soft mt-4 max-w-2xl mx-auto text-lg">
              {subheading}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-10">
          <ProfileFilters filters={filters} onChange={setFilters} resultCount={sorted.length} />

          <div>
            {sorted.length === 0 ? (
              <div className="paper p-16 rounded-2xl text-center">
                <div className="font-italiana text-6xl text-crimson mb-4">∞</div>
                <h3 className="font-display text-2xl text-ink mb-2">No profiles match your filters</h3>
                <p className="font-serif text-ink-soft">Try widening your search to discover more.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {sorted.map((p, i) => (
                  <Reveal key={p.id} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                    <ProfileCard profile={p} index={i} variant="feature" />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
