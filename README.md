# portYob

Personal developer portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Design language

The visual style follows **bryl-minimal** — a monochrome, typography-driven aesthetic. The full
spec is in [`SKILL.md`](./SKILL.md), copied from
[bryllim/bryl-minimal-design](https://github.com/bryllim/bryl-minimal-design).

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start dev server at http://localhost:3000
```

| Script            | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Development server with hot reload                  |
| `npm run build`   | Production build                                    |
| `npm start`       | Serve the production build locally                  |
| `npm run lint`    | Run ESLint                                          |

## Project structure

```
app/
  layout.tsx      Root layout, fonts, SEO metadata
  page.tsx        Composes all sections
  globals.css     Tailwind + custom styles
components/
  ui/portfolio-hero.tsx   Hero, nav, and typing animation
  Header, Footer, Navbar  Navigation chrome
  About, Skills, Projects, Contact   Content sections
  ThemeProvider, ThemeToggle         Light/dark mode
  ScrollReveal                      Fade-in on scroll
public/
  profile.jpg
```

## Deployment

Deployed on Vercel. The live URL is set in `app/layout.tsx` via `metadataBase`.

## Notes

- Components are **Server Components** by default; add `"use client"` only when you need
  interactivity (`useState`, event handlers).
- Keep secrets in `.env.local` — it's gitignored and should never be committed.
