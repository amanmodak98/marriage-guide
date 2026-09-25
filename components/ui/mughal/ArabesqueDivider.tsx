import { cn } from '@/lib/utils';

interface ArabesqueDividerProps {
  className?: string;
  color?: string;
  orientation?: 'horizontal' | 'centered';
  width?: number;
  height?: number;
}

/**
 * Mughal arabesque — flowing vegetal scrollwork divider.
 * Two orientations: full-width centered, or compact horizontal.
 */
export function ArabesqueDivider({
  className,
  color = '#C9A961',
  orientation = 'centered',
  width = 600,
  height = 60,
}: ArabesqueDividerProps) {
  return (
    <svg
      className={cn('inline-block', className)}
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="1" fill="none" strokeLinecap="round">
        {/* Left vine */}
        <path
          d={`M 0 ${height / 2} Q ${width * 0.15} ${height * 0.2}, ${width * 0.3} ${height / 2} T ${width * 0.45} ${height / 2}`}
        />
        {/* Right vine */}
        <path
          d={`M ${width} ${height / 2} Q ${width * 0.85} ${height * 0.8}, ${width * 0.7} ${height / 2} T ${width * 0.55} ${height / 2}`}
        />
        {/* Tendril curls */}
        <path d={`M ${width * 0.18} ${height * 0.35} q 8 -8 16 0 q -8 8 -16 0 Z`} fill={color} fillOpacity="0.3" />
        <path d={`M ${width * 0.82} ${height * 0.65} q 8 8 16 0 q -8 -8 -16 0 Z`} fill={color} fillOpacity="0.3" />
        {/* Central medallion */}
        <circle cx={width / 2} cy={height / 2} r={height * 0.18} strokeWidth="1.2" />
        <circle cx={width / 2} cy={height / 2} r={height * 0.1} fill={color} fillOpacity="0.25" />
        {/* 8-point star at center */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={width / 2 + Math.cos(a) * height * 0.18}
              y1={height / 2 + Math.sin(a) * height * 0.18}
              x2={width / 2 + Math.cos(a) * height * 0.08}
              y2={height / 2 + Math.sin(a) * height * 0.08}
              strokeWidth="0.8"
            />
          );
        })}
        {/* Tiny dots flanking medallion */}
        <circle cx={width / 2 - height * 0.28} cy={height / 2} r="1.5" fill={color} />
        <circle cx={width / 2 + height * 0.28} cy={height / 2} r="1.5" fill={color} />
      </g>
    </svg>
  );
}
