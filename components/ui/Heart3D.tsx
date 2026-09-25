'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Heart3DProps {
  className?: string;
  size?: number;
  scrollContainer?: React.RefObject<HTMLElement>;
}

/**
 * A 3D heart built from layered SVG with CSS transforms.
 * - Rotates continuously
 * - Tilts with mouse parallax
 * - Pulses on scroll progress milestones
 * - Glows with radial gradient backdrop
 */
export function Heart3D({ className, size = 360 }: Heart3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pulse, setPulse] = useState(0);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setTilt({
        x: ((e.clientY - cy) / cy) * -8,
        y: ((e.clientX - cx) / cx) * 12,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setScrollProgress(p);
      // Pulse at thresholds
      if (p > 0.25 && pulse < 1) setPulse(1);
      else if (p > 0.5 && pulse < 2) setPulse(2);
      else if (p > 0.75 && pulse < 3) setPulse(3);
      else if (p === 0 && pulse > 0) setPulse(0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pulse]);

  // Continuous rotation tied to scroll
  const rotateZ = scrollProgress * 720; // 2 full rotations over the scroll
  const scale = 1 + scrollProgress * 0.4;
  const beat = 1 + Math.sin(Date.now() / 600) * 0.04; // simulated heartbeat

  return (
    <div
      ref={ref}
      className={cn('relative pointer-events-none select-none', className)}
      style={{
        width: size,
        height: size,
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(199, 81, 70, 0.45) 0%, transparent 70%)',
          transform: `scale(${scale * 1.4})`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Orbiting particles */}
      <div className="absolute inset-0 animate-float-rotate" style={{ animationDuration: '30s' }}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-gold"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateX(${size * 0.55}px) translateY(-3px)`,
              boxShadow: '0 0 12px #C9A961',
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* The 3D heart itself */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + rotateZ}deg) rotateZ(${rotateZ * 0.2}deg) scale(${beat})`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <HeartShape size={size} variant="front" />
        <HeartShape size={size} variant="back" offset={-size * 0.08} />
        <HeartShape size={size} variant="mid" offset={-size * 0.04} />
      </div>

      {/* Scroll progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${scrollProgress * 360}deg)`, transition: 'transform 0.3s' }}
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(201, 169, 97, 0.2)" strokeWidth="0.5" />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#C9A961"
          strokeWidth="0.8"
          strokeDasharray={`${scrollProgress * 301} 301`}
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 6px rgba(201, 169, 97, 0.7))' }}
        />
      </svg>

      {/* Milestone pulses */}
      {[1, 2, 3].map((m) => (
        <div
          key={m}
          className="absolute inset-0 rounded-full border-2 border-gold"
          style={{
            opacity: pulse >= m ? 0 : 0.5,
            transform: `scale(${1 + (pulse >= m ? 1 : 0)})`,
            transition: 'all 1s ease-out',
          }}
        />
      ))}
    </div>
  );
}

function HeartShape({ size, variant, offset = 0 }: { size: number; variant: 'front' | 'mid' | 'back'; offset?: number }) {
  const colors = {
    front: { fill: 'url(#heartGradFront)', shadow: 'drop-shadow(0 20px 40px rgba(139, 30, 63, 0.6))' },
    mid: { fill: 'url(#heartGradMid)', shadow: 'drop-shadow(0 10px 20px rgba(139, 30, 63, 0.4))' },
    back: { fill: 'url(#heartGradBack)', shadow: 'none' },
  };
  const c = colors[variant];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{
        filter: c.shadow,
        transform: `translateZ(${offset}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      className={variant === 'front' ? 'animate-breathe' : ''}
    >
      <defs>
        <linearGradient id="heartGradFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8927C" />
          <stop offset="35%" stopColor="#C75146" />
          <stop offset="70%" stopColor="#B23A48" />
          <stop offset="100%" stopColor="#8B1E3F" />
        </linearGradient>
        <linearGradient id="heartGradMid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B23A48" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8B1E3F" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="heartGradBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B1E3F" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5C3A2E" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="heartShine" cx="35%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0.7" />
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
          <path
            d="M50 88 C 50 88, 12 62, 12 36 C 12 22, 22 12, 34 12 C 42 12, 48 18, 50 24 C 52 18, 58 12, 66 12 C 78 12, 88 22, 88 36 C 88 62, 50 88, 50 88 Z"
            fill="url(#heartShine)"
          />
          {/* Floral ornament on heart */}
          <g opacity="0.4" stroke="#FAF7F2" strokeWidth="0.4" fill="none">
            <circle cx="50" cy="42" r="3" />
            <circle cx="50" cy="42" r="6" />
            <circle cx="50" cy="42" r="9" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={50 + Math.cos(a) * 6}
                  y1={42 + Math.sin(a) * 6}
                  x2={50 + Math.cos(a) * 9}
                  y2={42 + Math.sin(a) * 9}
                />
              );
            })}
          </g>
        </>
      )}
    </svg>
  );
}
