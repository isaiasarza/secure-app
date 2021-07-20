import { auth } from "../../firebaseConfig";
import { AuthService } from "./auth.service";
import { User } from "../../model/user";
import { injector, UserServiceToken } from '../../injector/injector';
import { UserService } from '../user/user.service';

export class AuthFirebaseImp extends AuthService {
  private userService: UserService = injector.get(UserServiceToken)
  private logged: boolean = false;

  constructor(){
    super()
    auth.onAuthStateChanged((data)=>{      
      this.logged = data != null
      console.log("logged flag", this.logged)
    })
  }
  public auth(email: string, password: string): Promise<User> {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(async (data) => {
        
        if(!data?.user?.uid) return Promise.reject("Error al authenticar el usuario")
        return this.userService.getByUID(data.user.uid)
      })
  }

  public register(
    email: string,
    password: string,
    user: User
  ): Promise<User > {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        if(!data?.user?.uid) return Promise.reject("Error al crear el usuario")
        return this.userService.add(data.user?.uid, user)
      })
  }

  public logout() {
    return auth.signOut();
  }

  public suscribeChanges(handler: any) {
    auth.onAuthStateChanged(handler)
  }

  public isLogged(){
    return this.logged;
  }
}
