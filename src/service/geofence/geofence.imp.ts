import { Zone } from "../../model/zone/zone";
import { GeofenceService } from "./geofence.service";

export class GeofenceImpService extends GeofenceService{
    public addGeofences(zones: Zone[]): Promise<void>{
        return Promise.resolve()
    }

}