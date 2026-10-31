# Mobile App Plan

Phase checklist for shipping JSHH as iOS/Android apps with Capacitor 8. Branch: `mobile-app` (never commit to `main`). Every phase ends with a review and an OK before the next one starts. Code changes are logged in [Mobile App Changes](Mobile%20App%20Changes.md).

**Ground rules:** no redesign, no data/content changes, native-only code behind `Capacitor.isNativePlatform()`, no new dependencies without asking.

## Phase 1: Move CRA to Vite

- [x] Replace react-scripts with Vite + React plugin, move `index.html` to the root
- [x] Rename `REACT_APP_*` → `VITE_*`, update `process.env` → `import.meta.env`
- [x] Point Mapbox `workerUrl` at Vite's base path
- [x] Tailwind v3 only (remove v4 package), PostCSS working
- [x] Update scripts, add `vercel.json` (output `dist`, SPA rewrite)
- [x] `npm run build`, `npm run lint`, and `npm run preview` pass, pages match production
- [x] **Decision:** App.css `hover\\:` typo, (a) fix it or (b) remove the rule → (a) fixed
- [ ] Hand-check in the preview: dark mode persists, Formspree submits, PostHog fires
- [ ] Commit Phase 1 on `mobile-app`
- [ ] **You:** add `VITE_MAPBOX_TOKEN` and rename the PostHog vars in Vercel, check Node 22+

## Phase 2: Add Capacitor 8

- [x] **You:** choose the bundle ID → `com.jerseyshorehappyhours.app`
- [x] `npx cap init` ("Jersey Shore Happy Hours"), `webDir: "dist"`
- [x] `npx cap add ios` (Swift Package Manager) and `npx cap add android`
- [x] Tooling check: Node 24.13.1, Xcode 26.5, Android Studio + SDK, JDK 21
- [x] Add `viewport-fit=cover` to the viewport meta tag
- [x] Disable Vercel Analytics on native, keep PostHog
- [x] Run in the iOS simulator and an Android emulator, all pages working (map tiles 403 on native until the Phase 4 app token; header under the notch until Phase 3)
- [ ] Commit Phase 2 on `mobile-app`

## Phase 3: Native layout

- [ ] Layout branches on `isNativePlatform()`: native hides Header/Burger/Footer, web unchanged
- [ ] `IslandNav.jsx`: blurred bottom pill (light + dark), safe-area padding, tabs for Home / Happy Hours / Map / Social, active tab via `useLocation()`
- [ ] Small blurred logo strip at the top on native
- [ ] Content clears the nav and the notch
- [ ] Social page: Instagram + Facebook link cards (open native apps), Contact form moved here
- [ ] **Decision:** how native users reach Events / Specials / Game Day (not in the 4 tabs)
- [ ] Header spacer `vh` → `dvh`; touch fallback for hover-only effects (logo swap)
- [ ] Simulator screenshots of each tab, light + dark

## Phase 4: App behavior

- [ ] Restaurant links via `@capacitor/browser`
- [ ] Directions: Apple Maps on iOS, Google Maps on Android (`Capacitor.getPlatform()` replaces the user-agent check in Card.jsx)
- [ ] **Review:** iOS location usage message wording; Android location permissions
- [ ] Native Mapbox token from `VITE_MAPBOX_TOKEN_APP`. **You:** create the token (restrictions to be provided)
- [ ] Offline cache of the last successful fetch + "last updated" note; never show an empty list when cached data exists
- [ ] Plugins: status-bar (follows dark mode), splash-screen, haptics (tab change), keyboard (Contact form)

## Phase 5: Native features for App Store review

- [ ] "Near me" sort with device location and a fallback when permission is denied
- [ ] **Decision:** reminders, local notifications (no server) or push (APNs/FCM + backend)
- [ ] Build the chosen reminder option

## Phase 6: Store prep checklist

- [ ] Write `docs/2026-10-30 Mobile App Store Checklist.md` (no submissions)
- [ ] Accounts: Apple Developer ($99/yr), Google Play ($25), bundle ID, signing
- [ ] Icon and splash sizes, generated from the existing logo if possible
- [ ] Privacy policy points and store privacy answers (PostHog, location, contact form)
- [ ] Note for later: Capgo live updates, moving data off raw gists

## Done

- [ ] Web build on the branch behaves the same as production
- [ ] iOS + Android run in simulators with the island nav, Social page, offline cache, near-me sort, and reminders
- [ ] Final summary: files changed, env vars, manual steps left, anything that didn't work
