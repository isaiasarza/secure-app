import { UserService } from "./user.service";
import { User } from "../../model/user";
import { db } from "../../firebaseConfig";
import { plainToClass } from "class-transformer";

export class UserFirebaseImpService extends UserService {
  private readonly COLLECTION_NAME = "users";
  public add(uid: string, user: User): Promise<User> {
    
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
    
    return data.data() as User
  }
  public delete(email: string): Promise<any> {
    return Promise.resolve();
  }
}
