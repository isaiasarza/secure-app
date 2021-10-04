import { db } from "../../firebaseConfig";
import { Notification } from "../../model/notification/notification"
import { NotificationService } from "./notification.service"
import moment from 'moment';

export class NotificationFirebaseService extends NotificationService{
    private readonly COLLECTION_NAME = "notifications";
    public add(notification: Notification){
        return db
      .collection(this.COLLECTION_NAME)
      .add(notification)
      .then(() => Promise.resolve());
    }

    public get(): Promise<Notification[]>{
        return db
        .collection(this.COLLECTION_NAME)
        .get()
        .then((snap) => {
          const logs: Notification[] = snap.docs
            .map((doc) => doc.data() as Notification)
     //       .sort((a, b) => moment(b.receivedDate).valueOf() - moment(a.receivedDate).valueOf());
          return Promise.resolve(logs);
        });
    }
}