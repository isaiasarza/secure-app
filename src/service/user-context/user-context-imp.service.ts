import { UserContextService } from "./user-context.service";
import { Storage } from "@capacitor/storage";
import { User } from "../../model/user";
import { BehaviorSubject, Subject } from "rxjs";

export class UserContextImpService extends UserContextService {
  public currentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  public getCurrentUser(): User {
    if (!this.currentUser.value)
      throw new Error("Ha ocurrido un error, no hay usuario ");
    return this.currentUser.value;
  }
  public setCurrentUser(user: User) {
    
    this.currentUser.next(user);
  }
  public clearCurrentUser() {
    this.currentUser.next(null);
  }
}