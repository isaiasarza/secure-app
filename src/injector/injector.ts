import { AuthFirebaseImp } from '../service/auth/auth.firebase.imp';
import { AuthService } from '../service/auth/auth.service';
import {makeInjector, DependencyInjector, InjectionToken} from '@mindspace-io/utils'
export const AuthServiceToken = new InjectionToken<AuthService>( "Greeter behavior" );

export const injector: DependencyInjector = makeInjector([
    {provide: AuthServiceToken , useClass: AuthFirebaseImp}
])