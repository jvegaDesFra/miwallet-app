import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.miwallet.medico',
  appName: 'Mi Wallet Medic',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {

    GoogleAuth: {
      scopes: ["profile", "email"],
      //"serverClientId": "595655099601-qbbrrapnc1577ko92mosvg66o7p73f3t.apps.googleusercontent.com",
      androidClientId: "595655099601-qbbrrapnc1577ko92mosvg66o7p73f3t.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
