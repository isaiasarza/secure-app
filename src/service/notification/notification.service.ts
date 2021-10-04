import { Notification } from "../../model/notification/notification";

export abstract class NotificationService{
    public abstract add(notification: Notification): Promise<void>;
    public abstract get(): Promise<Notification[]>;
}