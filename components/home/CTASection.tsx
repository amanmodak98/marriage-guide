import Link from 'next/link';
import { MandalaSVG } from '@/components/ui/MandalaSVG';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { RoyalMonogram } from '@/components/ui/mughal/RoyalMonogram';
import { LotusMotif } from '@/components/ui/mughal/LotusMotif';
import { GoldText } from '@/components/ui/mughal/GoldText';
import { PietraDuraBand } from '@/components/ui/mughal/PietraDuraBand';

export function CTASection() {
  return (
    <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-crimson-deep via-crimson to-vermilion" />
      <JaliPattern density="medium" color="#E8C77C" opacity={0.08} className="absolute inset-0" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0">
          <MandalaSVG size={500} color="#FAF7F2" speed="slow" />
        </div>
        <div className="absolute bottom-0 left-0">
          <MandalaSVG size={400} color="#FAF7F2" speed="slow" reverse />
        </div>
      </div>

      {/* Massive gold lotus watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
        <LotusMotif size={600} variant="eightfold" color="#E8C77C" />
      </div>

      {/* Royal monogram */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none">
        <RoyalMonogram size={80} />
      </div>

      {/* Texture overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(232, 199, 124, 0.18), transparent 50%)',
      }} />

      <div className="relative max-w-4xl mx-auto text-center pt-16">
        <div className="font-italiana text-7xl text-gold-bright mb-6 drop-shadow-lg">ॐ</div>

        <h2 className="font-display text-4xl md:text-6xl text-alabaster leading-tight">
          Begin with a single <span className="font-italiana italic text-gold-bright">conversation</span>
        </h2>

        <div className="max-w-md mx-auto my-8">
          <PietraDuraBand variant="dotted" />
        </div>

        <p className="font-serif text-xl md:text-2xl text-alabaster/90 mt-4 max-w-2xl mx-auto italic leading-relaxed">
          No pressure, no commitment. Just a warm, honest conversation about what you are looking for.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="/register"
            className="group relative inline-flex items-center px-9 py-4 rounded-full bg-alabaster text-crimson font-cinzel text-xs tracking-wide-cap shadow-polaroid hover:shadow-polaroid-hover press transition-all border-2 border-gold/60 tracking-mughal"
          >
            <span className="absolute inset-0 shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            <span className="relative">Begin Your Handcrafted Journey</span>
            <svg className="relative ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-7 py-4 rounded-full border-2 border-gold/60 text-gold-bright font-cinzel text-xs tracking-wide-cap hover:bg-gold/10 transition-colors tracking-mughal"
          >
            Talk to Us First
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-alabaster/80">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span className="font-cinzel text-[10px] tracking-wide-cap tracking-mughal">
            hello@marriageguide.in · +91 80 4567 8900
          </span>
        </div>
      </div>
    </section>
  );
}
