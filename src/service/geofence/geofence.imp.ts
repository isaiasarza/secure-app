import { Zone } from "../../model/zone/zone";
import { GeofenceService } from "./geofence.service";
import { MyGeofence } from '../../model/zone/geofence';

export class GeofenceImpService extends GeofenceService{
    public addGeofences(geofence: MyGeofence[]): Promise<void>{
        return Promise.resolve()
    }

    public addGeofence(geofence: MyGeofence): Promise<void>{
        return Promise.resolve()
    }

}