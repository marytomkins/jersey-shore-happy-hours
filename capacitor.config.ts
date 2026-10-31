import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jerseyshorehappyhours.mobile',
  appName: 'Jersey Shore Happy Hours',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      // Hidden from App.jsx after the first render, so there's no blank flash.
      launchAutoHide: false,
      backgroundColor: '#ffffff',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
  },
};

export default config;
