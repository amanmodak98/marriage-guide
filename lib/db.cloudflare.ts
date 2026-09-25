// Cloudflare D1 + R2 + Workers implementation stub.
// The interface matches lib/db.local.ts exactly — same method signatures.
// To activate: set DEPLOY_TARGET=cloudflare and bind D1/R2 in wrangler.toml.

import type { Profile, Inquiry, User, JournalEntry } from './types';
import type { DataLayer } from './db';

// Pseudo-binding typing (provided by Workers runtime in production).
interface D1PreparedStatement {
  bind(...args: unknown[]): D1PreparedStatement;
  first<T = unknown>(col?: string): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<{ success: boolean }>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

declare global {
  // eslint-disable-next-line no-var
  var __D1__: D1Database | undefined;
}

function getD1(): D1Database {
  // In Cloudflare Workers this is injected via env.DB (D1 binding).
  // In a non-Workers runtime this throws — which is correct, the local
  // implementation should be used there.
  if (typeof globalThis.__D1__ !== 'undefined') return globalThis.__D1__;
  // Workers env binding
  return ((globalThis as { DB?: D1Database }).DB ?? globalThis.__D1__) as D1Database;
}

function rowToProfile(row: Record<string, unknown>): Profile {
  return {
    id: row.id as string,
    slug: row.slug as string,
    type: row.type as 'bride' | 'groom',
    name: row.name as string,
    age: row.age as number,
    height: row.height as string,
    maritalStatus: row.marital_status as string,
    photos: JSON.parse((row.photos as string) || '[]'),
    headline: row.headline as string,
    about: row.about as string,
    education: JSON.parse(row.education as string),
    profession: JSON.parse(row.profession as string),
    location: JSON.parse(row.location as string),
    family: JSON.parse(row.family as string),
    lifestyle: JSON.parse(row.lifestyle as string),
    religion: JSON.parse(row.religion as string),
    partnerExpectations: row.partner_expectations as string,
    createdAt: row.created_at as string,
    featured: Boolean(row.featured),
  };
}

export const cloudflareDb: DataLayer = {
  async listProfiles(filter) {
    const db = getD1();
    if (filter?.type) {
      const stmt = db
        .prepare('SELECT * FROM profiles WHERE type = ? ORDER BY created_at DESC')
        .bind(filter.type);
      const { results } = await stmt.all<Record<string, unknown>>();
      return results.map(rowToProfile);
    }
    const { results } = await db
      .prepare('SELECT * FROM profiles ORDER BY created_at DESC')
      .all<Record<string, unknown>>();
    return results.map(rowToProfile);
  },

  async getProfile(id) {
    const db = getD1();
    const row = await db
      .prepare('SELECT * FROM profiles WHERE id = ? OR slug = ? LIMIT 1')
      .bind(id, id)
      .first<Record<string, unknown>>();
    return row ? rowToProfile(row) : null;
  },

  async createProfile(input) {
    const db = getD1();
    const id = crypto.randomUUID();
    const slug = `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${id.slice(0, 4)}`;
    await db
      .prepare(
        `INSERT INTO profiles
        (id, slug, type, name, age, height, marital_status, photos, headline, about,
         education, profession, location, family, lifestyle, religion,
         partner_expectations, created_at, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id,
        slug,
        input.type,
        input.name,
        input.age,
        input.height,
        input.maritalStatus,
        JSON.stringify(input.photos),
        input.headline,
        input.about,
        JSON.stringify(input.education),
        JSON.stringify(input.profession),
        JSON.stringify(input.location),
        JSON.stringify(input.family),
        JSON.stringify(input.lifestyle),
        JSON.stringify(input.religion),
        input.partnerExpectations,
        new Date().toISOString(),
        input.featured ? 1 : 0,
      )
      .run();
    return { ...input, id, slug, createdAt: new Date().toISOString() };
  },

  async updateProfile(id, patch) {
    const existing = await this.getProfile(id);
    if (!existing) return null;
    const merged = { ...existing, ...patch };
    const db = getD1();
    await db
      .prepare(
        `UPDATE profiles SET
          type = ?, name = ?, age = ?, height = ?, marital_status = ?,
          photos = ?, headline = ?, about = ?, education = ?, profession = ?,
          location = ?, family = ?, lifestyle = ?, religion = ?,
          partner_expectations = ?, featured = ?
        WHERE id = ?`
      )
      .bind(
        merged.type,
        merged.name,
        merged.age,
        merged.height,
        merged.maritalStatus,
        JSON.stringify(merged.photos),
        merged.headline,
        merged.about,
        JSON.stringify(merged.education),
        JSON.stringify(merged.profession),
        JSON.stringify(merged.location),
        JSON.stringify(merged.family),
        JSON.stringify(merged.lifestyle),
        JSON.stringify(merged.religion),
        merged.partnerExpectations,
        merged.featured ? 1 : 0,
        id,
      )
      .run();
    return merged;
  },

  async deleteProfile(id) {
    const db = getD1();
    const res = await db.prepare('DELETE FROM profiles WHERE id = ?').bind(id).run();
    return res.success;
  },

  async listInquiries() {
    const db = getD1();
    const { results } = await db
      .prepare('SELECT * FROM inquiries ORDER BY created_at DESC')
      .all<Record<string, unknown>>();
    return results.map((r) => ({
      id: r.id as string,
      name: r.name as string,
      email: r.email as string,
      phone: r.phone as string | undefined,
      subject: r.subject as string | undefined,
      message: r.message as string,
      profileId: r.profile_id as string | undefined,
      createdAt: r.created_at as string,
      status: r.status as Inquiry['status'],
    }));
  },

  async createInquiry(input) {
    const db = getD1();
    const id = crypto.randomUUID();
    await db
      .prepare(
        `INSERT INTO inquiries (id, name, email, phone, subject, message, profile_id, created_at, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')`
      )
      .bind(
        id,
        input.name,
        input.email,
        input.phone ?? null,
        input.subject ?? null,
        input.message,
        input.profileId ?? null,
        new Date().toISOString(),
      )
      .run();
    return { ...input, id, createdAt: new Date().toISOString(), status: 'new' };
  },

  async listUsers() {
    const db = getD1();
    const { results } = await db
      .prepare('SELECT * FROM users ORDER BY joined_at DESC')
      .all<Record<string, unknown>>();
    return results.map((r) => ({
      id: r.id as string,
      email: r.email as string,
      name: r.name as string,
      role: r.role as User['role'],
      status: r.status as User['status'],
      joinedAt: r.joined_at as string,
    }));
  },

  async listJournal() {
    const db = getD1();
    const { results } = await db
      .prepare('SELECT * FROM journal ORDER BY date DESC')
      .all<Record<string, unknown>>();
    return results.map((r) => ({
      id: r.id as string,
      slug: r.slug as string,
      title: r.title as string,
      excerpt: r.excerpt as string,
      body: r.body as string,
      cover: r.cover as string,
      author: r.author as string,
      date: r.date as string,
      readTime: r.read_time as string,
      tags: JSON.parse((r.tags as string) || '[]'),
    }));
  },

  async getJournal(slug) {
    const db = getD1();
    const row = await db
      .prepare('SELECT * FROM journal WHERE slug = ? LIMIT 1')
      .bind(slug)
      .first<Record<string, unknown>>();
    if (!row) return null;
    return {
      id: row.id as string,
      slug: row.slug as string,
      title: row.title as string,
      excerpt: row.excerpt as string,
      body: row.body as string,
      cover: row.cover as string,
      author: row.author as string,
      date: row.date as string,
      readTime: row.read_time as string,
      tags: JSON.parse((row.tags as string) || '[]'),
    };
  },
};
