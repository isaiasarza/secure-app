import { GeofenceService } from "./geofence.service";
import { MyGeofence } from "../../model/zone/geofence";
import { Geofence } from "@ionic-native/geofence";
import { Observable, BehaviorSubject } from "rxjs";

export class GeofenceImpService extends GeofenceService {
  initialize() {
    return Geofence.initialize();
  }

  public addGeofences(geofences: MyGeofence[]): Promise<void> {    
    return Geofence.addOrUpdate(geofences);
  }

  public getListener(): Observable<any> {
    return Geofence.onTransitionReceived();
  }

  public getWatched():Promise<string>{
    return Geofence.getWatched()
  }

  public addGeofence(geofence: MyGeofence): Promise<void> {
    return Promise.resolve();
  }
}
