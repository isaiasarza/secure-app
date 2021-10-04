import { MyGeofence } from './geofence';
export interface Zone{
    uuid: string;
    geofence: MyGeofence;
    assignedGuards: string[];
    createdBy: string;
    createdDate: string;
    name:string;
    description:string;
}