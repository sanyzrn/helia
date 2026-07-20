# Helia Namazi — Personal Website

Official bilingual portfolio / résumé site for **Helia Namazi** (هلیا نمازی), Ph.D. in Pharmaceutical Biotechnology, Regulatory Affairs & R&D Manager.

Live site: [helianamazi.ir](https://www.helianamazi.ir)

## What it is

A static personal website showcasing:

- Professional profile and career highlights
- Education, experience, certificates, and skills
- Training courses and product development work
- Honors, theses, and selected publications
- Contact details and downloadable résumé (Persian / English)

The site supports **Persian (RTL)** and **English (LTR)**, plus light/dark theme.

## Tech stack

| Layer | Technology |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 (custom properties, no framework) |
| Behavior | Vanilla JavaScript (ES6+, no build step) |
| Fonts | Vazirmatn (local WOFF2) |
| Content | `data.js` → rendered by `render.js` |

No Node, React, or bundler required — open `index.html` or serve the folder with any static host.

## Project structure

```
.
├── index.html          # Page shell, SEO meta, nav, section placeholders
├── style.css           # Layout, themes, animations
├── data.js             # All bilingual résumé content
├── render.js           # Builds section DOM from SITE_DATA
├── script.js           # Theme, language, nav, scroll effects
├── favicon.svg
├── Drhelianamazi.jpg   # Profile photo
├── resume_fa.pdf       # Persian CV
├── resume_en.pdf       # English CV
└── font/               # Local Vazirmatn font files
```

## How to run locally

```bash
# Option A — any static server
npx serve .

# Option B — Python
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or the port your server prints).

## Editing content

Update résumé text in **`data.js` only**. Each field has `fa` and `en` strings. Reload the page — `render.js` rebuilds the sections automatically.

## Features

- Bilingual UI with language toggle (persisted in `localStorage`)
- Light / dark theme (respects system preference on first visit)
- Responsive layout and compact mobile navigation
- Scroll progress, reveal animations, interactive experience timeline
- Print / PDF résumé links
- Schema.org Person JSON-LD for SEO
