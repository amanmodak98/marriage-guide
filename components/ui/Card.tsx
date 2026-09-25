'use client';
import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

type Variant = 'paper' | 'glass' | 'cream' | 'dark' | 'parchment';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  hoverable?: boolean;
}

const variants: Record<Variant, string> = {
  paper:
    'paper border border-crimson/8 shadow-polaroid',
  glass:
    'glass text-ink',
  cream:
    'bg-ivory border border-crimson/10 shadow-sm',
  dark:
    'bg-gradient-to-br from-ink to-ink-soft text-alabaster border border-gold/20 shadow-polaroid',
  parchment:
    'bg-parchment border border-crimson/8 shadow-sm',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'paper', hoverable, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl overflow-hidden transition-shadow duration-500',
          variants[variant],
          hoverable && 'hover:shadow-polaroid-hover',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';
