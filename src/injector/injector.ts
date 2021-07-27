
import { AuthService } from '../service/auth/auth.service';
import {makeInjector, DependencyInjector, InjectionToken} from '@mindspace-io/utils'
import { UserService } from '../service/user/user.service';
import { UserContextService } from '../service/user-context/user-context.service';
import { AuthFirebaseImp } from '../service/auth/auth.firebase.imp';
import { UserFirebaseImpService } from '../service/user/user.firebase.imp.service';
import { UserContextImpService } from '../service/user-context/user-context-imp.service';
import { AuthTestImpService } from '../service/auth/auth.test.imp';
import { UserTestImpService } from '../service/user/user.test.imp.service';
export const AuthServiceToken = new InjectionToken<AuthService>( "AUTH_SERVICE_TOKEN" );
export const UserServiceToken = new InjectionToken<UserService>( "USER_SERVICE_TOKEN" );
export const UserContextServiceToken = new InjectionToken<UserContextService>( "USER_CONTEXT_SERVICE_TOKEN" );
export const FIREBASE_STRATEGY = [
    {provide: AuthServiceToken , useClass: AuthFirebaseImp},
    {provide: UserServiceToken, useClass: UserFirebaseImpService},
    {provide: UserContextServiceToken, useClass: UserContextImpService}
]

export const TEST_STRATEGY = [
    {provide: AuthServiceToken , useClass: AuthTestImpService},
    {provide: UserServiceToken, useClass: UserTestImpService},
    {provide: UserContextServiceToken, useClass: UserContextImpService}
]
export const injector: DependencyInjector = makeInjector(TEST_STRATEGY)