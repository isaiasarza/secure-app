import moment from "moment";
import { PositionLog } from "../../model/position-log";
import { User } from "../../model/user";
import { PositionLoggerService } from "./position-logger.service";

export class PositionLoggerTestImpService extends PositionLoggerService {
  public add(positionLog: PositionLog): Promise<void> {
    console.log("adding positionLog", positionLog);
    return Promise.resolve();
  }
  public get(): Promise<PositionLog[]> {
    return fetch("assets/data/position-logs.json").then(async (data) => {
      const logs: PositionLog[] = (await data.json()) as PositionLog[];
      console.log("getPositionLogs", logs);
      if (!logs) return Promise.reject("error ajksdf");

      return Promise.resolve(
        logs.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())
      );
    });
  }

  public getByGuardId(guardId: string): Promise<PositionLog[]> {
    return fetch("assets/data/position-logs.json").then(async (data) => {
      const logs: PositionLog[] = (await data.json()) as PositionLog[];
      console.log("getPositionLogs", logs);
      if (!logs) return Promise.reject("error ajksdf");

      return Promise.resolve(
        logs.filter(log => log.uid && log.uid === guardId).sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())
      );
    });
  }
}
