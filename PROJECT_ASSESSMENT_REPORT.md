# Project Assessment Report — Portfolio Website

**Repository:** `AtikHasan16/Portfolio-me`
**Live site:** https://portfolio-atikhasan.netlify.app/
**Assessment date:** 21 November 2026
**Scope:** full read-only technical audit — source, config, build, dependencies, live deployment, external assets, accessibility

---

## 1. Executive summary

A well-presented personal portfolio built on a modern stack (React 19 + Vite 7 + Tailwind 4 + daisyUI 5). Lint is clean, the production build completes in 2.78 s, and the design, copywriting, and content depth are above average for a junior portfolio.

The weaknesses are **production hygiene**, not craftsmanship:

- All four project screenshots on the live site are **dead** (HTTP 404) and render as 180×180 placeholder boxes.
- The Twitter card image is **broken** (resolves to HTML, not an image).
- `npm audit` reports **21 vulnerabilities**, including 1 critical.
- The hero portrait is **3 MB** — larger than the entire JavaScript bundle.

The site's most visually prominent section currently shows four identical grey broken-image boxes.

### Overall grade: **C+ (68/100)**

| Dimension | Grade | Note |
|---|---|---|
| Design & UX | A− | Strong aesthetic, consistent theme, good typography |
| Content & copy | A− | Distinct voice, real projects, full résumé page |
| Build & lint health | A | Clean lint, fast build, no compile errors |
| Code quality / structure | C+ | Duplicated data fetching, dead code, no tests |
| Performance | C | 3 MB hero image, 433 kB JS, no lazy loading |
| SEO / social | D+ | Broken Twitter image, no robots/sitemap, duplicate meta |
| Security / dependencies | D | 1 critical, 14 high vulnerabilities |
| Accessibility | C− | 2 serious axe violations, 4 unlabelled links |
| Production correctness | D | All project images 404 on the live site |

---

## 2. Project overview

| Item | Value |
|---|---|
| Type | Single-page portfolio / résumé site |
| Stack | React 19.2.1, Vite 7.2.6, React Router 7.10.1, Tailwind CSS 4.1.17, daisyUI 5.5.8, `motion` 12.23.25, react-icons 5.5.0 |
| Routes | `/`, `/works`, `/about`, `/contacts` |
| Source size | ~1,300 LOC across 30 tracked files |
| Git | 42 commits, single branch `main`, `2025-12-05` → `2025-12-23` |
| Tests | **none** — no `test` script, no test files |
| CI | **none** — `.github/` does not exist |
| Deployment | Netlify, SPA fallback via `public/_redirects` |

### Architecture

```
main.jsx → RouterProvider (BrowserRouter)
          → RootLayout (fixed Navbar + <Outlet/> + Footer + decorative line)
          → /  /works  /about  /contacts
```

Project data is fetched at runtime from `/projects.json` — but from **two separate components** (`Projects.jsx` and `Works.jsx`) with duplicated logic and no loading or error states. `Works.jsx` additionally carries a hardcoded `smallProjects` array that duplicates the unused `public/falcon_template.json`.

Metadata is injected by a `MetaData` component that renders `<title>` and `<meta>` tags inside a `<div>` in the React tree.

---

## 3. Build and runtime verification

```
npm run lint    → exit 0, zero problems
npm run build   → success in 2.78 s, 455 modules
```

| Output | Size | Gzip |
|---|---|---|
| `dist/index.html` | 4.94 kB | — |
| CSS bundle | 46.97 kB | 8.82 kB |
| JavaScript bundle | **433.38 kB** | 137.82 kB |
| `myImage-CUXxlz77.png` | **3,077.89 kB** | — |
| Resume PDF | 147.78 kB | — |

One build warning: `Unknown at rule: @property` — emitted by daisyUI's CSS, cosmetic only.

### Live deployment probes

- All four routes return `200` in ~1.07 s (SPA fallback working).
- `/projects.json` → `200` (2,366 bytes).
- `/favicon.svg` → `200`.
- No horizontal overflow at a 490 px viewport (document width 475 px).
- Page title renders correctly per route (`Atik Hasan | Home`, `| About`, …).
- Console on page load: **4 × `Failed to load resource: 404`** — the broken project images.

---

## 4. Findings by severity

### 4.1 🔴 Critical

#### C1 — All four project screenshots are dead

Every `image` URL in `public/projects.json` points at `i.ibb.co.com`. All four return **404**, verified with and without a browser User-Agent/Referer, and on the alternate `i.ibb.co` host:

| Project | URL | Status |
|---|---|---|
| LoanLink | `https://i.ibb.co.com/p6KKNtfm/Screenshot-2025-12-19-224526.png` | **404** |
| WristLook | `https://i.ibb.co.com/TqT8pbpF/project-1.png` | **404** |
| PawMart | `https://i.ibb.co.com/1HJVHbv/Screenshot-2025-11-19-192116.png` | **404** |
| LeafStore | `https://i.ibb.co.com/twWnYGHZ/project-2.png` | **404** |

The images render at ImgBB's 404 placeholder natural size of **180×180 px**. Because this component renders on both the home page and `/works`, the site's most visually prominent section shows four identical grey broken boxes on two separate pages.

**Impact:** severe. This is the first thing a recruiter sees.

**Fix:** host screenshots locally under `public/projects/` as WebP (≤ 200 kB each at ~1200 px wide). Never hotlink a free image host.

---

#### C2 — `jspdf` 3.0.4 carries a critical advisory and is not used

`npm audit` flags `jspdf` at **critical** severity. It is a direct dependency but is imported nowhere in `src/`. It is dead weight plus a live vulnerability surface.

**Fix:** remove from `package.json`. If PDF export is ever needed, upgrade to ≥ 4.2.1.

---

#### C3 — Broken Twitter card image

In `index.html`, both `og:image` and `twitter:image` point at `/src/assets/myImage.png` — a **development-only path**. Confirmed in the built output:

```html
<meta property="og:image"      content="/assets/myImage-CUXxlz77.png" />   <!-- Vite rewrote this — works -->
<meta property="twitter:image" content="/src/assets/myImage.png" />        <!-- untouched — broken -->
```

Vite rewrites `og:image` at build time but leaves `twitter:image` alone. On the live site `/src/assets/myImage.png` returns the **SPA fallback HTML** (`200 text/html`, 5,261 bytes), so X/Twitter renders no preview image.

**Fix:** point both tags at the absolute production URL of the built asset, e.g. `https://portfolio-atikhasan.netlify.app/assets/myImage-CUXxlz77.png` — or better, move the social card to `public/og-image.png` with a stable, unhashed name.

---

### 4.2 🟠 High

#### H1 — 21 dependency vulnerabilities

`npm audit`: **1 critical, 14 high, 5 moderate, 1 low**.

| Package | Version | Severity | Action |
|---|---|---|---|
| `jspdf` | 3.0.4 | **critical** | remove (unused) |
| `react-router` | 7.10.1 | high | upgrade |
| `react-router-dom` | 7.10.1 | high | remove (redundant) |
| `vite` | 7.2.6 | high | upgrade |

Most of the remainder are transitive and resolve once the above are updated.

#### H2 — 3 MB hero image

`src/assets/myImage.png` is **2053 × 2945 px** at **2.94 MB** — larger than the entire JavaScript bundle. PNG format, no `srcset`, no responsive variants, served on every home-page visit.

WebP/AVIF at 2× display size should land around **150–250 kB**, roughly a 92 % reduction.

#### H3 — Hotlinked third-party assets are an unowned dependency

The project images depend on an ImgBB account you do not control. This is exactly how C1 happened. Anything you don't host, you don't own.

#### H4 — Three sources of truth for one dataset

1. `public/projects.json` — fetched by `Projects.jsx`
2. `public/projects.json` — fetched **again** by `Works.jsx`, with separate duplicated logic
3. A hardcoded `smallProjects` array inside `Works.jsx` that mirrors the unused `public/falcon_template.json`

Neither fetch has a loading skeleton or an error fallback — a failed request silently renders nothing.

---

### 4.3 🟡 Medium

#### M1 — Tech labels are corrupted

`ProjectCard.jsx:19` performs `{tech.split(" ").join(",")}`. Every multi-word label is mangled. Confirmed in the live DOM:

| In `projects.json` | Rendered on site |
|---|---|
| `Firebase Auth` | `Firebase,Auth` |
| `Tailwind CSS` | `Tailwind,CSS` |
| `TanStack Query` | `TanStack,Query` |
| `React Router` | `React,Router` |

**Fix:** render `{tech}` directly.

#### M2 — Head tags injected through React, invalidly

`MetaData.jsx` renders `<title>` and `<meta>` inside a `<div>` in the React tree. React does not hoist these; the site relies on React 19's limited metadata hoisting.

Observed consequence on `/about`: **duplicate** `description`, `keywords`, and `author` meta tags — and the page carries the *Works* page's copy ("A collection of my recent projects…", keywords "…Works, Projects…"). `/contacts` carries Home copy. Duplicate `<meta name="description">` is a genuine SEO defect.

**Fix:** use React 19 native metadata without the wrapper `<div>`, or adopt `react-helmet-async`. Give each route unique copy.

#### M3 — `PageTransition` never exits

`PageTransition.jsx:9` defines an `exit` animation, but there is no `<AnimatePresence>` wrapper anywhere in the app, so exit animations never run. Pages only fade in.

**Fix:** wrap the routed outlet in `<AnimatePresence mode="wait">` keyed on `location.pathname`, or delete the `exit` prop.

#### M4 — Undefined CSS variable

`src/index.css:24` sets `background-color: var(--custom-a0)`, but only `--custom-a10`, `--custom-a20`, and `--custom-a30` are defined. The base background silently falls back to a transparent/inherited value.

**Fix:** define `--custom-a0` in the daisyUI theme block.

#### M5 — Dead code and unused dependencies

| Item | Status |
|---|---|
| `src/App.jsx` (empty fragment) | imported by `main.jsx`, never rendered |
| `src/App.css` | empty file |
| `src/Contexts/Context` | empty directory |
| `src/Contexts/Provider` | empty directory |
| `src/assets/project-1.png`, `project-2.png`, `project-3.png` | unreferenced, 1.76 MB each |
| `src/assets/react.svg` | unreferenced |
| `public/falcon_template.json` | unreferenced |
| `jspdf` | unused dependency |
| `react-spinners` | unused dependency |
| `@fontsource/fira-code` | unused dependency |
| `react-router-dom` | redundant with `react-router` |

Removing these shrinks the repo, shortens install time, and eliminates C2 outright.

#### M6 — Inconsistent contact details

| Field | Value A | Value B |
|---|---|---|
| Email | `hasan.atik.sn@gmail.com` (Footer, About) | `mhasan16atik@gmail.com` (Contacts) |
| LinkedIn | `/in/hasan-md-atik/` (Footer, About) | `/in/md-atik-hasan-a4b1b5335/` (Contacts, README) |
| Location | "Dhaka, Bangladesh" (AboutMe) | "Shihata, Melandah, Jamalpur" (About) |

A recruiter encountering two different email addresses on one portfolio is a credibility problem.

**Fix:** pick one of each and centralise in `src/constants.js`.

#### M7 — No custom 404 page

Unknown routes hit React Router's default error screen:

> **Unexpected Application Error!**
> 404 Not Found
> 💿 Hey developer 👋
> You can provide a way better UX than this when your app throws errors by providing your own `ErrorBoundary` or `errorElement` prop on your route.

A developer-facing debug message is shown to visitors. This also occurs because `/works` and `/contacts` have no `errorElement` configured.

**Fix:** add `errorElement` to the root route with a branded 404.

---

### 4.4 🔵 Low

| ID | Finding |
|---|---|
| L1 | `RootLayout.jsx:19` uses the invalid Tailwind class `left- lg:left-10` (stray `left-`). Harmless, but a typo in shipped output. |
| L2 | Navbar's EN/BN language dropdown does nothing — a dead control on every page. |
| L3 | `Hero.jsx:4` and `PageTransition.jsx:1` carry `eslint-disable-next-line no-unused-vars` comments that suppress nothing. |
| L4 | README drift: documents `src/Pages/` (actual: `src/pages`), references `tailwind.config.js` which does not exist (Tailwind 4 is CSS-first), and claims "90+ Lighthouse" with no evidence in the repo. |
| L5 | Commit authorship split across three identities: `Hasan MD Atik` (42), `AtikHasan16` (1), `MD Atik Hasan` (1). |
| L6 | Two font strategies at once: Google Fonts `<link>` for JetBrains Mono in `index.html`, plus an unused `@fontsource/fira-code` dependency. |
| L7 | No `loading="lazy"`, `width`, `height`, or `srcset` on any `<img>`. This is also why broken images don't reserve layout space. |

**Encoding note:** `public/projects.json` is valid UTF-8 — the em-dash in "lifecycle—from" verified as code point `U+2014` with no replacement characters. Any mojibake seen in a terminal is a console display artifact, not file corruption. Nothing to fix.

---

## 5. Accessibility assessment

Verified with axe-core 4.10.2 (WCAG 2.0/2.1 A + AA + best-practice) against the built production site, on all four routes.

| Rule | Impact | Nodes | Pages affected |
|---|---|---|---|
| `link-name` — links must have discernible text | **serious** | 4 | all four |
| `aria-command-name` — ARIA commands need accessible names | **serious** | 1 | all four |
| `landmark-no-duplicate-contentinfo` | moderate | 1 | all four |
| `landmark-contentinfo-is-top-level` | moderate | 1 | all four |
| `landmark-unique` | moderate | 1 | all four |
| `heading-order` (h1 → h3 skip) | moderate | 1 | `/`, `/contacts` |
| `page-has-heading-one` | moderate | 1 | `/works` only |

### Detail

- **4 unlabelled social links in the footer.** The GitHub, LinkedIn, Facebook, and Discord links contain only an `<img>` with no `alt` and no `aria-label`. Screen readers announce "link, link, link, link".
- **Language dropdown button** (`.btn-circle`) is icon-only with no accessible name.
- **Duplicate `contentinfo` landmark.** `Footer.jsx` nests a `<footer>` inside a `<footer>`, producing two `contentinfo` roles, one of which is not top-level and neither of which is uniquely labelled.
- **`/works` has no `h1`** at all — the page starts at `h2`.
- **Heading order skips** `h1 → h3` on `/` and `/contacts`.

### Positives

Semantic `header` / `main` / `footer` landmarks are present on every route. All project images have `alt` text. Three of four routes have exactly one `h1`.

---

## 6. SEO assessment

| Item | Status |
|---|---|
| Per-route `<title>` | ✅ works |
| `meta description` | ⚠️ duplicated on `/about`; wrong-page copy on `/about` and `/contacts` |
| `og:*` tags | ✅ present; `og:image` resolves |
| `twitter:image` | ❌ returns HTML — card broken (C3) |
| `<link rel="canonical">` | ❌ absent |
| `robots.txt` | ❌ missing — SPA fallback returns **HTML with status 200** |
| `sitemap.xml` | ❌ missing — same |
| JSON-LD structured data | ✅ `Person` / `WebSite` / `ProfilePage` graph present |
| `meta robots` | ✅ `index, follow` |

The missing `robots.txt` returning `200 text/html` is worse than a 404: crawlers receive an unparseable file instead of a clear "not found".

**Fix:** add `public/robots.txt` and `public/sitemap.xml`, and ensure static files win over the `_redirects` catch-all.

---

## 7. Performance assessment

| Factor | Finding |
|---|---|
| Hero image | 2.94 MB PNG at 2053×2945 — the single largest asset, bigger than all JS combined |
| JS bundle | 433.38 kB (137.82 kB gzip) — heavy for a 4-page static site; `motion` and `react-icons` are the main contributors |
| CSS bundle | 46.97 kB (8.82 kB gzip) — reasonable |
| Image optimisation | none — no WebP/AVIF, no `srcset`, no compression pipeline |
| Lazy loading | none — every image loads eagerly |
| Route splitting | none — all four pages ship in one bundle, including the 479-line `/about` page |
| Build time | 2.78 s — fast |
| Fonts | dual strategy (Google Fonts `<link>` + unused `@fontsource` package) adds an extra blocking request |

**Opportunity:** `React.lazy` on `/about` plus responsive WebP images would meaningfully improve load, since a recruiter almost never lands there first.

---

## 8. Prioritised remediation roadmap

### P0 — this weekend (site is visibly broken without it)

1. Replace all four `projects.json` image URLs with locally hosted WebP files in `public/projects/` (≤ 200 kB each, ~1200 px wide).
2. Fix `twitter:image` to an absolute production URL; add `<link rel="canonical">`.
3. Remove `jspdf` from `package.json` (unused + critical advisory).
4. Run `npm audit fix`; upgrade `vite` and `react-router`; drop `react-router-dom` and import everything from `react-router`.
5. Compress `myImage.png` → WebP/AVIF at ~250 kB.

**Estimated effort: 2–4 hours.** Removes the critical finding, the broken visuals, and approximately 20 of 21 vulnerabilities.

### P1 — next week (structural correctness)

6. Collapse project data into **one source**: keep `public/projects.json`, delete the `Works.jsx` hardcoded array and `public/falcon_template.json`, extract a shared `useProjects()` hook with loading and error states.
7. Fix `ProjectCard.jsx:19` → render `{tech}` directly.
8. Add `errorElement` / `ErrorBoundary` with a branded 404 to the root route.
9. Add `public/robots.txt` and `public/sitemap.xml`; adjust `_redirects` so static files take precedence.
10. Fix `MetaData`: remove the wrapper `<div>`, give each page unique description and keywords.
11. Unify email, LinkedIn, and location into `src/constants.js`.

**Estimated effort: 1 day.**

### P2 — polish

12. Add `<AnimatePresence mode="wait">` in `RootLayout` keyed on `location.pathname`; otherwise delete the `exit` prop.
13. Define `--custom-a0` in `index.css`.
14. Delete `App.jsx`, `App.css`, `src/Contexts/*`, unused PNGs, `react.svg`, and the unused `react-spinners` and `@fontsource/fira-code` dependencies.
15. Add `aria-label` to the four footer social links and the language button.
16. Collapse the nested `<footer>` into a single `contentinfo` landmark.
17. Add an `<h1>` to `/works`; fix the `h1→h3` skips on `/` and `/contacts`.
18. Remove the dead language dropdown or implement it.
19. Fix the `left- lg:left-10` typo in `RootLayout.jsx`.
20. Add `loading="lazy"` plus `width`/`height` to all non-hero images.
21. Update the README to match reality.

### P3 — professional upgrade

22. Add a **GitHub Actions workflow** running `lint` and `build` on every push. A portfolio repo with CI signals engineering discipline more than any individual feature.
23. Add **Vitest + React Testing Library** for `useProjects`, `ProjectCard`, and route rendering.
24. Introduce **TypeScript** or JSDoc types for the project data shape.
25. Code-split the `/about` route with `React.lazy`.
26. Normalise git authorship so the contribution graph credits one identity.

---

## 9. Quick-win checklist (under 30 minutes, high visible impact)

- [ ] Replace the four dead project images
- [ ] Fix `twitter:image`
- [ ] Render `{tech}` instead of `tech.split(" ").join(",")`
- [ ] Remove `jspdf` and run `npm audit fix`
- [ ] Add `aria-label` to the four footer social links and the language button
- [ ] Add `public/robots.txt` and `public/sitemap.xml`
- [ ] Delete `App.jsx`, `App.css`, and the empty `Contexts` folders
- [ ] Compress the hero portrait
- [ ] Add an `<h1>` to `/works`

---

## 10. Closing assessment

The craft on display here is real — the design is confident, the copy has personality, and the résumé page is substantial. What holds the project back is not skill but **release discipline**: nothing in the repo verifies that what ships actually works. There is no CI, no tests, and no check that external assets resolve, which is precisely how four broken images reached production and stayed there.

The highest-leverage change is not a feature. It is a 20-line GitHub Actions workflow plus moving every asset you depend on into your own repository. Do that, and this moves from a "broken demo" to a genuinely strong junior portfolio — the design work is already done.

---

## Appendix — Evidence log

| Check | Command / method | Result |
|---|---|---|
| Lint | `npm run lint` | exit 0, zero problems |
| Build | `npm run build` | success, 2.78 s, 455 modules |
| Dependencies | `npm audit --json` | 21 vulns (1 critical, 14 high, 5 moderate, 1 low) |
| Project images | `curl` per URL, with/without UA + Referer, both hosts | 4 × HTTP 404 |
| Social meta | inspect built `dist/index.html` | `twitter:image` = `/src/assets/myImage.png` |
| Live asset | `curl /src/assets/myImage.png` on Netlify | 200, `text/html`, 5,261 bytes |
| Robots / sitemap | `curl /robots.txt`, `/sitemap.xml` | 200 SPA HTML fallback (missing) |
| Routes | `curl` `/`, `/works`, `/about`, `/contacts` | all 200, ~1.07 s |
| Accessibility | axe-core 4.10.2 via browser, all 4 routes | 2 serious + 5 moderate rule violations |
| Rendered DOM | production build in browser | 4 console 404s; images 180×180; tech labels comma-corrupted |
| Encoding | Node UTF-8 read of `public/projects.json` | valid UTF-8, no replacement chars |
| Git | `git log`, `git status`, `git branch` | 42 commits, 1 branch, clean tree, 3 author identities |

No source files were modified during this assessment.
