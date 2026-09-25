'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MandalaSVG } from '@/components/ui/MandalaSVG';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { ArabesqueDivider } from '@/components/ui/mughal/ArabesqueDivider';
import { LotusMotif } from '@/components/ui/mughal/LotusMotif';
import { FloatingPetals } from '@/components/ui/mughal/FloatingPetals';
import { RoyalSeal } from '@/components/ui/mughal/RoyalSeal';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const heartCenterRef = useRef<HTMLDivElement>(null);
  const layerBackRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerFrontRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const chhatriRef = useRef<HTMLDivElement>(null);

  // Mouse parallax + scroll-based interactivity
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let frame = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const normScroll = Math.min(1, scrollY / 700);

      // Heart: counter-rotates with scroll + mouse parallax
      if (heartCenterRef.current) {
        const rotZ = normScroll * 1080;
        const rotX = mouseY * -10;
        const rotY = mouseX * 14;
        const scale = 1 - normScroll * 0.35;
        heartCenterRef.current.style.transform = `
          translate3d(${mouseX * 12}px, ${mouseY * 8}px, 0)
          rotateX(${rotX}deg) rotateY(${rotY + rotZ}deg) rotateZ(${rotZ * 0.15}deg)
          scale(${scale})
        `;
        if (heartCenterRef.current.parentElement) {
          heartCenterRef.current.parentElement.style.opacity = `${1 - normScroll * 0.6}`;
        }
      }

      // Background layers
      if (layerBackRef.current) {
        layerBackRef.current.style.transform = `translate3d(${mouseX * -20}px, ${mouseY * -12 + scrollY * 0.15}px, 0)`;
      }
      if (layerMidRef.current) {
        layerMidRef.current.style.transform = `translate3d(${mouseX * -10}px, ${mouseY * -6 + scrollY * 0.25}px, 0)`;
      }
      if (layerFrontRef.current) {
        layerFrontRef.current.style.transform = `translate3d(${mouseX * -4}px, ${scrollY * 0.4}px, 0)`;
      }

      // Text
      if (textLayerRef.current) {
        textLayerRef.current.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
        textLayerRef.current.style.opacity = `${1 - normScroll * 1.2}`;
      }

      // Chhatri arch: parallax + unfold on scroll
      if (chhatriRef.current) {
        chhatriRef.current.style.transform = `translate3d(${mouseX * -8}px, ${mouseY * -4 + scrollY * 0.2}px, 0)`;
      }

      // Light rays
      if (lightRef.current) {
        lightRef.current.style.opacity = `${0.4 + normScroll * 0.4}`;
        lightRef.current.style.transform = `rotate(${normScroll * 90}deg) scale(${1 + normScroll * 0.3})`;
      }
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    tick();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-32 pb-12">
      {/* ═══════ Layer 1: Deep background ═══════ */}
      <div ref={layerBackRef} className="absolute inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-alabaster via-ivory to-parchment" />

        {/* Radial light */}
        <div ref={lightRef} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-40">
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle, rgba(232, 146, 124, 0.3) 0%, rgba(199, 81, 70, 0.12) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }} />
        </div>

        {/* Decorative mandalas */}
        <div className="absolute -top-32 -right-40 opacity-[0.08]">
          <MandalaSVG size={900} rings={9} petals={18} speed="slow" />
        </div>
        <div className="absolute -bottom-40 -left-40 opacity-[0.06]">
          <MandalaSVG size={800} rings={7} petals={14} speed="slow" reverse />
        </div>

        {/* Jali pattern overlay — Mughal lattice */}
        <JaliPattern density="medium" color="#C9A961" opacity={0.06} className="absolute inset-0" />

        {/* Massive lotus watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
          <LotusMotif size={900} variant="eightfold" />
        </div>

        {/* Diagonal weave */}
        <div className="absolute inset-0 diag-pattern opacity-25" />
      </div>

      {/* ═══════ Layer 2: Light shafts & arabesque decor ═══════ */}
      <div ref={layerMidRef} className="absolute inset-0 pointer-events-none" style={{ willChange: 'transform' }}>
        <div className="absolute top-0 left-1/4 w-px h-96 bg-gradient-to-b from-gold/40 via-gold/10 to-transparent rotate-[8deg] origin-top" />
        <div className="absolute top-0 right-1/3 w-px h-[500px] bg-gradient-to-b from-rose/30 via-rose/5 to-transparent -rotate-[6deg] origin-top" />
        <div className="absolute top-0 left-2/3 w-px h-80 bg-gradient-to-b from-gold/30 to-transparent rotate-[12deg] origin-top hidden md:block" />

        {/* Gold dotted arc */}
        <svg className="absolute top-20 right-10 opacity-30 hidden lg:block" width="200" height="200" viewBox="0 0 200 200">
          <path
            d="M 20 180 Q 100 -20 180 180"
            stroke="#C9A961"
            strokeWidth="1"
            strokeDasharray="3 5"
            fill="none"
          />
          {Array.from({ length: 12 }).map((_, i) => {
            const t = i / 12;
            const x = 20 + 160 * t;
            const y = 180 - 200 * 4 * t * (1 - t);
            return <circle key={i} cx={x} cy={y} r="1.5" fill="#C9A961" />;
          })}
        </svg>
      </div>

      {/* ═══════ Floating lotus petals across entire hero ═══════ */}
      <FloatingPetals count={16} color="#C9A961" className="z-[2]" />

      {/* ═══════ Floating polaroid cards ═══════ */}
      <div ref={layerFrontRef} className="absolute inset-0 pointer-events-none hidden lg:block z-[3]" style={{ willChange: 'transform' }}>
        <FloatingCard
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
          className="absolute top-28 left-[5%] w-44 rotate-[-8deg] animate-float"
          caption="Aanya · Mumbai"
        />
        <FloatingCard
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
          className="absolute top-44 right-[6%] w-44 rotate-[7deg] animate-float-slow"
          caption="Arjun · Mumbai"
        />
        <FloatingCard
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
          className="absolute bottom-40 left-[10%] w-40 rotate-[5deg] animate-float"
          caption="Priya · Bangalore"
        />
        <FloatingCard
          src="https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=80"
          className="absolute bottom-32 right-[8%] w-44 rotate-[-6deg] animate-float-slow"
          caption="Aditya · Hyderabad"
        />
      </div>

      {/* ═══════ Layer 4: Center heart inside Chhatri arch ═══════ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[4]">
        <div ref={chhatriRef} className="relative" style={{ width: 720, height: 720, willChange: 'transform' }}>
          {/* Chhatri arch silhouette behind heart */}
          <svg
            viewBox="0 0 720 720"
            className="absolute inset-0 w-full h-full opacity-25"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="chhatriGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8C77C" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#C9A961" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8B6F3A" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Multi-foiled arch */}
            <path
              d="M 80 700 L 80 380
                 C 80 320, 120 240, 160 180
                 C 200 120, 240 80, 280 60
                 C 320 40, 340 60, 360 80
                 C 380 60, 400 40, 440 60
                 C 480 80, 520 120, 560 180
                 C 600 240, 640 320, 640 380
                 L 640 700 Z"
              fill="none"
              stroke="url(#chhatriGrad)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            {/* Inner filigree */}
            <path
              d="M 130 700 L 130 380
                 C 130 320, 160 270, 200 220
                 C 240 170, 280 140, 320 120
                 C 340 110, 360 120, 360 140
                 C 360 120, 380 110, 400 120
                 C 440 140, 480 170, 520 220
                 C 560 270, 590 320, 590 380
                 L 590 700"
              fill="none"
              stroke="#C9A961"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            {/* Top finial */}
            <g transform="translate(360 40)">
              <circle r="6" fill="#C9A961" />
              <circle r="12" fill="none" stroke="#C9A961" strokeWidth="0.8" />
              <circle r="18" fill="none" stroke="#C9A961" strokeWidth="0.6" strokeOpacity="0.5" />
              <line x1="0" y1="-18" x2="0" y2="-32" stroke="#C9A961" strokeWidth="1.5" />
              <circle cy="-36" r="4" fill="#E8C77C" />
            </g>
            {/* Corner paisleys */}
            <g opacity="0.5">
              <circle cx="80" cy="700" r="3" fill="#C9A961" />
              <circle cx="640" cy="700" r="3" fill="#C9A961" />
              <circle cx="360" cy="700" r="3" fill="#C9A961" />
            </g>
          </svg>

          {/* Orbit rings */}
          <div className="absolute inset-0 rounded-full border border-gold/15 animate-float-rotate" style={{ animationDuration: '60s' }} />
          <div className="absolute inset-12 rounded-full border border-gold/10 animate-float-rotate" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
          <div className="absolute inset-24 rounded-full border border-crimson/10 animate-float-rotate" style={{ animationDuration: '80s' }} />

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-float-rotate" style={{ animationDuration: '30s' }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <span
                key={`orbit-a-${i}`}
                className="absolute w-2 h-2 rounded-full bg-gold"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${deg}deg) translateX(${360}px) translateY(-4px)`,
                  boxShadow: '0 0 14px #C9A961',
                }}
              />
            ))}
          </div>

          {/* Center heart */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform', transition: 'transform 0.05s linear' }}
            ref={heartCenterRef}
          >
            <HeartShape size={340} variant="back" offset={-30} />
            <HeartShape size={340} variant="mid" offset={-15} />
            <HeartShape size={340} variant="front" />
            <HeartShape size={340} variant="shine" />
          </div>
        </div>
      </div>

      {/* ═══════ Layer 5: Text on top ═══════ */}
      <div
        ref={textLayerRef}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-8"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Top badge with royal seal */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-alabaster/85 backdrop-blur border border-gold/40 mb-8 shadow-polaroid animate-slide-reveal">
          <span className="relative flex h-2 w-2">
            <span className="animate-radial-pulse absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion" />
          </span>
          <span className="font-cinzel text-[10px] tracking-wide-cap text-crimson">
            Royal Atelier · Est. 2014
          </span>
          <span className="w-px h-3 bg-gold/40" />
          <span className="font-cinzel text-[9px] tracking-wide-cap text-gold-dark tracking-mughal">12 Spots Open</span>
        </div>

        {/* Mega headline with gold-foil accent */}
        <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] text-ink tracking-tight">
          <span className="block animate-slide-reveal" style={{ animationDelay: '0.2s', opacity: 0 }}>
            Where Hearts
          </span>
          <span className="block animate-slide-reveal" style={{ animationDelay: '0.4s', opacity: 0 }}>
            Are{' '}
            <span className="relative inline-block">
              <span
                className="font-italiana italic"
                style={{
                  background: 'linear-gradient(135deg, #E8C77C 0%, #C9A961 35%, #8B6F3A 55%, #C9A961 75%, #E8C77C 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 5s linear infinite',
                  filter: 'drop-shadow(0 2px 4px rgba(43, 24, 16, 0.2))',
                }}
              >
                Handcrafted
              </span>
              <svg
                className="absolute -bottom-3 left-0 w-full"
                height="20"
                viewBox="0 0 400 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M 5 14 Q 100 4 200 12 T 395 10"
                  stroke="#C9A961"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{ animation: 'borderDraw 1.5s ease-out 1s forwards', strokeDasharray: 1000, strokeDashoffset: 1000 }}
                />
              </svg>
            </span>
          </span>
          <span className="block animate-slide-reveal" style={{ animationDelay: '0.6s', opacity: 0 }}>
            Together.
          </span>
        </h1>

        {/* Arabesque divider */}
        <div className="mt-10 mb-8 animate-slide-reveal" style={{ animationDelay: '0.75s', opacity: 0 }}>
          <ArabesqueDivider className="w-80 mx-auto" color="#C9A961" height={50} />
        </div>

        {/* Subtitle */}
        <p
          className="font-serif text-lg md:text-2xl text-ink-soft mt-4 max-w-2xl mx-auto leading-relaxed italic animate-slide-reveal"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          A small, deliberate matrimonial atelier for thoughtful people. Every introduction is curated, every match is intentional, every story is unique.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-slide-reveal"
          style={{ animationDelay: '1s', opacity: 0 }}
        >
          <Link
            href="/register"
            className="group relative inline-flex items-center px-9 py-4 rounded-full bg-gradient-to-br from-crimson via-terracotta to-vermilion text-alabaster font-cinzel text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press overflow-hidden"
          >
            <span className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">Begin Your Handcrafted Journey</span>
            <svg className="relative ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/brides"
            className="group inline-flex items-center px-7 py-4 rounded-full bg-alabaster/85 backdrop-blur border-2 border-gold/50 text-ink font-cinzel text-xs tracking-wide-cap hover:bg-gold hover:text-ink transition-all press"
          >
            <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            Browse 30 Profiles
          </Link>
        </div>

        {/* Stats strip in ornate frame */}
        <div
          className="mt-14 inline-flex items-center gap-4 md:gap-8 px-6 md:px-8 py-4 rounded-full bg-alabaster/80 backdrop-blur border-2 border-gold/30 shadow-polaroid animate-slide-reveal relative"
          style={{ animationDelay: '1.2s', opacity: 0 }}
        >
          {/* Tiny decorative dots */}
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
          <Stat label="Marriages" value="680+" />
          <span className="w-px h-8 bg-gold/30" />
          <Stat label="Handcrafted" value="2,400+" />
          <span className="w-px h-8 bg-gold/30" />
          <Stat label="Cities" value="42" />
          <span className="w-px h-8 bg-gold/30" />
          <Stat label="Years" value="11" />
        </div>
      </div>

      {/* ═══════ Floating UI badges ═══════ */}
      <div className="absolute top-32 right-6 hidden xl:block z-10 pointer-events-none">
        <div className="glass-cream rounded-2xl p-4 shadow-polaroid max-w-[230px] animate-smooth-bounce border-2 border-gold/30" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-radial-pulse absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
            </span>
            <span className="font-cinzel text-[8px] tracking-wide-cap text-emerald">LIVE NOW</span>
          </div>
          <p className="font-serif text-xs text-ink leading-relaxed">
            <strong className="text-crimson">142</strong> members browsing in the royal atelier
          </p>
        </div>
      </div>

      <div className="absolute bottom-40 left-6 hidden xl:block z-10 pointer-events-none">
        <div className="glass-cream rounded-2xl p-4 shadow-polaroid max-w-[250px] animate-smooth-bounce border-2 border-gold/30" style={{ animationDelay: '1.5s' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-cinzel text-[8px] tracking-wide-cap text-gold-dark">JUST NOW</span>
          </div>
          <p className="font-serif text-xs text-ink leading-relaxed">
            <strong className="text-crimson">Riya & Vivaan</strong> just got engaged in Mumbai
          </p>
          <div className="flex -space-x-1.5 mt-2">
            {['1494790108377-be9c29b29330', '1500648767791-00dcc994a43e'].map((id) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={id}
                src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=80&q=80`}
                alt=""
                className="w-7 h-7 rounded-full border-2 border-alabaster object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Royal seal watermark */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[6] hidden md:block opacity-30 pointer-events-none">
        <RoyalSeal text="MARRIAGE GUIDE" size={80} />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute">SCROLL TO BEGIN</span>
        <div className="relative w-5 h-8 rounded-full border border-gold/40 flex items-start justify-center p-1">
          <span className="w-1 h-1.5 rounded-full bg-gold animate-smooth-bounce" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="font-italiana text-2xl md:text-3xl text-crimson leading-none">{value}</div>
      <div className="font-cinzel text-[8px] tracking-wide-cap text-ink-mute mt-1">{label}</div>
    </div>
  );
}

function FloatingCard({ src, className, caption }: { src: string; className?: string; caption?: string }) {
  return (
    <div className={cn('paper p-2 pb-3 shadow-polaroid group relative', className)}>
      {/* Gold filigree corner */}
      <svg className="absolute top-1 left-1 w-4 h-4 opacity-60" viewBox="0 0 20 20">
        <path d="M 0 0 L 8 0 Q 0 0 0 8 Z" fill="#C9A961" />
        <circle cx="2" cy="2" r="1" fill="#E8C77C" />
      </svg>
      <svg className="absolute top-1 right-1 w-4 h-4 opacity-60" viewBox="0 0 20 20">
        <path d="M 20 0 L 12 0 Q 20 0 20 8 Z" fill="#C9A961" />
        <circle cx="18" cy="2" r="1" fill="#E8C77C" />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="w-full aspect-[3/4] object-cover rounded-sm" />
      {caption && (
        <div className="mt-1.5 text-center">
          <span className="font-italiana text-xs text-crimson">{caption.split(' · ')[0]}</span>
          <span className="font-cinzel text-[7px] tracking-wide-cap text-ink-mute ml-1.5">
            · {caption.split(' · ')[1]}
          </span>
        </div>
      )}
    </div>
  );
}

function HeartShape({ size, variant, offset = 0 }: { size: number; variant: 'front' | 'mid' | 'back' | 'shine'; offset?: number }) {
  const variants = {
    front: {
      fill: 'url(#hGradFront)',
      filter: 'drop-shadow(0 30px 50px rgba(139, 30, 63, 0.55)) drop-shadow(0 8px 16px rgba(139, 30, 63, 0.4))',
    },
    mid: {
      fill: 'url(#hGradMid)',
      filter: 'drop-shadow(0 12px 24px rgba(139, 30, 63, 0.3))',
    },
    back: {
      fill: 'url(#hGradBack)',
      filter: 'none',
    },
    shine: {
      fill: 'url(#hShine)',
      filter: 'none',
    },
  };
  const c = variants[variant];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{
        filter: c.filter,
        transform: `translateZ(${offset}px)`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      className={variant === 'front' ? 'animate-breathe' : ''}
    >
      <defs>
        <linearGradient id="hGradFront" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#F2B5A2" />
          <stop offset="25%" stopColor="#E8927C" />
          <stop offset="50%" stopColor="#C75146" />
          <stop offset="80%" stopColor="#B23A48" />
          <stop offset="100%" stopColor="#8B1E3F" />
        </linearGradient>
        <linearGradient id="hGradMid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B23A48" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5C3A2E" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="hGradBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B1E3F" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2B1810" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="hShine" cx="0.32" cy="0.28" r="0.4">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M50 88 C 50 88, 12 62, 12 36 C 12 22, 22 12, 34 12 C 42 12, 48 18, 50 24 C 52 18, 58 12, 66 12 C 78 12, 88 22, 88 36 C 88 62, 50 88, 50 88 Z"
        fill={c.fill}
      />

      {variant === 'front' && (
        <>
          <g opacity="0.35" stroke="#FAF7F2" strokeWidth="0.3" fill="none">
            <circle cx="50" cy="44" r="4" />
            <circle cx="50" cy="44" r="8" />
            <circle cx="50" cy="44" r="12" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={50 + Math.cos(a) * 6}
                  y1={44 + Math.sin(a) * 6}
                  x2={50 + Math.cos(a) * 12}
                  y2={44 + Math.sin(a) * 12}
                />
              );
            })}
            {Array.from({ length: 6 }).map((_, i) => {
              const a = (i / 6) * Math.PI * 2;
              return (
                <circle
                  key={`petal-${i}`}
                  cx={50 + Math.cos(a) * 10}
                  cy={44 + Math.sin(a) * 10}
                  r="1.2"
                  fill="#FAF7F2"
                  stroke="none"
                />
              );
            })}
          </g>

          <path id="heartArcTop" d="M 20 38 Q 50 14 80 38" fill="none" />
          <text fill="#FAF7F2" fontSize="3.5" fontFamily="serif" letterSpacing="1.2" opacity="0.55">
            <textPath href="#heartArcTop" startOffset="50%" textAnchor="middle">
              HANDCRAFTED · TOGETHER · HANDCRAFTED
            </textPath>
          </text>

          <g opacity="0.4" fill="#FAF7F2">
            <circle cx="50" cy="68" r="1" />
            <circle cx="46" cy="68" r="0.6" />
            <circle cx="54" cy="68" r="0.6" />
            <circle cx="42" cy="68" r="0.4" />
            <circle cx="58" cy="68" r="0.4" />
          </g>
        </>
      )}

      {variant === 'shine' && (
        <path
          d="M50 88 C 50 88, 12 62, 12 36 C 12 22, 22 12, 34 12 C 42 12, 48 18, 50 24 C 52 18, 58 12, 66 12 C 78 12, 88 22, 88 36 C 88 62, 50 88, 50 88 Z"
          fill="url(#hShine)"
          style={{ mixBlendMode: 'screen' }}
        />
      )}
    </svg>
  );
}
