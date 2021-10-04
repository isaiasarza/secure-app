import moment from "moment";
import { db } from "../../firebaseConfig";
import { ReportedPerson } from "../../model/reported.person";
import { ReportService } from "./report.service";
import { CloudFilesServiceToken, injector } from "../../injector/injector";
import { CloudFilesService } from "../cloud-files/cloud-files.service";
export class ReportFirebaseImpService extends ReportService {
  private readonly COLLECTION_NAME = "reported_persons";
  private cloudFilesService: CloudFilesService = injector.get(
    CloudFilesServiceToken
  );
  public async add(reportedPerson: ReportedPerson, photo?: Blob) {
    console.log();
    if (photo) {
      const selfieUrl = await this.setSelfie(
        reportedPerson.uuid + "_selfie",
        photo
      );
      reportedPerson.selfie_url = selfieUrl;
    }
    return db
      .collection(this.COLLECTION_NAME)
      .add(reportedPerson)
      .then(() => Promise.resolve());
  }

  public get(): Promise<ReportedPerson[]> {
    return db
      .collection(this.COLLECTION_NAME)
      .get()
      .then((snap) => {
        const reports: ReportedPerson[] = snap.docs
          /* .map((doc) => ) */
          .map((doc, index) => {
            const rep = doc.data() as ReportedPerson;
            rep.number = index + 1 + "";
            return rep;
          })
          .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());
        console.log("reports", reports);
        return Promise.resolve(reports);
      });
  }

  public async setSelfie(selfieName: string, selfie: Blob): Promise<string> {
    return this.cloudFilesService
      .uploadFile("reports_photos", selfieName, selfie)
      .then(async (snap) => {
        const downloadUrl = await snap?.ref?.getDownloadURL();
        if (!downloadUrl)
          return Promise.reject("Ha ocurrido un error al persistir la selfie");
        //reportedPerson.selfie_url = downloadUrl;

        return Promise.resolve(downloadUrl);
      });
  }
}
