import moment from "moment";
import { db } from "../../firebaseConfig";
import { PositionLog } from "../../model/position-log";
import { PositionLoggerService } from "./position-logger.service";
export class PositionLoggerFirebaseImpService extends PositionLoggerService {
  private readonly COLLECTION_NAME = "position_logs";
  public add(positionLog: PositionLog): Promise<void> {
    console.log("adding positionLog", positionLog);
    return db.collection(this.COLLECTION_NAME).add(positionLog).then(() => Promise.resolve());
  }
  public get(): Promise<PositionLog[]> {
    return db
      .collection(this.COLLECTION_NAME)
      .get()
      .then((snap) => {
        const logs: PositionLog[] = snap.docs.map((doc) => doc.data() as PositionLog).sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());
        return Promise.resolve(logs);
      });
  }
}
