/**
 * Mughal-inspired SVG path primitives reused across the motif library.
 */

export const GOLD_GRADIENT = {
  light: '#E8C77C',
  mid: '#C9A961',
  dark: '#8B6F3A',
} as const;

/**
 * 8-pointed star path (Mughal khatim motif).
 */
export const EIGHT_POINT_STAR = (cx: number, cy: number, r: number): string => {
  const pts: string[] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.42;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(' ') + ' Z';
};

/**
 * Lotus petal shape (imperial lotus motif).
 */
export const LOTUS_PETAL = (cx: number, cy: number, w: number, h: number, rotation = 0): string => {
  const r = (rotation * Math.PI) / 180;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  const px = (x: number, y: number) => [cx + (x - cx) * cos - (y - cy) * sin, cy + (x - cx) * sin + (y - cy) * cos];
  const [t1x, t1y] = px(cx, cy - h);
  const [l1x, l1y] = px(cx - w / 2, cy + h * 0.2);
  const [b1x, b1y] = px(cx, cy + h * 0.5);
  const [r1x, r1y] = px(cx + w / 2, cy + h * 0.2);
  return `M ${t1x.toFixed(2)} ${t1y.toFixed(2)} C ${l1x.toFixed(2)} ${(l1y - h * 0.5).toFixed(2)}, ${(l1x - 3).toFixed(2)} ${l1y.toFixed(2)}, ${b1x.toFixed(2)} ${b1y.toFixed(2)} C ${(r1x + 3).toFixed(2)} ${r1y.toFixed(2)}, ${r1x.toFixed(2)} ${(r1y - h * 0.5).toFixed(2)}, ${t1x.toFixed(2)} ${t1y.toFixed(2)} Z`;
};

/**
 * Mughal arch (multi-foiled cusped) outline.
 */
export const CHHATRI_ARCH_PATH = (w: number, h: number, foils = 5): string => {
  const half = w / 2;
  const baseY = h;
  let path = `M 0 ${baseY} `;
  // Bottom-left up to start of arch
  path += `L 0 ${h * 0.55} `;
  // Multi-foiled cusped top — 5 foils
  const foilW = w / foils;
  let x = 0;
  // Up from baseline to first peak
  for (let i = 0; i < foils; i++) {
    const peakX = x + foilW / 2;
    const peakY = h * 0.05;
    const startX = x;
    const endX = x + foilW;
    // Smooth curve up to peak
    path += `C ${startX} ${h * 0.2}, ${(startX + foilW * 0.15).toFixed(2)} ${(peakY + h * 0.15).toFixed(2)}, ${peakX.toFixed(2)} ${peakY} `;
    // Down to next valley
    path += `C ${(peakX + foilW * 0.15).toFixed(2)} ${(peakY + h * 0.15).toFixed(2)}, ${(endX - foilW * 0.1).toFixed(2)} ${(h * 0.2).toFixed(2)}, ${endX.toFixed(2)} ${(h * 0.45).toFixed(2)} `;
    x = endX;
  }
  // Close the shape down to bottom-right
  path += `L ${w} ${baseY} Z`;
  return path;
};

/**
 * Paisley (boteh) outline.
 */
export const PAISLEY_PATH = (cx: number, cy: number, size: number, rotation = 0): string => {
  const r = (rotation * Math.PI) / 180;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  const s = size;
  const tx = cx;
  const ty = cy - s * 0.4;
  const bx = cx;
  const by = cy + s * 0.5;
  return `M ${tx} ${ty} C ${tx - s * 0.4} ${ty + s * 0.2}, ${cx - s * 0.45} ${cy + s * 0.3}, ${bx} ${by} C ${bx + s * 0.5} ${by - s * 0.2}, ${cx + s * 0.4} ${cy}, ${tx} ${ty} Z`;
};
