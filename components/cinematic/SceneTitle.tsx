'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { GoldText } from '@/components/ui/mughal/GoldText';

interface SceneTitleProps {
  label: string;        // e.g. "Scene One"
  title: string;        // e.g. "Where hearts are"
  accent?: string;      // e.g. "handcrafted together"
  range: [number, number];
  totalScroll: number;
  className?: string;
}

/**
 * Cinematic title overlay that appears between scene transitions.
 * Italiana font with gold-foil accent on the highlighted word.
 */
export function SceneTitle({ label, title, accent, range, totalScroll, className }: SceneTitleProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const progress = window.scrollY / totalScroll;
      const [start, end] = range;
      if (progress < start || progress > end) {
        setOpacity(0);
        return;
      }
      const local = (progress - start) / (end - start);
      setOpacity(Math.sin(local * Math.PI));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [range, totalScroll]);

  return (
    <div
      className={cn('absolute inset-0 flex items-center justify-center pointer-events-none px-6', className)}
      style={{ opacity, transition: 'opacity 0.15s linear' }}
    >
      <div className="text-center max-w-2xl">
        <div className="font-cinzel text-[10px] tracking-wide-cap tracking-mughal text-gold-bright mb-3 drop-shadow-md">
          {label}
        </div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-alabaster drop-shadow-2xl leading-tight">
          {title}{' '}
          {accent && (
            <GoldText as="span" className="font-italiana italic">
              {accent}
            </GoldText>
          )}
        </h2>
      </div>
    </div>
  );
}
