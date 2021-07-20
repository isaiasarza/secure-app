import { User } from '../../model/user';
export abstract class UserContextService{
    public abstract getCurrentUser(): Promise<User>;
    public abstract setCurrentUser(user: User): Promise<void>;
    public abstract clearCurrentUser(): Promise<void>;
    
}