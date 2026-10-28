# Brand & image migration plan

1. Obtain the **original official A Plus Falcons logo** from the client (prefer SVG, otherwise high-resolution PNG with transparent background). Replace the design-preview mark in `components/Logo.tsx`.
2. Obtain approved photographs of facilities, trucks, people, company projects, ports and conference events from the client. Ensure the company has the right to republish them on the new domain.
3. Replace temporary `images.unsplash.com` links in `lib/site.ts` with optimized `public/images/` assets. Self-hosted assets avoid reliance on third-party images or the old Wix site staying online.
4. If original images are only on Wix, ask the site owner for a Wix Media Manager export, or an authorized download of original files from their account. A public Wix URL is **not** a guaranteed permanent asset migration strategy.
5. Replace editorial stock project photos with real approved photographs; add verified captions. Avoid representing stock cargo photos as actual company operations.
6. Run an asset audit: hero crop, mobile focal points, alt descriptions, rights proof, compression, cache settings, loading strategy and broken links.
7. Only after media and original article copy have been migrated should DNS be switched from the legacy site to the new deployment.

## Existing logo/design reference

The original site shows an angular navy falcon emblem with a yellow accent and A Plus Falcons Freight Inc. branding. Colors and mark in this project are visual approximations until the official asset is supplied.
