import { cn } from '@/lib/utils';

interface PietraDuraBandProps {
  className?: string;
  height?: number;
  variant?: 'full' | 'slim' | 'dotted';
}

/**
 * Pietra-dura inlay-inspired band — colored gem stones in a row.
 * Used as decorative separator between sections.
 */
export function PietraDuraBand({ className, height = 18, variant = 'full' }: PietraDuraBandProps) {
  const colors = ['#8B1E3F', '#1F4F3F', '#1E3A5F', '#C9A961', '#E8C77C', '#C75146', '#E8927C', '#1F4F3F', '#8B1E3F', '#C9A961'];

  if (variant === 'dotted') {
    return (
      <div className={cn('flex items-center gap-2 w-full', className)} style={{ height }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 h-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'slim') {
    return (
      <div className={cn('relative w-full overflow-hidden', className)} style={{ height }}>
        <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center gap-1">
          {colors.slice(0, 5).map((c, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: c, boxShadow: `0 0 6px ${c}80` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full overflow-hidden', className)} style={{ height }}>
      {/* Top gold rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      {/* Bottom gold rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      {/* Gem row */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3 md:gap-5">
          {colors.map((c, i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{
                width: i % 3 === 0 ? 10 : 6,
                height: i % 3 === 0 ? 10 : 6,
                backgroundColor: c,
                boxShadow: `0 0 8px ${c}90`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Center lotus */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold" />
    </div>
  );
}
