import { MyGeofence } from "../../model/zone/geofence";

export abstract class GeofenceService{
    public abstract addGeofences(geofence: MyGeofence[]): Promise<void>;
    public abstract addGeofence(geofence: MyGeofence): Promise<void>;
}