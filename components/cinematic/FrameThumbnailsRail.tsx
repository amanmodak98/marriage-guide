'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FrameThumbnailsRailProps {
  frameCount: number;
  totalScroll: number;
  frameBasePath?: string;
  /** Indices of "key frames" to show as larger thumbnails */
  keyFrames: number[];
  className?: string;
}

/**
 * Horizontal rail of key frame thumbnails on the left side.
 * Shows the upcoming moments of the cinematic — clicking jumps to that scroll position.
 */
export function FrameThumbnailsRail({
  frameCount,
  totalScroll,
  frameBasePath = '/frames/ezgif-frame-',
  keyFrames,
  className,
}: FrameThumbnailsRailProps) {
  const [activeFrame, setActiveFrame] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.max(0, Math.min(1, window.scrollY / totalScroll));
      setActiveFrame(Math.floor(progress * frameCount));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [frameCount, totalScroll]);

  const jumpTo = (frame: number) => {
    const progress = frame / (frameCount - 1);
    window.scrollTo({ top: progress * totalScroll, behavior: 'smooth' });
  };

  return (
    <div className={cn('hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3', className)}>
      <div className="font-cinzel text-[8px] tracking-wide-cap text-gold-bright tracking-mughal text-center mb-1 drop-shadow-md">
        Key Moments
      </div>
      {keyFrames.map((frame, idx) => {
        const isActive = activeFrame >= frame && activeFrame < (keyFrames[idx + 1] ?? frameCount);
        const isHovered = hovered === frame;
        const padded = String(frame + 1).padStart(3, '0');
        const thumb = `${frameBasePath}${padded}.jpg`;
        return (
          <button
            key={frame}
            onClick={() => jumpTo(frame)}
            onMouseEnter={() => setHovered(frame)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              'relative w-16 h-10 rounded-sm overflow-hidden border-2 transition-all group',
              isActive ? 'border-gold-bright scale-110 shadow-[0_0_20px_rgba(232,199,124,0.5)]' : 'border-gold/30 hover:border-gold hover:scale-105',
            )}
            aria-label={`Jump to frame ${frame + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb} alt={`Frame ${frame + 1}`} loading="lazy" className="w-full h-full object-cover" />
            <div className={cn(
              'absolute inset-0 transition-opacity',
              isActive ? 'bg-gold/20' : 'bg-ink/30 group-hover:bg-ink/10',
            )} />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent px-1 py-0.5">
              <span className="font-cinzel text-[7px] tracking-wide-cap text-gold-bright tracking-mughal tabular-nums">
                {padded}
              </span>
            </div>
            {/* Hover preview tooltip */}
            {isHovered && (
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-40 whitespace-nowrap paper px-3 py-2 rounded-lg shadow-polaroid border border-gold/40">
                <span className="font-cinzel text-[9px] tracking-wide-cap text-crimson tracking-mughal">Frame {padded}</span>
              </div>
            )}
          </button>
        );
      })}
      <div className="mt-3 flex flex-col items-center gap-1">
        <div className="w-px h-3 bg-gold/40" />
        <div className="font-cinzel text-[8px] tracking-wide-cap text-gold-bright tracking-mughal tabular-nums">
          {String(activeFrame + 1).padStart(3, '0')}
        </div>
      </div>
    </div>
  );
}
