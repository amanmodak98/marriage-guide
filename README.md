# Marriage Guide

A premium matrimonial platform built with Next.js 14, Tailwind CSS, and TypeScript. Designed as a handcrafted, artisanal alternative to generic matrimonial sites — with a custom admin panel for managing profiles, inquiries, and members.

> **15 pages · 30 rich profiles · Full admin CRUD · Cloudflare-ready data layer**

---

## Stack

- **Framework**: Next.js 14 (App Router) + React Server Components
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS layer (CSS variables, keyframes, glassmorphism, polaroid recipe)
- **Fonts**: Playfair Display, Cormorant Garamond, Cinzel, Italiana (via `next/font`)
- **Animations**: CSS keyframes (`float`, `floatRotate`, `shimmer`, `fadeUp`, `pulseGlow`, `breathe`) + Framer Motion-ready hooks
- **Data**: Pluggable — local JSON now, Cloudflare D1 + R2 later (zero refactor)

---

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

The first time you read data, JSON seed files are created in `/data/` and persist between restarts.

### Demo accounts

| Email | Password | Role |
|---|---|---|
| `admin@marriageguide.in` | `admin123` | Admin (full studio access) |
| `priya.iyer@example.com` | `member123` | Member |

---

## Pages (15)

### Public
| Route | Description |
|---|---|
| `/` | Home — Hero, Featured Matches, Handcrafted Process, Testimonials, CTA |
| `/about` | Our Story, Founder's Note, Values, Team |
| `/how-it-works` | Expanded 4-step process with rich illustrations + FAQ |
| `/brides` | Bride directory with full filter sidebar |
| `/grooms` | Groom directory with full filter sidebar |
| `/profile/[id]` | Detailed biodata with gallery, expectations, similar profiles |
| `/membership` | 3-tier pricing with comparison table |
| `/success-stories` | Couples gallery with story excerpts |
| `/journal` | Editorial blog list with featured post |
| `/journal/[slug]` | Article detail with related posts |
| `/contact` | Form + studio info |
| `/login` | Split-pane sign-in |
| `/register` | Split-pane registration |

### Admin
| Route | Description |
|---|---|
| `/admin` | Dashboard with stats, recent profiles, inquiry preview |
| `/admin/profiles` | Profile CRUD table with search + type filter |
| `/admin/profiles/new` | Create profile (full biodata form) |
| `/admin/profiles/[id]/edit` | Edit any profile |
| `/admin/users` | Member management table |
| `/admin/inquiries` | Inbox with detail panel + status workflow |

### API
| Route | Description |
|---|---|
| `GET /api/profiles` | List profiles (filterable by `?type=bride\|groom`) |
| `POST /api/profiles` | Create profile |
| `GET /api/profiles/[id]` | Get profile |
| `PUT /api/profiles/[id]` | Update profile |
| `DELETE /api/profiles/[id]` | Delete profile |
| `POST /api/auth` | Sign in |
| `PUT /api/auth` | Register |
| `DELETE /api/auth` | Sign out |
| `GET /api/inquiries` | List inquiries |
| `POST /api/inquiries` | Create inquiry (used by contact form) |

---

## Design System

### Colors
- `--crimson` `#8B1E3F` · `--terracotta` `#B23A48` · `--vermilion` `#C75146` · `--rose` `#E8927C`
- `--alabaster` `#FAF7F2` · `--ivory` `#F5EFE6` · `--parchment` `#EDE5D8`
- `--gold` `#C9A961` · `--ink` `#2B1810`

### Typography
- **Display**: Playfair Display 700/900
- **Body**: Cormorant Garamond 400/500
- **Decorative**: Cinzel (caps, labels)
- **Italic accent**: Italiana

### Components
- `Button` — `primary`, `secondary`, `ghost`, `glass`, `outline`, `dark` variants
- `Card` — `paper`, `glass`, `cream`, `dark`, `parchment` variants
- `MandalaSVG` — Procedural traditional mandala, slow-rotation ready
- `FloralOrnament` — Decorative divider
- `ProfileCard` — Polaroid-style with 3D tilt on hover
- `BiodataPanel` — Full profile detail layout
- `Reveal` — IntersectionObserver fade-up wrapper

---

## Data Layer Architecture

The data layer is split behind a single interface (`lib/db.ts`) so the local JSON implementation and the Cloudflare D1 implementation are drop-in swappable.

```
lib/db.ts              ← picks local vs cloudflare based on env
lib/db.local.ts        ← JSON file persistence (default)
lib/db.cloudflare.ts   ← D1 + R2 stub (active when DEPLOY_TARGET=cloudflare)
lib/data.ts            ← seed: 30 profiles, 6 testimonials, 4 success stories, 6 journal entries
lib/types.ts           ← Profile, User, Inquiry, JournalEntry, SuccessStory, Testimonial
```

Switching to Cloudflare requires **zero app-level refactor** — only env vars and the `wrangler.toml` bindings.

---

## Cloudflare Migration

When ready to deploy:

### 1. Initialize Workers project

```bash
npx wrangler init
```

### 2. Create the D1 schema

The D1 schema mirrors `lib/types.ts` exactly. Recommended starter:

```sql
CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  height TEXT,
  marital_status TEXT,
  photos TEXT,             -- JSON array
  headline TEXT,
  about TEXT,
  education TEXT,          -- JSON object
  profession TEXT,         -- JSON object
  location TEXT,           -- JSON object
  family TEXT,             -- JSON object
  lifestyle TEXT,          -- JSON object
  religion TEXT,           -- JSON object
  partner_expectations TEXT,
  created_at TEXT NOT NULL,
  featured INTEGER DEFAULT 0
);

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT,
  joined_at TEXT NOT NULL
);

CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  profile_id TEXT,
  created_at TEXT NOT NULL,
  status TEXT DEFAULT 'new'
);

CREATE TABLE journal (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT,
  cover TEXT,
  author TEXT,
  date TEXT,
  read_time TEXT,
  tags TEXT                 -- JSON array
);
```

### 3. Bind resources in `wrangler.toml`

```toml
[[d1_databases]]
binding = "DB"
database_name = "marriage-guide"
database_id = "..."

[[r2_buckets]]
binding = "PHOTOS"
bucket_name = "marriage-guide-photos"

[[kv_namespaces]]
binding = "SESSIONS"
id = "..."
```

### 4. Activate Cloudflare data layer

Set in Cloudflare Pages environment:

```
DEPLOY_TARGET=cloudflare
```

The app will automatically use `lib/db.cloudflare.ts`.

### 5. Migrate photos to R2

Photos live at image URLs in the seed (Unsplash placeholders). For production, upload to R2 and replace URLs with `https://photos.yourdomain.com/<key>` (or use R2 public bucket + custom domain).

---

## Local Development Notes

- Seed data is auto-created in `/data/*.json` on first read. Delete those files to re-seed.
- The grain texture overlay (`body::before` in `globals.css`) is purely CSS — no images.
- Mandalas in Hero use the `MandalaSVG` React component, not images — fully scalable.
- All photography uses Unsplash placeholder URLs in the seed (free, no key needed).

---

## File Structure

```
marriage-guide/
├── app/                              # Next.js App Router
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx                      # /
│   ├── about/page.tsx                # /about
│   ├── how-it-works/page.tsx         # /how-it-works
│   ├── brides/page.tsx               # /brides
│   ├── grooms/page.tsx               # /grooms
│   ├── profile/[id]/page.tsx         # /profile/:id
│   ├── membership/page.tsx           # /membership
│   ├── success-stories/page.tsx      # /success-stories
│   ├── journal/page.tsx              # /journal
│   ├── journal/[slug]/page.tsx       # /journal/:slug
│   ├── contact/page.tsx              # /contact
│   ├── login/page.tsx                # /login
│   ├── register/page.tsx             # /register
│   ├── admin/                        # /admin/*
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── profiles/
│   │   ├── users/
│   │   └── inquiries/
│   ├── api/                          # API routes
│   │   ├── profiles/route.ts
│   │   ├── profiles/[id]/route.ts
│   │   ├── auth/route.ts
│   │   └── inquiries/route.ts
│   └── not-found.tsx
├── components/
│   ├── layout/      # Header, Footer, AdminSidebar
│   ├── home/        # Hero, FeaturedMatches, HandcraftedProcess, Testimonials, CTASection
│   ├── profiles/    # ProfileCard, ProfileFilters, BiodataPanel, DirectoryClient
│   ├── admin/       # AdminProfilesClient, AdminInquiriesClient, ProfileForm
│   └── ui/          # Button, Card, MandalaSVG, FloralOrnament, Input, Reveal
├── lib/
│   ├── db.ts              # data layer interface
│   ├── db.local.ts        # local JSON implementation
│   ├── db.cloudflare.ts   # D1 + R2 implementation
│   ├── data.ts            # seed data (30 profiles)
│   ├── types.ts
│   ├── auth.ts
│   └── utils.ts
├── data/             # auto-created on first read
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

---

## What's Handled

- ✅ 15 pages with rich, distinct content
- ✅ 30 profiles with comprehensive biodata (15 brides + 15 grooms)
- ✅ Filter sidebar with 7 dimensions + search + sort
- ✅ Polaroid-style profile cards with 3D tilt on hover
- ✅ Glassmorphism panels, grain texture overlay, custom animations
- ✅ Full admin CRUD for profiles
- ✅ Admin inquiries inbox with status workflow
- ✅ Cookie-based session auth (demo)
- ✅ Contact form writes to JSON store
- ✅ Responsive mobile + desktop layouts
- ✅ Pluggable data layer for Cloudflare migration
- ✅ SEO metadata per route
- ✅ 404 page

## What's Out of Scope (For Now)

- Real payment processing (Stripe checkout stubbed UI)
- Real email sending (inquiries stored locally only)
- Real image upload (URL inputs only; R2 widget when migrating)
- Multi-language support
- Native mobile app
