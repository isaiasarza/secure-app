import { Capacitor } from "@capacitor/core";
import {
  PushNotifications,
  PushNotificationSchema,
  Token,
} from "@capacitor/push-notifications";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Http, HttpResponse } from "@capacitor-community/http";
import { isPlatform } from "@ionic/core";

export class FCMService {
  private readonly SERVER_KEY =
    "AAAAIA4Wilc:APA91bGs2lzuKFOztJjkspJe_gcgKh90lB2RdI9VHe-yfaoZCqi4MWLXnNE0bBCFvmXDiKLgohYYawLLBVxWJnawVvXFWwJjZBd_kqkg8fjBBqIIU6FmhbAwR_lFPn91FD-RgTB0AWMP";
  private readonly TOKEN_EXAMPLE =
    "d1ZE4rSnRBOzM1nb7UkdA2:APA91bHW_7aJs0PmHqfCEcRIfSYWoeT7f5CsFL68QGuweOPbH0Sc99P1hk4jgIZsNJwUTeHiwHqoTkWBfCvQcW-LJaNaCeO5aY8TRilPybDaIqhV2AIsXk-6dbtGqqw1-JFk3ap1o3ti";
  // private registrationListener;
  public register(
    registrationHandler: any,
    pushNotificationReceivedHandler: any,
    state: any
  ) {
    if (Capacitor.getPlatform() !== "web") {
      return this.registerPush(
        registrationHandler,
        pushNotificationReceivedHandler,
        state
      );
    }
    //return Promise.reject()
  }

  public addListeners(pushNotificationReceivedHandler: any) {
    PushNotifications.addListener(
      "pushNotificationReceived",
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
  }

  private async registerPush(
    registrationHandler: any,
    pushNotificationReceivedHandler: any,
    state: any
  ) {
    const permission = await PushNotifications.requestPermissions();
    if (permission.receive === "granted") {
      PushNotifications.register();
    }

    PushNotifications.addListener("registrationError", (error) => {
      console.log("PushNotifications, registrationError", error);
    });

    PushNotifications.addListener("registration", (token: Token) => {
      registrationHandler(token, state);
    });

    PushNotifications.addListener("pushNotificationReceived", (n) => {
      this._doLocalNotif(n);
      pushNotificationReceivedHandler(n);
    });
  }

  public sendNotification(
    pushNotification: PushNotificationSchema,
    tokens: string[]
  ) {
    console.log("fcm, sendNotification", tokens);
    if (Capacitor.getPlatform() !== "web") {
      this.capacitorImplementation(pushNotification, tokens);
    } else {
      this.webImplementation(pushNotification, tokens);
    }
  }

  private _doLocalNotif(notification: PushNotificationSchema) {
    LocalNotifications.schedule({
      notifications: [
        {
          title: notification.title || "",
          body: notification.body || "",
          id: Date.now(),
          actionTypeId: notification.id,
        },
      ],
    });
  }

  private async webImplementation(
    pushNotification: PushNotificationSchema,
    tokens: string[]
  ) {
    
    //https://cors-anywhere.herokuapp.com/
    const options = {
      url: "https://cors-anywhere.herokuapp.com/https://fcm.googleapis.com/fcm/send",
      method: "POST",
      headers: {
        Authorization:
          "key=AAAAIA4Wilc:APA91bGZ4PWdpxht9hAb9vukDxoxXIOTvnYtzukSX6KsMp5If3QeKIKMGKv0XsbniWpjbGwReZr6MQsYaYjKuahIgDt7kyeAmFM3wZWN6aC_J7xOPj8jGqZQFSUcCWjlo40eYNqVTW96",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: pushNotification,
        registration_ids: tokens
      })
    };

    console.log("webImplementation, request", options);
    const response = await fetch(options.url, {
      mode: "no-cors",
      method: options.method,
      headers: options.headers,
      body: options.body
    });
    console.log("webImplementation, response", response);
  }

  private async capacitorImplementation(
    pushNotification: PushNotificationSchema,
    tokens: string[]
  ) {
    const data = {notification: pushNotification,registration_ids: tokens};
    const data_parsed = JSON.stringify(data);  
    const options = {
      url: "https://fcm.googleapis.com/fcm/send",
      headers: {
        Authorization: "key=" + this.SERVER_KEY,
        "Content-Type": "application/json",
      },
      data: data_parsed
    };
    console.log("capacitorImplementation, request", options);
    const response: HttpResponse = await Http.post(options);
    console.log("capacitorImplementation, response", response);
  }
}
