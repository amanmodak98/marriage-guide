import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { MandalaSVG } from '@/components/ui/MandalaSVG';

const STEPS = [
  {
    n: '01',
    title: 'Discovery',
    subtitle: 'A long, unhurried conversation',
    body: 'We meet with you — in person if you are in Mumbai, Bangalore, or Delhi, or via a long video call — to understand who you are, what you value, the texture of the life you are building. We discuss family, vocation, faith, hobbies, deal-makers and deal-breakers. No forms, no checklists.',
    detail: ['60-90 minute conversation', 'Cover family history and hopes', 'Identify deal-makers and quiet deal-breakers', 'Discuss pace and approach'],
  },
  {
    n: '02',
    title: 'Curation',
    subtitle: 'A small, handpicked set',
    body: 'Within 7-10 days, your matchmaker sends you a private dossier of 3-5 profiles, each accompanied by a thoughtful note explaining why they were chosen. You take your time. You tell us who felt right. We listen.',
    detail: ['Personalized notes on each profile', 'Three to five profiles per round', 'Take as long as you need', 'We re-curate based on your feedback'],
  },
  {
    n: '03',
    title: 'Introduction',
    subtitle: 'A guided first step',
    body: 'When both sides express interest, we arrange the first conversation — usually a quiet coffee or a video call. We share small details about each of you to help with the awkward first minutes. We are available throughout for counsel and follow-up.',
    detail: ['We coordinate the first meeting', 'Small notes to ease introductions', 'Available for counsel anytime', 'Family intros when ready'],
  },
  {
    n: '04',
    title: 'Celebration',
    subtitle: 'A wedding, our joy',
    body: 'When two of our matches find each other, we celebrate alongside them. From engagement to sangeet to mandap, our team remains a quiet presence — checking in, sharing joy, occasionally connecting you with trusted wedding vendors.',
    detail: ['Engagement celebration guidance', 'Trusted vendor recommendations', 'Ongoing check-ins', 'A small gift at your wedding'],
  },
];

const FAQ = [
  { q: 'How long does the process take?', a: 'On average, our members meet their partner within 4-6 months. Some are quicker, some take longer — we never rush.' },
  { q: 'Is this only for arranged marriages?', a: 'No. We work with people seeking love marriages as well as arranged matches, and everything in between. The thread that connects our members is intentionality.' },
  { q: 'What if I don\'t connect with anyone you introduce?', a: 'We re-curate. Our matchmakers learn from each round and refine the search.' },
  { q: 'Do you work with NRIs?', a: 'Yes — we have members in 14 countries. Most meetings happen over video initially.' },
  { q: 'What\'s the difference between tiers?', a: 'All tiers include our core matchmaking. Higher tiers add more introductions per month, profile boosting, and access to our editorial programming.' },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory to-alabaster" />
        <div className="absolute top-20 left-10 opacity-[0.05]">
          <MandalaSVG size={400} rings={7} petals={12} speed="slow" reverse />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal>
            <FloralOrnament className="mb-6" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">How It Works</span>
            <h1 className="font-display text-5xl md:text-7xl text-ink mt-4 leading-tight">
              Four <span className="font-italiana italic text-crimson">deliberate</span> steps
            </h1>
            <p className="font-serif text-xl text-ink-soft mt-6 italic max-w-2xl mx-auto leading-relaxed">
              Our process is small, slow, and personal. It works because we never pretend to be anything we are not.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto space-y-24">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={((i % 3 + 1) as 1 | 2 | 3)}>
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`space-y-6 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-italiana text-7xl text-gold">{step.n}</span>
                    <div>
                      <h2 className="font-display text-4xl text-ink leading-tight">{step.title}</h2>
                      <p className="font-cinzel text-[10px] tracking-wide-cap text-crimson mt-1">{step.subtitle}</p>
                    </div>
                  </div>
                  <p className="font-serif text-lg text-ink leading-relaxed">{step.body}</p>
                  <ul className="space-y-2 pt-2">
                    {step.detail.map((d) => (
                      <li key={d} className="flex items-start gap-3 font-serif text-ink-soft">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`paper p-3 rounded-sm shadow-polaroid ${i % 2 === 1 ? 'lg:order-1 rotate-[-2deg]' : 'rotate-[2deg]'}`}>
                  <div className="aspect-[4/3] rounded-sm overflow-hidden bg-ivory">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://images.unsplash.com/photo-${['1542596594-649edbc13630', '1519741497674-611481863552', '1511285560929-80b456fea0bc', '1525258946800-98cfd641d0de'][i]}?auto=format&fit=crop&w=800&q=80`}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-gradient-to-b from-alabaster to-ivory">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <FloralOrnament className="mb-4" />
              <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">Common Questions</span>
              <h2 className="font-display text-4xl text-ink mt-3">Frequently asked</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                <details className="paper rounded-xl px-6 py-4 group cursor-pointer border border-crimson/8">
                  <summary className="flex items-center justify-between gap-4 list-none">
                    <span className="font-display text-lg text-ink">{f.q}</span>
                    <span className="w-7 h-7 rounded-full bg-crimson/10 flex items-center justify-center text-crimson transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="font-serif text-ink-soft mt-4 italic">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              Ready to begin?
            </h2>
            <p className="font-serif text-lg text-ink-soft mt-4 italic">
              Your first conversation is on us.
            </p>
            <Link
              href="/membership"
              className="inline-flex items-center px-8 py-4 mt-8 rounded-full bg-gradient-to-br from-crimson via-terracotta to-vermilion text-alabaster font-cinzel text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press"
            >
              Explore Membership
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
