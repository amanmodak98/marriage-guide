import { cn } from '@/lib/utils';

interface ChhatriArchProps {
  className?: string;
  width?: number;
  height?: number;
  foils?: number;
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  filled?: boolean;
  children?: React.ReactNode;
}

/**
 * Multi-foiled Mughal arch (chhatri) silhouette used to frame content.
 * Renders as an SVG outline + child content positioned absolutely inside.
 */
export function ChhatriArch({
  className,
  width = 400,
  height = 480,
  foils = 5,
  color = '#C9A961',
  fillColor = 'transparent',
  strokeWidth = 1.5,
  filled = false,
  children,
}: ChhatriArchProps) {
  // Build the arch path: flat bottom, multi-foiled cusped top
  const half = width / 2;
  const baseY = height;
  let path = `M 0 ${baseY} L 0 ${height * 0.5} `;
  const foilW = width / foils;
  let x = 0;
  for (let i = 0; i < foils; i++) {
    const peakX = x + foilW / 2;
    const peakY = height * 0.05;
    const startX = x;
    const endX = x + foilW;
    const peakEndX = (i === foils - 1) ? endX : (x + foilW * 0.92);
    path += `C ${startX} ${height * 0.18}, ${(peakX - foilW * 0.18).toFixed(2)} ${(peakY + 6).toFixed(2)}, ${peakX.toFixed(2)} ${peakY.toFixed(2)} `;
    path += `C ${(peakX + foilW * 0.18).toFixed(2)} ${(peakY + 6).toFixed(2)}, ${(peakEndX - foilW * 0.05).toFixed(2)} ${(height * 0.32).toFixed(2)}, ${peakEndX.toFixed(2)} ${(height * 0.5).toFixed(2)} `;
    x = endX;
  }
  path += `L ${width} ${baseY} Z`;

  // Inner arch (smaller, for double-frame effect)
  const innerScale = 0.88;
  const innerW = width * innerScale;
  const innerH = height * innerScale;
  const innerOffsetX = (width - innerW) / 2;
  const innerOffsetY = (height - innerH) / 2;
  const innerBaseY = innerH;
  let innerPath = `M 0 ${innerBaseY} L 0 ${innerH * 0.5} `;
  const innerFoilW = innerW / foils;
  let ix = 0;
  for (let i = 0; i < foils; i++) {
    const peakX = ix + innerFoilW / 2;
    const peakY = innerH * 0.05;
    const startX = ix;
    const endX = ix + innerFoilW;
    const peakEndX = (i === foils - 1) ? endX : (ix + innerFoilW * 0.92);
    innerPath += `C ${startX} ${innerH * 0.18}, ${(peakX - innerFoilW * 0.18).toFixed(2)} ${(peakY + 6).toFixed(2)}, ${peakX.toFixed(2)} ${peakY.toFixed(2)} `;
    innerPath += `C ${(peakX + innerFoilW * 0.18).toFixed(2)} ${(peakY + 6).toFixed(2)}, ${(peakEndX - innerFoilW * 0.05).toFixed(2)} ${(innerH * 0.32).toFixed(2)}, ${peakEndX.toFixed(2)} ${(innerH * 0.5).toFixed(2)} `;
    ix = endX;
  }
  innerPath += `L ${innerW} ${innerBaseY} Z`;

  return (
    <div className={cn('relative', className)} style={{ width, height }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`archGrad-${foils}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="50%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Outer arch */}
        <path
          d={path}
          fill={filled ? fillColor : 'transparent'}
          stroke={`url(#archGrad-${foils})`}
          strokeWidth={strokeWidth}
        />
        {/* Inner arch (frame) */}
        <g transform={`translate(${innerOffsetX} ${innerOffsetY})`}>
          <path
            d={innerPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 0.6}
            strokeOpacity="0.6"
            strokeDasharray="3 3"
          />
        </g>
        {/* Decorative finial at top center */}
        <g transform={`translate(${half} ${height * 0.02})`}>
          <circle r="3" fill={color} />
          <circle r="6" fill="none" stroke={color} strokeWidth="0.6" />
          <circle r="9" fill="none" stroke={color} strokeWidth="0.4" strokeOpacity="0.5" />
        </g>
      </svg>
      {children && (
        <div
          className="absolute"
          style={{
            top: height * 0.05,
            left: width * 0.06,
            right: width * 0.06,
            bottom: 0,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
