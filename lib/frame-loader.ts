'use client';

interface FrameLoaderOptions {
  basePath: string;
  extension?: string;
  padding?: number;
}

/**
 * Sliding-window frame loader for canvas-driven scroll animation.
 * Supports crossfade by tracking two adjacent frames.
 */
export class FrameLoader {
  private cache = new Map<number, HTMLImageElement>();
  private loading = new Set<number>();
  private basePath: string;
  private extension: string;
  private padding: number;

  constructor(options: FrameLoaderOptions) {
    this.basePath = options.basePath;
    this.extension = options.extension ?? 'jpg';
    this.padding = options.padding ?? 25;
  }

  getFramePath(index: number): string {
    const safeIdx = Math.max(0, index);
    const padded = String(safeIdx + 1).padStart(3, '0');
    return `${this.basePath}${padded}.${this.extension}`;
  }

  get(index: number): HTMLImageElement | undefined {
    return this.cache.get(index);
  }

  isLoaded(index: number): boolean {
    const img = this.cache.get(index);
    return !!(img && img.complete && img.naturalWidth > 0);
  }

  ensureLoaded(index: number): HTMLImageElement | undefined {
    const cached = this.cache.get(index);
    if (cached) return cached;
    if (this.loading.has(index)) return undefined;

    this.loading.add(index);
    const img = new window.Image();
    img.decoding = 'async';
    img.src = this.getFramePath(index);
    img.onload = () => {
      this.loading.delete(index);
      this.cache.set(index, img);
    };
    img.onerror = () => {
      this.loading.delete(index);
    };
    return undefined;
  }

  /**
   * Sync the cache window around currentIndex.
   * Pre-loads ±padding frames, evicts distant ones.
   */
  sync(currentIndex: number) {
    const start = Math.max(0, currentIndex - this.padding);
    const end = currentIndex + this.padding;

    // Load needed frames
    for (let i = start; i <= end; i++) {
      this.ensureLoaded(i);
    }

    // Evict frames outside window (keep slightly wider than padding for smoothness)
    const toRemove: number[] = [];
    this.cache.forEach((_img, key) => {
      if (key < start - 5 || key > end + 5) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((k) => this.cache.delete(k));
  }

  /** Preload a range of frames eagerly (e.g. for upcoming scenes) */
  preloadRange(start: number, end: number) {
    for (let i = start; i <= end; i++) {
      this.ensureLoaded(i);
    }
  }

  clear() {
    this.cache.clear();
    this.loading.clear();
  }

  size() {
    return this.cache.size;
  }

  /** Number of frames currently loaded successfully */
  ready(): number {
    let n = 0;
    this.cache.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) n++;
    });
    return n;
  }
}
