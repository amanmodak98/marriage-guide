'use client';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'glass' | 'outline' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asChild?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 font-cinzel tracking-wide-cap font-semibold rounded-full transition-all duration-300 ease-out press disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-crimson via-terracotta to-vermilion text-alabaster shadow-polaroid hover:shadow-glow hover:from-vermilion hover:to-crimson animate-pulse-glow',
  secondary:
    'bg-alabaster text-crimson border border-crimson/30 hover:bg-crimson hover:text-alabaster shadow-sm hover:shadow-polaroid',
  ghost:
    'text-crimson hover:bg-crimson/5 hover:text-vermilion',
  glass:
    'glass-cream text-ink hover:bg-white/80 border border-crimson/15 shadow-glass',
  outline:
    'border-2 border-gold text-gold-dark hover:bg-gold hover:text-alabaster',
  dark:
    'bg-ink text-alabaster hover:bg-ink-soft shadow-polaroid',
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 text-[10px]',
  md: 'px-7 py-3 text-xs',
  lg: 'px-9 py-4 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, iconPosition = 'right', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
      </button>
    );
  },
);
Button.displayName = 'Button';
