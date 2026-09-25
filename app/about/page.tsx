import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { MandalaSVG } from '@/components/ui/MandalaSVG';
import { CinematicPageHeader } from '@/components/cinematic/CinematicPageHeader';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { GoldText } from '@/components/ui/mughal/GoldText';
import { Logo } from '@/components/Logo';

const VALUES = [
  { title: 'Tradition', body: 'We honor the cultural fabric of Indian matchmaking — community, family, ritual — without romanticizing its past or denying its present.' },
  { title: 'Authenticity', body: 'Every profile is real, every conversation is with a real human, every introduction is made with care. No algorithms, no shortcuts.' },
  { title: 'Craft', body: 'Matchmaking is a craft. Like weaving or pottery, it requires patience, attention to detail, and a refusal to settle for mass production.' },
  { title: 'Privacy', body: 'Your story is yours. We share only with intention, only with consent, only after a careful conversation.' },
];

const TEAM = [
  { name: 'Aanya Sharma', role: 'Founder & Lead Matchmaker', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { name: 'Rohan Iyer', role: 'Senior Matchmaker', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Priya Nair', role: 'Member Experience', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
  { name: 'Vivaan Mehta', role: 'Editorial Director', img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=80' },
];

export default function AboutPage() {
  return (
    <>
      {/* Cinematic single-frame hero with logo + title overlay */}
      <CinematicPageHeader frameIndex={145} height="h-[70vh] min-h-[560px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <Logo size="md" showText={false} variant="light" className="mb-8 drop-shadow-[0_4px_24px_rgba(232,199,124,0.5)]" />
          <Reveal>
            <FloralOrnament color="#C9A961" className="mb-4" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-bright tracking-mughal">Our Story</span>
          </Reveal>
          <Reveal delay={2}>
            <h1 className="font-display text-5xl md:text-7xl text-alabaster mt-3 leading-tight max-w-4xl drop-shadow-2xl">
              A small atelier,{' '}
              <GoldText as="span" className="font-italiana italic">deliberately</GoldText> so
            </h1>
          </Reveal>
          <Reveal delay={3}>
            <p className="font-serif text-lg md:text-xl text-ivory/85 italic mt-6 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Marriage Guide began in a small Bombay flat in 2014, with a leather notebook and a list of friends' friends. Eleven years and 680 weddings later, we remain small by choice.
            </p>
          </Reveal>
        </div>
      </CinematicPageHeader>

      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="paper p-3 rounded-sm shadow-polaroid rotate-[-2deg] relative">
              <svg className="absolute top-1 left-1 w-6 h-6 opacity-60" viewBox="0 0 24 24">
                <path d="M 0 0 L 16 0 Q 0 0 0 16 Z" fill="#C9A961" />
                <circle cx="3" cy="3" r="1.2" fill="#E8C77C" />
              </svg>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                alt="Aanya, founder"
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
            </div>
          </Reveal>
          <Reveal delay={2}>
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">A Note From The Founder</span>
            <h2 className="font-display text-3xl md:text-4xl text-ink mt-3 leading-tight">
              We started this because the alternatives felt <GoldText as="span" className="font-italiana italic">lonely</GoldText>.
            </h2>
            <div className="font-serif text-lg text-ink leading-relaxed mt-6 space-y-4 italic">
              <p>
                When my sister was looking for a partner, the choices felt either industrial — endless swiping, no human warmth — or transactional — biodata exchanges with no conversation.
              </p>
              <p>
                I thought there had to be a third way. A small studio that treated each person as a story, not a profile. A place where matchmakers were readers, listeners, sometimes counselors. A place that was patient, and small, and proud of it.
              </p>
              <p className="font-display not-italic text-crimson">
                — Aanya Sharma, Founder
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-gradient-to-b from-alabaster to-ivory relative">
        <JaliPattern density="medium" color="#C9A961" opacity={0.04} className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <FloralOrnament className="mb-4" />
              <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">Our Values</span>
              <h2 className="font-display text-4xl md:text-5xl text-ink mt-3">Four small commitments</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                <div className="paper p-6 rounded-2xl h-full border-2 border-gold/20 shadow-polaroid relative overflow-hidden">
                  <svg className="absolute top-1 right-1 w-4 h-4 opacity-50" viewBox="0 0 20 20">
                    <path d="M 20 0 L 8 0 Q 20 0 20 12 Z" fill="#C9A961" />
                  </svg>
                  <div className="font-italiana text-4xl text-crimson mb-3">{`0${i + 1}`}</div>
                  <h3 className="font-display text-xl text-ink mb-2">{v.title}</h3>
                  <p className="font-serif text-ink-soft leading-relaxed">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <FloralOrnament className="mb-4" />
              <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark tracking-mughal">The Atelier</span>
              <h2 className="font-display text-4xl md:text-5xl text-ink mt-3">A team of four</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                <div className="text-center group">
                  <div className="paper p-2 rounded-sm shadow-polaroid group-hover:shadow-polaroid-hover transition-shadow mb-4 relative overflow-hidden">
                    <svg className="absolute top-1 left-1 w-4 h-4 opacity-60 z-10" viewBox="0 0 20 20">
                      <path d="M 0 0 L 10 0 Q 0 0 0 10 Z" fill="#C9A961" />
                    </svg>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.img} alt={m.name} className="w-full aspect-square object-cover rounded-sm" />
                  </div>
                  <h4 className="font-display text-lg text-ink">{m.name}</h4>
                  <p className="font-cinzel text-[9px] tracking-wide-cap text-crimson mt-1 tracking-mughal">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* End section with another cinematic frame */}
      <CinematicPageHeader frameIndex={260} height="h-[40vh] min-h-[300px]">
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <div className="font-italiana text-5xl text-gold-bright mb-3 drop-shadow-lg">ॐ</div>
            <p className="font-display text-3xl md:text-4xl text-alabaster italic drop-shadow-2xl">
              Two people, one conversation, one forever.
            </p>
          </div>
        </div>
      </CinematicPageHeader>
    </>
  );
}
