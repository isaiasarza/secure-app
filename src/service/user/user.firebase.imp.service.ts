import { UserService } from "./user.service";
import { User } from "../../model/user";
import { db } from "../../firebaseConfig";
import { CloudFilesService } from "../cloud-files/cloud-files.service";
import { CloudFilesServiceToken, injector } from "../../injector/injector";
import { ProfilesTypeEnum } from "../../model/profiles-type.enum";

export class UserFirebaseImpService extends UserService {
  private readonly COLLECTION_NAME = "users";
  private cloudFilesService: CloudFilesService = injector.get(
    CloudFilesServiceToken
  );

  public add(uid: string, user: User, selfie?: Blob): Promise<User> {
    user.uid = uid;
    return db
      .collection(this.COLLECTION_NAME)
      .doc(uid)
      .set(user)
      .then(async () => {
        if (selfie)
          await this.setSelfie(user, user.uid + "_selfie.png", selfie);

        return Promise.resolve(user);
      })
      .catch((error) => {
        console.log("add user error", error);
        return Promise.reject(error);
      });
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

  public async getUserTokens(){
    const users = await this.getAllUsers()
    return users.filter(user => user.push_notification_token && user.push_notification_token.length > 0).map(user => user.push_notification_token || '')
  }

  public async getGuardsTokens(){
    const users = await this.getAllUsers()
    return users.filter(user => user.role === ProfilesTypeEnum.VIGILANT && user.push_notification_token && user.push_notification_token.length > 0).map(user => user.push_notification_token || '')
  }

  public async getSecurityManagerTokens(){
    const users = await this.getAllUsers()
    return users.filter(user => user.role === ProfilesTypeEnum.SECURITY_MANAGER && user.push_notification_token && user.push_notification_token.length > 0).map(user => user.push_notification_token || '')
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

  public getAllUsers(): Promise<User[]> {
    ;
    return db
      .collection(this.COLLECTION_NAME)
      .get()
      .then((snap) => {
        const users = snap.docs.map((doc) => doc.data() as User);
        return Promise.resolve(users);
      });
  }

  public getGuards(): Promise<User[]> {
    return db
      .collection(this.COLLECTION_NAME)
      .get()
      .then((snap) => {
        const users = snap.docs.map((doc) => doc.data() as User);
        return Promise.resolve(
          users.filter((u: any) => u.role === ProfilesTypeEnum.VIGILANT)
        );
      });
  }
}
