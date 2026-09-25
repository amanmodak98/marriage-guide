import { cn } from '@/lib/utils';

interface LotusMotifProps {
  className?: string;
  size?: number;
  variant?: 'closed' | 'open' | 'eightfold';
  color?: string;
  opacity?: number;
}

/**
 * Imperial lotus motif — central symbol in Mughal decorative vocabulary.
 */
export function LotusMotif({
  className,
  size = 200,
  variant = 'open',
  color = '#C9A961',
  opacity = 1,
}: LotusMotifProps) {
  const cx = size / 2;
  const cy = size / 2;

  if (variant === 'eightfold') {
    return (
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className={cn('pointer-events-none select-none', className)}
        style={{ opacity }}
        aria-hidden="true"
      >
        <g fill="none" stroke={color} strokeWidth="0.8">
          {/* 8 petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
            return (
              <ellipse
                key={i}
                cx={cx + Math.cos(a) * size * 0.18}
                cy={cy + Math.sin(a) * size * 0.18}
                rx={size * 0.18}
                ry={size * 0.08}
                fill={color}
                fillOpacity="0.2"
                transform={`rotate(${(a * 180) / Math.PI} ${cx + Math.cos(a) * size * 0.18} ${cy + Math.sin(a) * size * 0.18})`}
              />
            );
          })}
          <circle cx={cx} cy={cy} r={size * 0.12} fill={color} fillOpacity="0.4" />
          <circle cx={cx} cy={cy} r={size * 0.06} fill={color} fillOpacity="0.7" />
          <circle cx={cx} cy={cy} r={size * 0.02} fill="#FAF7F2" />
        </g>
      </svg>
    );
  }

  const petalCount = 8;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={cn('pointer-events-none select-none', className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <g fill={color} stroke={color} strokeWidth="0.5">
        {/* Outer petals */}
        {Array.from({ length: petalCount }).map((_, i) => {
          const a = (i / petalCount) * Math.PI * 2 - Math.PI / 2;
          return (
            <ellipse
              key={`o-${i}`}
              cx={cx + Math.cos(a) * size * 0.22}
              cy={cy + Math.sin(a) * size * 0.22}
              rx={size * 0.16}
              ry={size * 0.08}
              fillOpacity="0.3"
              transform={`rotate(${(a * 180) / Math.PI + 90} ${cx + Math.cos(a) * size * 0.22} ${cy + Math.sin(a) * size * 0.22})`}
            />
          );
        })}
        {/* Inner petals */}
        {Array.from({ length: petalCount }).map((_, i) => {
          const a = (i / petalCount) * Math.PI * 2 - Math.PI / 2 + Math.PI / petalCount;
          return (
            <ellipse
              key={`i-${i}`}
              cx={cx + Math.cos(a) * size * 0.12}
              cy={cy + Math.sin(a) * size * 0.12}
              rx={size * 0.1}
              ry={size * 0.05}
              fillOpacity="0.6"
              transform={`rotate(${(a * 180) / Math.PI + 90} ${cx + Math.cos(a) * size * 0.12} ${cy + Math.sin(a) * size * 0.12})`}
            />
          );
        })}
        {/* Center */}
        <circle cx={cx} cy={cy} r={size * 0.08} fillOpacity="0.8" />
        <circle cx={cx} cy={cy} r={size * 0.04} fill="#FAF7F2" fillOpacity="0.8" />
      </g>
    </svg>
  );
}
