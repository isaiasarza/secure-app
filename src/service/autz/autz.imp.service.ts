import {
  ActionTypeEnum,
  profileList,
  ProfilesTypeEnum,
} from "../../model/profiles-type.enum";
import { AuthorizationService } from "./autz.service";
export class AuthorizationImpService extends AuthorizationService {
  public isAuthorized(
    profile: ProfilesTypeEnum,
    actionType: ActionTypeEnum
  ): boolean {
      console.log("isAuthorized", profile, actionType)
    const p = profileList.filter((p) => p.profile === profile);
    if (!p) return false;
    return p.findIndex((p) => p.actions.includes(actionType)) > -1;
  }
}
