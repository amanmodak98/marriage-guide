'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LogoMark } from '@/components/Logo';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
  { href: '/admin/profiles', label: 'Profiles', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  { href: '/admin/users', label: 'Members', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-gradient-to-b from-crimson-deep via-ink to-ink text-ivory min-h-screen sticky top-0 border-r-2 border-gold/30">
      {/* Gold filigree top edge */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="px-6 py-6 border-b border-gold/20">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size={48} variant="light" />
          <div>
            <div className="font-italiana text-lg leading-none text-gold">Marriage Guide</div>
            <div className="font-cinzel text-[8px] tracking-wide-cap text-ivory/60 mt-1 tracking-mughal">Royal Studio</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl font-cinzel text-[10px] tracking-wide-cap transition-all border tracking-mughal',
                active
                  ? 'bg-gradient-to-r from-gold/30 via-gold/15 to-transparent text-gold border-l-2 border-gold'
                  : 'text-ivory/70 hover:bg-alabaster/5 hover:text-gold border-l-2 border-transparent',
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="px-6 py-6 border-t border-gold/20 space-y-3">
        <Link
          href="/"
          className="block font-cinzel text-[10px] tracking-wide-cap text-ivory/60 hover:text-gold tracking-mughal"
        >
          ← View Site
        </Link>
        <div className="text-[10px] text-ivory/40 font-serif">
          Logged in as <span className="text-gold">Aanya</span>
        </div>
      </div>
    </aside>
  );
}

export function AdminMobileBar() {
  const pathname = usePathname();
  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-40 glass-dark rounded-2xl p-2 flex justify-around border-2 border-gold/30">
      {NAV.map((item) => {
        const active = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center px-3 py-2 rounded-lg text-[8px] tracking-wide-cap font-cinzel tracking-mughal',
              active ? 'text-gold' : 'text-ivory/70',
            )}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d={item.icon} />
            </svg>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
