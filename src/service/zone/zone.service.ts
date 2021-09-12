import { User } from "../../model/user";
import { Zone } from "../../model/zone/zone";

export abstract class ZoneService{
    /**
     * Get all existent zones 
     */
    public abstract get(): Promise<Zone[]>;
    /**
     * Get all guard's zones 
     */
    public abstract getByGuardId(guardId: string): Promise<Zone[]>;
    /**
     * Add a new zone, it fails if the zone already exists
     */
    public abstract add(zone: Zone): Promise<void>;

     /**
     * Add another guard to a zone, it fails if the zone already exists
     */
      public abstract addGuard(zoneId: string, guard: User): Promise<void>;
}