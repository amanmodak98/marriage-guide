'use client';
import Link from 'next/link';
import { useRef, useState, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { MandalaSVG } from '@/components/ui/MandalaSVG';

interface ProfileCardProps {
  profile: import('@/lib/types').Profile;
  index?: number;
  variant?: 'polaroid' | 'minimal' | 'feature' | 'arch';
  className?: string;
  showMeta?: boolean;
}

export function ProfileCard({
  profile,
  index = 0,
  variant = 'polaroid',
  className,
  showMeta = true,
}: ProfileCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const isBride = profile.type === 'bride';

  const seedRot = ((index * 37) % 7) - 3;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = x * 8;
    const rotX = -y * 8;
    setTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform(`perspective(1000px) rotateX(0) rotateY(0) rotate(${seedRot}deg)`);
  };

  const initialTransform = `perspective(1000px) rotate(${seedRot}deg)`;

  // Arch variant — Mughal chhatri-shaped photo crop
  if (variant === 'arch') {
    return (
      <Link href={`/profile/${profile.slug}`} className={cn('block group', className)}>
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: transform || initialTransform }}
          className="paper p-3 pb-6 rounded-sm shadow-polaroid group-hover:shadow-polaroid-hover transition-all duration-500 relative"
        >
          {/* Gold filigree tape */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-gradient-to-b from-gold/40 to-gold/10 rotate-[-2deg] shadow-sm" />
          {/* Arch-shaped photo crop */}
          <ArchPhoto src={profile.photos[0]} alt={profile.name} isBride={isBride} />
          {showMeta && (
            <div className="mt-3 px-1 text-center">
              <h3 className="font-display text-lg text-ink leading-tight">{profile.name}</h3>
              <p className="font-serif italic text-ink-soft text-xs mt-1">{profile.profession.title}</p>
              <div className="flex items-center justify-center gap-2 mt-2 text-[9px] font-cinzel tracking-wide-cap text-ink-mute">
                <span>{profile.location.city}</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>{profile.religion.community}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  }

  if (variant === 'feature') {
    return (
      <Link
        href={`/profile/${profile.slug}`}
        className={cn('block group', className)}
      >
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: transform || initialTransform }}
          className="paper p-4 pb-6 rounded-sm shadow-polaroid group-hover:shadow-polaroid-hover transition-all duration-500 relative overflow-hidden"
        >
          {/* Decorative gold corner */}
          <GoldCorners />
          {/* Arch-shaped photo */}
          <ArchPhoto src={profile.photos[0]} alt={profile.name} isBride={isBride} aspect="3/4" />
          <div className="mt-4 text-center">
            <h3 className="font-display text-xl text-ink leading-tight">{profile.name}</h3>
            <p className="font-serif italic text-ink-soft text-sm mt-1 line-clamp-2 px-1">
              {profile.headline}
            </p>
            <div className="flex items-center justify-center gap-3 mt-3 text-[10px] font-cinzel tracking-wide-cap text-ink-mute">
              <span>{profile.age} YRS</span>
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span>{profile.location.city.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/profile/${profile.slug}`} className={cn('block group', className)}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: transform || initialTransform }}
        className={cn(
          'paper p-3 pb-5 rounded-sm shadow-polaroid group-hover:shadow-polaroid-hover transition-all duration-500 relative',
        )}
      >
        <GoldCorners />
        <div className="aspect-[3/4] overflow-hidden bg-ivory relative rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.photos[0]}
            alt={profile.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          <div className="absolute top-2 right-2">
            <span
              className={cn(
                'px-2 py-0.5 rounded-full font-cinzel text-[7px] tracking-wide-cap shadow-sm border',
                isBride ? 'bg-rose/90 text-alabaster border-rose' : 'bg-gold/90 text-ink border-gold-dark',
              )}
            >
              {isBride ? 'BRIDE' : 'GROOM'}
            </span>
          </div>
        </div>

        {showMeta && (
          <div className="mt-3 px-1">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-lg text-ink leading-tight">{profile.name}</h3>
              <span className="font-italiana text-base text-crimson">{profile.age}</span>
            </div>
            <p className="font-serif text-xs text-ink-soft mt-1 line-clamp-2 italic">
              {profile.profession.title}
            </p>
            <div className="flex items-center gap-2 mt-2 text-[9px] font-cinzel tracking-wide-cap text-ink-mute">
              <span>{profile.location.city}</span>
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span>{profile.religion.community}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

/**
 * Arch-shaped photo crop with gold filigree border.
 * Uses clip-path to create a chhatri arch top, rectangle bottom.
 */
function ArchPhoto({ src, alt, isBride, aspect = '3/4' }: { src: string; alt: string; isBride: boolean; aspect?: string }) {
  return (
    <div className={`relative w-full overflow-hidden bg-ivory`} style={{ aspectRatio: aspect.replace('/', ' / ') }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        style={{
          clipPath: 'polygon(0 25%, 50% 0, 100% 25%, 100% 100%, 0 100%)',
        }}
      />
      {/* Gold filigree overlay along arch */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 25 Q 50 0 100 25"
          stroke="#C9A961"
          strokeWidth="0.6"
          fill="none"
          strokeDasharray="1 1"
          opacity="0.6"
          vectorEffect="non-scaling-stroke"
        />
        {/* 5-foil top */}
        <path
          d="M 0 25 Q 10 12, 20 18 Q 30 8, 40 15 Q 50 5, 60 15 Q 70 8, 80 18 Q 90 12, 100 25"
          stroke="#C9A961"
          strokeWidth="0.4"
          fill="none"
          opacity="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Type badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={cn(
            'px-2 py-0.5 rounded-full font-cinzel text-[7px] tracking-wide-cap shadow-sm border backdrop-blur',
            isBride ? 'bg-rose/85 text-alabaster border-rose' : 'bg-gold/85 text-ink border-gold-dark',
          )}
        >
          {isBride ? 'BRIDE' : 'GROOM'}
        </span>
      </div>
    </div>
  );
}

function GoldCorners() {
  return (
    <>
      <svg className="absolute top-1 left-1 w-5 h-5 opacity-70 pointer-events-none" viewBox="0 0 20 20">
        <path d="M 0 0 L 12 0 Q 0 0 0 12 Z" fill="#C9A961" />
        <circle cx="2" cy="2" r="1.2" fill="#E8C77C" />
        <line x1="0" y1="6" x2="6" y2="0" stroke="#8B6F3A" strokeWidth="0.4" />
      </svg>
      <svg className="absolute top-1 right-1 w-5 h-5 opacity-70 pointer-events-none" viewBox="0 0 20 20">
        <path d="M 20 0 L 8 0 Q 20 0 20 12 Z" fill="#C9A961" />
        <circle cx="18" cy="2" r="1.2" fill="#E8C77C" />
        <line x1="20" y1="6" x2="14" y2="0" stroke="#8B6F3A" strokeWidth="0.4" />
      </svg>
      <svg className="absolute bottom-1 left-1 w-5 h-5 opacity-70 pointer-events-none" viewBox="0 0 20 20">
        <path d="M 0 20 L 12 20 Q 0 20 0 8 Z" fill="#C9A961" />
        <circle cx="2" cy="18" r="1.2" fill="#E8C77C" />
      </svg>
      <svg className="absolute bottom-1 right-1 w-5 h-5 opacity-70 pointer-events-none" viewBox="0 0 20 20">
        <path d="M 20 20 L 8 20 Q 20 20 20 8 Z" fill="#C9A961" />
        <circle cx="18" cy="18" r="1.2" fill="#E8C77C" />
      </svg>
    </>
  );
}

export function ProfileMiniCard({ profile, className }: { profile: import('@/lib/types').Profile; className?: string }) {
  const isBride = profile.type === 'bride';
  return (
    <Link href={`/profile/${profile.slug}`} className={cn('block group', className)}>
      <div className="paper p-3 rounded-sm shadow-polaroid group-hover:shadow-polaroid-hover transition-all relative">
        <div className="flex gap-4">
          <div className="w-20 h-24 overflow-hidden bg-ivory shrink-0 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-full object-cover"
              loading="lazy"
              style={{ clipPath: 'polygon(0 25%, 50% 0, 100% 25%, 100% 100%, 0 100%)' }}
            />
            <span className={cn('absolute top-1 left-1 w-1.5 h-1.5 rounded-full', isBride ? 'bg-rose' : 'bg-gold')} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <h4 className="font-display text-base text-ink truncate">{profile.name}</h4>
              <span className="font-italiana text-sm text-crimson">{profile.age}</span>
            </div>
            <p className="font-serif text-xs text-ink-soft mt-1 line-clamp-2 italic">{profile.headline}</p>
            <div className="flex items-center gap-2 mt-2 text-[8px] font-cinzel tracking-wide-cap text-ink-mute">
              <span className={isBride ? 'text-rose' : 'text-gold-dark'}>{isBride ? 'BRIDE' : 'GROOM'}</span>
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span>{profile.location.city}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
