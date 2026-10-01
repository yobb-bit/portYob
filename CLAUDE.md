# portYob — Portfolio Project Context for Claude

## About the Developer
I'm a 2nd year BSIT student still learning. I'm new to TypeScript, React, and Next.js — I'm building
this portfolio project to learn by doing. Please keep this in mind when helping me.

## How I Want You to Help Me

### Explanations
- When you change something, briefly explain *why* in plain language
- If I ask "why is this broken", explain the root cause simply — don't assume I know advanced concepts
- Use analogies or simple terms when explaining TypeScript types, React hooks, Next.js routing, etc.
- Point out if I'm doing something that could be a security risk (like XSS or exposing secrets), and explain why it's dangerous

### Code Changes
- Don't refactor or "clean up" things I didn't ask about — I want to understand what I wrote before it changes
- Prefer small, focused fixes over big rewrites
- Add a short comment when you write something non-obvious, so I can learn from it
- Don't use advanced patterns I might not understand yet (complex generics, advanced TypeScript utility types, HOCs, etc.)

### Mistakes and Learning
- If you notice a common beginner mistake in my code, point it out gently so I can learn
- If there are multiple ways to fix something, briefly mention the tradeoffs so I understand the options

## Project Overview
**portYob** — A personal developer portfolio built with:
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React + Tailwind CSS
- **Deployment**: Vercel (planned)

## Design Reference (important — don't lose this)
**https://github.com/bryllim/bryl-minimal-design**

This repo is where my design language came from. The `SKILL.md` in this project is a direct copy of
that repo's `SKILL.md` — it defines the whole "bryl-minimal" aesthetic (monochrome palette, Geist
fonts, halftone dots, radius/shadow recipes). Reference it any time we're styling UI so my site
stays visually consistent.

Related repos by the same author that I also looked at:
- https://github.com/bryllim/workout-guide

## Project Goals
- Showcase projects, skills, and contact info
- Learn TypeScript + React fundamentals through real building
- Have a live portfolio to show recruiters and clients

## Key Sections (planned)

- Hero / intro section
- About me
- Projects showcase (with links, screenshots, tech stack)
- Skills / tech stack section
- Contact form or links

## Things to Watch Out For
- In Next.js App Router, components are Server Components by default — add `"use client"` only when you need interactivity (useState, event handlers)
- TypeScript will sometimes show errors that look scary but have simple fixes — always read the error message carefully
- Keep API keys and secrets in `.env.local`, never commit them to git

## Upstream Sources
- **Design language:** https://github.com/bryllim/bryl-minimal-design — the `SKILL.md` here is copied from it
- **Original portfolio code:** unknown origin. No template was ever downloaded (checked Chrome download
  history back to July). The earliest components are dated Aug 15 and were already present before Claude
  Code touched the project. The code looks AI-generated (Lovable / ChatGPT), not copied from a repo.
  `components/AnimatedProjects.tsx` still has a "swap for your real projects" placeholder comment.

## Known Issues
- ✅ Fixed: `components/About.tsx` linked to `/John-Kent-CV.pdf` but the file was missing (404).
  A 2-page developer CV now lives at `public/John-Kent-CV.pdf`. Filename must match the link
  exactly — macOS is case-insensitive but Vercel is not.
  Source HTML for regenerating it: keep a copy in the repo (e.g. `cv/cv.html`) and rebuild with
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --print-to-pdf=...`.
- ✅ Fixed: page rendered as unstyled HTML. Cause was stale dev-mode files left inside `.next/`
  (`.next/static/development/`, `.next/server/pages/`) mixed in with the production build. The
  server threw `Cannot find module './vendor-chunks/lucide-react.js'` and returned a bare 500
  page with no stylesheet links. Fix: delete `.next` and rebuild.
  **If the site ever looks unstyled again, run `rm -rf .next && npm run build` first.**

## Gotchas
- `app/globals.css` had an `@import` after the `@tailwind` directives, which is invalid CSS —
  browsers silently ignore it. Any `@import` must be the first thing in the file.
- `next/font/google` fetches from Google at build time. If a build fails inside
  `next-font-loader`, it's usually a network hiccup, not a code problem — just rebuild.
- `components/About.tsx` hardcodes a repo count in STATS (currently 13). Update it when adding
  repos, or it starts looking inflated. Verify with `gh repo list yobb-bit --json name --jq length`.
- `components/Projects.tsx` is the LIVE projects section (used by `app/page.tsx`).
  `components/AnimatedProjects.tsx`, `AnimatedSkills.tsx`, `Navbar.tsx`, `ScrollReveal.tsx`, and
  `ui/portfolio-hero.tsx` are NOT imported anywhere — dead files from the original template.
  Delete them once you're sure you don't want them.

## Tone
Talk to me like a patient teacher, not a senior dev reviewing a PR. I'm here to learn.

---

# 📋 ACTIVE PLAN — Per-project detail pages

**Status: PLANNED, NOT YET BUILT. Do not assume any of this exists.**
Nothing below has been written to disk except this section. The plan was agreed on
2026-10-01 but not started, because the developer was tired. Pick up at Step 1.

## What we're building
Each project gets its own page. Clicking a card on the homepage navigates to a
dedicated page with documentation, screenshots, video, and a "what is this for"
conclusion — instead of jumping straight to the Vercel deployment.

## Decisions already agreed (do not re-ask)
- **URL shape:** `/projects/pila`, `/projects/pisoblox`, `/projects/linkd-design`
- **Nav on detail pages:** sidebar links point back to the homepage (`/#about`),
  so they don't become dead clicks on a page with no `#about` section
- **Media:** screenshots + video clips under ~5MB only. The 68MB and 210MB videos
  in `~/Desktop/linkd-design/documentation/` must NEVER be committed — see Media Rules
- **Copy:** Claude writes the documentation from verified repo/deploy evidence, then
  the developer edits it. Accuracy over marketing language
- **Screenshots:** slots get built now, but photos are coming from the developer's
  phone later — see Screenshot Workflow

## Build order
1. **Move shared layout.** `<Header />` and `<main className="lg:pl-[14rem]">` currently
   live in `app/page.tsx`; move them into `app/layout.tsx`. `layout.tsx` wraps *every* page,
   `page.tsx` wraps exactly one. Without this, new pages load with no sidebar or theme toggle.
2. **Fix nav links.** Add `usePathname()` in `Header.tsx`. On `/` keep `#about`; on detail
   pages emit `/#about`. Also guard the scroll-spy `useEffect` for pages with no such sections.
3. **Create `lib/projects.ts`** — single source of truth. Card grid AND detail pages read
   the same data, so a description is edited once, not twice. Project data is currently
   hardcoded at `components/Projects.tsx:14`; move it out.
   Fields: `slug`, `title`, `tagline`, `purpose`, `features[]`, `tech[]`, `liveUrl`,
   `repoUrl`, `status`, `screenshots[]`, `videoUrl`, `learned`
4. **Create `app/projects/[slug]/page.tsx`** — one file serves all projects. Include
   `generateStaticParams()` (pre-render at build time, so no server needed) and
   `generateMetadata()` (per-project titles so shared links look right in Discord/LinkedIn).
5. **Detail page sections:** purpose → live/source buttons → screenshots → video →
   tech stack → how it works → what I learned → next-project link. Reuse existing
   classes (`.card`, `.tag`, `.section-label`, `.container-narrow`, `.halftone`, `.btn-primary`)
   so it matches the design system automatically.
6. **Add `app/not-found.tsx`** — a bad slug currently shows Next's plain default 404.
7. **Repoint the cards** in `components/Projects.tsx` to `/projects/[slug]`. "View Live"
   moves to the detail page. Don't change the card styling.
8. **Verify:** `npx tsc --noEmit`, clean build, curl all 3 routes for 200 + real content,
   curl a bad slug for 404, confirm homepage renders unchanged.
9. **Then** offer to clean the git history leak below (only when the dev asks).

## Two real bugs this plan fixes
- **Nav lives in the wrong file.** `app/page.tsx:12` has `<Header />` but `app/layout.tsx:53`
  renders only `{children}`. Any new page loses the nav, logo, and theme toggle.
- **Nav links silently break off-homepage.** `Header.tsx:7-12` uses `#about`/`#skills` anchors.
  On `/projects/pila` there is no `#about` element, so the click does nothing — no error, just
  a dead link. Hence the `usePathname()` fix in Step 2.

## Verified project facts (use these, don't re-invent)
- **PILA** — live tagline: *"Virtual queuing system for Filipino government offices."*
  Deps: `@supabase/supabase-js`, `@supabase/ssr`, `next-pwa`, `qrcode.react`, `recharts`.
  Honest pitch: get a queue number remotely instead of standing in line, QR verification,
  staff dashboard. ⚠️ **Its README is still untouched `create-next-app` boilerplate**, so
  there is no written spec — the page must come from code + the live site, and the developer
  needs to confirm unverifiable claims (e.g. whether real people use it).
- **Pisoblox** — Roblox items/accounts marketplace, Filipino-language UI. Deps include
  `framer-motion`, `lucide-react`, `@radix-ui/react-dropdown-menu`, `tailwind-merge`, `clsx`,
  `@supabase/supabase-js`. Has a real `supabase-schema.sql` with a `listings` table
  (category enum: item/account/robux) and RLS policies.
- **linkd.design** — *"Your link, your vibe."* Animated effects, background music, custom
  cursors. Has `PRODUCT.md`, a `backend/` folder, and `design_handoff_showcase/` (with
  `assets/bg-edit.mp4`). Design-heavy product, not a generic link-in-bio.

## Media rules (do not violate)
- **Never commit files over ~5MB.** Git stores a permanent full copy of every commit, so a
  210MB video would bloat the repo on every future `git push` and can only be removed by
  rewriting history. GitHub warns at 50MB and hard-blocks at 100MB per file.
- `~/Desktop/linkd-design/documentation/` contains videos at 8MB, 23MB, 68MB, and **210MB** —
  all too large to commit. Link to them externally (YouTube/Vimeo/Drive) instead, or commit
  a compressed clip. Never copy that folder wholesale into `public/`.
- `ffmpeg` is **not installed** on this machine (`sips` is, and works for images).

## Screenshot workflow (for when the developer has photos)
1. AirDrop or email photos from phone to Mac
2. Resize to ~1600px wide before committing — phone screenshots are often 4000px+/5MB and
   look identical on screen at a fraction of the size. `sips` can do this.
3. Put them in `public/projects/`, named in order: `pila-01.jpg`, `pila-02.jpg`, ...
4. Ask the developer to confirm, then wire them into `lib/projects.ts` with captions
5. Until photos arrive, screenshot sections must show a quiet intentional placeholder —
   not a broken-image icon

## ⏳ Outstanding, waiting on the developer
- [ ] Screenshots for all three projects (coming from phone)
- [ ] Decide video hosting: YouTube / Vimeo / Drive link / small local clips
- [ ] Developer edits the Claude-written documentation copy (school year etc. are personal claims
      only they can confirm)
- [ ] Review dead files: `AnimatedProjects.tsx`, `AnimatedSkills.tsx`, `Navbar.tsx`,
      `ScrollReveal.tsx`, `ui/portfolio-hero.tsx` — not imported anywhere

## 🔒 Security note — unfixed, dev said "not now"
The three live Vercel URLs (`pila-silk`, `pisoblox`, `linkd-design`) are permanently visible in
public git history at commit `44c87e2`, from when the CV was added. Anyone can find them. Fixing
this requires rewriting history, which is why it was deliberately deferred. If the developer ever
wants to clean it before the sites are public, show the exact `git filter-repo` commands and
explain each step first — do not just run it.

## Minor note
`next-pwa` (a PILA dependency) is deprecated upstream. Not a problem, just be aware if the
developer reads about it later.
