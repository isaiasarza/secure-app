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
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
