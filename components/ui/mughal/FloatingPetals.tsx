'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FloatingPetalsProps {
  className?: string;
  count?: number;
  color?: string;
  scope?: 'section' | 'viewport';
}

/**
 * Drifting lotus petals across a section. Uses CSS animations,
 * randomized per-instance via inline styles.
 */
export function FloatingPetals({ className, count = 14, color = '#C9A961', scope = 'section' }: FloatingPetalsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      if (ref.current) ref.current.style.display = 'none';
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        scope === 'viewport' && 'fixed',
        className,
      )}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const startX = Math.random() * 100;
        const size = 8 + Math.random() * 14;
        const duration = 12 + Math.random() * 18;
        const delay = Math.random() * -20;
        const sway = (Math.random() - 0.5) * 200;
        const rotation = Math.random() * 360;
        const opacity = 0.25 + Math.random() * 0.4;
        const variant = i % 3;

        return (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${startX}%`,
              top: '-30px',
              width: size,
              height: size,
              animation: `petalFall ${duration}s linear ${delay}s infinite`,
              ['--sway' as any]: `${sway}px`,
              ['--rotation' as any]: `${rotation}deg`,
              opacity,
            }}
          >
            <PetalSVG color={color} variant={variant} />
          </span>
        );
      })}
      <style jsx>{`
        @keyframes petalFall {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translate3d(var(--sway), 110vh, 0) rotate(var(--rotation));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function PetalSVG({ color, variant }: { color: string; variant: number }) {
  return (
    <svg viewBox="0 0 20 20" width="100%" height="100%">
      <g fill={color}>
        {variant === 0 && (
          // Pointed teardrop petal
          <path
            d="M 10 1 C 14 5, 17 9, 16 14 C 15 17, 12 19, 10 19 C 8 19, 5 17, 4 14 C 3 9, 6 5, 10 1 Z"
            fillOpacity="0.5"
          />
        )}
        {variant === 1 && (
          // Rounded lotus petal
          <path
            d="M 10 1 C 14 6, 16 10, 15 14 C 14 17, 12 18, 10 18 C 8 18, 6 17, 5 14 C 4 10, 6 6, 10 1 Z"
            fillOpacity="0.4"
          />
        )}
        {variant === 2 && (
          // Wide petal
          <path
            d="M 10 2 C 16 4, 18 9, 17 14 C 16 18, 13 18, 10 18 C 7 18, 4 18, 3 14 C 2 9, 4 4, 10 2 Z"
            fillOpacity="0.45"
          />
        )}
      </g>
    </svg>
  );
}
