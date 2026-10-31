# Mobile App Changes

Running log of codebase changes made to ship JSHH as iOS/Android apps (Capacitor 8). Branch: `mobile-app`.

## Phase 1: CRA → Vite (2026-10-30)

**Build tooling**
- Replaced `react-scripts` with Vite 8 + `@vitejs/plugin-react` (`vite.config.mjs`, dev server on port 3000).
- Moved `public/index.html` → `index.html` (root), removed `%PUBLIC_URL%`, added the `/src/index.jsx` module script.
- Renamed every source file containing JSX from `.js` → `.jsx` (Vite only compiles JSX in `.jsx`). Data files in `src/data/` stay `.js`.
- Scripts: `dev`/`start` → `vite`, `build` → `vite build`, new `preview`. Removed `test` and `eject`.
- Build output is now `dist/` (added to `.gitignore`). Added `vercel.json` (Vite preset, `dist` output, SPA rewrite to `index.html`).

**Env vars** (`process.env.REACT_APP_*` → `import.meta.env.VITE_*`)
- `VITE_PUBLIC_POSTHOG_KEY`, `VITE_PUBLIC_POSTHOG_HOST` (`src/index.jsx`)
- `VITE_MAPBOX_TOKEN`: new. The token was hardcoded in `MappyHours.jsx` and now comes from env.
- Renamed key prefixes in `.env.local` and `.env.production`.

**Mapbox**: `workerUrl` now uses `import.meta.env.BASE_URL`.

**Tailwind**: stays on v3. Removed the unused `@tailwindcss/vite` (v4) and the `@tailwindcss/line-clamp` plugin (built into Tailwind 3.3+). Added `index.html` to `content`.

**Dark-mode hover fix**: `App.css` selector `.hover\\:bg-gray-100:hover` → `.hover\:bg-gray-100:hover`. The double backslash meant it never matched, so dark-mode hover on the burger button and filter buttons now gets `#303936` as intended. This is a small visual change from production.

**Fonts**: `App.css` font URL changed from `../public/fonts/…` to `/fonts/…`.

**Lint/tests**: added `eslint-config-react-app` as an explicit dev dependency so `npm run lint` keeps working. Removed the `react-app/jest` config, the CRA placeholder test, `setupTests.js`, and the `@testing-library/*` packages.
