import { Notification } from "../../model/notification";
import { NotificationService } from "./notification.service";

export class NotificationTestImpService extends NotificationService{
    public add(notification: Notification){
        return Promise.resolve()
    }

    public get(): Promise<Notification[]>{
        return Promise.resolve([])
    }
}