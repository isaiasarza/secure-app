import { User } from "./user";

export interface Report{
    id: string;
    long: string;
    lat: string;
    description: string;
    date: string;
    time: string;
    reporterData?: User;
}