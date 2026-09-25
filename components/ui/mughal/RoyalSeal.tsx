import { cn } from '@/lib/utils';

interface RoyalSealProps {
  className?: string;
  text?: string;
  size?: number;
  color?: string;
  ribbon?: boolean;
}

/**
 * Wax-seal style circular badge with optional ribbon.
 * Used for promises, guarantees, featured badges.
 */
export function RoyalSeal({
  className,
  text = 'GUARANTEED',
  size = 100,
  color = '#C9A961',
  ribbon = false,
}: RoyalSealProps) {
  return (
    <div className={cn('relative inline-flex flex-col items-center', className)} style={{ width: size }}>
      {/* Ribbon */}
      {ribbon && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-0">
          <svg width={size * 0.7} height={size * 0.3} viewBox="0 0 70 30">
            <path d="M 5 0 L 65 0 L 60 12 L 65 24 L 50 14 L 35 18 L 20 14 L 5 24 L 10 12 Z" fill={color} fillOpacity="0.85" />
            <path d="M 5 0 L 65 0 L 60 12 L 35 8 L 10 12 Z" fill="#fff" fillOpacity="0.15" />
          </svg>
        </div>
      )}

      {/* Seal */}
      <div
        className="relative rounded-full shadow-polaroid animate-breathe"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <defs>
            <radialGradient id={`sealGrad-${text}`} cx="0.4" cy="0.3" r="0.7">
              <stop offset="0%" stopColor="#E8C77C" />
              <stop offset="50%" stopColor={color} />
              <stop offset="100%" stopColor="#8B6F3A" />
            </radialGradient>
          </defs>

          {/* Outer scalloped ring */}
          <g fill={`url(#sealGrad-${text})`}>
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={50 + Math.cos(a) * 47}
                  cy={50 + Math.sin(a) * 47}
                  r="3"
                />
              );
            })}
          </g>

          {/* Main seal body */}
          <circle cx="50" cy="50" r="44" fill={`url(#sealGrad-${text})`} />

          {/* Inner dashed ring */}
          <circle cx="50" cy="50" r="38" fill="none" stroke="#FAF7F2" strokeWidth="0.5" strokeDasharray="1.5 2" strokeOpacity="0.5" />

          {/* Curved text */}
          <path id={`sealTextArc-${text}`} d="M 50 50 m -32 0 a 32 32 0 1 1 64 0" fill="none" />
          <text fill="#FAF7F2" fontSize="7" fontFamily="serif" letterSpacing="2" fontWeight="600">
            <textPath href={`#sealTextArc-${text}`} startOffset="50%" textAnchor="middle">
              {text.toUpperCase()}
            </textPath>
          </text>

          {/* Center monogram/heart */}
          <g transform="translate(50 50)">
            <circle r="14" fill="#FAF7F2" fillOpacity="0.15" />
            <path
              d="M 0 9 C 0 9, -10 0, -10 -7 C -10 -12, -6 -14, -2 -14 C 0 -14, 1 -13, 0 -11 C -1 -13, 0 -14, 2 -14 C 6 -14, 10 -12, 10 -7 C 10 0, 0 9, 0 9 Z"
              fill="#FAF7F2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
