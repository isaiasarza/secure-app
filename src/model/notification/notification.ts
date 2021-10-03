import { PushNotificationSchema } from "@capacitor/push-notifications";
import { NotificationType } from "./notification-type.enum";

export interface Notification{
    receivedDate: string;
    pushNotification: PushNotificationSchema;
    type: NotificationType;
}