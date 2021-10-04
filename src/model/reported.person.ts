import { Report } from "./report";

export interface ReportedPerson{
    uuid: string;
    email?: string;
    number?: string;
    firstname: string;
    lastname: string;
    dni: string;
    selfie_url?: string;
    descriptors: number[];
    local_selfie_url?: string;
    long: number;
    lat: number;
    description: string;
    date: string;
    time: string;
    reporterUid: string;
    reporterDni: string;
    reporterFirstname: string;
    reporterLastname: string;
    reporterSelfieUrl: string;
}