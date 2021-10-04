import { BehaviorSubject, Observable } from "rxjs";
import { MyGeofence } from "../../model/zone/geofence";
import { GeofenceService } from "./geofence.service";
export class GeofenceTestImpService extends GeofenceService {
  observable: BehaviorSubject<string> = new BehaviorSubject("asdf");
  initialize() {
    setInterval(() => {
      console.log("GeofenceTestImpService, setInterval");
      this.observable.next("hehehe");
    }, 100000);
    let promiseA: Promise<void> = new Promise<void>((resolve) => {
      let wait = setTimeout(() => {
        clearTimeout(wait);
        //resolve('Promise A win!');
        resolve();
      }, 200);
    });
    return promiseA;
  }

  public addGeofences(geofences: MyGeofence[]): Promise<void> {
    let promiseA: Promise<void> = new Promise<void>((resolve) => {
      let wait = setTimeout(() => {
        clearTimeout(wait);
        //resolve('Promise A win!');
        resolve();
      }, 200);
    });
    return promiseA;
  }

  public getListener(): Observable<any> {
    return this.observable;
  }

  public getWatched(): Promise<string> {
    let promiseA: Promise<string> = new Promise<string>((resolve) => {
      let wait = setTimeout(() => {
        clearTimeout(wait);
        //resolve('Promise A win!');
        resolve("hahaha");
      }, 200);
    });
    return promiseA;
  }

  public addGeofence(geofence: MyGeofence): Promise<void> {
    return Promise.resolve();
  }
}
