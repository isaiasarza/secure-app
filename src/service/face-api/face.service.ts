import { User } from "../../model/user";
import { ReportedPerson } from "../../model/reported.person";
import { Face, FaceTypeEnum } from "../../model/face";
export async function getFaces(users: User[], reports: ReportedPerson[]) {
  const faces: Face[] = [];

  faces.push(
    ...users
      .filter((user) => user.uid && user.descriptors?.length)
      .map<Face>((user) => {
        return {
          type: FaceTypeEnum.USER,
          descriptors:
            user?.descriptors?.length === 128 ? [user.descriptors] : [],
          id: user.uid || "",
        };
      })
  );

  faces.push(
    ...reports.map<Face>((report) => {
      return {
        type: FaceTypeEnum.REPORTED,
        descriptors:
          report?.descriptors?.length === 128 ? [report.descriptors] : [],
        id: report.uuid || "",
      };
    })
  );
  console.log("faces", faces);
  return faces;
}
