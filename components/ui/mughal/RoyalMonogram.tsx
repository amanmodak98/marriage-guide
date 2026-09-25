import { cn } from '@/lib/utils';

interface RoyalMonogramProps {
  className?: string;
  size?: number;
  letters?: string;
  animate?: boolean;
}

/**
 * Animated MG monogram in gold filigree — for footer, empty states, loading.
 */
export function RoyalMonogram({
  className,
  size = 120,
  letters = 'MG',
  animate = true,
}: RoyalMonogramProps) {
  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className={animate ? 'animate-breathe' : ''}
      >
        <defs>
          <linearGradient id="monogramGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8C77C" />
            <stop offset="50%" stopColor="#C9A961" />
            <stop offset="100%" stopColor="#8B6F3A" />
          </linearGradient>
          <radialGradient id="monogramGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#C9A961" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer glow */}
        <circle cx="60" cy="60" r="58" fill="url(#monogramGlow)" />

        {/* Outer decorative ring */}
        <circle cx="60" cy="60" r="56" fill="none" stroke="url(#monogramGrad)" strokeWidth="0.6" />
        <circle cx="60" cy="60" r="52" fill="none" stroke="url(#monogramGrad)" strokeWidth="1" />

        {/* 8-point star frame */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const x1 = 60 + Math.cos(a) * 52;
          const y1 = 60 + Math.sin(a) * 52;
          const x2 = 60 + Math.cos(a) * 56;
          const y2 = 60 + Math.sin(a) * 56;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#monogramGrad)" strokeWidth="1" />
          );
        })}

        {/* Inner filigree ring */}
        <circle cx="60" cy="60" r="44" fill="none" stroke="url(#monogramGrad)" strokeWidth="0.4" strokeDasharray="2 3" />

        {/* Decorative dots at cardinal points */}
        {[0, 90, 180, 270].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={60 + Math.cos(a) * 48}
              cy={60 + Math.sin(a) * 48}
              r="1.5"
              fill="#C9A961"
            />
          );
        })}

        {/* Corner flourishes */}
        <g stroke="url(#monogramGrad)" strokeWidth="0.8" fill="none">
          <path d="M 30 30 Q 36 34 38 40" />
          <path d="M 90 30 Q 84 34 82 40" />
          <path d="M 30 90 Q 36 86 38 80" />
          <path d="M 90 90 Q 84 86 82 80" />
        </g>

        {/* Monogram letters */}
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fontSize="34"
          fontFamily="var(--font-playfair), serif"
          fontWeight="700"
          fontStyle="italic"
          fill="url(#monogramGrad)"
        >
          {letters}
        </text>

        {/* Tiny ornament below letters */}
        <g fill="#C9A961">
          <circle cx="60" cy="80" r="0.8" />
          <circle cx="55" cy="80" r="0.5" />
          <circle cx="65" cy="80" r="0.5" />
        </g>
      </svg>
    </div>
  );
}
