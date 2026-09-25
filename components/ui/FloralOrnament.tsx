import { cn } from '@/lib/utils';

interface FloralOrnamentProps {
  className?: string;
  variant?: 'default' | 'compact';
  color?: string;
}

export function FloralOrnament({ className, variant = 'default', color = '#C9A961' }: FloralOrnamentProps) {
  if (variant === 'compact') {
    return (
      <svg className={cn('inline-block', className)} width="60" height="20" viewBox="0 0 60 20" aria-hidden="true">
        <g fill="none" stroke={color} strokeWidth="1">
          <line x1="0" y1="10" x2="20" y2="10" />
          <circle cx="30" cy="10" r="3" fill={color} fillOpacity="0.3" />
          <circle cx="30" cy="10" r="6" />
          <line x1="40" y1="10" x2="60" y2="10" />
        </g>
      </svg>
    );
  }
  return (
    <svg className={cn('inline-block', className)} width="240" height="40" viewBox="0 0 240 40" aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1">
        <line x1="0" y1="20" x2="80" y2="20" />
        <path d="M 95 20 Q 105 5 120 20 Q 135 35 145 20 Q 135 5 120 20 Q 105 35 95 20 Z" fill={color} fillOpacity="0.2" />
        <circle cx="120" cy="20" r="3" fill={color} />
        <path d="M 145 20 Q 155 5 165 20 Q 155 35 145 20 Z" fill={color} fillOpacity="0.2" />
        <line x1="160" y1="20" x2="240" y2="20" />
        <circle cx="85" cy="20" r="1.5" fill={color} />
        <circle cx="155" cy="20" r="1.5" fill={color} />
        <path d="M 175 12 Q 185 20 175 28" />
        <path d="M 65 12 Q 55 20 65 28" />
      </g>
    </svg>
  );
}
