# ITLogica — corporate website

A full rebuild of itlogica.com on **Next.js 15 (App Router) + TypeScript**, using the brand
identity from [ai.itlogica.com](https://ai.itlogica.com) — orange `#d96119`, ink `#1f2121`,
Inter — with the layout and motion language of contemporary technology-company sites.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

Node 18.18+ (Node 20/22 recommended).

---

## Contact form — email delivery

The form's **Office** dropdown routes the enquiry server-side:

| Office selected | Delivered to |
| --- | --- |
| Atlanta, USA — Headquarters | `yhanam@itlogica.com` |
| Nanjing, China — Delivery Center | `jay.fang@itlogica.com` |

Delivery runs through [Resend](https://resend.com) in `src/app/api/contact/route.ts`.

1. Copy `.env.example` to `.env.local`.
2. Create an API key at <https://resend.com/api-keys> → `RESEND_API_KEY`.
3. Verify `itlogica.com` at <https://resend.com/domains>, then set `CONTACT_FROM_EMAIL`
   to a verified sender (e.g. `ITLogica Website <website@itlogica.com>`).
4. Optional: `CONTACT_EMAIL_ATLANTA` / `CONTACT_EMAIL_NANJING` override the recipients
   without a code change; `CONTACT_BCC_EMAIL` copies a shared inbox.

**Without `RESEND_API_KEY` the form still works** — it validates, logs the enquiry to the
server console, and returns success, so local development is never a dead end. Check the
terminal for `[contact]` lines.

Other protections already in place: required-field and email-format validation, an 8,000
character cap, a honeypot field, and `replyTo` set to the sender so a reply goes straight back.

To switch to SMTP instead of Resend, replace the `resend.emails.send(...)` block in
`src/app/api/contact/route.ts` with `nodemailer` — everything around it (routing, validation,
HTML body) stays as is.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx              Shell: nav + global contact footer
│   ├── page.tsx                Home — hero, customers, services & capabilities,
│   │                           AI & FDE, values, 8 case studies
│   ├── globals.css             Design tokens, typography, buttons, cards, motion
│   ├── home.module.css         Home-only sections
│   ├── inner.module.css        Shared styles for all inner pages
│   ├── services/               Services overview (4 offerings, one page)
│   ├── capabilities/           Capabilities overview (5 pillars + industries)
│   ├── cases/                  Case index
│   │   └── [slug]/             Case detail — Challenge / Solution / Result / Key Takeaway
│   ├── about/                  Overview → Management Team → Certifications &
│   │                           Milestones → Clients & Partners
│   ├── contact/                Offices + form + world map with key metrics
│   ├── api/contact/route.ts    Office-routed email delivery
│   ├── sitemap.ts, robots.ts
│   └── not-found.tsx
├── components/
│   ├── Nav.tsx                 Transparent-over-hero nav that solidifies on scroll
│   ├── Footer.tsx              Global contact module: form + client wall + offices
│   ├── ContactForm.tsx         Office routing shown live to the visitor
│   ├── ParticleField.tsx       Canvas particle network (hero), pointer-reactive
│   ├── CaseArt.tsx             Generated cover art, one variant per case study
│   ├── WorldMap.tsx            Dot-matrix world map, Atlanta + Nanjing lit
│   ├── Reveal.tsx              IntersectionObserver scroll reveal
│   ├── Counter.tsx             Count-up for any numeric stat string
│   ├── Marquee.tsx             Seamless logo marquee
│   ├── PageHero.tsx            Shared inner-page hero
│   └── Icon.tsx                Inline SVG icon set (no icon dependency)
└── data/                       ← all copy lives here
    ├── site.ts                 Nav, offices, email routing, key metrics
    ├── cases.ts                8 case studies
    ├── services.ts             4 service offerings
    ├── capabilities.ts         5 capability pillars + industries
    ├── company.ts              Clients, partners, team, values, certifications, milestones
    └── landGrid.ts             Generated land mask for the world map
```

**All site copy is in `src/data/`.** Editing a case study, a service description, an office
address or the management team means editing one typed object — no JSX hunting.

---

## Content sources

| Content | Source |
| --- | --- |
| Services, capabilities, industries, company overview, offices | Existing itlogica.com |
| Brand identity, AI & FDE section, management team bios | ai.itlogica.com |
| 7 case studies, certifications, milestones | `ITL Introduction and Capabilities Overview.pptx` |
| Intelligent Path Planning for Shopping Malls (case #1) | ai.itlogica.com/cases/mall-path-planning |
| Client logos, company logo, exec photos | `reference/` folder |

---

## Imagery

Photography CDNs were unreachable from the build environment, so every decorative visual is
**generated in code** and carries the brand palette:

- `ParticleField` — the hero's connected-node canvas, which leans toward the pointer
- `CaseArt` — eight bespoke SVG covers, each abstracting that project's actual mechanism
  (a routed path through a floor plan, vision bounding boxes, a falling emissions curve…)
- `WorldMap` — a dot-matrix world built from Natural Earth 110m land data

Real photography drops in with no refactor: put a JPG in `public/img/` and swap the
`<CaseArt …/>` call in `src/components/CaseCard.tsx` (and in `src/app/cases/[slug]/page.tsx`)
for an `<img>`. The aspect ratios are fixed by the parent, so nothing else moves.

---

## Motion

Scroll reveals, count-ups, the particle field and the marquee all respect
`prefers-reduced-motion: reduce` — under that setting content renders immediately and
static. The particle canvas also pauses when scrolled out of view.

---

## Deployment

Deploys as a standard Next.js app. On Vercel: import the repo and set `RESEND_API_KEY`
(plus any overrides) as environment variables. The contact route runs on the Node runtime.

Inter is loaded from Google Fonts via a `<link>` in `src/app/layout.tsx`, matching how
ai.itlogica.com loads it — no build-time font fetch, and a platform fallback stack if the
request is blocked.
