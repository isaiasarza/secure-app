import { ReportedPerson } from "../../model/reported.person";
import { ReportService } from "./report.service";

export class ReportTestImpService extends ReportService {
  private readonly TAG = "ReportTestImpService";
  public add(reportedPerson: ReportedPerson, photo?: Blob) {
    console.log();
    return Promise.resolve();
  }

  public get(): Promise<ReportedPerson[]> {
    return fetch("assets/data/reports.json").then((data) => {
      const reports = data.json();
      console.log("getAllUsers", reports);
      if (!reports) return Promise.reject("error ajksdf");
      return Promise.resolve(reports);
    });
  }
}
