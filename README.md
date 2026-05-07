# FRL — Foil Racing League website

A static one-page site. No build step. Drop the folder onto any static host.

## Files

```
frl-site/
├── index.html      The whole site, single page
├── styles.css      All styling
├── script.js       Scroll reveals, sticky nav, count-up animations
├── assets/
│   └── frl-logo.png
└── README.md
```

## Local preview

Open `index.html` directly in a browser, or run a local server from the folder:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000

# Or with Node
npx serve .
```

## Deploy to Vercel

The simplest path:

1. Sign in at vercel.com
2. Click "Add New" → "Project"
3. Drag this folder into the import area, or push it to a GitHub repo and import that
4. Vercel auto-detects it as a static site and ships it. No framework selection needed.

Or with the CLI:

```bash
npm i -g vercel
cd frl-site
vercel
```

Follow the prompts. Subsequent deploys: `vercel --prod`.

## Deploy elsewhere

Identical drag-and-drop setup works on:
- **Netlify** — netlify.com → drag folder into the dashboard
- **Cloudflare Pages** — pages.cloudflare.com
- **GitHub Pages** — push to a repo and enable Pages on the main branch
- **Any static file server** (S3, nginx, Apache)

## Editing content

All copy, stats, and the tour calendar live in `index.html`. Search for the section comments (e.g. `<!-- ============ TOUR ============ -->`) to find what you want to edit.

To swap the logo, replace `assets/frl-logo.png` with a same-named file.

## Custom domain on Vercel

In the Vercel project settings → Domains → add your domain. Vercel walks you through DNS records.

## Browser support

Modern evergreen browsers. Uses CSS Grid, IntersectionObserver, backdrop-filter. Safari 14+, Chrome 88+, Firefox 103+, Edge 88+.
