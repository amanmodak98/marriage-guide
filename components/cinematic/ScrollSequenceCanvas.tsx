'use client';

import { useEffect, useRef } from 'react';
import { FrameLoader } from '@/lib/frame-loader';

interface ScrollSequenceCanvasProps {
  frameCount: number;
  basePath?: string;
  extension?: string;
  totalScroll?: number;
  crossfade?: boolean;       // crossfade between adjacent frames
  className?: string;
  /** Called each frame after drawing — receives current frame index + alpha (0..1) */
  onFrame?: (frameIndex: number, alpha: number) => void;
}

/**
 * Canvas-based scroll-driven video frame renderer with optional crossfade.
 *
 * - Maps scrollY to a float frame index (continuous, not just integer)
 * - Pre-loads a sliding window of frames around the current index
 * - Draws with mouse parallax
 * - With crossfade=true, blends current and next frame for ultra-smooth playback
 * - Honors prefers-reduced-motion
 */
export function ScrollSequenceCanvas({
  frameCount,
  basePath = '/frames/ezgif-frame-',
  extension = 'jpg',
  totalScroll = 9000,
  crossfade = true,
  className,
  onFrame,
}: ScrollSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<FrameLoader | null>(null);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({
    scrollY: 0,
    mouseX: 0,
    mouseY: 0,
    lastContinuousFrame: -1,
    reduced: false,
  });

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
      stateRef.current.lastContinuousFrame = -1;
    };
    resize();

    const isMobile = window.innerWidth < 768;
    const padding = isMobile ? 8 : 25;
    const loader = new FrameLoader({ basePath, extension, padding });
    loaderRef.current = loader;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    stateRef.current.reduced = mq.matches;
    const onMQChange = (e: MediaQueryListEvent) => {
      stateRef.current.reduced = e.matches;
      stateRef.current.lastContinuousFrame = -1;
    };
    mq.addEventListener('change', onMQChange);

    const onMouse = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      stateRef.current.scrollY = window.scrollY;
    };

    // Initial preload — eager load the first 60 frames
    loader.preloadRange(0, Math.min(60, frameCount - 1));

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const state = stateRef.current;
      const progress = state.reduced ? 0.5 : Math.max(0, Math.min(1, state.scrollY / totalScroll));

      // Continuous frame index — for crossfade we use float
      const continuousFrame = progress * (frameCount - 1);
      const frameIndex = Math.floor(continuousFrame);
      const nextFrame = Math.min(frameCount - 1, frameIndex + 1);
      const alpha = continuousFrame - frameIndex; // 0..1

      loader.sync(frameIndex);

      // Throttle redraws by ~0.05 frame precision (saves CPU on tiny scrolls)
      const lastCont = state.lastContinuousFrame;
      const drifted =
        Math.abs(state.mouseX) > 0.001 ||
        Math.abs(state.mouseY) > 0.001 ||
        Math.abs(continuousFrame - lastCont) > 0.04;

      if (!drifted) return;
      state.lastContinuousFrame = continuousFrame;

      const mx = state.mouseX * 14;
      const my = state.mouseY * 9;

      // Clear
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cw = canvas.width;
      const ch = canvas.height;

      const imgA = loader.get(frameIndex);
      if (imgA && imgA.complete && imgA.naturalWidth > 0) {
        if (crossfade && alpha > 0.05 && frameIndex !== nextFrame) {
          const imgB = loader.get(nextFrame);
          if (imgB && imgB.complete && imgB.naturalWidth > 0) {
            // Draw A with alpha 1
            ctx.globalAlpha = 1 - alpha;
            drawCover(ctx, cw, ch, imgA, mx, my);
            // Draw B with alpha = alpha
            ctx.globalAlpha = alpha;
            drawCover(ctx, cw, ch, imgB, mx, my);
            ctx.globalAlpha = 1;
          } else {
            drawCover(ctx, cw, ch, imgA, mx, my);
          }
        } else {
          drawCover(ctx, cw, ch, imgA, mx, my);
        }
      } else {
        ctx.fillStyle = '#2B1810';
        ctx.fillRect(0, 0, cw, ch);
      }

      ctx.restore();
      onFrame?.(frameIndex, alpha);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onMQChange);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      loader.clear();
    };
  }, [frameCount, basePath, extension, totalScroll, crossfade, onFrame]);

  return (
    <div ref={wrapperRef} className={className}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number,
  img: HTMLImageElement,
  px: number,
  py: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2 + px;
  const dy = (ch - dh) / 2 + py;
  ctx.drawImage(img, dx, dy, dw, dh);
}
