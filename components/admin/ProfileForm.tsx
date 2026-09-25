'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { FloralOrnament } from '@/components/ui/FloralOrnament';
import type { Profile } from '@/lib/types';

interface Props {
  initial?: Profile;
  mode: 'create' | 'edit';
}

export function ProfileForm({ initial, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Profile>>(
    initial ?? {
      type: 'bride',
      name: '',
      age: 26,
      height: '5\'5"',
      maritalStatus: 'Never Married',
      photos: [],
      headline: '',
      about: '',
      education: { degree: '', institution: '', field: '' },
      profession: { title: '', company: '', income: '' },
      location: { city: '', state: '', country: 'India', nativePlace: '' },
      family: { father: '', mother: '', siblings: '', familyType: '', values: '' },
      lifestyle: { diet: 'Vegetarian', hobbies: [], languages: ['English', 'Hindi'] },
      religion: { religion: 'Hindu', community: '' },
      partnerExpectations: '',
      featured: false,
    },
  );
  const [photoInput, setPhotoInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const addPhoto = () => {
    if (!photoInput.trim()) return;
    setForm((f) => ({ ...f, photos: [...(f.photos ?? []), photoInput.trim()] }));
    setPhotoInput('');
  };

  const removePhoto = (idx: number) => {
    setForm((f) => ({ ...f, photos: (f.photos ?? []).filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = mode === 'create' ? '/api/profiles' : `/api/profiles/${initial?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Save failed');
      } else {
        router.push('/admin/profiles');
        router.refresh();
      }
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-6 md:px-10 py-10 max-w-5xl">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <FloralOrnament className="mb-3" />
          <span className="font-cinzel text-[10px] tracking-wide-cap text-gold-dark">
            {mode === 'create' ? 'New Profile' : 'Editing'}
          </span>
          <h1 className="font-display text-4xl text-ink mt-2">
            {mode === 'create' ? 'Add a profile' : initial?.name}
          </h1>
        </div>
        <Link href="/admin/profiles" className="font-cinzel text-[10px] tracking-wide-cap text-crimson hover:text-vermilion">
          ← Back to all
        </Link>
      </div>

      {error && (
        <div className="mb-6 paper p-4 rounded-xl border border-vermilion/30 text-vermilion font-serif italic">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basics */}
        <Section title="The Basics">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Full Name" required value={form.name ?? ''} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Select label="Type" value={form.type ?? 'bride'} onChange={(v) => setForm((f) => ({ ...f, type: v as 'bride' | 'groom' }))}>
              <option value="bride">Bride</option>
              <option value="groom">Groom</option>
            </Select>
            <Input label="Age" type="number" required value={form.age ?? 0} onChange={(e) => setForm((f) => ({ ...f, age: Number(e.target.value) }))} />
            <Input label="Height" required value={form.height ?? ''} onChange={(e) => setForm((f) => ({ ...f, height: e.target.value }))} placeholder={`5'5"`} />
            <Input label="Marital Status" required value={form.maritalStatus ?? ''} onChange={(e) => setForm((f) => ({ ...f, maritalStatus: e.target.value }))} />
            <label className="flex items-center gap-2 self-end pb-3">
              <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 accent-crimson" />
              <span className="font-cinzel text-[10px] tracking-wide-cap text-ink-soft">FEATURED</span>
            </label>
          </div>
          <Input label="Headline" required value={form.headline ?? ''} onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))} placeholder="A short tagline that captures this person" />
          <Textarea label="About" required value={form.about ?? ''} onChange={(e) => setForm((f) => ({ ...f, about: e.target.value }))} rows={6} />
        </Section>

        {/* Photos */}
        <Section title="Photos">
          <div className="flex gap-2">
            <input
              type="text"
              value={photoInput}
              onChange={(e) => setPhotoInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 bg-alabaster border border-crimson/15 rounded-lg px-3 py-2 text-sm font-serif"
            />
            <button type="button" onClick={addPhoto} className="px-4 py-2 rounded-lg bg-crimson text-alabaster font-cinzel text-[10px] tracking-wide-cap press">
              + Add Photo
            </button>
          </div>
          {(form.photos ?? []).length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
              {(form.photos ?? []).map((p, i) => (
                <div key={i} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p} alt="" className="w-full aspect-[3/4] object-cover rounded-sm" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-ink/70 text-alabaster text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Education & Profession */}
        <Section title="Education & Profession">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Degree" required value={form.education?.degree ?? ''} onChange={(e) => setForm((f) => ({ ...f, education: { ...f.education!, degree: e.target.value } }))} />
            <Input label="Institution" required value={form.education?.institution ?? ''} onChange={(e) => setForm((f) => ({ ...f, education: { ...f.education!, institution: e.target.value } }))} />
            <Input label="Field" required value={form.education?.field ?? ''} onChange={(e) => setForm((f) => ({ ...f, education: { ...f.education!, field: e.target.value } }))} />
            <Input label="Job Title" required value={form.profession?.title ?? ''} onChange={(e) => setForm((f) => ({ ...f, profession: { ...f.profession!, title: e.target.value } }))} />
            <Input label="Company" required value={form.profession?.company ?? ''} onChange={(e) => setForm((f) => ({ ...f, profession: { ...f.profession!, company: e.target.value } }))} />
            <Input label="Income" required value={form.profession?.income ?? ''} onChange={(e) => setForm((f) => ({ ...f, profession: { ...f.profession!, income: e.target.value } }))} placeholder="₹18 LPA" />
          </div>
        </Section>

        {/* Location */}
        <Section title="Location">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input label="City" required value={form.location?.city ?? ''} onChange={(e) => setForm((f) => ({ ...f, location: { ...f.location!, city: e.target.value } }))} />
            <Input label="State" required value={form.location?.state ?? ''} onChange={(e) => setForm((f) => ({ ...f, location: { ...f.location!, state: e.target.value } }))} />
            <Input label="Country" required value={form.location?.country ?? ''} onChange={(e) => setForm((f) => ({ ...f, location: { ...f.location!, country: e.target.value } }))} />
            <Input label="Native Place" required value={form.location?.nativePlace ?? ''} onChange={(e) => setForm((f) => ({ ...f, location: { ...f.location!, nativePlace: e.target.value } }))} />
          </div>
        </Section>

        {/* Family */}
        <Section title="Family">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Father" required value={form.family?.father ?? ''} onChange={(e) => setForm((f) => ({ ...f, family: { ...f.family!, father: e.target.value } }))} />
            <Input label="Mother" required value={form.family?.mother ?? ''} onChange={(e) => setForm((f) => ({ ...f, family: { ...f.family!, mother: e.target.value } }))} />
            <Input label="Siblings" required value={form.family?.siblings ?? ''} onChange={(e) => setForm((f) => ({ ...f, family: { ...f.family!, siblings: e.target.value } }))} />
            <Input label="Family Type" required value={form.family?.familyType ?? ''} onChange={(e) => setForm((f) => ({ ...f, family: { ...f.family!, familyType: e.target.value } }))} placeholder="Nuclear / Joint" />
          </div>
          <Textarea label="Family Values" required value={form.family?.values ?? ''} onChange={(e) => setForm((f) => ({ ...f, family: { ...f.family!, values: e.target.value } }))} rows={3} />
        </Section>

        {/* Lifestyle */}
        <Section title="Lifestyle">
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Diet" value={form.lifestyle?.diet ?? 'Vegetarian'} onChange={(v) => setForm((f) => ({ ...f, lifestyle: { ...f.lifestyle!, diet: v } }))}>
              <option>Vegetarian</option>
              <option>Non-vegetarian</option>
              <option>Pescatarian</option>
              <option>Jain</option>
            </Select>
            <Input label="Languages (comma separated)" value={(form.lifestyle?.languages ?? []).join(', ')} onChange={(e) => setForm((f) => ({ ...f, lifestyle: { ...f.lifestyle!, languages: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) } }))} />
            <Input label="Hobbies (comma separated)" value={(form.lifestyle?.hobbies ?? []).join(', ')} onChange={(e) => setForm((f) => ({ ...f, lifestyle: { ...f.lifestyle!, hobbies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) } }))} />
          </div>
        </Section>

        {/* Religion */}
        <Section title="Religion & Community">
          <div className="grid sm:grid-cols-3 gap-4">
            <Input label="Religion" required value={form.religion?.religion ?? ''} onChange={(e) => setForm((f) => ({ ...f, religion: { ...f.religion!, religion: e.target.value } }))} />
            <Input label="Community" required value={form.religion?.community ?? ''} onChange={(e) => setForm((f) => ({ ...f, religion: { ...f.religion!, community: e.target.value } }))} />
            <Input label="Sub-Community" value={form.religion?.subCommunity ?? ''} onChange={(e) => setForm((f) => ({ ...f, religion: { ...f.religion!, subCommunity: e.target.value } }))} />
          </div>
        </Section>

        {/* Partner Expectations */}
        <Section title="Partner Expectations">
          <Textarea
            label="What they are looking for"
            required
            value={form.partnerExpectations ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, partnerExpectations: e.target.value }))}
            rows={5}
          />
        </Section>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-4 rounded-full bg-gradient-to-br from-crimson to-vermilion text-alabaster font-cinzel text-xs tracking-wide-cap shadow-polaroid hover:shadow-glow transition-all press disabled:opacity-50"
          >
            {saving ? 'Saving...' : mode === 'create' ? 'Create Profile' : 'Save Changes'}
          </button>
          <Link
            href="/admin/profiles"
            className="px-8 py-4 rounded-full border border-crimson/30 text-crimson font-cinzel text-xs tracking-wide-cap hover:bg-crimson hover:text-alabaster transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="paper rounded-2xl border border-crimson/8 shadow-polaroid p-6 space-y-4">
      <h2 className="font-display text-xl text-ink flex items-center gap-3">
        <span className="font-italiana text-2xl text-crimson">·</span>
        {title}
      </h2>
      {children}
    </div>
  );
}
