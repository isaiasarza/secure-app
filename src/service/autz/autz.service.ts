import { ActionTypeEnum, ProfilesTypeEnum } from "../../model/profiles-type.enum";

export abstract class AuthorizationService{
    public abstract isAuthorized(profile: ProfilesTypeEnum, actionType: ActionTypeEnum): boolean;
}