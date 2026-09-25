'use client';
import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { Input, Textarea, Select } from '@/components/ui/Input';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone'),
          subject: form.get('subject'),
          message: form.get('message'),
        }),
      });
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative pt-40 pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory to-alabaster" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <FloralOrnament className="mb-6" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">Get In Touch</span>
            <h1 className="font-display text-5xl md:text-7xl text-ink mt-4 leading-tight">
              We&apos;d love to <span className="font-italiana italic text-crimson">hear</span> from you
            </h1>
            <p className="font-serif text-xl text-ink-soft mt-6 italic max-w-2xl mx-auto leading-relaxed">
              A conversation, a question, a quiet hello — we read every message and reply within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="space-y-6">
              <ContactCard
                icon="✉"
                title="Email"
                lines={['hello@marriageguide.in', 'press@marriageguide.in']}
              />
              <ContactCard
                icon="☎"
                title="Phone"
                lines={['+91 80 4567 8900', 'Mon–Fri · 10am – 7pm IST']}
              />
              <ContactCard
                icon="⌂"
                title="Studio"
                lines={['14, Linking Road, Bandra West', 'Mumbai 400 050']}
              />
              <ContactCard
                icon="✦"
                title="Other Studios"
                lines={['Koramangala, Bangalore', 'Hauz Khas, New Delhi']}
              />

              <div className="paper p-6 rounded-2xl border border-gold/30">
                <div className="font-italiana text-2xl text-crimson mb-2">A small note</div>
                <p className="font-serif text-sm text-ink-soft italic leading-relaxed">
                  If you are reaching out on behalf of a family member, please mention so in the message — we sometimes arrange calls with parents or siblings early in the process.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            {submitted ? (
              <div className="paper p-12 rounded-2xl text-center border border-gold/30 shadow-polaroid">
                <div className="font-italiana text-6xl text-crimson mb-4">✓</div>
                <h3 className="font-display text-2xl text-ink mb-3">Message received</h3>
                <p className="font-serif text-ink-soft italic">
                  Thank you for writing. A member of our team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="paper p-8 rounded-2xl border border-crimson/10 shadow-polaroid space-y-5">
                <Input label="Your Name" name="name" required placeholder="Full name" />
                <Input label="Email" name="email" type="email" required placeholder="you@email.com" />
                <Input label="Phone" name="phone" type="tel" placeholder="+91 ..." />
                <Select label="I'm inquiring as..." name="subject">
                  <option value="myself">Myself</option>
                  <option value="family">A family member</option>
                  <option value="press">Press / Media</option>
                  <option value="vendor">Vendor / Partnership</option>
                  <option value="other">Something else</option>
                </Select>
                <Textarea
                  label="Your Message"
                  name="message"
                  required
                  placeholder="Tell us a little about what you're looking for, or just say hello..."
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-gradient-to-br from-crimson via-terracotta to-vermilion text-alabaster font-cinzel text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon, title, lines }: { icon: string; title: string; lines: string[] }) {
  return (
    <div className="paper p-5 rounded-2xl flex items-start gap-4 border border-crimson/8">
      <div className="w-12 h-12 rounded-full bg-crimson/10 flex items-center justify-center text-crimson text-xl shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-cinzel text-[10px] tracking-wide-cap text-crimson">{title}</div>
        <div className="font-serif text-ink mt-1">
          {lines.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
