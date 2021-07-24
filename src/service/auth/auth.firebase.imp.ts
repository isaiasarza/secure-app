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
    /* 
    const data = await auth.signInWithEmailAndPassword(email, password);
    
    if (!data?.user?.uid)
      return Promise.reject("Error al authenticar el usuario");
    
    const user = await this.userService.getByUID(data.user.uid);
    if (!user) return Promise.reject("Error al authenticar el usuario"); */
    const user = {cuil_cuit:"2032111110",dni:"32111111",email:"imacoria@gmail.com",firstname:"Imanol",lastname:"Coria",role:"vigilant",}
    
    await this.userContextService.setCurrentUser(user);
    return Promise.resolve(user);
    /* return 
      .then(async (data) => {
        
        if (!data?.user?.uid)
          return Promise.reject("Error al authenticar el usuario");
        const user = await  this.userService.getByUID(data.user.uid)  
        if(!user) return Promise.reject("Error al authenticar el usuario");
        await this.userContextService.setCurrentUser(user)
        return Promise.resolve(user)
      }); */
  }

  public register(email: string, password: string, user: User): Promise<User> {
    return auth.createUserWithEmailAndPassword(email, password).then((data) => {
      if (!data?.user?.uid) return Promise.reject("Error al crear el usuario");
      return this.userService.add(data.user?.uid, user);
    });
  }

  public logout() {
    this.userContextService.clearCurrentUser();
    return auth.signOut();
  }
}
