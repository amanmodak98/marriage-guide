'use client';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Profile } from '@/lib/types';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { ArabesqueDivider } from '@/components/ui/mughal/ArabesqueDivider';
import { RoyalSeal } from '@/components/ui/mughal/RoyalSeal';
import { GoldText } from '@/components/ui/mughal/GoldText';

interface BiodataPanelProps {
  profile: Profile;
}

export function BiodataPanel({ profile }: BiodataPanelProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [interestOpen, setInterestOpen] = useState(false);

  const isBride = profile.type === 'bride';

  return (
    <>
      {/* Hero photo + key info */}
      <section className="relative pt-32 pb-16 px-6 lg:px-10 overflow-hidden">
        {/* Jali overlay */}
        <JaliPattern density="sparse" color="#C9A961" opacity={0.04} className="absolute inset-0" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          {/* Photos column — Chhatri arch frame */}
          <div className="space-y-4 lg:sticky lg:top-28">
            {/* Chhatri arch photo */}
            <div className="relative">
              <svg viewBox="0 0 100 130" className="w-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="chhatriProfile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8C77C" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#C9A961" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8B6F3A" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {/* Outer chhatri arch (multi-foiled top) */}
                <path
                  d="M 8 130 L 8 50
                     C 8 35, 18 22, 30 14
                     C 40 8, 48 6, 50 8
                     C 52 6, 60 8, 70 14
                     C 82 22, 92 35, 92 50
                     L 92 130 Z"
                  fill="none"
                  stroke="url(#chhatriProfile)"
                  strokeWidth="1.5"
                />
                {/* Inner arch */}
                <path
                  d="M 14 130 L 14 52
                     C 14 40, 22 30, 32 22
                     C 40 16, 47 14, 50 16
                     C 53 14, 60 16, 68 22
                     C 78 30, 86 40, 86 52
                     L 86 130"
                  fill="none"
                  stroke="#C9A961"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                  strokeDasharray="3 3"
                />
                {/* Top finial */}
                <g transform="translate(50 4)">
                  <circle r="2.5" fill="#C9A961" />
                  <line x1="0" y1="-2.5" x2="0" y2="-7" stroke="#C9A961" strokeWidth="1" />
                  <circle cy="-9" r="2" fill="#E8C77C" />
                </g>
                {/* Corner ornaments */}
                <g fill="#C9A961" fillOpacity="0.7">
                  <circle cx="8" cy="130" r="1.5" />
                  <circle cx="92" cy="130" r="1.5" />
                </g>
              </svg>
              {/* Photo inside arch */}
              <div
                className="absolute inset-0 overflow-hidden bg-ivory"
                style={{
                  clipPath: 'polygon(15% 38%, 25% 22%, 40% 12%, 50% 11%, 60% 12%, 75% 22%, 85% 38%, 85% 100%, 15% 100%)',
                  top: '3%',
                  left: '6%',
                  right: '6%',
                  bottom: '0',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.photos[activeImage]}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Type badge */}
              <div className="absolute top-6 right-3 z-10">
                <span className={cn(
                  'px-3 py-1 rounded-full font-cinzel text-[9px] tracking-wide-cap shadow-sm border backdrop-blur tracking-mughal',
                  isBride ? 'bg-rose/85 text-alabaster border-rose' : 'bg-gold/85 text-ink border-gold-dark',
                )}>
                  {isBride ? 'BRIDE' : 'GROOM'}
                </span>
              </div>
              {/* Gold filigree corner */}
              <svg className="absolute -top-2 -left-2 w-8 h-8 opacity-70" viewBox="0 0 32 32">
                <path d="M 0 0 L 20 0 Q 0 0 0 20 Z" fill="#C9A961" />
                <circle cx="3" cy="3" r="1.5" fill="#E8C77C" />
              </svg>
              <svg className="absolute -top-2 -right-2 w-8 h-8 opacity-70" viewBox="0 0 32 32">
                <path d="M 32 0 L 12 0 Q 32 0 32 20 Z" fill="#C9A961" />
                <circle cx="29" cy="3" r="1.5" fill="#E8C77C" />
              </svg>
            </div>

            {/* Thumbnail gallery with mini arch frames */}
            {profile.photos.length > 1 && (
              <div className="flex gap-3">
                {profile.photos.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'relative w-16 h-20 overflow-hidden bg-ivory shrink-0 transition-all',
                      activeImage === i ? 'ring-2 ring-gold ring-offset-2 ring-offset-alabaster' : 'opacity-70 hover:opacity-100',
                    )}
                    style={{ clipPath: 'polygon(0 25%, 50% 0, 100% 25%, 100% 100%, 0 100%)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setInterestOpen(true)}
              className="relative w-full py-4 rounded-full bg-gradient-to-br from-crimson via-crimson-deep to-vermilion text-alabaster font-cinzel text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press mt-4 overflow-hidden group border-2 border-gold/40 tracking-mughal"
            >
              <span className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Express Interest</span>
            </button>
            <Link
              href="/contact"
              className="block w-full py-3 rounded-full bg-alabaster border-2 border-gold/40 text-crimson font-cinzel text-[10px] tracking-wide-cap text-center hover:bg-crimson hover:text-alabaster transition-colors press tracking-mughal"
            >
              Request Full Biodata
            </Link>

            {/* Royal seal */}
            <div className="flex justify-center pt-4">
              <RoyalSeal text="VERIFIED" size={90} />
            </div>
          </div>

          {/* Info column */}
          <div>
            <div className="flex items-baseline gap-4 flex-wrap">
              <span
                className={cn(
                  'px-3 py-1 rounded-full font-cinzel text-[10px] tracking-wide-cap border tracking-mughal',
                  isBride ? 'bg-rose/15 text-rose border-rose/30' : 'bg-gold/15 text-gold-dark border-gold/30',
                )}
              >
                {isBride ? 'BRIDE' : 'GROOM'}
              </span>
              <span className="font-cinzel text-[10px] tracking-wide-cap text-ink-mute tracking-mughal">
                ID: MG-{profile.id.slice(-6).toUpperCase()}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-ink mt-4 leading-tight">{profile.name}</h1>
            <p className="font-italiana text-2xl text-crimson italic mt-2">
              <GoldText>{profile.headline}</GoldText>
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
              <QuickFact label="Age" value={`${profile.age}`} />
              <QuickFact label="Height" value={profile.height} />
              <QuickFact label="City" value={profile.location.city} />
            </div>

            {/* Arabesque divider */}
            <div className="mt-10">
              <ArabesqueDivider className="w-full max-w-md" color="#C9A961" height={40} />
            </div>

            <div className="mt-6">
              <SectionTitle>About</SectionTitle>
              <p className="font-serif text-lg text-ink leading-relaxed mt-3">{profile.about}</p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <DataCard icon="🎓" title="Education">
                <p className="font-display text-base text-ink">{profile.education.degree}</p>
                <p className="font-serif text-sm text-ink-soft mt-1">{profile.education.institution}</p>
                <p className="font-cinzel text-[9px] tracking-wide-cap text-gold-dark mt-2 tracking-mughal">{profile.education.field}</p>
              </DataCard>

              <DataCard icon="💼" title="Profession">
                <p className="font-display text-base text-ink">{profile.profession.title}</p>
                <p className="font-serif text-sm text-ink-soft mt-1">{profile.profession.company}</p>
                <p className="font-cinzel text-[9px] tracking-wide-cap text-gold-dark mt-2 tracking-mughal">{profile.profession.income}</p>
              </DataCard>

              <DataCard icon="📍" title="Location">
                <p className="font-display text-base text-ink">{profile.location.city}, {profile.location.state}</p>
                <p className="font-serif text-sm text-ink-soft mt-1">Native: {profile.location.nativePlace}</p>
                <p className="font-cinzel text-[9px] tracking-wide-cap text-gold-dark mt-2 tracking-mughal">{profile.location.country}</p>
              </DataCard>

              <DataCard icon="🕉" title="Religion & Community">
                <p className="font-display text-base text-ink">{profile.religion.religion}</p>
                <p className="font-serif text-sm text-ink-soft mt-1">{profile.religion.community}</p>
                {profile.religion.subCommunity && (
                  <p className="font-cinzel text-[9px] tracking-wide-cap text-gold-dark mt-2 tracking-mughal">{profile.religion.subCommunity}</p>
                )}
              </DataCard>

              <DataCard icon="🏛" title="Family" wide>
                <p className="font-serif text-sm text-ink leading-relaxed">
                  <strong className="font-display text-ink">Father:</strong> {profile.family.father}
                </p>
                <p className="font-serif text-sm text-ink leading-relaxed mt-2">
                  <strong className="font-display text-ink">Mother:</strong> {profile.family.mother}
                </p>
                <p className="font-serif text-sm text-ink leading-relaxed mt-2">
                  <strong className="font-display text-ink">Siblings:</strong> {profile.family.siblings}
                </p>
                <p className="font-serif text-sm text-ink-soft mt-3 italic">
                  {profile.family.familyType} · {profile.family.values}
                </p>
              </DataCard>

              <DataCard icon="🌿" title="Lifestyle" wide>
                <p className="font-serif text-sm text-ink">
                  <strong className="font-display">Diet:</strong> {profile.lifestyle.diet}
                </p>
                <div className="mt-3">
                  <strong className="font-display text-ink text-sm">Languages:</strong>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {profile.lifestyle.languages.map((l) => (
                      <span key={l} className="px-2.5 py-0.5 bg-gold/10 border border-gold/30 text-gold-dark rounded-full text-[10px] font-cinzel tracking-wide-cap tracking-mughal">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <strong className="font-display text-ink text-sm">Hobbies:</strong>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {profile.lifestyle.hobbies.map((h) => (
                      <span key={h} className="px-2.5 py-0.5 bg-rose/10 border border-rose/30 text-rose rounded-full text-[10px] font-cinzel tracking-wide-cap tracking-mughal">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </DataCard>
            </div>

            <div className="mt-10 paper p-8 rounded-2xl border-2 border-gold/30 shadow-polaroid relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/15 to-transparent rounded-full -translate-y-12 translate-x-12" />
              <svg className="absolute top-2 left-2 w-6 h-6 opacity-60" viewBox="0 0 24 24">
                <path d="M 0 0 L 16 0 Q 0 0 0 16 Z" fill="#C9A961" />
                <circle cx="3" cy="3" r="1.5" fill="#E8C77C" />
              </svg>
              <SectionTitle className="text-crimson">Partner Expectations</SectionTitle>
              <p className="font-serif italic text-lg text-ink leading-relaxed mt-4 relative">
                &ldquo;{profile.partnerExpectations}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interest modal */}
      {interestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-ink/50">
          <div className="bg-alabaster rounded-2xl max-w-md w-full p-8 shadow-2xl relative border-2 border-gold/30">
            <button
              onClick={() => setInterestOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-crimson/10 text-crimson flex items-center justify-center hover:bg-crimson hover:text-alabaster border border-crimson/30"
            >
              ×
            </button>
            <div className="font-italiana text-3xl text-crimson text-center mb-2">Express Interest</div>
            <p className="font-serif text-center text-ink-soft mb-6 italic">
              in {profile.name.split(' ')[0]}
            </p>
            <form className="space-y-4">
              <input className="w-full bg-ivory border-2 border-gold/30 rounded-lg px-4 py-2.5 font-serif focus:border-crimson" placeholder="Your Name" />
              <input className="w-full bg-ivory border-2 border-gold/30 rounded-lg px-4 py-2.5 font-serif focus:border-crimson" placeholder="Your Email" />
              <input className="w-full bg-ivory border-2 border-gold/30 rounded-lg px-4 py-2.5 font-serif focus:border-crimson" placeholder="Your Phone" />
              <textarea className="w-full bg-ivory border-2 border-gold/30 rounded-lg px-4 py-2.5 font-serif min-h-[100px] focus:border-crimson" placeholder="A short note about yourself..." />
              <button
                type="button"
                onClick={() => setInterestOpen(false)}
                className="w-full py-3 rounded-full bg-gradient-to-br from-crimson via-crimson-deep to-vermilion text-alabaster font-cinzel text-[10px] tracking-wide-cap border-2 border-gold/40 tracking-mughal"
              >
                Send Expression of Interest
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="font-italiana text-3xl text-crimson">{value}</div>
      <div className="font-cinzel text-[8px] tracking-wide-cap text-ink-mute mt-1 tracking-mughal">{label}</div>
    </div>
  );
}

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="w-2 h-2 rounded-full bg-gold" />
      <span className="font-cinzel text-[10px] tracking-wide-cap uppercase tracking-mughal">{children}</span>
      <span className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
    </div>
  );
}

function DataCard({
  icon,
  title,
  children,
  wide,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={cn('paper p-5 rounded-xl shadow-sm border-2 border-gold/20 relative overflow-hidden', wide && 'sm:col-span-2')}>
      <div className="absolute top-1 right-1 opacity-30">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M 20 0 L 8 0 Q 20 0 20 12 Z" fill="#C9A961" />
        </svg>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h3 className="font-cinzel text-[10px] tracking-wide-cap text-crimson tracking-mughal">{title}</h3>
      </div>
      {children}
    </div>
  );
}
