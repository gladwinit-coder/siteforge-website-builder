# SiteForge — Static Website Builder & Publisher SaaS

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gladwinit-coder/siteforge-website-builder)

## Overview
Full SaaS platform: build and publish static websites for any business. Enter details, pick a template, generate AI content, upload images, deploy to your GoDaddy domain (maize-cargo.com) in minutes.

## Tech Stack
- **Next.js 14** + Tailwind CSS
- **NextAuth.js v5** — JWT, Admin/User roles
- **MongoDB + Mongoose** — database
- **Cloudinary** — image upload & auto-compress
- **OpenAI GPT-4o** — AI content generation
- **Vercel API** — programmatic static site deploy
- **GoDaddy DNS** — domain connection guide

## Quick Start
```bash
git clone https://github.com/gladwinit-coder/siteforge-website-builder
cd siteforge-website-builder
npm install
cp .env.example .env.local
npm run dev
```

## GoDaddy DNS for maize-cargo.com
```
Type: A     | Host: @   | Value: 76.76.21.21          | TTL: 600
Type: CNAME | Host: www | Value: cname.vercel-dns.com | TTL: 600
```

## Env Variables
```
NEXTAUTH_SECRET, MONGODB_URI, CLOUDINARY_*, OPENAI_API_KEY, VERCEL_API_TOKEN
```

See docs/ for full setup guide.# SiteForge — Static Website Builder & Publisher SaaS

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gladwinit-coder/siteforge-website-builder)

## Overview
Full SaaS to build and publish static websites. Pick a template, generate AI content, deploy to GoDaddy domain (maize-cargo.com) instantly.

## Tech Stack
- Next.js 14 + Tailwind CSS
- NextAuth.js v5 — JWT auth, Admin/User roles
- MongoDB + Mongoose
- Cloudinary — image upload & compress
- OpenAI GPT-4o — AI content generation
- Vercel API — programmatic deploy

## Quick Start
```bash
git clone https://github.com/gladwinit-coder/siteforge-website-builder
npm install && npm run dev
```

## GoDaddy DNS (maize-cargo.com)
```
A Record:     @ → 76.76.21.21
CNAME Record: www → cname.vercel-dns.com
```

## Environment Variables
```env
NEXTAUTH_SECRET=
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
OPENAI_API_KEY=
VERCEL_API_TOKEN=
```

See docs/SETUP-GUIDE.md for the full technical guide.
