'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MobileScrollHUDProps {
  frameCount: number;
  totalScroll: number;
  keyFrames: number[];
}

/**
 * Mobile bottom HUD: shows current frame + a compact scrub bar.
 * Tap-and-drag to scrub through the cinematic.
 */
export function MobileScrollHUD({ frameCount, totalScroll, keyFrames }: MobileScrollHUDProps) {
  const [activeFrame, setActiveFrame] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const p = Math.max(0, Math.min(1, window.scrollY / totalScroll));
      setActiveFrame(Math.floor(p * frameCount));
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
    <div className="lg:hidden fixed bottom-4 left-3 right-3 z-40 pointer-events-none">
      <div
        className={cn(
          'glass-dark rounded-2xl border border-gold/30 shadow-polaroid overflow-hidden transition-all pointer-events-auto',
          expanded ? 'p-3' : 'py-2 px-3',
        )}
      >
        {/* Compact row — always visible */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-vermilion animate-pulse shrink-0" />
          <span className="font-italiana text-sm text-gold-bright tabular-nums shrink-0">
            {String(activeFrame + 1).padStart(3, '0')}
            <span className="text-ivory/50 text-[10px]"> / {String(frameCount).padStart(3, '0')}</span>
          </span>
          {/* Progress bar with scene markers */}
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex-1 h-1.5 bg-alabaster/15 rounded-full relative overflow-hidden cursor-pointer"
            aria-label="Toggle scrub bar"
          >
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-vermilion via-gold to-gold-bright rounded-full"
              style={{ width: `${(activeFrame / (frameCount - 1)) * 100}%` }}
            />
            {/* Scene markers as dots */}
            {keyFrames.map((frame, i) => (
              <span
                key={i}
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full',
                  activeFrame >= frame ? 'bg-gold-bright' : 'bg-alabaster/40',
                )}
                style={{ left: `${(frame / (frameCount - 1)) * 100}%` }}
              />
            ))}
          </button>
          {/* Toggle button */}
          <button
            onClick={() => setExpanded((e) => !e)}
            className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-gold-bright hover:bg-gold/30 transition-colors"
            aria-label="Toggle scenes"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" className={cn('transition-transform', expanded && 'rotate-180')} />
            </svg>
          </button>
        </div>

        {/* Expanded scene list */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-gold/15 grid grid-cols-4 gap-2">
            {[
              { name: 'Distant', frame: 0 },
              { name: 'Approach', frame: 50 },
              { name: 'Meet', frame: 100 },
              { name: 'Touch', frame: 150 },
              { name: 'Embrace', frame: 200 },
              { name: 'Together', frame: 250 },
              { name: 'Forever', frame: 285 },
              { name: 'End', frame: 299 },
            ].map((s) => (
              <button
                key={s.frame}
                onClick={() => jumpTo(s.frame)}
                className={cn(
                  'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors',
                  activeFrame >= s.frame - 14 && activeFrame < s.frame + 14
                    ? 'bg-gold/20 text-gold-bright'
                    : 'text-ivory/70 hover:bg-alabaster/5',
                )}
              >
                <span className="font-cinzel text-[8px] tracking-wide-cap tracking-mughal">{(s.frame + 1).toString().padStart(3, '0')}</span>
                <span className="font-cinzel text-[7px] tracking-wide-cap tracking-mughal">{s.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
