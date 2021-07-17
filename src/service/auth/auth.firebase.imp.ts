import { createUser, loginUser } from '../../firebaseConfig';
import { AuthService } from './auth.service';
import { User } from '../../model/user';
export class AuthFirebaseImp implements AuthService{
    auth(email: string, password: string): Promise<boolean>{
        return loginUser(email, password)
    }

    register(email: string, password: string, user: User){
        return createUser(email, password, user);
    }
}