import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textClassName?: string;
  variant?: 'default' | 'light' | 'dark';
}

const sizes = {
  sm: { w: 44, h: 35 },   // for header
  md: { w: 80, h: 64 },   // for login/register
  lg: { w: 140, h: 112 }, // for footer
  xl: { w: 200, h: 160 }, // for landing hero
};

/**
 * The Marriage Guide logo using the provided logo.png.
 * - sm: header (44×35)
 * - md: login/register panel
 * - lg: footer
 * - xl: hero
 *
 * `light` variant adds a gold drop-shadow for use on dark backgrounds.
 */
export function Logo({
  className,
  size = 'sm',
  showText = true,
  textClassName,
  variant = 'default',
}: LogoProps) {
  const { w, h } = sizes[size];

  return (
    <div className={cn('flex items-center gap-3 group', className)}>
      <div
        className={cn(
          'relative shrink-0 transition-transform group-hover:scale-105',
          variant === 'light' && 'drop-shadow-[0_4px_24px_rgba(232,199,124,0.5)]',
        )}
        style={{ width: w, height: h }}
      >
        <Image
          src="/logo.png"
          alt="Marriage Guide"
          width={1402}
          height={1122}
          className="w-full h-full object-contain"
          priority={size === 'lg' || size === 'xl'}
        />
      </div>
      {showText && (
        <div className="hidden sm:flex flex-col leading-tight">
          <div className={cn(
            'font-italiana leading-none',
            size === 'sm' && 'text-2xl',
            size === 'md' && 'text-3xl',
            size === 'lg' && 'text-4xl',
            size === 'xl' && 'text-5xl',
            variant === 'light' ? 'text-alabaster' : 'text-crimson',
          )}>
            Marriage Guide
          </div>
          <div className={cn(
            'font-cinzel mt-1 tracking-wide-cap tracking-mughal',
            size === 'sm' && 'text-[8px]',
            size === 'md' && 'text-[9px]',
            size === 'lg' && 'text-[10px]',
            variant === 'light' ? 'text-gold' : 'text-gold-dark',
          )}>
            Royal Atelier · Est. 2014
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Image-only logo (no text). Used in places like admin sidebar,
 * login panel, or when paired with custom text.
 */
export function LogoMark({
  className,
  size = 64,
  variant = 'default',
}: {
  className?: string;
  size?: number;
  variant?: 'default' | 'light' | 'dark';
}) {
  const aspectRatio = 1402 / 1122;
  const w = size;
  const h = size / aspectRatio;

  return (
    <div
      className={cn(
        'relative shrink-0',
        variant === 'light' && 'drop-shadow-[0_4px_24px_rgba(232,199,124,0.5)]',
        className,
      )}
      style={{ width: w, height: h }}
    >
      <Image
        src="/logo.png"
        alt="Marriage Guide"
        width={1402}
        height={1122}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
