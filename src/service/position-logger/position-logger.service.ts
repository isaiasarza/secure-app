import { PositionLog } from "../../model/position-log";
import { User } from "../../model/user";

export abstract class PositionLoggerService{
    public abstract add(positionLog: PositionLog): Promise<void>;
    public abstract get(): Promise<PositionLog[]>;
}