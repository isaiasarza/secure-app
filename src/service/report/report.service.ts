import { ReportedPerson } from "../../model/reported.person";

export abstract class ReportService{
    public abstract add(reportedPerson: ReportedPerson, photo?: Blob): Promise<void>;
    public abstract get(): Promise<ReportedPerson[]>;
}