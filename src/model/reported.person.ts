
export interface ReportedPerson{
    uid?: string;
    email?: string;
    firstname: string;
    lastname: string;
    dni: string;
    selfie_url?: string;
    descriptors?: number[];
    local_selfie_url?: string;
}