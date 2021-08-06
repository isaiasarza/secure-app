export interface User{
    uid?: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    dni: string;
    cuil_cuit: string;
    selfie_url?: string;
    local_selfie_url?: string;
    descriptors?: any[];
}