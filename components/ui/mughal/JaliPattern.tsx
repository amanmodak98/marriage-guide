import { cn } from '@/lib/utils';

interface JaliPatternProps {
  className?: string;
  density?: 'dense' | 'medium' | 'sparse';
  color?: string;
  opacity?: number;
}

/**
 * Mughal jali — perforated stone lattice with 8-pointed star geometry.
 * Used as overlay on photos, backgrounds, and section dividers.
 */
export function JaliPattern({
  className,
  density = 'medium',
  color = '#C9A961',
  opacity = 0.08,
}: JaliPatternProps) {
  const tileSize = density === 'dense' ? 40 : density === 'medium' ? 60 : 100;
  const id = `jali-${tileSize}`;

  return (
    <svg
      className={cn('pointer-events-none select-none', className)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={id} x="0" y="0" width={tileSize} height={tileSize} patternUnits="userSpaceOnUse">
          <JaliTile size={tileSize} color={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function JaliTile({ size, color }: { size: number; color: string }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 1;

  // 8-pointed star path
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.42;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  const star = pts.join(' ') + ' Z';

  return (
    <g fill="none" stroke={color} strokeWidth="0.6">
      <rect width={size} height={size} />
      <path d={star} fill={color} fillOpacity="0.15" />
      {/* Connecting lines to neighbors */}
      <line x1={0} y1={cy} x2={size} y2={cy} strokeOpacity="0.4" />
      <line x1={cx} y1={0} x2={cx} y2={size} strokeOpacity="0.4" />
      <line x1={0} y1={0} x2={size} y2={size} strokeOpacity="0.3" strokeDasharray="2 2" />
      <line x1={size} y1={0} x2={0} y2={size} strokeOpacity="0.3" strokeDasharray="2 2" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r="1" fill={color} stroke="none" />
    </g>
  );
}
