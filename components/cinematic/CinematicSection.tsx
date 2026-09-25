'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CinematicSectionProps {
  range: [number, number]; // scroll percentage when visible (0-1)
  align?: 'left' | 'right' | 'center';
  totalScroll: number;     // pass through for math
  offsetY?: number;        // px offset for stacking
  children: ReactNode;
  className?: string;
}

/**
 * A content panel that fades & translates in/out based on scroll percentage.
 * Used to overlay content on the scroll-driven cinematic canvas.
 */
export function CinematicSection({
  range,
  align = 'center',
  totalScroll,
  children,
  className,
}: CinematicSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0, transform: 'translate3d(0, 40px, 0)' });

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const progress = window.scrollY / totalScroll;
      const [start, end] = range;

      // Fade in 0.15 of range, stay visible 0.7, fade out 0.15
      let opacity = 0;
      let y = 40;
      let x = 0;

      if (progress >= start && progress <= end) {
        const local = (progress - start) / (end - start);
        // ease in/out via sin
        opacity = Math.sin(local * Math.PI);
        y = (1 - opacity) * 40;
      } else if (progress > end) {
        opacity = 0;
        y = -40;
      }

      // Add directional slide based on alignment
      if (align === 'left') x = (1 - opacity) * -60;
      else if (align === 'right') x = (1 - opacity) * 60;

      setStyle({
        opacity,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [range, align, totalScroll]);

  const alignClass = {
    left: 'items-start text-left',
    right: 'items-end text-right',
    center: 'items-center text-center',
  }[align];

  return (
    <div
      ref={ref}
      className={cn(
        'absolute inset-0 flex flex-col justify-center pointer-events-none px-6 lg:px-12',
        alignClass,
        className,
      )}
      style={{
        ...style,
        willChange: 'opacity, transform',
      }}
    >
      <div className={cn('max-w-3xl pointer-events-auto', align === 'center' && 'mx-auto')}>
        {children}
      </div>
    </div>
  );
}
