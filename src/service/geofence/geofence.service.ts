import { Observable } from "rxjs";
import { MyGeofence } from "../../model/zone/geofence";

export abstract class GeofenceService {
  public abstract addGeofences(geofence: MyGeofence[]): Promise<void>;
  public abstract addGeofence(geofence: MyGeofence): Promise<void>;
  public abstract getListener(): Observable<any>;
  public abstract initialize(): Promise<void>;
}
