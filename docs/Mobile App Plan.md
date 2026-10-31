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

- [x] **You:** choose the bundle ID → `com.jerseyshorehappyhours.mobile` (`.app` was registered to a Personal Team by accident and can't move to STL)
- [x] `npx cap init` ("Jersey Shore Happy Hours"), `webDir: "dist"`
- [x] `npx cap add ios` (Swift Package Manager) and `npx cap add android`
- [x] Tooling check: Node 24.13.1, Xcode 26.5, Android Studio + SDK, JDK 21
- [x] Add `viewport-fit=cover` to the viewport meta tag
- [x] Disable Vercel Analytics on native, keep PostHog
- [x] Run in the iOS simulator and an Android emulator, all pages working (map tiles 403 on native until the Phase 4 app token; header under the notch until Phase 3)
- [ ] Commit Phase 2 on `mobile-app`

## Phase 3: Native layout

- [x] Layout branches on `isNativePlatform()`: native hides Header/Burger/Footer, web unchanged
- [x] `IslandNav.jsx`: blurred bottom pill (light + dark), safe-area padding, tabs for Home / Happy Hours / Map / Social, active tab via `useLocation()`
- [x] Small blurred logo strip at the top on native (with the dark mode toggle)
- [x] Content clears the nav and the notch
- [x] Social page: Instagram + Facebook link cards (open native apps), Contact form moved here
- [x] **Decision:** how native users reach Events / Specials / Game Day → buttons on Home where applicable. Only Game Day Specials is live, and Home already links to it.
- [x] ~~Header spacer `vh` → `dvh`~~ not needed: the Header is hidden on native, and in the app's WebView `vh` and `dvh` are the same. Touch fallback for the logo swap: done (mouse pointers only).
- [x] Screenshots: Android every tab, light + dark; iOS Home (safe area/notch)
- [ ] Commit Phase 3 on `mobile-app`

## Feature: Instagram Reel links (web + app)

- [x] Optional `reel` field in the gist, validated by `getReelUrl`, Clapperboard icon on cards and map popup
- [x] Native opens via `@capacitor/app-launcher` (Instagram app), falls back to `@capacitor/browser`; web opens a new tab
- [x] PostHog `reel_tap` `{ restaurant, town, platform }`; README documents the field
- [ ] **You:** check the card + tap on iOS (simulator can't be driven from here) and on a real phone with Instagram installed
- [ ] **You:** add real Reel URLs to the gist
- [ ] Commit on `mobile-app`
- Later: "Has a Reel" filter, Reel badge on sponsored spots during their Spotlight week

## Phase 4: App behavior

- [ ] Keep `reel` in the offline cache; light haptic on Reel tap
- [ ] Restaurant links via `@capacitor/browser` (already installed for the Reel fallback)
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
- [ ] **Decision:** App Store seller name. STL Technologies (current team) or an LLC organization account (needs D-U-N-S)
- [ ] Icon and splash sizes, generated from the existing logo if possible
- [ ] Privacy policy points and store privacy answers (PostHog, location, contact form)
- [ ] Note for later: Capgo live updates, moving data off raw gists

## Done

- [ ] Web build on the branch behaves the same as production
- [ ] iOS + Android run in simulators with the island nav, Social page, offline cache, near-me sort, and reminders
- [ ] Final summary: files changed, env vars, manual steps left, anything that didn't work
