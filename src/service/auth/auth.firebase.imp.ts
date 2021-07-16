import { loginUser } from '../../firebaseConfig';
import { AuthService } from './auth.service';
export class AuthFirebaseImp implements AuthService{
    auth(email: string, password: string): Promise<boolean>{
        return loginUser(email, password)
    }
}