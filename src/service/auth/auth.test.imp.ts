import { User } from "../../model/user";
import { UserService } from "../user/user.service";
import {
  injector,
  UserServiceToken,
  UserContextServiceToken,
} from "../../injector/injector";
import { UserContextService } from "../user-context/user-context.service";
import { AuthService } from "./auth.service";
export class AuthTestImpService extends AuthService {
  private userService: UserService = injector.get(UserServiceToken);
  private userContextService: UserContextService = injector.get(
    UserContextServiceToken
  );

  public async auth(email: string, password: string): Promise<User> {
    const user = {
      cuil_cuit: "2032111110",
      dni: "32111111",
      email: "imacoria@gmail.com",
      firstname: "Imanol",
      lastname: "Coria",
      role: "vigilant",
      uid: "aaazzzaaa"
    };

    await this.userContextService.setCurrentUser(user);
    return Promise.resolve(user);
  }

  public register(email: string, password: string, user: User, selfie: Blob): Promise<User> {
    console.log("register", email, password, user, selfie)
    return Promise.resolve(user);
  }

  public logout() {
    this.userContextService.clearCurrentUser();
    return Promise.resolve();
  }
}
