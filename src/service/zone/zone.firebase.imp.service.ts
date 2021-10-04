import { db } from "../../firebaseConfig";
import { User } from "../../model/user";
import { Zone } from "../../model/zone/zone";

export class ZoneFirebaseImpService {
  private readonly COLLECTION_NAME = "zones";
  public get(): Promise<Zone[]> {
    return db
      .collection(this.COLLECTION_NAME)
      .get()
      .then((snap) => {
        const zones: Zone[] = snap.docs.map((doc) => doc.data() as Zone);
        return Promise.resolve(zones);
      });
  }

  public getByGuardId(guardId: string): Promise<Zone[]> {
    return db
      .collection(this.COLLECTION_NAME)
      .get()
      .then((snap) => {
        const zones: Zone[] = snap.docs.map((doc) => doc.data() as Zone);
        return Promise.resolve(
          zones.filter((zone) => zone.assignedGuards.includes(guardId))
        );
      });
  }

  public add(zone: Zone): Promise<void> {
    return db
      .collection(this.COLLECTION_NAME)
      .add(zone)
      .then(() => Promise.resolve());
  }

  public async update(zone: Zone): Promise<void> {
    ;
    const id = (
      await db
        .collection(this.COLLECTION_NAME)
        .where("uuid", "==", zone.uuid)
        .get()
    ).docs[0].id;
    ;
    console.log("id", id);
    return db.collection(this.COLLECTION_NAME).doc(id).set(zone);
  }

  public addGuard(zoneId: string, guard: User): Promise<void> {
    return Promise.resolve();
  }
}
