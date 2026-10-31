import { Capacitor } from "@capacitor/core";
import { AppLauncher } from "@capacitor/app-launcher";
import { Browser } from "@capacitor/browser";
import { Geolocation } from "@capacitor/geolocation";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Preferences } from "@capacitor/preferences";
import { StatusBar, Style } from "@capacitor/status-bar";

export const isNative = Capacitor.isNativePlatform();
export const platform = Capacitor.getPlatform(); // "ios" | "android" | "web"

// Hand the link to the OS so it opens in the matching app (Instagram, Maps)
// when installed, otherwise fall back to an in-app browser.
export const openExternalUrl = async (url) => {
  try {
    const { completed } = await AppLauncher.openUrl({ url });
    if (!completed) await Browser.open({ url });
  } catch {
    await Browser.open({ url });
  }
};

// Websites (restaurant menus) open in an in-app browser sheet.
export const openInAppBrowser = (url) => Browser.open({ url });

export const tapHaptic = () => {
  if (!isNative) return;
  Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
};

// Android WebViews older than Chrome 140 can't draw under the status bar, so
// Capacitor leaves a white strip there; keep dark icons on it in that case.
const chromeVersion = Number(navigator.userAgent.match(/Chrome\/(\d+)/)?.[1] || 0);
const drawsUnderStatusBar = platform !== "android" || chromeVersion >= 140;

// Style.Dark = light status bar text, for the dark theme.
export const applyStatusBarTheme = (isDarkMode) => {
  if (!isNative) return;
  const lightText = isDarkMode && drawsUnderStatusBar;
  StatusBar.setStyle({ style: lightText ? Style.Dark : Style.Light }).catch(() => {});
};

/*
 * OFFLINE CACHE (native only): last successful fetch per data source.
 */
const cacheKey = (url) => `cache:${url}`;

export const saveCachedData = async (url, json) => {
  if (!isNative || !json?.content) return;
  const value = JSON.stringify({ savedAt: Date.now(), json });
  await Preferences.set({ key: cacheKey(url), value }).catch(() => {});
};

export const loadCachedData = async (url) => {
  if (!isNative) return null;
  try {
    const { value } = await Preferences.get({ key: cacheKey(url) });
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

/*
 * GEOLOCATION: navigator.geolocation-shaped wrapper around the native plugin,
 * so Mapbox's GeolocateControl uses the app's location permission.
 */
const toGeoError = (error) => ({
  code: /denied|permission/i.test(error?.message || "") ? 1 : 2,
  message: error?.message || "Location unavailable",
});

const watches = new Map();
let nextWatchId = 1;

export const nativeGeolocation = {
  getCurrentPosition(success, failure, options) {
    Geolocation.getCurrentPosition(options).then(success, (e) => failure?.(toGeoError(e)));
  },
  watchPosition(success, failure, options) {
    const id = nextWatchId++;
    const callbackId = Geolocation.watchPosition(options || {}, (position, error) => {
      if (error) failure?.(toGeoError(error));
      else if (position) success(position);
    });
    callbackId.catch((e) => failure?.(toGeoError(e)));
    watches.set(id, callbackId);
    return id;
  },
  clearWatch(id) {
    const callbackId = watches.get(id);
    watches.delete(id);
    callbackId?.then((cid) => Geolocation.clearWatch({ id: cid }), () => {});
  },
};
