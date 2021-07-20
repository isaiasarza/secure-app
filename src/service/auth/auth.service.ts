import { User } from '../../model/user';
import { injectable } from 'inversify';
import { ReactiveService } from 'react-injection';

export abstract class AuthService{
 
   abstract auth(email: string, password: string): Promise<boolean>; 
   abstract register(email: string, password: string, user: User): Promise<User | null>;
}