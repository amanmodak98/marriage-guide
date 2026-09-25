'use client';

import { useEffect, useRef } from 'react';
import { FrameLoader } from '@/lib/frame-loader';

interface CinematicPageHeaderProps {
  frameIndex: number;       // Which frame to use as hero
  basePath?: string;
  height?: string;          // e.g. "h-[60vh]"
  overlay?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * A single-frame cinematic backdrop for non-home pages.
 * Used as the hero banner on /about, /membership, /profile/[id], /contact, etc.
 * Frame is preloaded eagerly, no scroll-driven frame swap.
 */
export function CinematicPageHeader({
  frameIndex,
  basePath = '/frames/ezgif-frame-',
  height = 'h-[60vh] min-h-[480px]',
  overlay,
  children,
  className,
}: CinematicPageHeaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<FrameLoader | null>(null);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      draw();
    };

    const draw = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const loader = loaderRef.current;
      if (!loader) return;
      const img = loader.get(frameIndex);
      if (img && img.complete && img.naturalWidth > 0) {
        const mx = stateRef.current.mouseX * 18;
        const my = stateRef.current.mouseY * 12;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const scale = Math.max(canvas.width / iw, canvas.height / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (canvas.width - dw) / 2 + mx;
        const dy = (canvas.height - dh) / 2 + my;
        ctx.drawImage(img, dx, dy, dw, dh);
      } else {
        ctx.fillStyle = '#2B1810';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.restore();
    };

    const onMouse = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      stateRef.current.mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      stateRef.current.mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      draw();
    };

    const loader = new FrameLoader({ basePath, padding: 2 });
    loaderRef.current = loader;
    loader.ensureLoaded(frameIndex);

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse, { passive: true });

    // Try to redraw when frame loads
    const checkLoaded = setInterval(() => {
      if (loader.isLoaded(frameIndex)) {
        draw();
        clearInterval(checkLoaded);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      clearInterval(checkLoaded);
      loader.clear();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frameIndex, basePath]);

  return (
    <div ref={wrapperRef} className={`relative ${height} overflow-hidden ${className ?? ''}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-ink/60 via-ink/30 to-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/50" />
      </div>
      {/* User overlay (default: children) */}
      <div className="absolute inset-0 pointer-events-none">
        {overlay ?? children}
      </div>
    </div>
  );
}
