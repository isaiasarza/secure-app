import { User } from "../../model/user";
import { Subject } from "rxjs";
export abstract class UserContextService {
  public abstract currentUser: Subject<User | null>;
  public abstract userSelfie: Subject<any | null>;
  public abstract getCurrentUser(): User;
  public abstract setCurrentUser(user: User): void;
  public abstract clearCurrentUser(): void;

  public abstract getUserSelfie(): any;
  public abstract setUserSelfie(selfie: any): void;
  public abstract clearUserSelfie(): void;
}
