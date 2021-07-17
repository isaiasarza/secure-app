import { User } from '../../model/user';
export interface AuthService{
   auth(email: string, password: string): Promise<boolean>; 
   register(email: string, password: string, user: User): Promise<User | null>;
}