import { cn } from '@/lib/utils';

interface RoyalCartoucheProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Ornamental cartouche — numbered/lettered badge with paisley corner accents.
 * Used for steps, counts, indices.
 */
export function RoyalCartouche({ children, className, size = 'md' }: RoyalCartoucheProps) {
  const dims = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-2xl',
  }[size];

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        viewBox="0 0 60 60"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cartGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8C77C" />
            <stop offset="50%" stopColor="#C9A961" />
            <stop offset="100%" stopColor="#8B6F3A" />
          </linearGradient>
        </defs>
        {/* Outer scalloped ring */}
        <g fill="url(#cartGrad)">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={30 + Math.cos(a) * 27}
                cy={30 + Math.sin(a) * 27}
                r="2.5"
              />
            );
          })}
        </g>
        {/* Inner body */}
        <circle cx="30" cy="30" r="25" fill="url(#cartGrad)" />
        {/* Paisley accents at 4 corners */}
        <g fill="#FAF7F2" fillOpacity="0.5">
          <circle cx="30" cy="6" r="1.2" />
          <circle cx="30" cy="54" r="1.2" />
          <circle cx="6" cy="30" r="1.2" />
          <circle cx="54" cy="30" r="1.2" />
        </g>
        {/* Inner ring */}
        <circle cx="30" cy="30" r="20" fill="none" stroke="#FAF7F2" strokeWidth="0.5" strokeOpacity="0.6" strokeDasharray="1 1.5" />
      </svg>
      <span className={cn('relative font-italiana text-ivory leading-none', dims)}>
        {children}
      </span>
    </div>
  );
}
