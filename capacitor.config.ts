import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ia.secure.app",
  appName: "secure-app",
  webDir: "build",
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
