# PackStudio 3D

Professional 3D cosmetic packaging design platform for beauty brands.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type checking

## Project Structure

```
src/
├── content/blog/         # Blog posts (Markdown)
├── layouts/              # Page layouts
├── pages/
│   ├── index.astro       # Landing page
│   └── blog/             # Blog pages
└── styles/               # Global styles
public/
├── images/               # Static images
└── favicon.svg           # Site favicon
```

## Adding Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: 'Your Post Title'
description: 'Brief description for SEO'
pubDate: 2025-01-15
author: 'Your Name'
tags: ['tag1', 'tag2']
---

Your content here...
```

## Google Sheets Waitlist

1. Create a Google Form with an email field
2. Get the form URL and entry ID
3. Update `src/pages/index.astro`:

```javascript
const FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
const EMAIL_FIELD = 'entry.YOUR_EMAIL_ENTRY_ID';
```

## Deploy

Built files are in `dist/`. Deploy to any static host:

- Vercel: `vercel --prod`
- Netlify: `netlify deploy --prod --dir=dist`
- Cloudflare Pages: `npx wrangler pages deploy dist`
