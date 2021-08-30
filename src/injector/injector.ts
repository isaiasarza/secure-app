import { AuthService } from "../service/auth/auth.service";
import {
  makeInjector,
  DependencyInjector,
  InjectionToken,
} from "@mindspace-io/utils";
import { UserService } from "../service/user/user.service";
import { UserContextService } from "../service/user-context/user-context.service";
import { AuthFirebaseImp } from "../service/auth/auth.firebase.imp";
import { UserFirebaseImpService } from "../service/user/user.firebase.imp.service";
import { UserContextImpService } from "../service/user-context/user-context-imp.service";
import { AuthTestImpService } from "../service/auth/auth.test.imp";
import { UserTestImpService } from "../service/user/user.test.imp.service";
import { CloudFilesService } from "../service/cloud-files/cloud-files.service";
import { CloudFilesTestImpService } from "../service/cloud-files/cloud-files.test.imp.service";
import { CloudFilesFirebaseImpService } from "../service/cloud-files/cloud-files.firebase.imp.service";
import { STRATEGY_TYPE } from "../config/injector.config";
import { ReportService } from "../service/report/report.service";
import { ReportTestImpService } from "../service/report/report.test.imp";
import { PositionLoggerService } from "../service/position-logger/position-logger.service";
import { PositionLoggerTestImpService } from "../service/position-logger/position-logger.test.imp";
import { PositionLoggerFirebaseImpService } from '../service/position-logger/position-logger.firebase.imp';
import { ReportFirebaseImpService } from '../service/report/report.firebase.imp';
import { AuthorizationService } from "../service/autz/autz.service";
import { AuthorizationImpService } from "../service/autz/autz.imp.service";
export const AuthServiceToken = new InjectionToken<AuthService>(
  "AUTH_SERVICE_TOKEN"
);
export const UserServiceToken = new InjectionToken<UserService>(
  "USER_SERVICE_TOKEN"
);
export const UserContextServiceToken = new InjectionToken<UserContextService>(
  "USER_CONTEXT_SERVICE_TOKEN"
);
export const CloudFilesServiceToken = new InjectionToken<CloudFilesService>(
  "CLOUD_SERVICE_TOKEN"
);

export const ReportServiceToken = new InjectionToken<ReportService>(
  "REPORT_SERVICE_TOKEN"
);

export const AuthorizationServiceToken = new InjectionToken<AuthorizationService>(
  "AUTHORIZATION_SERVICE_TOKEN"
);
export const PositionLoggerServiceToken =
  new InjectionToken<PositionLoggerService>("POSITION_LOGGER_SERVICE_TOKEN");
export const FIREBASE_STRATEGY = [
  { provide: AuthServiceToken, useClass: AuthFirebaseImp },
  { provide: UserServiceToken, useClass: UserFirebaseImpService },
  { provide: UserContextServiceToken, useClass: UserContextImpService },
  { provide: CloudFilesServiceToken, useClass: CloudFilesFirebaseImpService },
  { provide: ReportServiceToken, useClass: ReportFirebaseImpService },
  {
    provide: PositionLoggerServiceToken,
    useClass: PositionLoggerFirebaseImpService,
  },
  {provide: AuthorizationServiceToken, useClass: AuthorizationImpService},
];

export const TEST_STRATEGY = [
  { provide: AuthServiceToken, useClass: AuthTestImpService },
  { provide: UserServiceToken, useClass: UserTestImpService },
  { provide: UserContextServiceToken, useClass: UserContextImpService },
  { provide: CloudFilesServiceToken, useClass: CloudFilesTestImpService },
  { provide: ReportServiceToken, useClass: ReportTestImpService },
  {
    provide: PositionLoggerServiceToken,
    useClass: PositionLoggerTestImpService,
  },
  {provide: AuthorizationServiceToken, useClass: AuthorizationImpService},
];
export const injector: DependencyInjector = makeInjector(
  STRATEGY_TYPE === "TEST" ? TEST_STRATEGY : FIREBASE_STRATEGY
);
