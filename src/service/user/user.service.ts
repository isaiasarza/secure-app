import { User } from '../../model/user';
export abstract class UserService{
    public abstract add(uid: string,user: User): Promise<User>;
    public abstract update(user: User): Promise<any>;
    public abstract getByEmail(email: string): Promise<any>;
    public abstract delete(email: string): Promise<any>
    public abstract getByUID(uid: string): Promise<User>;
    public abstract setSelfie(user: User, selfieName: string, selfie: Blob): Promise<User>;
}