import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';
import { RoyalSeal } from '@/components/ui/mughal/RoyalSeal';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';

const PLANS = [
  {
    name: 'Soul',
    tagline: 'Begin your search',
    price: 'Free',
    period: 'forever',
    features: [
      'Create your profile',
      'Receive up to 3 introductions per month',
      'Access to journal & editorial',
      'Email support',
    ],
    cta: 'Get Started',
    highlight: false,
    seal: 'GENUINE',
  },
  {
    name: 'Heart',
    tagline: 'Most chosen',
    price: '₹4,999',
    period: 'per month',
    features: [
      'Everything in Soul',
      'Up to 8 introductions per month',
      'Profile review & writing by our team',
      'Priority matchmaking hours',
      'Profile boost in member directory',
      'Wedding planning consultation',
    ],
    cta: 'Begin Heart',
    highlight: true,
    seal: 'ROYAL',
  },
  {
    name: 'Crown',
    tagline: 'For the serious searcher',
    price: '₹14,999',
    period: 'for 3 months',
    features: [
      'Everything in Heart',
      'Unlimited introductions',
      'Dedicated senior matchmaker',
      'Family meeting facilitation',
      'Background & reference verification',
      'Concierge wedding vendor access',
      'A royal wedding gift from us',
    ],
    cta: 'Begin Crown',
    highlight: false,
    seal: 'SOVEREIGN',
  },
];

const COMPARE = [
  ['Monthly introductions', '3', '8', 'Unlimited'],
  ['Profile writing', '—', '✓', '✓'],
  ['Profile boost', '—', '✓', '✓'],
  ['Senior matchmaker', '—', '—', '✓'],
  ['Family facilitation', '—', '—', '✓'],
  ['Background verification', '—', '—', '✓'],
  ['Royal wedding gift', '—', '—', '✓'],
];

export default function MembershipPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 px-6 lg:px-10 overflow-hidden bg-gradient-to-br from-ivory via-alabaster to-ivory">
        {/* Jali overlay */}
        <JaliPattern density="sparse" color="#C9A961" opacity={0.06} className="absolute inset-0" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <FloralOrnament className="mb-6" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">Membership</span>
            <h1 className="font-display text-5xl md:text-7xl text-ink mt-4 leading-tight">
              Three <span className="font-italiana italic text-crimson">thoughtful</span> tiers
            </h1>
            <p className="font-serif text-xl text-ink-soft mt-6 italic max-w-2xl mx-auto leading-relaxed">
              Choose the level of attention that feels right for where you are. You can change tiers anytime.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-20 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={((i % 3 + 1) as 1 | 2 | 3)}>
              <div className="relative h-full">
                {/* Royal seal at top */}
                <div className={`flex justify-center mb-[-40px] relative z-10 ${plan.highlight ? '' : 'opacity-80'}`}>
                  <RoyalSeal text={plan.seal} size={80} ribbon />
                </div>

                <div
                  className={`relative rounded-3xl p-8 pt-12 h-full flex flex-col border-2 ${
                    plan.highlight
                      ? 'bg-gradient-to-br from-crimson via-crimson-deep to-vermilion text-alabaster shadow-polaroid-hover border-gold scale-[1.02]'
                      : 'paper border-gold/30 shadow-polaroid'
                  }`}
                >
                  {/* Ornate gold filigree at top */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 ${plan.highlight ? 'opacity-100' : 'opacity-60'}`}>
                    <svg viewBox="0 0 128 24" className="w-full h-full">
                      <path d="M 0 24 Q 64 -8 128 24 Z" fill={plan.highlight ? '#C9A961' : '#C9A961'} fillOpacity="0.3" />
                      <path d="M 0 24 Q 64 -8 128 24" stroke={plan.highlight ? '#E8C77C' : '#C9A961'} strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>

                  <div className={`font-cinzel text-[10px] tracking-wide-cap mb-2 tracking-mughal ${plan.highlight ? 'text-gold' : 'text-gold-dark'}`}>
                    {plan.name}
                  </div>
                  <h3 className={`font-italiana text-4xl mb-1 ${plan.highlight ? 'text-alabaster' : 'text-ink'}`}>
                    {plan.price}
                  </h3>
                  <p className={`text-sm italic mb-4 ${plan.highlight ? 'text-alabaster/85' : 'text-ink-mute'}`}>
                    {plan.period}
                  </p>
                  <p className={`font-serif text-sm mb-6 italic ${plan.highlight ? 'text-alabaster/85' : 'text-ink-soft'}`}>
                    {plan.tagline}
                  </p>

                  {/* Decorative divider */}
                  <div className={`flex items-center justify-center gap-2 mb-6 ${plan.highlight ? 'opacity-90' : 'opacity-60'}`}>
                    <span className="w-8 h-px bg-current" style={{ color: plan.highlight ? '#E8C77C' : '#C9A961' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-current" style={{ color: plan.highlight ? '#E8C77C' : '#C9A961' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-current" style={{ color: plan.highlight ? '#E8C77C' : '#C9A961' }} />
                    <span className="w-8 h-px bg-current" style={{ color: plan.highlight ? '#E8C77C' : '#C9A961' }} />
                  </div>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-start gap-3 text-sm font-serif ${plan.highlight ? 'text-alabaster' : 'text-ink'}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${plan.highlight ? 'bg-gold/30 text-gold border-gold/50' : 'bg-gold/10 text-gold-dark border-gold/30'}`}>
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/register"
                    className={`mt-8 text-center py-3 rounded-full font-cinzel text-[10px] tracking-wide-cap transition-all press tracking-mughal ${
                      plan.highlight
                        ? 'bg-alabaster text-crimson hover:bg-gold-bright hover:text-ink border-2 border-gold'
                        : 'border-2 border-crimson text-crimson hover:bg-crimson hover:text-alabaster'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-ivory relative overflow-hidden">
        <JaliPattern density="sparse" color="#C9A961" opacity={0.04} className="absolute inset-0" />
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">Compare</span>
              <h2 className="font-display text-3xl md:text-4xl text-ink mt-2">Side by side</h2>
            </div>
          </Reveal>
          <div className="paper rounded-2xl overflow-hidden border-2 border-gold/30">
            <div className="p-1">
              <PietraDuraBand variant="dotted" className="rounded-t-xl" />
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-crimson/10 via-gold/10 to-crimson/10 border-b-2 border-gold/30">
                  <th className="text-left px-6 py-4 font-cinzel text-[10px] tracking-wide-cap text-ink-soft tracking-mughal">Feature</th>
                  <th className="px-6 py-4 font-display text-base text-ink">Soul</th>
                  <th className="px-6 py-4 font-display text-base text-crimson">
                    Heart
                    <div className="text-[8px] font-cinzel text-gold-dark mt-1 tracking-wide-cap tracking-mughal">RECOMMENDED</div>
                  </th>
                  <th className="px-6 py-4 font-display text-base text-ink">Crown</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} className={`border-b border-gold/10 ${i % 2 === 0 ? 'bg-alabaster' : 'bg-ivory'}`}>
                    <td className="px-6 py-3 font-serif text-ink">{row[0]}</td>
                    <td className="px-6 py-3 font-serif text-center text-ink-mute">{row[1]}</td>
                    <td className="px-6 py-3 font-serif text-center text-crimson font-medium bg-crimson/5">{row[2]}</td>
                    <td className="px-6 py-3 font-serif text-center text-ink-soft">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 text-center relative overflow-hidden bg-gradient-to-b from-alabaster to-ivory">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8">
          <Reveal>
            <div className="relative inline-block">
              <RoyalSeal text="PRIVATE" size={100} />
              <div className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute mt-3 tracking-mughal">Private & Discreet</div>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="relative inline-block">
              <RoyalSeal text="14 DAYS" size={100} />
              <div className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute mt-3 tracking-mughal">Money-back Guarantee</div>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <div className="relative inline-block">
              <RoyalSeal text="EST 2014" size={100} />
              <div className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute mt-3 tracking-mughal">Of Quiet Service</div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
