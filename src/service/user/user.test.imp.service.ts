import { User } from "../../model/user";
import { UserService } from "./user.service";
import { ProfilesTypeEnum } from '../../model/profiles-type.enum';

export class UserTestImpService extends UserService {
  private readonly user = {
    cuil_cuit: "2032111110",
    dni: "32111111",
    email: "imacoria@gmail.com",
    firstname: "Imanol",
    lastname: "Coria",
    role: ProfilesTypeEnum.VIGILANT,
    uid: "AAAZZZAAA",
  };
  public add(uid: string, user: User): Promise<User> {
    return Promise.resolve(user);
  }
  public update(user: User): Promise<any> {
    // TODO
    return Promise.reject("Funcionalidad no implementada");
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
    //TODO
    user.selfie_url = "selfieUri";
    return Promise.resolve(user);
  }

  public async getByUID(uid: string): Promise<User> {
    return Promise.resolve(this.user);
  }
  public delete(email: string): Promise<any> {
    return Promise.resolve();
  }

  public getAllUsers(): Promise<User[]> {
    return fetch("assets/data/users.json").then(async (data) => {
      const users = await data.json();
      console.log("getAllUsers", users);
      if (!users) return Promise.reject("error ajksdf");
      return Promise.resolve(users);
    });
  }

  public getGuards(): Promise<User[]> {
    let promiseA: Promise<User[]> = new Promise<User[]>((resolve, reject) => {
      let wait = setTimeout(() => {
        clearTimeout(wait);
        //resolve('Promise A win!');
        return fetch("assets/data/users.json").then(async (data) => {
          const users = await data.json();
          console.log("getGuards", users);
          if (!users) return Promise.reject("error ajksdf");
          return resolve(users.filter((u: any) => u.role === ProfilesTypeEnum.VIGILANT));
        });
      }, 200)
      
    })
    return promiseA
    /* return fetch("assets/data/users.json").then(async (data) => {
      const users = await data.json();
      console.log("getAllUsers", users);
      if (!users) return Promise.reject("error ajksdf");
      return Promise.resolve(users.filter((u: any) => u.role === ProfilesTypeEnum.VIGILANT));
    }); */
  }
}
