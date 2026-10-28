# CLAUDE.md — MyBibleLens marketing site

This file guides Claude Code when working in the **MyBibleLens website repo** (`mybiblelens.us`). For the iOS app, see `/Users/denzelrigaud/Developer/Mybiblelens/CLAUDE.md`.

## What this repo is

A single-page marketing site served from GitHub Pages at **mybiblelens.us**. Plain HTML + CSS + vanilla JS, no build step. Tooling exists only for **automated testing + formatting** — do not introduce a bundler, framework, or SSR layer without an explicit user ask.

| Path                                                  | Purpose                                                                                                     |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `index.html`                                          | Landing page (sections: hero · repository · orb · pricing · about · footer). Single ~100 KB file by design. |
| `legal.html`                                          | Privacy / Terms / EULA / About / Mission. All legal copy lives here.                                        |
| `style.css`                                           | Legacy/external styles. **Most active styles live inline in `index.html` `<style>` block.**                 |
| `app.js`                                              | Legacy/external JS. Most active JS lives inline at the bottom of `index.html`.                              |
| `success.html`, `cancel.html`, `update-password.html` | Stripe redirect + auth pages. Stripe is currently dormant — don't extend these without user direction.      |
| `assets/`                                             | Static images.                                                                                              |
| `tests/`                                              | Playwright smoke + visual regression suite.                                                                 |

## Commands

```bash
npm run dev               # local preview at http://localhost:8765
npm run format            # Prettier write
npm run format:check      # Prettier check (CI uses this)
npm run test              # All Playwright tests (smoke + visual)
npm run test:smoke        # Smoke / behavior tests only
npm run test:visual       # Visual regression only (local — see note below)
npm run test:ci           # What CI runs (smoke only)
npm run test:update       # Update visual-regression baselines (only after intentional UI change)
npm run test:headed       # Playwright with visible browser
```

### Visual regression is local-only

Pixel baselines are captured on macOS. Linux Chromium in CI renders text at
different sub-pixel heights — the section's measured height shifts, so the
diff fails before running. **CI runs only smoke tests.** Run
`npm run test:visual` locally before intentional UI changes to confirm
what moved. (TODO: capture Linux baselines via `mcr.microsoft.com/playwright`
in Docker if we ever need cross-platform visual coverage.)

## Brand identity (locked — match the iOS app)

- **Tagline:** "Bringing you closer to God in an exciting and easy way!" (verbatim, with exclamation)
- **Framing:** "The World's First Sanctuary App for Christianity" (primary descriptor — capitalized, exact wording across site/socials/schema; updated 2026-06-11 by Denzel). "Bible Productivity App" is allowed only as a secondary SEO descriptor in body copy, never the lead. NEVER "Christianity app" as a standalone label.
- **Palette** (warm only — no cool tones):
  - Parchment `#F5F2ED` · Deep Brown `#3D2B1F` · Dark BG `#1A1008`
  - Gold `#b6751d` · Gold Pressed `#9a6218` · Gold Light `#D4921F`
  - Ember Gold `#D4921F` · Halo Gold `#F0C850`
- **Fonts:** Hammersmith One (display) · Inter (body) — loaded via Google Fonts
- **No cool blue / no neon / no electric.** Sanctuary palette only.

## Pricing model (matches iOS, keep in sync)

**The app is free today.** In-app purchases are built into the app but switched off until a launch Denzel will choose (about two months out as of 2026-10-28). Nothing below is on sale yet.

**At launch:**

| Plan            | Price                                                                   | What it is                                                                                                                           |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Free            | Free                                                                    | Reading, reflecting, Scripture Seals, Prestige, the Scripture Book, Journey plans, Reflections and Fellowship. Never locked.         |
| Lifetime Unlock | One-time: **$29.99** founding price for the first year, then **$59.99** | Every tool, look, game and room, plus features added later. Founding-year buyers get a Founder number (assigned once, never reused). |

Storage is the only subscription, and it is monthly only:

| Plan        | Capacity | People   | Monthly |
| ----------- | -------- | -------- | ------- |
| Cloud 5 GB  | 5 GB     | 1        | $0.99   |
| Cloud 10 GB | 10 GB    | 1        | $1.99   |
| Family Pool | 20 GB    | up to 12 | $3.99   |
| Group Pool  | 40 GB    | up to 24 | $7.99   |
| Church Pool | 100 GB   | up to 60 | $24.99  |

Storage once purchases are on: Free 1 GB (accounts made before launch keep 5 GB), Lifetime 2 GB. Files are never deleted for being over a limit; new uploads pause, and existing files stay viewable, exportable and removable.

**RULE: the website shows NO prices and does not promote purchases before launch.** Legal pages use wording that is true both before and after launch ("where your version of the app offers them"). Earlier Cloud 20 / Cloud 50 purchases stay on their original terms.

Purchases go through Apple IAP / Google Play Billing via RevenueCat, never Stripe.

Source of truth: `~/Desktop/Mybiblelens/MyBibleLens-Payment-System-Build-Plan.md` and the EULA "Purchases and Subscriptions" section in `legal.html`.

## UX rules (the sanctuary feel)

- **Heavenly motion only.** Subtle glow, slow rotations, breath-like pulses. No bouncy/spring or jarring transitions.
- **Apple-quality easing:** 180–220ms with `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Always pair animations with `@media (prefers-reduced-motion: reduce)`.**
- **Mobile-first.** Audit every change at 375px viewport (iPhone SE).
- **Contrast audit on every background change.** A dark-section background swap can leave dark-on-dark text invisible (it has happened — that's why we have visual regression now).
- **`text-wrap: balance`** on all H1/H2.

## Before declaring any UI change done

Run these in order:

1. `npm run format` — Prettier sweep
2. `npm run test` — Playwright smoke + visual regression
3. Local preview at `localhost:8765`, eyeball at desktop + 375px mobile width
4. Read the actual rendered HTML for any newly-painted section to check contrast
5. Confirm no console errors in the browser devtools

## Don't auto-push

Per `feedback_dont_auto_push_to_github.md` — never run `git push` without explicit user direction. Lint + commit locally; wait for "push it" / "big 3" / similar.

## Visual regression baselines

Live in `tests/__screenshots__/`. If a baseline diff is **intentional** (you changed the design on purpose), run `npm run test:update` and commit the new baselines alongside the code change. If a baseline diff is **unexpected**, treat it as a real regression and fix the code.

## CI

GitHub Actions workflow at `.github/workflows/ci.yml` runs `format:check` + Playwright on every push to `main` and on PRs. Don't merge if CI is red.
