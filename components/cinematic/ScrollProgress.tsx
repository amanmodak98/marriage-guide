'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
  frameCount: number;
  totalScroll: number;
  className?: string;
}

/**
 * Vertical progress bar on the right side showing current frame index.
 * Includes scene markers at key transitions.
 */
export function ScrollProgress({ frameCount, totalScroll, className }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const p = Math.max(0, Math.min(1, window.scrollY / totalScroll));
      setProgress(p);
      setFrameIndex(Math.min(frameCount - 1, Math.floor(p * frameCount)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [frameCount, totalScroll]);

  const scenes = [
    { name: 'Distant', frame: 0 },
    { name: 'Approach', frame: 30 },
    { name: 'Meet', frame: 80 },
    { name: 'Touch', frame: 130 },
    { name: 'Embrace', frame: 180 },
    { name: 'Together', frame: 230 },
    { name: 'Forever', frame: 280 },
  ];

  return (
    <div className={cn('hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 pointer-events-none', className)}>
      {/* Track */}
      <div className="relative h-80 w-px bg-alabaster/20 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gold-bright via-gold to-gold-dark rounded-full transition-[height] duration-200"
          style={{ height: `${progress * 100}%` }}
        />
        {/* Scene markers */}
        {scenes.map((s) => (
          <div
            key={s.name}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${(s.frame / frameCount) * 100}%` }}
          >
            <span
              className={cn(
                'block w-1.5 h-1.5 rounded-full transition-all',
                frameIndex >= s.frame ? 'bg-gold-bright scale-150 shadow-[0_0_8px_#E8C77C]' : 'bg-alabaster/40',
              )}
            />
            <span
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 font-cinzel text-[8px] tracking-wide-cap tracking-mughal whitespace-nowrap transition-opacity',
                progress > 0.02 && progress < 0.98 ? 'opacity-100' : 'opacity-0',
                frameIndex >= s.frame ? 'text-gold-bright' : 'text-ivory/70',
              )}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      {/* Frame counter */}
      <div className="mt-4 flex flex-col items-center gap-1 pointer-events-none">
        <div className="font-italiana text-lg text-alabaster drop-shadow-lg tabular-nums">
          {String(frameIndex + 1).padStart(3, '0')}
        </div>
        <div className="w-px h-2 bg-alabaster/40" />
        <div className="font-cinzel text-[8px] tracking-wide-cap text-alabaster/70 tabular-nums">
          {String(frameCount).padStart(3, '0')}
        </div>
      </div>
    </div>
  );
}
