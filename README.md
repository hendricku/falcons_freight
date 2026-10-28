# A Plus Falcons Freight Inc. — Corporate Website Redesign

A complete, responsive, multipage **Next.js 15 + React 19 + TypeScript** website source project. The visual direction retains the company's navy-and-yellow falcon identity while transforming its previous one-page site into a structured freight-forwarding website.

**Status:** Development handoff / client-approval prototype. The source is complete for review, but it **has not been production-built or deployed from this environment**. Production email credentials and certain authorized company assets/content are still required (see launch checklist below).

## Run locally

Requires Node.js 20.9+ and npm, with internet access to install dependencies:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

To create a production build:

```bash
npm run build
npm run start
```

The build was not run in the preparation environment because npm registry DNS access was unavailable (`EAI_AGAIN`). Source TS/TSX syntax parsing and stylesheet parsing passed; a complete Next.js build and type check should be run on a computer with dependencies installed.

## Pages included

- `/` — editorial corporate homepage with services, company information, project gallery, network, insights and conversion sections
- `/about` — company story, mission, vision, values and credentials overview
- `/services` — all logistics services
- `/services/sea-freight`
- `/services/air-freight`
- `/services/land-transportation`
- `/services/customs-clearance`
- `/services/warehousing`
- `/services/permits-licensing`
- `/industries` — sector-focused logistics needs
- `/projects` — editorial capability gallery
- `/projects/[slug]` — three capability-story detail pages
- `/global-network` — organized published country list and stylized network visual
- `/blog` — company news archive
- `/post/[slug]` — four historic news URLs preserved with NEW editorial summaries (not verbatim migrated articles)
- `/contact` — contact details and inquiry form
- `/request-a-quote` — freight-specific conditional inquiry form
- `/privacy-policy` and `/terms-and-conditions` — clearly labeled **drafts requiring legal approval**
- Custom 404, robots.txt and sitemap.xml

No breadcrumbs are used anywhere.

## Architecture

- `app/` — Next.js App Router page/layout/route modules
- `components/Header.tsx` — desktop navigation, keyboard-operable dropdown, mobile menu and sticky header
- `components/Footer.tsx` — links, services, contact details and large CTA
- `components/Sections.tsx` — service, news, project and corporate section components
- `components/InquiryForm.tsx` — accessible client-side contact and freight quotation form
- `app/api/inquiry/route.ts` — server-side validated inquiry email endpoint
- `lib/site.ts` — editable site data: company contacts, services, locations, articles, industries, project narratives, photo URLs
- `app/globals.css` — responsive design system and all page-level styles
- `public/visuals/` — locally included SVG industrial illustration fallbacks
- `public/preview.html` — **standalone homepage design preview** (not the production site). Run using a static server pointed at `public` or open `/preview.html` after starting Next.js.

## Form delivery — important

The contact and quote forms validate required fields and POST to `/api/inquiry`. The API applies origin screening, payload size limits, a honeypot and lightweight in-memory throttling. It then sends an email using the Resend REST API. **In-memory rate limiting is not a complete distributed protection layer**. Configure production rate limiting/WAF and domain authentication before launch.

In `.env.local`, set:

```env
RESEND_API_KEY=re_...
INQUIRY_FROM_EMAIL=Falcons Website <website@verified-company-domain.com>
INQUIRY_TO_EMAIL=inquiry@falconslogistics-ph.com
NEXT_PUBLIC_SITE_URL=https://www.falconslogistics-ph.com
```

The `INQUIRY_FROM_EMAIL` address must use a sending domain verified with Resend. **No credentials are included**, and nothing is sent until configured. The server returns a clear failure response if the email service is not ready. No inquiry database is set up and no quote records are saved in this version; inquiries are delivered by email only.

### Suggested prelaunch form test

1. Verify sender domain and configure secrets in staging environment.
2. Submit each service variant with valid/invalid inputs.
3. Confirm the Falcons recipient actually receives the submitted information.
4. Confirm spam/honeypot, per-IP rate limiting and consent validation.
5. Add privacy-approved data retention and distributed anti-abuse controls.
6. Verify contact and quote submissions across desktop and mobile browsers.

## Content/SEO caveats

The current Wix homepage was inspected for company identity, content sections, addresses, phone numbers, network countries, and news articles. Company services were organized into dedicated SEO-friendly landing pages, with newly written explanatory copy rather than fabricated customer achievements.

**These are NOT yet full verbatim migrations:**

- The four `/post/[slug]` pages contain original editorial summaries of the live site's four 2024 articles. To maintain existing article content exactly, obtain the approved original text and media assets from the company and replace the `articles` content in `lib/site.ts` with full migrated post bodies (or use a client-approved CMS). The original URLs/slugs have been preserved.
- The previous homepage has several service labels, industries and projects embedded in image graphics. Precise OCR/asset export and content owner review is needed to preserve those exact words.
- The three project pages are **capability stories**, not confirmed client projects; replace with actual approved project titles, photography and outcomes when available.
- The Industries page describes plausible freight needs by sector; it does **not** assert specific customer relationships.
- Do not publish unverified numerical claims (e.g., 30 years of experience, 100+ qualified experts, 99 clients a year, 23 global partners) without client approval.
- Public third-party accreditation and network membership references require reconfirmation, correct scope and permission to use any badges.
- The source site's country listing was regrouped geographically; specific active network partnerships require approval.
- Confirm the exact company address format with the client; published home page lists Suites 608 and 400 separately.
- Replace provisional legal policies after Philippine legal/data protection review.

**SEO:** Dedicated page titles/descriptions, per-page canonical URLs, sitemap, robots directives and preserved historic post slugs are included. Obtain the live site's complete URL list and crawl report prior to cutover. Verify old homepage fragment navigation and implement any needed 301 redirects for changed URLs. Configure Google Search Console and GA4/consent where approved.

## Photography and brand assets

All images referenced from `images.unsplash.com` are **provisional remote editorial/stock photography**, not actual Falcons fleet or operations. Public URLs can be replaced centrally in `lib/site.ts`. SVG visual fallbacks in `public/visuals/` ensure a designed appearance if remote photos cannot load. Remote Unsplash photography is subject to the host's terms. Download approved licensed assets for self-hosted production, optimize files, and preserve the photo rights evidence.

The bird symbol is a **vector reinterpretation for design-preview purposes**, not an authorized source logo. Replace `components/Logo.tsx` with the exact client-provided official SVG or a high-resolution logo asset before publication. Color tokens are estimated from the publicly shown logo: navy `#172b50`, yellow `#f4c629`; confirm brand values.

See `MEDIA-MIGRATION.md` and `CONTENT-APPROVAL.md`.

## Responsiveness & accessibility

Implemented with a fluid layout, clamp sizing, layout changes at 1180px/1020px/760px/520px/360px, mobile navigation and reduced-motion preference. Includes keyboard navigation, skip link, active nav states, form labels, input focus states, error/success feedback and sensible heading hierarchy.

**Verified against the bundled standalone homepage design preview:** 320×720, 390×844, 768×1024, and 1440×900. All four were free from horizontal overflow; the mobile menu opened successfully. This checks the styling/design preview, **not a production React build or real-device matrix**. Re-run full browser end-to-end tests on the actual Next.js server before launch.

## Launch checklist

- [ ] `npm install`, `npm run lint`, `npm run build` all succeed
- [ ] All dynamic routes reviewed and no navigation errors
- [ ] Client-approved official logo and licensed/self-hosted images
- [ ] Approved exact company details, service scope, accreditations, partner list
- [ ] Original blog article text migration completed or approved rewrites accepted
- [ ] Real project images and approved case-study content, or retain clear editorial labeling
- [ ] Privacy Policy and Terms legally approved
- [ ] Production sender verified; inquiry email tested; anti-abuse protections upgraded
- [ ] Domain cutover plan, DNS, HTTPS and redirects ready
- [ ] SEO crawl, canonical audit, sitemap and 404 checks
- [ ] 320px through desktop responsive/keyboard/screen-reader testing on actual Next deployment
- [ ] Performance, Core Web Vitals and accessibility tests
- [ ] GA4, Search Console and consent requirements configured if applicable

## Reference research

- Current company website: https://www.falconslogistics-ph.com/
- Original archive: https://www.falconslogistics-ph.com/blog
- Source content was reviewed in October 2026; claims can change and should be confirmed with the business.
