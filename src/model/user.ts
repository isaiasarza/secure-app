import { ProfilesTypeEnum } from './profiles-type.enum';
export interface User{
    uid?: string;
    email: string;
    firstname: string;
    lastname: string;
    role: ProfilesTypeEnum;
    dni: string;
    cuil_cuit: string;
    selfie_url?: string;
    descriptors?: number[];
    local_selfie_url?: string;
}