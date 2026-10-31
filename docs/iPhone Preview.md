# iPhone Preview

Quick steps for running the JSHH app on your iPhone from this Mac. One-time setup (signing with **STL Technologies**, bundle ID `com.jerseyshorehappyhours.mobile`, trusting the Mac) is already done.

## Start a session

1. **Turn on Developer Mode** (iPhone): Settings → Privacy & Security → scroll to the bottom → **Developer Mode** → On → **Restart**. After it restarts, unlock and tap **Turn On**, then enter your passcode.
2. **Connect**: plug the iPhone into the Mac and unlock it. Tap **Trust** if asked.
3. **Build the latest code** (Terminal, in the project folder):
   ```bash
   npm run build && npx cap sync
   ```
4. **Open Xcode**: `npx cap open ios`
5. **Pick your iPhone** in the device menu at the top center of Xcode (under *iOS Device*, not Simulators). If it shows "Preparing iPhone…", wait until that finishes.
6. **Run**: press **▶** (or ⌘R). The app installs and opens on the phone.
   - If a keychain prompt asks for a password, enter your **Mac login password** and click **Always Allow**.

After code changes, repeat step 3, then press ▶ again.

## End a session

1. **Stop**: in Xcode press **■** (or ⌘.).
2. **Unplug** the iPhone.
3. **Turn off Developer Mode** (iPhone): Settings → Privacy & Security → **Developer Mode** → Off. The phone restarts.
4. Quit **Xcode** (and **Simulator**, if it's open).

While Developer Mode is off, the JSHH app stays on the home screen but **won't open**. That's expected. It works again at your next session.

## If something goes wrong

| Problem | Fix |
|---|---|
| iPhone missing from the device menu | Unlock it, re-plug, try another cable (some only charge). Check **Window → Devices and Simulators** (⇧⌘2). |
| Developer Mode switch not shown | Connect the iPhone and open Devices and Simulators once, then quit and reopen Settings. |
| "Developer Mode disabled" when pressing ▶ | Step 1 of *Start a session* was skipped. |
| Signing errors (App target → **Signing & Capabilities**) | Team must be **STL Technologies**, bundle ID `com.jerseyshorehappyhours.mobile`. Click **Try Again**. |
| "Agree to the latest Program License Agreement" | Accept it at developer.apple.com/account (Account Holder only), then **Try Again**. |
| App changes don't show up | Rerun `npm run build && npx cap sync` before ▶. |
| App won't open, no session running | Developer Mode is off. Turn it on, or install a TestFlight build instead (Phase 6). |
