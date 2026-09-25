'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Wraps children with an IntersectionObserver-based reveal animation.
 * Adds the `is-visible` class when the element scrolls into view.
 */
export function Reveal({
  children,
  className,
  delay,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Component = Tag as unknown as React.ElementType;
  return (
    <Component
      ref={ref as React.RefObject<HTMLElement>}
      className={cn('reveal', delay && `reveal-delay-${delay}`, className)}
    >
      {children}
    </Component>
  );
}
