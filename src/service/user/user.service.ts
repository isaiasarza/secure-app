import { User } from '../../model/user';
export interface UserService{
    add(user: User): Promise<any>;
    update(user: User): Promise<any>;
    getByEmail(email: string): Promise<any>;
    delete(email: string): Promise<any>
}