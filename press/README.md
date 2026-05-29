# Press Releases — Workflow

Each press release is one HTML file in this folder. The site is fully static; adding a new release means committing one file (plus a small edit to the homepage). Vercel auto-deploys within ~30 seconds of the GitHub commit.

## Files in this folder

- `_template.html` — copy this when starting a new release. Don't edit this file directly.
- `press.css` — shared styling for all press release pages. Don't touch unless you want to change the visual treatment of every release.
- `2026-MM-DD-slug.html` — actual press releases. Filename convention: date prefix (sorts chronologically) + kebab-case slug.

## Adding a new press release

### Step 1: Create the release file

1. In GitHub, navigate to `/press/` in the repo.
2. Click `_template.html` → click the pencil icon (Edit this file) → at the top of the page, click the filename and rename it to `YYYY-MM-DD-your-slug.html` (e.g. `2026-08-15-orlando-launch-event.html`).
3. Replace the placeholder content (headline, subhead, dateline, body, quote, contact). Leave the "About Foil Racing League" boilerplate as-is unless something material changes about the league.
4. Scroll down → commit message → "Commit changes."

### Step 2: Add the release to the homepage

The homepage shows recent press releases. Each release is a `<article class="press-card">` block in the Press section of `/index.html`.

1. Open `/index.html` in the GitHub editor.
2. Search for `<!-- ============ PRESS ============ -->`.
3. Inside the `<div class="press-grid">`, **add a new `<article>` at the TOP** (most recent first):

```html
<article class="press-card reveal">
  <div class="press-card__dateline">MIAMI, FL · MONTH DAY, YEAR</div>
  <h3 class="press-card__title">Your headline here</h3>
  <p class="press-card__excerpt">1-2 sentence excerpt of the release.</p>
  <a class="press-card__link" href="press/YYYY-MM-DD-your-slug.html">Read release →</a>
</article>
```

4. Commit.

That's it. Vercel rebuilds and the release goes live within ~30 seconds.

## Conventions

- **Dateline:** Always `MIAMI, FL — Month Day, Year —` (full month name, em dashes around the date).
- **Headline:** Initial caps. No trailing period. Aim for under 100 characters.
- **Filename:** `YYYY-MM-DD-kebab-case-slug.html`. Date prefix is sortable.
- **Section breaks:** The `<h2 class="release__subheadline">` is used for "About FRL" and "Media Contact" only. Don't add other subheadings unless the release is long enough to need them.
- **Ending:** Always `###` centered. It's the journalistic convention for "end of release."

## House style

- "Foil Racing League" on first mention. "FRL" thereafter.
- "Flatwater venues" or "venues" — never "lakes" as a generic noun. Proper nouns stay: Lake Tahoe, Lake Mead, Lake Austin, etc.
- "Pump foil" and "eFoil" are distinct categories. Don't conflate them.
- Quotes: attribute by name and title. "Jamie, founder of Foil Racing League" on first mention.

## Homepage display

The homepage Press section shows the 3 most recent releases. When you add a fourth, **delete the oldest entry from the homepage** (the file in `/press/` stays — only the homepage card is removed). All releases remain accessible by direct URL.

## Future / when this gets annoying

If the volume of releases grows past ~15-20 and the manual homepage edit becomes tedious, we'll add Decap CMS — a free visual editor that commits to this same repo. Or build a real admin then. For now, the file-based workflow is the right architecture.
