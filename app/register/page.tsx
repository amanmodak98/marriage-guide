'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Select } from '@/components/ui/Input';
import { MandalaSVG } from '@/components/ui/MandalaSVG';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    type: 'bride' as 'bride' | 'groom',
    city: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(data.redirect || '/');
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 grid lg:grid-cols-2">
      <section className="hidden lg:flex relative bg-gradient-to-br from-crimson via-terracotta to-vermilion text-alabaster items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <MandalaSVG size={700} color="#FAF7F2" speed="slow" reverse />
        </div>
        <div className="relative text-center max-w-md">
          <div className="font-italiana text-7xl mb-6">ॐ</div>
          <h1 className="font-display text-4xl leading-tight mb-4">Begin your story</h1>
          <p className="font-serif italic text-lg text-alabaster/85">
            A small step into a curated world. We&apos;ll get to know you before any introduction.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center p-8 lg:p-16 bg-alabaster">
        <div className="w-full max-w-md">
          <Link href="/" className="font-italiana text-2xl text-crimson block mb-8">Marriage Guide</Link>
          <h2 className="font-display text-3xl text-ink mb-2">Create your profile</h2>
          <p className="font-serif italic text-ink-soft mb-8">It takes about ten minutes.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="As it appears on your passport"
            />
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@email.com"
            />
            <Input
              label="Password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Minimum 8 characters"
              hint="At least 8 characters, including a number."
            />
            <Select
              label="I am..."
              value={form.type}
              onChange={(v) => setForm({ ...form, type: v as 'bride' | 'groom' })}
            >
              <option value="bride">A bride looking for a groom</option>
              <option value="groom">A groom looking for a bride</option>
            </Select>
            <Input
              label="Current City"
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Mumbai"
            />

            <p className="text-xs font-serif text-ink-mute italic">
              By creating an account, you agree to our Terms and Privacy Policy.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-br from-crimson to-vermilion text-alabaster font-cinzel text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm font-serif text-ink-soft">
            Already with us?{' '}
            <Link href="/login" className="text-crimson hover:text-vermilion italic">
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
