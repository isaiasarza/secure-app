import { Zone } from "../../model/zone/zone";

export abstract class GeofenceService{
    public abstract addGeofences(zones: Zone[]): Promise<void>;
}