'use client';

import Link from 'next/link';
import { ScrollSequenceCanvas } from './ScrollSequenceCanvas';
import { CinematicSection } from './CinematicSection';
import { ScrollProgress } from './ScrollProgress';
import { FrameThumbnailsRail } from './FrameThumbnailsRail';
import { MobileScrollHUD } from './MobileScrollHUD';
import { Logo } from '@/components/Logo';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { GoldText } from '@/components/ui/mughal/GoldText';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';
import { RoyalCartouche } from '@/components/ui/mughal/RoyalCartouche';
import { MandalaSVG } from '@/components/ui/MandalaSVG';
import type { Profile } from '@/lib/types';

const FRAME_COUNT = 300;
const TOTAL_SCROLL = 9000; // px — 30px per frame for smooth playback

// Cinematic micro-scenes — each aligned to specific frame ranges
const KEY_FRAMES = [10, 50, 90, 130, 170, 210, 250, 285];

export function CinematicHome({ profiles }: { profiles: Profile[] }) {
  return (
    <div className="relative bg-ink">
      {/* Sticky scroll-driven canvas — pinned for the full cinematic scroll */}
      <section className="relative h-screen sticky top-0 overflow-hidden">
        {/* Video frame canvas (background) */}
        <ScrollSequenceCanvas
          frameCount={FRAME_COUNT}
          totalScroll={TOTAL_SCROLL}
          crossfade
          className="absolute inset-0"
        />

        {/* Vignette gradient — multi-layer for text legibility */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-ink/65 via-ink/25 to-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/45" />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(43, 24, 16, 0.4) 90%)',
          }} />
        </div>

        {/* Decorative Mughal overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <JaliPattern density="medium" color="#E8C77C" opacity={0.07} className="absolute inset-0" />

          {/* Slow-rotating mandalas in corners — hidden on small mobile */}
          <div className="hidden sm:block absolute top-10 left-10 opacity-10">
            <MandalaSVG size={180} rings={5} petals={8} speed="slow" />
          </div>
          <div className="hidden sm:block absolute bottom-10 right-10 opacity-10">
            <MandalaSVG size={160} rings={5} petals={10} speed="slow" reverse />
          </div>

          {/* Tiny twinkling gold dots */}
          <div className="absolute inset-0">
            {[
              { x: '12%', y: '20%', delay: 0 },
              { x: '88%', y: '15%', delay: 1.2 },
              { x: '8%', y: '70%', delay: 0.6 },
              { x: '92%', y: '60%', delay: 2.0 },
            ].map((d, i) => (
              <span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-gold-bright animate-pulse"
                style={{
                  left: d.x,
                  top: d.y,
                  boxShadow: '0 0 8px #E8C77C',
                  animationDelay: `${d.delay}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ═════ ACT 1 — DISTANT (frames 0–24) ═════ */}
        <CinematicSection range={[0, 0.10]} align="center" totalScroll={TOTAL_SCROLL}>
          <div className="flex flex-col items-center gap-4 sm:gap-8">
            <div className="animate-slide-reveal scale-75 sm:scale-100">
              <Logo size="lg" showText={false} variant="light" className="drop-shadow-[0_8px_40px_rgba(232,199,124,0.4)]" />
            </div>
            <div className="max-w-md text-center px-2">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-alabaster/10 backdrop-blur border border-gold/40 mb-4 sm:mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-radial-pulse absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion" />
                </span>
                <span className="font-cinzel text-[9px] sm:text-[10px] tracking-wide-cap text-gold-bright tracking-mughal">
                  Royal Atelier · Est. 2014
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-alabaster leading-[1.05] drop-shadow-2xl">
                Where Hearts Are{' '}
                <GoldText as="span" className="font-italiana italic">
                  handcrafted
                </GoldText>{' '}
                together
              </h1>
              <p className="font-serif text-base sm:text-lg text-ivory/85 italic mt-4 sm:mt-6 max-w-xl mx-auto leading-relaxed drop-shadow-md">
                A small, deliberate matrimonial atelier for thoughtful people.
              </p>
              <Link
                href="/register"
                className="group inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 mt-6 sm:mt-8 rounded-full bg-gradient-to-br from-crimson via-crimson-deep to-vermilion text-alabaster font-cinzel text-[10px] sm:text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press border-2 border-gold/40 tracking-mughal"
              >
                Begin Your Journey
                <svg className="ml-2 w-3 sm:w-4 h-3 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </CinematicSection>

        {/* ═════ ACT 2 — APPROACH (frames 25–80) ═════ */}
        <CinematicSection range={[0.10, 0.27]} align="center" totalScroll={TOTAL_SCROLL}>
          <div className="text-center px-4">
            <div className="font-cinzel text-[9px] sm:text-[10px] tracking-wide-cap text-gold-bright tracking-mughal mb-2 sm:mb-3 drop-shadow-md">
              A Decade of Quiet Work
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-alabaster leading-tight drop-shadow-2xl mb-4 sm:mb-6">
              <GoldText as="span" className="font-italiana italic">680</GoldText>{' '}
              couples found their{' '}
              <GoldText as="span" className="font-italiana italic">forever</GoldText>
            </h2>
            <div className="max-w-md sm:max-w-2xl mx-auto mb-6 sm:mb-8">
              <PietraDuraBand variant="dotted" />
            </div>
            {/* 1 col mobile, 2 col tablet, 4 col desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              <CinematicStat end={680} suffix="+" label="Marriages" />
              <CinematicStat end={2400} suffix="+" label="Matches" />
              <CinematicStat end={42} label="Cities" />
              <CinematicStat end={11} suffix=" yrs" label="Service" />
            </div>
          </div>
        </CinematicSection>

        {/* ═════ ACT 3 — MEET (frames 80–130) ═════ */}
        <CinematicSection range={[0.27, 0.43]} align="center" totalScroll={TOTAL_SCROLL}>
          <div className="text-center max-w-3xl px-4">
            <div className="font-cinzel text-[9px] sm:text-[10px] tracking-wide-cap text-gold-bright tracking-mughal mb-2 sm:mb-3 drop-shadow-md">
              The Process · Four Deliberate Steps
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-alabaster leading-tight drop-shadow-2xl mb-4 sm:mb-6">
              We believe in{' '}
              <GoldText as="span" className="font-italiana italic">people</GoldText>,
              <br className="hidden sm:block" />
              conversation, and{' '}
              <GoldText as="span" className="font-italiana italic">care</GoldText>
            </h2>
            <p className="font-serif text-base sm:text-lg text-ivory/90 italic leading-relaxed drop-shadow-md mb-6 sm:mb-8">
              Every introduction is the result of patient curation.
            </p>
            {/* Steps wrap to 2-col on mobile, 4-col on desktop */}
            <div className="grid grid-cols-2 sm:flex sm:justify-center gap-4 sm:gap-6 md:gap-10 max-w-md sm:max-w-none mx-auto">
              {[
                { n: '01', label: 'Discovery' },
                { n: '02', label: 'Curation' },
                { n: '03', label: 'Introduction' },
                { n: '04', label: 'Celebration' },
              ].map((step) => (
                <div key={step.n} className="flex flex-col items-center gap-2">
                  <RoyalCartouche size="md">{step.n}</RoyalCartouche>
                  <span className="font-cinzel text-[9px] sm:text-[9px] tracking-wide-cap text-gold-bright tracking-mughal drop-shadow-md">{step.label}</span>
                </div>
              ))}
            </div>
            <Link href="/how-it-works" className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-wide-cap text-gold-bright hover:text-alabaster tracking-mughal mt-6 sm:mt-8">
              Read the full process
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </CinematicSection>

        {/* ═════ ACT 4 — FIRST GLANCE (frames 130–170) ═════ */}
        <CinematicSection range={[0.43, 0.57]} align="center" totalScroll={TOTAL_SCROLL}>
          <div className="text-center max-w-5xl px-4">
            <div className="font-cinzel text-[9px] sm:text-[10px] tracking-wide-cap text-gold-bright tracking-mughal mb-2 sm:mb-3 drop-shadow-md">
              Featured This Month
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-alabaster leading-tight drop-shadow-2xl mb-6 sm:mb-8">
              Handpicked{' '}
              <GoldText as="span" className="font-italiana italic">hearts</GoldText>
            </h2>
            {/* 2 col mobile (smaller), 4 col desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {profiles.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  href={`/profile/${p.slug}`}
                  className="group relative overflow-hidden rounded-sm border-2 border-gold/40 shadow-polaroid backdrop-blur"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-ink/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.photos[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-2 sm:p-3">
                    <div className="font-display text-xs sm:text-sm text-alabaster truncate">{p.name}</div>
                    <div className="font-cinzel text-[7px] sm:text-[8px] tracking-wide-cap text-gold-bright tracking-mughal truncate">
                      {p.type === 'bride' ? 'BRIDE' : 'GROOM'} · {p.location.city}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/brides" className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-wide-cap text-gold-bright hover:text-alabaster tracking-mughal mt-6 sm:mt-8">
              View all profiles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </CinematicSection>

        {/* ═════ ACT 5 — TOUCH (frames 170–215) ═════ */}
        <CinematicSection range={[0.57, 0.72]} align="center" totalScroll={TOTAL_SCROLL}>
          <div className="text-center max-w-4xl px-4">
            <div className="font-cinzel text-[9px] sm:text-[10px] tracking-wide-cap text-gold-bright tracking-mughal mb-2 sm:mb-3 drop-shadow-md">
              In Their Words
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl text-alabaster leading-tight drop-shadow-2xl mb-4 sm:mb-6 italic font-italiana">
              &ldquo;Marriage Guide felt less like a service
              <br className="hidden sm:block" />
              and more like a letter from a wise old friend.&rdquo;
            </h2>
            <div className="max-w-xs mx-auto mb-4 sm:mb-6">
              <PietraDuraBand variant="dotted" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden border-2 border-gold">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="font-display text-xs sm:text-sm text-alabaster">Riya & Vivaan</div>
                  <div className="font-cinzel text-[7px] sm:text-[8px] tracking-wide-cap text-gold-bright tracking-mughal">MARRIED 2025</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden border-2 border-gold">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=80&q=80" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="font-display text-xs sm:text-sm text-alabaster">Ananya & Reyansh</div>
                  <div className="font-cinzel text-[7px] sm:text-[8px] tracking-wide-cap text-gold-bright tracking-mughal">MARRIED 2025</div>
                </div>
              </div>
            </div>
            <Link href="/success-stories" className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-wide-cap text-gold-bright hover:text-alabaster tracking-mughal mt-6 sm:mt-8">
              Read more stories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </CinematicSection>

        {/* ═════ ACT 6 — EMBRACE (frames 215–260) ═════ */}
        <CinematicSection range={[0.72, 0.87]} align="center" totalScroll={TOTAL_SCROLL}>
          <div className="text-center max-w-3xl px-4">
            <div className="font-cinzel text-[9px] sm:text-[10px] tracking-wide-cap text-gold-bright tracking-mughal mb-2 sm:mb-3 drop-shadow-md">
              Membership · Three Thoughtful Tiers
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-alabaster leading-tight drop-shadow-2xl mb-4 sm:mb-6">
              Three{' '}
              <GoldText as="span" className="font-italiana italic">thoughtful</GoldText>{' '}
              tiers
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <TierPill name="Soul" price="Free" />
              <TierPill name="Heart" price="₹4,999" highlight />
              <TierPill name="Crown" price="₹14,999" />
            </div>
            <Link
              href="/membership"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-br from-crimson via-crimson-deep to-vermilion text-alabaster font-cinzel text-[10px] sm:text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press border-2 border-gold/40 tracking-mughal"
            >
              Explore Membership
              <svg className="ml-2 w-3 sm:w-4 h-3 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </CinematicSection>

        {/* ═════ ACT 7 — TOGETHER (frames 260–300) ═════ */}
        <CinematicSection range={[0.87, 1.0]} align="center" totalScroll={TOTAL_SCROLL}>
          <div className="text-center max-w-3xl px-4">
            <div className="font-italiana text-5xl sm:text-7xl text-gold-bright mb-2 sm:mb-4 drop-shadow-lg">ॐ</div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-alabaster leading-tight drop-shadow-2xl mb-4 sm:mb-6">
              Begin with a single{' '}
              <GoldText as="span" className="font-italiana italic">conversation</GoldText>
            </h2>
            <p className="font-serif text-base sm:text-lg md:text-xl text-ivory/90 italic max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8">
              No pressure, no commitment. Just a warm, honest conversation.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-alabaster text-crimson font-cinzel text-[10px] sm:text-xs tracking-wide-cap shadow-polaroid hover:shadow-polaroid-hover press transition-all border-2 border-gold/60 tracking-mughal"
            >
              Begin Your Journey
              <svg className="ml-2 w-3 sm:w-4 h-3 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="mt-6 sm:mt-8">
              <Link href="/contact" className="font-serif italic text-ivory/70 hover:text-gold-bright text-xs sm:text-sm">
                hello@marriageguide.in
              </Link>
            </div>
          </div>
        </CinematicSection>

        {/* Desktop-only HUDs (right side / left side rails) */}
        <ScrollProgress frameCount={FRAME_COUNT} totalScroll={TOTAL_SCROLL} />
        <FrameThumbnailsRail
          frameCount={FRAME_COUNT}
          totalScroll={TOTAL_SCROLL}
          keyFrames={KEY_FRAMES}
        />

        {/* Mobile-only bottom HUD */}
        <MobileScrollHUD frameCount={FRAME_COUNT} totalScroll={TOTAL_SCROLL} keyFrames={KEY_FRAMES} />

        {/* Bottom scroll cue (visible on all sizes) */}
        <div className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-alabaster/80 pointer-events-none">
          <span className="font-cinzel text-[9px] tracking-wide-cap tracking-mughal">SCROLL</span>
          <div className="relative w-5 h-8 rounded-full border border-gold-bright/60 flex items-start justify-center p-1">
            <span className="w-1 h-1.5 rounded-full bg-gold-bright animate-smooth-bounce" />
          </div>
        </div>
      </section>

      {/* Scroll spacer */}
      <div style={{ height: `${TOTAL_SCROLL}px` }} aria-hidden="true" />

      {/* End-of-cinematic section */}
      <section className="relative py-20 sm:py-32 px-6 bg-gradient-to-br from-crimson-deep via-ink to-ink text-alabaster overflow-hidden">
        <JaliPattern density="medium" color="#E8C77C" opacity={0.06} className="absolute inset-0" />
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="font-italiana text-5xl text-gold-bright mb-4 drop-shadow-lg">✦</div>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-alabaster leading-tight mb-6">
            Every story begins the same way —
            <br className="hidden sm:block" />
            <span className="font-italiana italic text-gold-bright">two people, one conversation,</span>
            <br className="hidden sm:block" />
            a future handcrafted together.
          </h3>
          <p className="font-serif italic text-ivory/80 max-w-xl mx-auto">Continue exploring the atelier below.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12">
            <Link href="/brides" className="font-cinzel text-[10px] tracking-wide-cap text-gold-bright hover:text-alabaster border border-gold/40 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full tracking-mughal">
              Browse Brides
            </Link>
            <Link href="/grooms" className="font-cinzel text-[10px] tracking-wide-cap text-gold-bright hover:text-alabaster border border-gold/40 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full tracking-mughal">
              Browse Grooms
            </Link>
            <Link href="/journal" className="font-cinzel text-[10px] tracking-wide-cap text-gold-bright hover:text-alabaster border border-gold/40 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full tracking-mughal">
              Read the Journal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CinematicStat({ end, suffix, label }: { end: number; suffix?: string; label: string }) {
  return (
    <div className="text-center bg-alabaster/10 backdrop-blur rounded-2xl border-2 border-gold/30 p-4 sm:p-5 shadow-polaroid">
      <div className="font-italiana text-3xl sm:text-4xl md:text-5xl text-gold-bright leading-none drop-shadow-lg">
        <AnimatedCounter end={end} suffix={suffix} />
      </div>
      <div className="font-cinzel text-[9px] tracking-wide-cap text-alabaster mt-2 tracking-mughal">
        {label}
      </div>
    </div>
  );
}

function TierPill({ name, price, highlight }: { name: string; price: string; highlight?: boolean }) {
  return (
    <div className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur border-2 ${
      highlight
        ? 'bg-gradient-to-br from-crimson via-crimson-deep to-vermilion border-gold shadow-polaroid text-alabaster'
        : 'bg-alabaster/10 border-gold/40 text-alabaster'
    }`}>
      <span className="font-cinzel text-[9px] sm:text-[10px] tracking-wide-cap tracking-mughal mr-1.5 sm:mr-2">{name}</span>
      <span className="font-italiana text-xs sm:text-sm">{price}</span>
    </div>
  );
}
