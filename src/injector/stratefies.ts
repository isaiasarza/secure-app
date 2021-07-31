import { AuthServiceToken, UserContextServiceToken, UserServiceToken } from './injector';
import { AuthFirebaseImp } from '../service/auth/auth.firebase.imp';
import { UserFirebaseImpService } from '../service/user/user.firebase.imp.service';
import { UserContextImpService } from '../service/user-context/user-context-imp.service';
import { AuthTestImpService } from '../service/auth/auth.test.imp';
import { UserTestImpService } from '../service/user/user.test.imp.service';
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