import { ActionTypeEnum, ProfilesTypeEnum } from "./profiles-type.enum";

export interface Profile{
    profile: ProfilesTypeEnum,
    actions: ActionTypeEnum[]
}