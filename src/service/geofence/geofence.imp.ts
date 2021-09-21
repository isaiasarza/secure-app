import { GeofenceService } from "./geofence.service";
import { MyGeofence } from "../../model/zone/geofence";
import { Geofence } from "@ionic-native/geofence";
import { Observable, BehaviorSubject } from "rxjs";

export class GeofenceImpService extends GeofenceService {
  initialize() {
    return Geofence.initialize();
  }

  public addGeofences(geofences: MyGeofence[]): Promise<void> {
    geofences.forEach(async (g) => {
      try {
        await Geofence.addOrUpdate(g);
        console.log("addGeofences ok",g);
      } catch (error) {
        console.log("addGeofences error", error);
      }
    });
    return Promise.resolve();
  }

  getListener(): Observable<any> {
    return Geofence.onTransitionReceived();
  }

  public addGeofence(geofence: MyGeofence): Promise<void> {
    return Promise.resolve();
  }
}
