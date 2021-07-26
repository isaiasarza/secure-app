import { AuthFirebaseImp } from '../service/auth/auth.firebase.imp';
import { AuthService } from '../service/auth/auth.service';
import {makeInjector, DependencyInjector, InjectionToken} from '@mindspace-io/utils'
import { UserFirebaseImpService } from '../service/user/user.firebase.imp.service';
import { UserService } from '../service/user/user.service';
import { UserContextService } from '../service/user-context/user-context.service';
import { UserContextImpService } from '../service/user-context/user-context-imp.service';
export const AuthServiceToken = new InjectionToken<AuthService>( "AUTH_SERVICE_TOKEN" );
export const UserServiceToken = new InjectionToken<UserService>( "USER_SERVICE_TOKEN" );
export const UserContextServiceToken = new InjectionToken<UserContextService>( "USER_CONTEXT_SERVICE_TOKEN" );

export const injector: DependencyInjector = makeInjector([
    {provide: AuthServiceToken , useClass: AuthFirebaseImp},
    {provide: UserServiceToken, useClass: UserFirebaseImpService},
    {provide: UserContextServiceToken, useClass: UserContextImpService}
])