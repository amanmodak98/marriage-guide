'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { MandalaSVG } from '@/components/ui/MandalaSVG';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { Logo } from '@/components/Logo';
import { LotusMotif } from '@/components/ui/mughal/LotusMotif';
import { GoldText } from '@/components/ui/mughal/GoldText';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Sign-in failed');
      } else {
        router.push(data.redirect || '/');
        router.refresh();
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 grid lg:grid-cols-2">
      <section className="hidden lg:flex relative bg-gradient-to-br from-crimson-deep via-crimson to-vermilion text-alabaster items-center justify-center p-12 overflow-hidden">
        {/* Jali + lotus overlays */}
        <JaliPattern density="medium" color="#E8C77C" opacity={0.12} className="absolute inset-0" />
        <div className="absolute inset-0 opacity-20">
          <MandalaSVG size={700} color="#FAF7F2" speed="slow" />
        </div>
        <div className="absolute opacity-15 pointer-events-none">
          <LotusMotif size={500} variant="eightfold" color="#E8C77C" />
        </div>

        {/* Logo */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <Logo size="md" showText={false} variant="light" />
        </div>

        <div className="relative text-center max-w-md mt-16">
          <div className="font-italiana text-7xl mb-6 text-gold-bright">ॐ</div>
          <h1 className="font-display text-4xl leading-tight mb-4">Welcome back</h1>
          <p className="font-serif italic text-lg text-alabaster/85">
            Your profile, your matches, your conversations — all waiting for you.
          </p>
          <div className="mt-12 flex items-center justify-center gap-2 text-alabaster/70">
            <span className="font-cinzel text-[10px] tracking-wide-cap tracking-mughal">Need help signing in?</span>
          </div>
          <a href="mailto:hello@marriageguide.in" className="font-serif italic text-gold mt-2 inline-block hover:underline">
            hello@marriageguide.in
          </a>
        </div>
      </section>

      <section className="flex items-center justify-center p-8 lg:p-16 bg-alabaster relative overflow-hidden">
        <JaliPattern density="medium" color="#C9A961" opacity={0.04} className="absolute inset-0" />

        <div className="relative w-full max-w-md">
          <Link href="/" className="font-italiana text-2xl text-crimson block mb-2">Marriage Guide</Link>
          <div className="font-cinzel text-[9px] tracking-wide-cap text-gold-dark tracking-mughal mb-8">Royal Atelier</div>
          <h2 className="font-display text-3xl text-ink mb-2">
            <GoldText>Sign in</GoldText>
          </h2>
          <p className="font-serif italic text-ink-soft mb-8">Continue your journey with us.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {error && (
              <div className="text-vermilion text-sm font-serif italic">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 rounded-full bg-gradient-to-br from-crimson via-crimson-deep to-vermilion text-alabaster font-cinzel text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press disabled:opacity-50 border-2 border-gold/40 overflow-hidden group tracking-mughal"
            >
              <span className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <span className="relative">{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-ink-mute">
            <span className="flex-1 h-px bg-gold/30" />
            <span className="font-cinzel text-[9px] tracking-wide-cap tracking-mughal">OR</span>
            <span className="flex-1 h-px bg-gold/30" />
          </div>

          <div className="text-center text-sm font-serif text-ink-soft">
            New here?{' '}
            <Link href="/register" className="text-crimson hover:text-vermilion italic">
              Begin your journey
            </Link>
          </div>

          <div className="mt-12 paper p-4 rounded-xl border-2 border-gold/30 relative overflow-hidden">
            <svg className="absolute top-1 right-1 w-4 h-4 opacity-50" viewBox="0 0 20 20">
              <path d="M 20 0 L 8 0 Q 20 0 20 12 Z" fill="#C9A961" />
            </svg>
            <div className="font-cinzel text-[9px] tracking-wide-cap text-gold-dark mb-2 tracking-mughal">Demo Accounts</div>
            <div className="space-y-1.5 text-xs font-serif text-ink-soft">
              <div><strong className="text-ink">Admin:</strong> admin@marriageguide.in / admin123</div>
              <div><strong className="text-ink">Member:</strong> priya.iyer@example.com / member123</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
