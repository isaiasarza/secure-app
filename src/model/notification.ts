import { PushNotificationSchema } from "@capacitor/push-notifications";

export interface Notification{
    receivedDate: string;
    pushNotification: PushNotificationSchema;
}