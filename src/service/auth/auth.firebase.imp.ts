import { auth } from "../../firebaseConfig";
import { AuthService } from "./auth.service";
import { User } from "../../model/user";
import {
  injector,
  UserServiceToken,
  UserContextServiceToken,
} from "../../injector/injector";
import { UserService } from "../user/user.service";
import { UserContextService } from "../user-context/user-context.service";

export class AuthFirebaseImp extends AuthService {
  private userService: UserService = injector.get(UserServiceToken);
  private userContextService: UserContextService = injector.get(
    UserContextServiceToken
  );

  public async auth(email: string, password: string): Promise<User> {
    const data = await auth.signInWithEmailAndPassword(email, password);

    if (!data?.user?.uid)
      return Promise.reject("Error al authenticar el usuario");

    const user = await this.userService.getByUID(data.user.uid);
    if (!user) return Promise.reject("Error al authenticar el usuario");

    await this.userContextService.setCurrentUser(user);
    if (user?.selfie_url) {
      user.local_selfie_url = await this.getLocalSelfieUrl(user?.selfie_url);
    }
    return Promise.resolve(user);
  }

  public register(email: string, password: string, user: User): Promise<User> {
    return auth.createUserWithEmailAndPassword(email, password).then((data) => {
      if (!data?.user?.uid) return Promise.reject("Error al crear el usuario");
      return this.userService.add(data.user?.uid, user);
    });
  }

  public logout() {
    this.userContextService.clearCurrentUser();
   // this.userContextService.clearUserSelfie();
    return auth.signOut();
  }

  private async getLocalSelfieUrl(selfieUrl: string): Promise<string> {
    const res = await fetch(selfieUrl);
    const selfie: Blob = await res.blob();
    return URL.createObjectURL(selfie);
    // this.userContextService.setUserSelfie(selfie)
  }
}
