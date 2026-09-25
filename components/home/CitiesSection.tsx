'use client';
import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import { JaliPattern } from '@/components/ui/mughal/JaliPattern';
import { RoyalMonogram } from '@/components/ui/mughal/RoyalMonogram';

const REGIONS = [
  { name: 'North India', cities: ['Delhi', 'Jaipur', 'Lucknow', 'Chandigarh'], x: 35, y: 25 },
  { name: 'West India', cities: ['Mumbai', 'Pune', 'Ahmedabad', 'Goa'], x: 22, y: 50 },
  { name: 'South India', cities: ['Bangalore', 'Chennai', 'Hyderabad', 'Kochi'], x: 38, y: 75 },
  { name: 'East India', cities: ['Kolkata', 'Bhubaneswar', 'Guwahati'], x: 65, y: 45 },
  { name: 'International', cities: ['London', 'New York', 'Dubai', 'Singapore', 'Toronto'], x: 80, y: 30 },
];

export function CitiesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 lg:px-10 overflow-hidden bg-gradient-to-br from-crimson-deep via-ink to-ink text-alabaster">
      <JaliPattern density="medium" color="#E8C77C" opacity={0.06} className="absolute inset-0" />

      {/* Center monogram watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
        <RoyalMonogram size={400} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <FloralOrnament color="#C9A961" className="mb-4" />
            <span className="font-cinzel text-[10px] tracking-wide-cap text-gold tracking-mughal">Our Reach</span>
            <h2 className="font-display text-4xl md:text-5xl text-alabaster mt-3">
              From <span className="font-italiana italic text-gold">Mumbai</span> to Manhattan
            </h2>
            <p className="font-serif text-lg text-ivory/80 italic mt-4 max-w-xl mx-auto">
              Our members are in 14 countries. Most of our introductions begin over video and grow into something more.
            </p>
          </div>
        </Reveal>

        <div className="relative aspect-[2/1] max-w-4xl mx-auto">
          {/* Stylized map */}
          <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full opacity-25">
            <path
              d="M 15 10 Q 25 5 35 8 L 45 12 Q 50 18 48 25 L 42 35 Q 38 42 35 45 Q 30 42 28 38 Q 25 32 22 28 Q 18 22 16 16 Z"
              fill="none"
              stroke="#E8C77C"
              strokeWidth="0.25"
              strokeDasharray="0.6 0.6"
            />
            <circle cx="85" cy="25" r="8" fill="none" stroke="#E8C77C" strokeWidth="0.25" strokeDasharray="0.6 0.6" />
          </svg>

          {/* Connection lines (gold arabesque filigree) */}
          <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {REGIONS.map((r, i) =>
              REGIONS.slice(i + 1).map((r2, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={r.x}
                  y1={r.y}
                  x2={r2.x}
                  y2={r2.y}
                  stroke="#C9A961"
                  strokeWidth="0.12"
                  strokeOpacity={hovered === i || hovered === i + j + 1 ? 0.7 : 0.2}
                  strokeDasharray="0.5 0.5"
                />
              )),
            )}
          </svg>

          {/* Region chhatri markers */}
          {REGIONS.map((r, i) => (
            <button
              key={r.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="absolute group"
              style={{ left: `${r.x}%`, top: `${r.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative">
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-gold opacity-30 animate-pulse" style={{ width: 40, height: 40, transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }} />
                {/* Chhatri marker */}
                <svg width="28" height="32" viewBox="0 0 28 32" className="relative drop-shadow-lg">
                  <defs>
                    <linearGradient id={`markerGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E8C77C" />
                      <stop offset="100%" stopColor="#8B6F3A" />
                    </linearGradient>
                  </defs>
                  {/* Multi-foiled top */}
                  <path
                    d="M 2 14 Q 2 8, 8 4 Q 14 0, 14 2 Q 14 0, 20 4 Q 26 8, 26 14 L 26 28 L 2 28 Z"
                    fill={`url(#markerGrad-${i})`}
                    stroke="#C9A961"
                    strokeWidth="0.5"
                  />
                  {/* Inner finial */}
                  <circle cx="14" cy="14" r="2" fill="#FAF7F2" />
                  <circle cx="14" cy="2" r="1.5" fill="#E8C77C" />
                  {/* Base ornament */}
                  <line x1="6" y1="28" x2="22" y2="28" stroke="#C9A961" strokeWidth="0.8" />
                </svg>
              </div>
              <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity z-10 ${hovered === i ? 'opacity-100' : 'opacity-0'}`}>
                <div className="paper px-4 py-2 rounded-lg shadow-polaroid border-2 border-gold/40">
                  <div className="font-cinzel text-[9px] tracking-wide-cap text-crimson tracking-mughal">{r.name}</div>
                  <div className="font-serif text-xs text-ink mt-1">{r.cities.join(' · ')}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Reveal delay={2}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16">
            {REGIONS.map((r) => (
              <div key={r.name} className="text-center border-2 border-gold/20 rounded-xl py-4 px-2 bg-alabaster/5 backdrop-blur">
                <div className="font-italiana text-3xl text-gold">{r.cities.length}</div>
                <div className="font-cinzel text-[9px] tracking-wide-cap text-ivory/60 mt-1 tracking-mughal">{r.name}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
