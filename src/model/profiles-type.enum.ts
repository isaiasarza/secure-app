import { Profile } from "./profile";

export enum ProfilesTypeEnum {
  VIGILANT = "vigilant",
  SECURITY_MANAGER = "security_manager",
}

export enum ActionTypeEnum {
  SCANNER = "SCANNER",
  REPORTS = "REPORTS",
  NOTIFICATIONS = "NOTIFICATIONS",
  GUARDS_ACTIVITY = "GUARDS_ACTIVITY",
  GUARDS_ZONES = "GUARDS_ZONES",
  ADD_ZONE = "ADD_ZONE",
  ASSIGN_GUARDS_TO_ZONE = "ASSIGN_GUARDS_TO_ZONE",
  PROFILE = "PROFILE",
}

export const profileList: Profile[] = [
  {
    actions: [
      ActionTypeEnum.SCANNER,
      ActionTypeEnum.REPORTS,
      ActionTypeEnum.NOTIFICATIONS,
      ActionTypeEnum.PROFILE,
    ],
    profile: ProfilesTypeEnum.VIGILANT,
  },
  {
    actions: [
      ActionTypeEnum.GUARDS_ACTIVITY,
      ActionTypeEnum.GUARDS_ZONES,
      ActionTypeEnum.REPORTS,
      ActionTypeEnum.NOTIFICATIONS,
      ActionTypeEnum.PROFILE,
      ActionTypeEnum.ASSIGN_GUARDS_TO_ZONE,
      ActionTypeEnum.ADD_ZONE,
    ],
    profile: ProfilesTypeEnum.SECURITY_MANAGER,
  },
];
