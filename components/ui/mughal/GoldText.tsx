import { cn } from '@/lib/utils';

interface GoldTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Gold-foil metallic text gradient effect.
 */
export function GoldText({ children, className, as: Tag = 'span' }: GoldTextProps) {
  const Component = Tag as unknown as React.ElementType;
  return (
    <Component
      className={cn('inline-block', className)}
      style={{
        background: 'linear-gradient(135deg, #E8C77C 0%, #C9A961 35%, #8B6F3A 55%, #C9A961 75%, #E8C77C 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 5s linear infinite',
        textShadow: '0 1px 2px rgba(43, 24, 16, 0.2)',
      }}
    >
      {children}
    </Component>
  );
}
