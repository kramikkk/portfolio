# kramik-portfolio

Personal portfolio site for Mark Jeric Exconde (Kramik) — Full-Stack Developer and Computer Engineering student.

**Live:** [kramik-portfolio.vercel.app](https://kramik-portfolio.vercel.app/)

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| React | ^19.2.4 | UI framework |
| TypeScript | ~5.9.3 | Type safety (strict mode) |
| Vite | ^8.0.0 | Build tool |
| Framer Motion | ^12.36.0 | Scroll-driven & gesture animations |
| Lenis | ^1.3.18 | Smooth scroll |
| Lucide React | ^0.577.0 | Icons |

---

## Features

- **Canvas preloader** — 144 WebP frames played back as a full-screen animation while assets load
- **Scroll-scrubbed hero** — canvas frame index driven by scroll position (0 → 143 over the hero section)
- **Horizontal project carousel** — 8 projects mapped to a sticky horizontal track via scroll progress
- **Skill marquee** — two auto-scrolling rows with scroll-velocity skew applied via `useVelocity` + `useSpring`
- **Editorial experience layout** — two-column Experience / Education grid with animated vertical divider
- **Real-time clock** — footer shows current Manila time updated every second
- **Reduced-motion support** — all Framer Motion variants include `prefers-reduced-motion` fallbacks
- **SEO** — Open Graph + Twitter Card meta tags in `index.html`, theme color `#0a0a0a`

---

## Getting Started

**Prerequisites:** Node.js (any recent LTS)

```bash
npm install
npm run dev      # development server
npm run build    # type-check then production build
npm run preview  # preview production build locally
npm run lint     # ESLint
```

---

## Project Structure

```
src/
├── main.tsx                  # React entry point
├── App.tsx                   # Root — Lenis setup, preloader gate, section order
├── App.css
├── index.css                 # Design tokens + global styles
└── components/
    ├── Preloader.tsx / .css  # 144-frame canvas loading screen
    ├── Navbar.tsx / .css     # Sticky header, full-screen menu overlay
    ├── HeroSection.tsx / .css
    ├── SkillsSection.tsx / .css
    ├── ProjectsSection.tsx / .css
    ├── ExperienceSection.tsx / .css
    └── Footer.tsx / .css

public/
├── frames/                   # 144 WebP frames (required by Preloader)
├── images/                   # Project screenshot assets
├── Mark-Jeric-Exconde-Resume.pdf
├── favicon.svg
└── og-image.svg
```

---

## Design Tokens

CSS custom properties are defined in `src/index.css`:

```css
--bg-primary:    #0a0a0a
--bg-secondary:  #121212
--text-primary:  #ffffff
--text-secondary: #a3a3a3
--accent-color:  #ff5500
--font-sans:     'Inter', system-ui, sans-serif
```

---

## Notes

- The `public/frames/` directory must be present for the preloader to work. It is not committed to the repo — generate or obtain the 144 WebP frames separately.
- All project and experience data is hardcoded in their respective component files; there is no CMS or API.
- Single-page layout — no client-side router. Navigation uses anchor links and scroll.
