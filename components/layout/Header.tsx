'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/how-it-works', label: 'Process' },
  { href: '/brides', label: 'Brides' },
  { href: '/grooms', label: 'Grooms' },
  { href: '/success-stories', label: 'Stories' },
  { href: '/journal', label: 'Journal' },
  { href: '/membership', label: 'Membership' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isAdmin) return null;

  return (
    <>
      <header
        className={cn(
          'fixed top-8 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-cream shadow-sm border-b-2 border-gold/20 py-1'
            : 'bg-transparent py-2',
        )}
      >
        {/* Gold filigree top edge */}
        <div className={cn(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-opacity',
          scrolled ? 'opacity-100' : 'opacity-50',
        )} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Logo size="sm" className="relative group" />

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              const isHovered = hoveredItem === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    'font-cinzel text-[10px] tracking-wide-cap relative py-2 transition-colors',
                    active ? 'text-crimson' : 'text-ink-soft hover:text-crimson',
                  )}
                >
                  {item.label}
                  <span className={cn(
                    'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-300',
                    active || isHovered ? 'w-8 opacity-100' : 'w-2 opacity-0',
                  )} />
                  {active && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden md:inline-flex font-cinzel text-[10px] tracking-wide-cap text-ink-soft hover:text-crimson transition-colors relative group"
            >
              Sign In
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-crimson group-hover:w-full transition-all" />
            </Link>
            <Link
              href="/register"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-br from-crimson via-crimson-deep to-vermilion text-alabaster font-cinzel text-[10px] tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press relative overflow-hidden group border border-gold/40"
            >
              <span className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Begin Journey</span>
              <svg className="relative ml-1.5 w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-crimson/5 transition-colors border border-gold/30"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cn('transition-all', mobileOpen && 'translate-y-2.5 rotate-45')} />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cn('transition-opacity', mobileOpen && 'opacity-0')} />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cn('transition-all', mobileOpen && '-translate-y-2.5 -rotate-45')} />
              </svg>
            </button>
          </div>
        </div>
        {/* Gold filigree bottom edge */}
        <div className={cn(
          'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-opacity',
          scrolled ? 'opacity-100' : 'opacity-0',
        )} />
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 transition-opacity duration-300 lg:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            'absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-alabaster shadow-2xl transition-transform duration-500 flex flex-col',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {/* Gold filigree top edge of drawer */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="flex items-center justify-between px-6 h-20 border-b-2 border-gold/20">
            <Logo size="sm" />
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-crimson/5 border border-gold/30"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 px-6 py-8 flex flex-col gap-1 overflow-y-auto">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: `${i * 30}ms` }}
                className={cn(
                  'font-display text-xl text-ink hover:text-crimson hover:translate-x-2 transition-all py-3 border-b border-crimson/5',
                  pathname === item.href && 'text-crimson',
                )}
              >
                <span className="font-italiana text-sm text-gold-dark mr-3">{`0${i + 1}`}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-6 border-t border-gold/20 flex flex-col gap-3">
            <Link
              href="/login"
              className="font-cinzel text-[10px] tracking-wide-cap text-center py-3 border-2 border-gold/40 text-crimson rounded-full hover:bg-crimson hover:text-alabaster transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="font-cinzel text-[10px] tracking-wide-cap text-center py-3 rounded-full bg-gradient-to-br from-crimson to-vermilion text-alabaster border border-gold/40"
            >
              Begin Journey
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
