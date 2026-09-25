import { cn } from '@/lib/utils';

interface PaisleyOrnamentProps {
  className?: string;
  size?: number;
  color?: string;
  rotate?: number;
  filled?: boolean;
}

/**
 * Paisley (boteh) — traditional Indian teardrop-with-curl ornament.
 */
export function PaisleyOrnament({
  className,
  size = 80,
  color = '#C9A961',
  rotate = 0,
  filled = false,
}: PaisleyOrnamentProps) {
  const r = (rotate * Math.PI) / 180;
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={cn('pointer-events-none select-none', className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <g fill={filled ? color : 'none'} stroke={color} strokeWidth="1">
        {/* Main boteh teardrop */}
        <path
          d="M 0 -38 C -22 -22, -36 -2, -30 18 C -26 32, -10 40, 0 38 C 12 36, 24 26, 24 14 C 24 4, 14 -8, 6 -8 C -2 -8, -8 -2, -8 6 C -8 12, -2 16, 4 14"
          fillOpacity={filled ? 0.3 : 0}
        />
        {/* Inner curl detail */}
        <path
          d="M -4 -14 C -10 -8, -12 0, -8 8 C -4 14, 4 14, 8 8"
          fill="none"
          strokeOpacity="0.5"
        />
        {/* Bottom curl */}
        <path
          d="M 8 22 C 16 24, 22 18, 20 10"
          fill="none"
          strokeOpacity="0.6"
        />
        {/* Decorative dot inside */}
        <circle cx="-4" cy="2" r="2" fill={color} />
      </g>
    </svg>
  );
}

/**
 * A complete corner set of 4 paisleys arranged radially.
 */
export function PaisleyCorners({
  className,
  size = 60,
  color = '#C9A961',
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      <PaisleyOrnament size={size} color={color} rotate={-30} className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4" />
      <PaisleyOrnament size={size} color={color} rotate={120} className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4" />
      <PaisleyOrnament size={size} color={color} rotate={60} className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4" />
      <PaisleyOrnament size={size} color={color} rotate={-120} className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4" />
    </div>
  );
}
