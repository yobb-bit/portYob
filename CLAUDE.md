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
