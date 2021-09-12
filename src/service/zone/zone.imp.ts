import { User } from "../../model/user";
import { Zone } from "../../model/zone/zone";
import { ZoneService } from "./zone.service";
export class ZoneImpService extends ZoneService {
  public get(): Promise<Zone[]> {
    return fetch("assets/data/zones.json").then(async (data) => {
      const zones: Zone[] = await data.json();
      console.log("zones", zones);
      if (!zones) return Promise.reject("error ajksdf");
      return Promise.resolve(zones);
    });
  }

  public getByGuardId(guardId: string): Promise<Zone[]> {
    return fetch("assets/data/zones.json").then(async (data) => {
      const zones: Zone[] = await data.json();
      console.log("zones", zones);
      if (!zones) return Promise.reject("error ajksdf");
      return Promise.resolve(zones.filter(zone => zone.assignedGuards.includes(guardId)));
    });
  }

  public add(zone: Zone): Promise<void> {
    return Promise.resolve();
  }

  /**
     * Add another guard to a zone, it fails if the zone already exists
     */
   public addGuard(zoneId: string, guard: User): Promise<void>{
    return Promise.resolve();
  }
}
