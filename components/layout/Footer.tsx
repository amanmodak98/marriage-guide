import Link from 'next/link';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { Logo } from '@/components/Logo';
import { LotusMotif } from '@/components/ui/mughal/LotusMotif';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';

const COLUMNS = [
  {
    title: 'Atelier',
    links: [
      { href: '/about', label: 'Our Story' },
      { href: '/how-it-works', label: 'The Process' },
      { href: '/journal', label: 'Journal' },
      { href: '/success-stories', label: 'Success Stories' },
    ],
  },
  {
    title: 'Profiles',
    links: [
      { href: '/brides', label: 'Brides' },
      { href: '/grooms', label: 'Grooms' },
      { href: '/membership', label: 'Membership' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Members',
    links: [
      { href: '/login', label: 'Sign In' },
      { href: '/register', label: 'Begin Journey' },
      { href: '/admin', label: 'Royal Studio' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-crimson-deep via-ink to-ink text-ivory pt-24 pb-10 mt-32 overflow-hidden">
      {/* Jali overlay */}
      <JaliPattern density="medium" color="#E8C77C" opacity={0.06} className="absolute inset-0" />

      {/* Massive lotus watermark */}
      <div className="absolute -top-32 -right-32 opacity-[0.04] pointer-events-none">
        <LotusMotif size={500} variant="eightfold" color="#E8C77C" />
      </div>
      <div className="absolute -bottom-32 -left-32 opacity-[0.04] pointer-events-none">
        <LotusMotif size={400} variant="eightfold" color="#E8C77C" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Logo centerpiece */}
        <div className="flex flex-col items-center text-center mb-12">
          <Logo size="lg" showText={false} variant="light" className="mb-6" />
          <h2 className="font-italiana text-5xl md:text-6xl text-alabaster">
            Marriage Guide
          </h2>
          <p className="font-serif italic text-ivory/85 mt-4 max-w-xl text-lg">
            A royal matrimonial atelier. Hand-curated profiles, guided introductions, and a process rooted in tradition and intention.
          </p>
          <div className="w-full max-w-2xl mt-8">
            <PietraDuraBand />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 mt-12">
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-cinzel text-[10px] tracking-wide-cap text-gold mb-4 tracking-mughal">Newsletter</h4>
            <p className="font-serif text-ivory/70 mb-4 text-sm italic">
              A monthly letter with thoughtful matchmaking advice and new royal profiles.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-alabaster/10 border-2 border-gold/30 rounded-full px-4 py-2.5 text-sm text-alabaster placeholder:text-ivory/40 focus:bg-alabaster/15 focus:border-gold"
              />
              <button
                type="button"
                className="px-5 py-2.5 rounded-full bg-gradient-to-br from-gold-bright to-gold-dark text-ink font-cinzel text-[10px] tracking-wide-cap press hover:shadow-glow border border-gold"
              >
                Subscribe
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-cinzel text-[10px] tracking-wide-cap text-gold mb-4 tracking-mughal">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-serif text-ivory/70 hover:text-gold transition-colors text-sm relative group inline-flex items-center"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-gold transition-all mr-0 group-hover:mr-2" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom gold rule */}
        <PietraDuraBand variant="dotted" className="mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-sm text-ivory/60">
            © {new Date().getFullYear()} Marriage Guide. Handcrafted with care.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-serif text-sm text-ivory/60 hover:text-gold transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="font-serif text-sm text-ivory/60 hover:text-gold transition-colors">
              Terms
            </Link>
            <span className="font-italiana text-gold text-2xl">ॐ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
