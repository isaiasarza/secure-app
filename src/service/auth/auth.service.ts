import { User } from '../../model/user';

export abstract class AuthService{
 
   abstract auth(email: string, password: string): Promise<User>; 
   abstract register(email: string, password: string, user: User): Promise<User | null>;
   abstract logout(): Promise<void>;
}