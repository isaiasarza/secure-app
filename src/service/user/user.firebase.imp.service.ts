import { UserService } from "./user.service";
import { User } from '../../model/user';
import { db } from "../../firebaseConfig";

export class UserFirebaseImpService extends UserService {
  private readonly COLLECTION_NAME = "users";
  public add(uid: string, user: User): Promise<User> {
    user.uid = uid;
    return db
      .collection(this.COLLECTION_NAME)
      .doc(uid)
      .set(user)
      .then(() => {
        
        return Promise.resolve(user)
      })
  }
  public update(user: User): Promise<any> {
    // TODO
    return Promise.reject("Funcionalidad no implementada");
  }
  public getByEmail(email: string): Promise<any> {
    //TODO
    return Promise.reject("Funcionalidad no implementada");
  }

  public async getByUID(uid: string): Promise<User> {
    const data = await db
    .collection(this.COLLECTION_NAME)
    .doc(uid)
    .get()
    const user = data.data() as User
    if(!user.uid) user.uid = uid
    return user as User
  }
  public delete(email: string): Promise<any> {
    return Promise.resolve();
  }
}
