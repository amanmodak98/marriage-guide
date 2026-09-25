// Local JSON-backed implementation of the DataLayer.
// Mirrors Cloudflare D1 exactly — same method signatures, same data shapes.

import { promises as fs } from 'fs';
import path from 'path';
import { generateId, slugify } from './utils';
import type { Profile, Inquiry, User, JournalEntry } from './types';
import type { DataLayer } from './db';
import { seedProfiles, seedInquiries, seedUsers, seedJournal } from './data';

const DATA_DIR = path.join(process.cwd(), 'data');

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, filename), 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    // Seed on first read
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

export const localDb: DataLayer = {
  async listProfiles(filter) {
    const all = await readJson<Profile[]>('profiles.json', seedProfiles);
    if (!filter?.type) return all;
    return all.filter((p) => p.type === filter.type);
  },

  async getProfile(id) {
    const all = await readJson<Profile[]>('profiles.json', seedProfiles);
    return all.find((p) => p.id === id || p.slug === id) ?? null;
  },

  async createProfile(input) {
    const all = await readJson<Profile[]>('profiles.json', seedProfiles);
    const id = generateId();
    const profile: Profile = {
      ...input,
      id,
      slug: slugify(`${input.name}-${id.slice(-4)}`),
      createdAt: new Date().toISOString(),
    };
    all.unshift(profile);
    await writeJson('profiles.json', all);
    return profile;
  },

  async updateProfile(id, patch) {
    const all = await readJson<Profile[]>('profiles.json', seedProfiles);
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...patch };
    await writeJson('profiles.json', all);
    return all[idx];
  },

  async deleteProfile(id) {
    const all = await readJson<Profile[]>('profiles.json', seedProfiles);
    const next = all.filter((p) => p.id !== id);
    if (next.length === all.length) return false;
    await writeJson('profiles.json', next);
    return true;
  },

  async listInquiries() {
    return readJson<Inquiry[]>('inquiries.json', seedInquiries);
  },

  async createInquiry(input) {
    const all = await readJson<Inquiry[]>('inquiries.json', seedInquiries);
    const inquiry: Inquiry = {
      ...input,
      id: generateId(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    all.unshift(inquiry);
    await writeJson('inquiries.json', all);
    return inquiry;
  },

  async listUsers() {
    return readJson<User[]>('users.json', seedUsers);
  },

  async listJournal() {
    return readJson<JournalEntry[]>('journal.json', seedJournal);
  },

  async getJournal(slug) {
    const all = await readJson<JournalEntry[]>('journal.json', seedJournal);
    return all.find((j) => j.slug === slug) ?? null;
  },
};
