import { AuthFirebaseImp } from '../service/auth/auth.firebase.imp';
import { AuthService } from '../service/auth/auth.service';
import {makeInjector, DependencyInjector, InjectionToken} from '@mindspace-io/utils'
import { UserFirebaseImpService } from '../service/user/user.firebase.imp.service';
import { UserService } from '../service/user/user.service';
export const AuthServiceToken = new InjectionToken<AuthService>( "AUTH_SERVICE_TOKEN" );
export const UserServiceToken = new InjectionToken<UserService>( "USER_SERVICE_TOKEN" );

export const injector: DependencyInjector = makeInjector([
    {provide: AuthServiceToken , useClass: AuthFirebaseImp},
    {provide: UserServiceToken, useClass: UserFirebaseImpService}
])