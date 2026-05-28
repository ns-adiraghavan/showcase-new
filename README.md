# Netscribes Showcase — Dev Reference

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `src/App.jsx` | Main showcase — Content, Insights, Design, Videos, Social |
| `/research` | `src/Research.jsx` | Research capabilities microsite |

Routing is handled in `src/main.jsx` via a `window.location.pathname` switch — no React Router dependency.

---

## Brand Colours

```js
const NS = {
  blue:      "#005F86",   // primary brand blue
  blueDeep:  "#003A52",   // dark navy
  blueSoft:  "#1A8AB5",   // mid blue
  red:       "#C9252B",   // brand red / CTA
  redDeep:   "#8C1A1F",
  redSoft:   "#E55A60",
  paper:     "#F5F1EA",   // page background
  paperDeep: "#EDE7DB",   // section background variant
  surface:   "#FFFFFF",   // card background
  ink:       "#0F1B27",   // primary text
  inkSoft:   "#3C4754",   // secondary text
  muted:     "#6E7884",   // captions, labels
  rule:      "rgba(0,95,134,0.13)",   // borders
  ruleSoft:  "rgba(0,95,134,0.07)",   // subtle dividers
};
```

Extended accent palette (used in `/research`):

```js
const ACCENT = {
  teal:   "#0B7B6B",
  amber:  "#B85C00",
  slate:  "#3B5068",
  plum:   "#5C3472",
  forest: "#2D6B4A",
  steel:  "#1E4976",
};
```

---

## Typography

Loaded via Google Fonts — import is in `GlobalStyles()` in `App.jsx` and inline in `Research.jsx`:

```
Instrument Serif — display headings (italic variant used for hero emphasis)
DM Sans          — all body copy, UI labels, navigation
JetBrains Mono   — code/mono contexts (App.jsx only)
```

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap
```

---

## Assets

### Logo
`src/assets/netscribes-logo.png` — imported as a module, used in nav across both routes.

### Thumbnails
Served as static files from `public/thumbnails/`. Referenced in `App.jsx` via the `THUMBNAILS` map:

```
public/thumbnails/
  content/
    thought_leadership/   Whitepaper, POV, TL_Blog, ebook
    short-form/           Case_Study, Emailer, Video_Script, brochure
  GTM/                    GTM, Industry Analysis, Competitive Intelligence & Benchmarking,
                          Consumer Research, AI Readiness Assessment
  design/                 Infographics, PPT, Report design, Event based assets,
                          Print publications, web-banner
  video/                  Motion graphics, Footage-Image based, Reels and shorts,
                          Podcast, Training videos, Whiteboard animation, character_animation
  social/                 Static post, Carousel, GIFs, Teaser, Memes, Corporate comics
```

---

## Google Drive Embeds

All case study previews use Google Drive's iframe embed pattern:

```
Embed:  https://drive.google.com/file/d/{FILE_ID}/preview
View:   https://drive.google.com/file/d/{FILE_ID}/view
```

Files must be shared as **"Anyone with the link — Viewer"** for the embed to render.

The `driveFile(id)` helper in both `App.jsx` and `Research.jsx` generates both URLs from a single ID.

### Missing Drive link (as of May 2026)
One case study in the research data has a placeholder embed that needs a valid Drive file to be shared:
- **"Go-to-Market Study for iPSC Stem Cell Therapies"** — ID `15mnFz9OQofDnNnDk7HzHEt57lFYvcNfm`

---

## Data Structure

### Main showcase (`App.jsx`)
All samples live in the `CURATED` object, keyed by category then format:
```js
CURATED.content["Whitepapers"]  → array of { title, desc, industry, driveEmbedUrl, driveViewUrl }
CURATED.gtm["Industry Analysis"] → array of { ... }
CURATED.design[...]
CURATED.videos[...]
CURATED.social[...]
```

Industry filter IDs: `tech | auto | telecom | bfsi | mfg | health | retail`

### Research microsite (`Research.jsx`)
Flat array `RESEARCH_DATA` — each entry:
```js
{
  title, desc,
  industry,   // auto | bfsi | tech | telecom | health | mfg | retail | fnb
  studyType,  // "Industry Analysis" | "GTM" | "Competitive Benchmarking" | "Consumer Research" | "AI Readiness"
  geo,        // array — "North America" | "Europe" | "Middle East" | "Africa" | "South Asia" | "Southeast Asia" | "Asia" | "Global"
  primaryType, // "B2B" | "B2C" | null (secondary only)
  driveEmbedUrl,
  driveViewUrl,
}
```

---

## Build & Local Dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # preview production build locally
```

Stack: Vite 7 · React 19 · no UI library · inline styles throughout.
