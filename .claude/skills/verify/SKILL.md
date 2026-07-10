---
name: verify
description: Build, launch, and visually verify this Next.js portfolio site end-to-end with headless Chromium screenshots.
---

# Verifying changes in this repo

## Build & launch

```powershell
npm run build          # Next.js 16 production build (~25s), catches TS errors
npm start              # serves on http://localhost:3000, ready in <1s
```

Run `npm start` in the background; confirm readiness by reading its output for "✓ Ready".

## Drive the UI

No Playwright in this repo's deps. Install it in the session scratchpad (NOT the project) and use the machine's cached browsers at `%LOCALAPPDATA%\ms-playwright`:

```powershell
cd <scratchpad>; npm init -y; npm install playwright@latest
node -e "const {chromium}=require('playwright'); console.log(chromium.executablePath())"
```

If the printed path doesn't exist, pick a playwright version matching a cached `chromium-*` build rather than downloading browsers.

Write a node script using `chromium.launch()` with two contexts:
- Mobile: `{ viewport: {width: 390, height: 844}, deviceScaleFactor: 2, isMobile: true, hasTouch: true }`
- Desktop: `{ viewport: {width: 1440, height: 900} }`

## Gotchas

- The homepage runs a canvas fluid sim (`DotMatrix`) and autoplaying videos — `networkidle` may never settle; wrap it in `.catch(() => {})` and add a fixed `waitForTimeout`.
- The site's mobile/desktop breakpoint is Tailwind `lg:` — check both sides of it for layout changes.
- Homepage sections use framer-motion in-view reveals; wait ~1s after scrolling before screenshotting or elements may be mid-fade.
- Comment sections hit `/api/projects/*/comments` (Prisma/DB) — slow or failing locally is environment, not the change.
