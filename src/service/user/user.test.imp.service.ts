import { User } from "../../model/user";
import { UserService } from './user.service';
export class UserTestImpService extends UserService {
  public add(uid: string, user: User): Promise<User> {
    return Promise.resolve(user)
  }
  public update(user: User): Promise<any> {
    // TODO
    return Promise.reject("Funcionalidad no implementada");
  }
  public getByEmail(email: string): Promise<any> {
    //TODO
    return Promise.reject("Funcionalidad no implementada");
  }

  public async setSelfie(user: User, selfieName: string, selfieUri: string): Promise<User>{
    //TODO
    debugger
    const res = await fetch(selfieUri)
    const blob: Blob = await res.blob()
    debugger
    user.selfie_url = selfieUri;
    return Promise.resolve(user);
  }

  public async getByUID(uid: string): Promise<User> {
    
    const user = {
      cuil_cuit: "2032111110",
      dni: "32111111",
      email: "imacoria@gmail.com",
      firstname: "Imanol",
      lastname: "Coria",
      role: "vigilant",
      uid: "AAAZZZAAA"
    };

    return Promise.resolve(user);
  }
  public delete(email: string): Promise<any> {
    return Promise.resolve();
  }
}
