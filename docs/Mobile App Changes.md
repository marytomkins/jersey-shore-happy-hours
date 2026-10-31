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

## Phase 2: Add Capacitor 8 (2026-10-31)

**Capacitor**
- Added `@capacitor/core`, `@capacitor/ios`, `@capacitor/android` (8.6.0) and dev dependency `@capacitor/cli` (8.6.0).
- `capacitor.config.ts`: app ID `com.jerseyshorehappyhours.app`, name "Jersey Shore Happy Hours", `webDir: "dist"`.
- Generated `ios/` (Swift Package Manager, no CocoaPods) and `android/` native projects. Each has its own `.gitignore` for build output.
- Workflow: `npm run build && npx cap sync`, then `npx cap run ios` / `npx cap run android` (or open in Xcode / Android Studio with `npx cap open ios|android`).

**Web changes**
- `index.html`: viewport meta adds `viewport-fit=cover` so native can draw under the notch (safe-area padding comes in Phase 3).
- `src/pages/App.jsx`: Vercel `<Analytics />` only renders when `!Capacitor.isNativePlatform()`. PostHog runs everywhere.

**Known on native (fixed in later phases)**
- Map tiles return 403: the web Mapbox token is URL-restricted and the app's origin is `https://localhost` (Android) / `capacitor://localhost` (iOS). Phase 4 adds `VITE_MAPBOX_TOKEN_APP`.
- Header sits under the iOS notch/status bar until Phase 3.
- Android logs a harmless "Error injecting safe area CSS" from Capacitor's SystemBars plugin at startup.

## Phase 3: Native layout (2026-10-31)

**Layout** (`src/pages/App.jsx`): on native (`Capacitor.isNativePlatform()`), Header, spacer and Footer are replaced by `NativeTopBar` + `IslandNav`, and `/social` is registered. Web is unchanged.

**New components**
- `src/components/IslandNav.jsx`: fixed bottom pill with blur, tabs Home (House), Happy Hours (Martini), Map (Map), Social (AtSign), icons from `lucide-react`. Active tab from `useLocation()`: day/town `*-happy-hours` links → Happy Hours, `/contact` → Social, everything else (specials, game day) → Home.
- `src/components/NativeTopBar.jsx`: blurred logo strip under the notch with the dark mode toggle. Native users can't open the burger menu, so the toggle lives here.
- `src/pages/Social.jsx`: Instagram + Facebook link cards (external links open in the native app or the system browser), the existing Contact form, then the footer disclaimer and copyright.

**Shared**: `Footer.jsx` exports `Disclaimer` so the Social page can reuse the same text.

**CSS** (`App.css`): `.native-content` (top/bottom padding from `env(safe-area-inset-*)`), `.native-top-bar`, `.native-glass` (light/dark blur), `.island-nav`, `.island-tab` (light/dark active colors).

**Web fix**: `Header.jsx` logo hover swap now uses pointer events and only reacts to a mouse, so tapping the logo on touch screens no longer leaves the hover logo showing.

**Not done**: the plan's `vh` → `dvh` change. The Header is hidden on native, and `dvh` on the web's fixed header would make it change height as the mobile browser toolbar shows and hides.

**Home**: no change. Events and Specials are commented out across the whole site; Game Day Specials is already linked from Home.

## Feature: Instagram Reel links on cards (2026-10-31, web + app)

- `src/data/helpers.js`: `getReelUrl(item)` validates the optional `reel` field (https Instagram `/reel/` or `/p/` URLs only) and strips tracking params. `openExternalUrl(url)` (native) hands the link to the OS with `@capacitor/app-launcher` so it opens in Instagram when installed, falling back to `@capacitor/browser`.
- `src/components/Card.jsx`: lucide `Clapperboard` icon before the restaurant link icon, only when `getReelUrl` returns a URL. `aria-label="Watch our Reel"`, title tooltip on web, 44px tap area on native (negative margins, so the card layout doesn't move). Web uses a normal new-tab link. The map popup renders the same Card, so it gets the icon too.
- PostHog `reel_tap` with `{ restaurant, town, platform }`.
- New dependencies: `@capacitor/app-launcher` 8.0.1, `@capacitor/browser` 8.0.5 (the browser plugin was pulled forward from Phase 4).
- README: section on the `reel` field.
- Not yet: offline cache and haptics don't exist yet (Phase 4). When they're built, the cache must keep `reel`, and the Reel tap gets a light haptic.

## Bundle ID change (2026-10-31)

`com.jerseyshorehappyhours.app` → `com.jerseyshorehappyhours.mobile`. Xcode registered the old ID to a free Personal Team when signing was first turned on. Apple can't move it to the STL Technologies team, and free teams can't delete IDs. Updated `capacitor.config.ts`, `ios/App/App.xcodeproj/project.pbxproj`, `android/app/build.gradle` (namespace + applicationId), `android/app/src/main/res/values/strings.xml`, and moved `MainActivity.java` to `java/com/jerseyshorehappyhours/mobile/`. iOS signing team: STL Technologies.

## Island nav scroll animation (2026-10-31, app only)

`IslandNav.jsx` listens to window scroll (passive) and adds `is-scrolling` while the page moves; it clears 200ms after scrolling stops. `App.css`: `.island-nav.is-scrolling` scales to 0.9 from the bottom center with a 0.25s ease-out transition (no transition with Reduce Motion). Transform only, so the page layout doesn't move. Panning the map doesn't scroll the page, so the nav stays full size there.
