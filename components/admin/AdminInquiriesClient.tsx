'use client';
import { useState } from 'react';
import type { Inquiry } from '@/lib/types';
import { timeAgo } from '@/lib/utils';

export function AdminInquiriesClient({ initial }: { initial: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initial);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const markStatus = async (id: string, status: Inquiry['status']) => {
    // Local state update only (no PUT endpoint for inquiries in this version).
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 h-[calc(100vh-100px)]">
      <div className="paper rounded-2xl border border-crimson/8 shadow-polaroid overflow-y-auto">
        {inquiries.length === 0 ? (
          <div className="p-12 text-center font-serif italic text-ink-mute">No inquiries yet.</div>
        ) : (
          inquiries.map((i) => (
            <button
              key={i.id}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-4 border-b border-crimson/8 hover:bg-crimson/5 transition-colors ${
                selected?.id === i.id ? 'bg-crimson/8' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-display text-base text-ink">{i.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-cinzel tracking-wide-cap ${i.status === 'new' ? 'bg-vermilion/20 text-vermilion' : 'bg-gold/20 text-gold-dark'}`}>
                  {i.status.toUpperCase()}
                </span>
              </div>
              <p className="font-serif text-xs text-ink-soft line-clamp-2 italic">{i.message}</p>
              <div className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute mt-2">{timeAgo(i.createdAt)}</div>
            </button>
          ))
        )}
      </div>

      <div className="paper rounded-2xl border border-crimson/8 shadow-polaroid p-8 overflow-y-auto">
        {selected ? (
          <>
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-crimson/10">
              <div>
                <h2 className="font-display text-2xl text-ink">{selected.name}</h2>
                <p className="font-serif text-ink-soft italic mt-1">{selected.email}</p>
                {selected.phone && <p className="font-serif text-sm text-ink-mute mt-0.5">{selected.phone}</p>}
              </div>
              <div className="flex gap-2">
                {(['new', 'read', 'resolved'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => markStatus(selected.id, s)}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-cinzel tracking-wide-cap transition-colors ${
                      selected.status === s
                        ? 'bg-crimson text-alabaster'
                        : 'border border-crimson/20 text-crimson hover:bg-crimson/5'
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            {selected.subject && (
              <div className="mb-4">
                <span className="font-cinzel text-[10px] tracking-wide-cap text-crimson">Subject</span>
                <p className="font-serif text-ink mt-1">{selected.subject}</p>
              </div>
            )}
            <div>
              <span className="font-cinzel text-[10px] tracking-wide-cap text-crimson">Message</span>
              <p className="font-serif text-lg text-ink mt-2 leading-relaxed italic">&ldquo;{selected.message}&rdquo;</p>
            </div>
            <div className="mt-8 pt-6 border-t border-crimson/10 flex items-center justify-between">
              <span className="font-cinzel text-[9px] tracking-wide-cap text-ink-mute">Received {timeAgo(selected.createdAt)}</span>
              <a
                href={`mailto:${selected.email}`}
                className="px-4 py-2 rounded-full bg-gradient-to-br from-crimson to-vermilion text-alabaster font-cinzel text-[10px] tracking-wide-cap press"
              >
                Reply via Email
              </a>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <div className="font-italiana text-6xl text-crimson mb-3">✉</div>
              <p className="font-serif italic text-ink-mute">Select an inquiry to read it here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
