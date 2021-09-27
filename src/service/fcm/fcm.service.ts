import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
export class FCMService {
  // private registrationListener;
  public init(registrationHandler: any, pushNotificationReceivedHandler: any) {
    if (Capacitor.getPlatform() !== "web") {
      return this.registerPush(registrationHandler, pushNotificationReceivedHandler);
    }
    return Promise.reject()
  }

  private async registerPush(registrationHandler: any,pushNotificationReceivedHandler:any) {
    const permission = await PushNotifications.requestPermissions();
    if (permission.receive === "granted") {
      PushNotifications.register();
    }

    PushNotifications.addListener("registrationError", (error) => {
      console.log("PushNotifications, registrationError", error);
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      /* (notification) => {
        console.log(
          "PushNotifications, pushNotificationReceived",
          notification
        );
      } */
      pushNotificationReceivedHandler
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        console.log(
          "PushNotifications, pushNotificationActionPerformed",
          notification
        );
      }
    );

    PushNotifications.addListener("registration", registrationHandler);
  }
}
