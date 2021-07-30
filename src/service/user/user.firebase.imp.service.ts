import { UserService } from "./user.service";
import { User } from "../../model/user";
import { db } from "../../firebaseConfig";
import { CloudFilesService } from "../cloud-files/cloud-files.service";
import {
  CloudFilesServiceToken,
  injector,
} from "../../injector/injector";

export class UserFirebaseImpService extends UserService {
  private readonly COLLECTION_NAME = "users";
  private cloudFilesService: CloudFilesService = injector.get(
    CloudFilesServiceToken
  );

  
  public add(uid: string, user: User): Promise<User> {
    user.uid = uid;
    return db
      .collection(this.COLLECTION_NAME)
      .doc(uid)
      .set(user)
      .then(() => Promise.resolve(user));
  }
  public update(user: User): Promise<any> {
    //user.uid = uid;
    return db
      .collection(this.COLLECTION_NAME)
      .doc(user.uid)
      .set(user)
      .then(() => Promise.resolve(user));
  }
  public getByEmail(email: string): Promise<any> {
    //TODO
    return Promise.reject("Funcionalidad no implementada");
  }

  public async setSelfie(
    user: User,
    selfieName: string,
    selfie: Blob
  ): Promise<User> {
    
    return this.cloudFilesService
      .uploadFile("users_photos", selfieName, selfie)
      .then(async (snap) => {
        const downloadUrl = await snap?.ref?.getDownloadURL();
        if (!downloadUrl)
          return Promise.reject("Ha ocurrido un error al persistir la selfie");
        user.selfie_url = downloadUrl;

        return this.update(user);
      });
    //return Promise.reject("Funcionalidad no implementada");
  }

  public async getByUID(uid: string): Promise<User> {
    const data = await db.collection(this.COLLECTION_NAME).doc(uid).get();
    const user = data.data() as User;
    if (!user.uid) user.uid = uid;
    return user as User;
  }
  public delete(email: string): Promise<any> {
    return Promise.resolve();
  }
}
