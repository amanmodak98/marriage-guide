'use client';
import { cn } from '@/lib/utils';

interface MandalaSVGProps {
  className?: string;
  size?: number;
  color?: string;
  rings?: number;
  petals?: number;
  strokeWidth?: number;
  speed?: 'slow' | 'normal' | 'fast';
  reverse?: boolean;
}

/**
 * Hand-drawn-style traditional Indian mandala. Procedurally generated.
 * Use as decorative backdrop (large, low opacity) or accent.
 */
export function MandalaSVG({
  className,
  size = 400,
  color = '#C9A961',
  rings = 6,
  petals = 12,
  strokeWidth = 0.8,
  speed = 'normal',
  reverse = false,
}: MandalaSVGProps) {
  const cx = size / 2;
  const cy = size / 2;
  const dur = speed === 'slow' ? 90 : speed === 'fast' ? 30 : 60;

  const ringR = (i: number) => (size / 2 - 24) * (i / rings);

  const petalPath = (r1: number, r2: number, angle: number) => {
    const a = (angle * Math.PI) / 180;
    const x1 = cx + Math.cos(a - Math.PI / petals) * r1;
    const y1 = cy + Math.sin(a - Math.PI / petals) * r1;
    const x2 = cx + Math.cos(a) * r2;
    const y2 = cy + Math.sin(a) * r2;
    const x3 = cx + Math.cos(a + Math.PI / petals) * r1;
    const y3 = cy + Math.sin(a + Math.PI / petals) * r1;
    const cx1 = cx + Math.cos(a) * (r2 * 0.7);
    const cy1 = cy + Math.sin(a) * (r2 * 0.7);
    return `M ${x1} ${y1} Q ${cx1} ${cy1} ${x2} ${y2} Q ${cx1} ${cy1} ${x3} ${y3} Z`;
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={cn('pointer-events-none select-none', className)}
      style={{
        animation: `floatRotate ${dur}s linear infinite${reverse ? ' reverse' : ''}`,
        transformOrigin: 'center',
      }}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth={strokeWidth} opacity={0.7}>
        {Array.from({ length: rings }).map((_, r) => (
          <circle key={`c-${r}`} cx={cx} cy={cy} r={ringR(r + 1)} />
        ))}
        {Array.from({ length: petals }).map((_, p) => {
          const angle = (360 / petals) * p;
          return (
            <g key={`p-${p}`} transform={`rotate(${angle} ${cx} ${cy})`}>
              <path d={petalPath(ringR(rings) * 0.55, ringR(rings) * 0.95, 90)} fill={color} fillOpacity={0.08} />
              <line x1={cx} y1={cy} x2={cx + ringR(rings) * 0.95} y2={cy} strokeOpacity={0.4} />
            </g>
          );
        })}
        {Array.from({ length: petals * 2 }).map((_, p) => {
          const angle = (360 / (petals * 2)) * p;
          return (
            <circle
              key={`d-${p}`}
              cx={cx + Math.cos((angle * Math.PI) / 180) * ringR(rings) * 0.78}
              cy={cy + Math.sin((angle * Math.PI) / 180) * ringR(rings) * 0.78}
              r={2.5}
              fill={color}
              stroke="none"
            />
          );
        })}
        <circle cx={cx} cy={cy} r={ringR(1) * 0.5} fill={color} fillOpacity={0.15} />
        <circle cx={cx} cy={cy} r={ringR(1) * 0.18} fill={color} fillOpacity={0.3} />
        {/* Inner star */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (360 / 8) * i;
          return (
            <line
              key={`s-${i}`}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos((angle * Math.PI) / 180) * ringR(2)}
              y2={cy + Math.sin((angle * Math.PI) / 180) * ringR(2)}
              strokeOpacity={0.5}
            />
          );
        })}
      </g>
    </svg>
  );
}
