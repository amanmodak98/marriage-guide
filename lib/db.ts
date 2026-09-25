// Data access layer. The same interface works against local JSON now
// and Cloudflare D1 + R2 + Workers later (zero app refactor needed).
//
// Switch implementations via the `DEPLOY_TARGET` env var:
//   - undefined / 'local'  -> lib/db.local.ts
//   - 'cloudflare'         -> lib/db.cloudflare.ts

import type { Profile, Inquiry, User, JournalEntry } from './types';

export interface DataLayer {
  // profiles
  listProfiles(filter?: { type?: 'bride' | 'groom' }): Promise<Profile[]>;
  getProfile(id: string): Promise<Profile | null>;
  createProfile(profile: Omit<Profile, 'id' | 'slug' | 'createdAt'>): Promise<Profile>;
  updateProfile(id: string, patch: Partial<Profile>): Promise<Profile | null>;
  deleteProfile(id: string): Promise<boolean>;

  // inquiries
  listInquiries(): Promise<Inquiry[]>;
  createInquiry(input: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry>;

  // users
  listUsers(): Promise<User[]>;

  // journal
  listJournal(): Promise<JournalEntry[]>;
  getJournal(slug: string): Promise<JournalEntry | null>;
}

let _impl: DataLayer | null = null;

export async function getDb(): Promise<DataLayer> {
  if (_impl) return _impl;
  const target = process.env.DEPLOY_TARGET;
  if (target === 'cloudflare') {
    const mod = await import('./db.cloudflare');
    _impl = mod.cloudflareDb;
  } else {
    const mod = await import('./db.local');
    _impl = mod.localDb;
  }
  return _impl;
}
