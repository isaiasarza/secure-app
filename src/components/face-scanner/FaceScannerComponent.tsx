import * as React from "react";
import {
  CameraPreview,
  CameraPreviewOptions,
} from "@capacitor-community/camera-preview";
import {
  IonButton,
  IonRow,
  IonCol,
  IonProgressBar,
  useIonToast,
  IonToast,
} from "@ionic/react";
import "./FaceScannerComponent.css";
import { scan } from "ionicons/icons";
import * as faceapi from "face-api.js";
import {
  createMatcher,
  getFullFaceDescription,
  getFullFaceDescription2,
  loadModels,
} from "../../service/face-api/face-api.service";
import { UserService } from "../../service/user/user.service";
import {
  injector,
  ReportServiceToken,
  UserServiceToken,
} from "../../injector/injector";
import { IonIcon, IonContent } from "@ionic/react";
import { User } from "../../model/user";
import DetectedUserComponent, {
  DetectionTypeEnum,
} from "../detected-user/DetectedUserComponent";
import { number } from "yup";
import { presentErrorToast } from "../../utils/toast";
import { ReportService } from "../../service/report/report.service";
import { Face, FaceTypeEnum } from "../../model/face";
import { ReportedPerson } from '../../model/reported.person';
export interface IAppProps {
  closeAction: Function;
  user: User;
}

export interface IAppState {
  ref: any;
  preview: any;
  detections: any;
  userService: UserService;
  reportsService: ReportService;
  faceMatcher: any;
  users: User[];
  reports: ReportedPerson[];
  detectedUser?: User;
  detectedReportedPerson?: ReportedPerson;
  scanning: boolean;
  scanningProgress: number;
  detectionType?: DetectionTypeEnum;
  noneFaceDetectedError: boolean | undefined;
}

export default class FaceScannerComponent extends React.Component<
  IAppProps,
  IAppState
> {
  private cameraPreviewOpts: CameraPreviewOptions = {
    className: "preview-container",
    parent: "camera-preview",

    position: "front",
  };
  private readonly TAG = "FaceScannerComponent";
  private container: HTMLDivElement | null = null;
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      detectedUser: undefined,
      users: [],
      reports: [],
      faceMatcher: null,
      ref: null,
      preview: null,
      detections: null,
      scanning: false,
      scanningProgress: 0,
      userService: injector.get(UserServiceToken) as UserService,
      reportsService: injector.get(ReportServiceToken) as ReportService,
      noneFaceDetectedError: false,
    };
  }
  onSetToast = () => {};
  onRefChange = (node: any) => {
    // same as Hooks example, re-render on changes
    this.setState({ ref: node });
  };
  setPreview = async (width: number, height: number) => {
    console.log("setCameraPreview", width, height);
    if (width > 0) {
      const preview = await CameraPreview.start(this.cameraPreviewOpts);
      this.setState({ preview: preview });
    }
  };

  closeAction = async () => {
    this.setState({
      detectedUser: undefined,
      scanning: false,
      detections: null,
      detectionType: undefined,
      scanningProgress: 0,
      users: [],
      reports: [],
    });
  };

  matchFace = async (
    video: HTMLVideoElement,
    displaySize: any
  ): Promise<void> => {
    let x: number = 0;
    const refreshIntervalId = setInterval(async () => {
      x++;
      this.setState({ scanningProgress: x / 5 });
      console.log("tick", x);
      await loadModels();
      const detectionsWithLandmarks = await getFullFaceDescription2(video);
      const resizedDetections = faceapi.resizeResults(
        detectionsWithLandmarks,
        displaySize
      );
      console.log("resizedDetections", resizedDetections);
      if (resizedDetections.length > 0) {
        this.setState({
          detections: resizedDetections[0].detection,
        });
      }
      if (x === 5 && (!resizedDetections || resizedDetections.length === 0)) {
        /* clearInterval(refreshIntervalId);
        this.setState({ detectionType: DetectionTypeEnum.UNKNOWN }); */
        this.setState({
          noneFaceDetectedError: true,
          scanning: false,
          scanningProgress: 1,
          detectionType: undefined,
          detections: null,
        });
        clearInterval(refreshIntervalId);
        return Promise.reject();
      }
      if (x === 5 && resizedDetections.length > 0) {
        let match = await detectionsWithLandmarks.map((a: any) => {
          console.log("descriptor length", a.descriptor.length);
          return this.state.faceMatcher.findBestMatch(a.descriptor);
        });
        
        if (match.length > 0 && match[0]._label !== "unknown") {
          console.log("match", match[0]);
          const type = match[0]._label.split("_")[0]
          const id = match[0]._label.split("_")[1]
          if(type == FaceTypeEnum.USER){
            const user = this.state.users.find(
              (u: any) => u.uid === id
            );
            if (user?.uid) {
              console.log("user finded", user);
              this.setState({
                detectedUser: user,
                detectionType: DetectionTypeEnum.RELIABLE,
                scanning: false,
                scanningProgress: 1,
              });
            }
          }
          if(type == FaceTypeEnum.REPORTED){
            const reportedPerson = this.state.reports.find(
              (r: ReportedPerson) => r.uuid === id
            );
            if (reportedPerson?.uuid) {
              console.log("reportedPerson finded", reportedPerson);
              this.setState({
                detectedReportedPerson: reportedPerson,
                detectionType: DetectionTypeEnum.SUSPICIOUS,
                scanning: false,
                scanningProgress: 1,
              });
            }
          }
          
        } else {
          console.log("unknown face");
          this.setState({
            detectionType: DetectionTypeEnum.UNKNOWN,
            scanning: false,
            scanningProgress: 1,
          });
        }
        clearInterval(refreshIntervalId);
        return Promise.resolve();
      }
    }, 2000);
  };

  onScanFace = async () => {
    this.setState({ scanning: true });
    const video = this.container?.childNodes[0] as HTMLVideoElement;
    console.log(
      video.offsetHeight,
      video.offsetWidth,
      video.width,
      video.height,
      video.clientHeight,
      video.clientWidth
    );

    const displaySize = {
      width: video.offsetWidth,
      height: video.offsetHeight,
    };
    await this.matchFace(video, displaySize);
  };

  componentWillMount = async () => {
    await loadModels();

    //console.log("users", users);
    const users = await this.state.userService.getAllUsers();
    const reports = await this.state.reportsService.get();
    const faces = await this.getFaces(users, reports)
    const faceMatcher = await createMatcher(faces);
    this.setState({ faceMatcher: faceMatcher, users: users, reports: reports });
  };

  componentDidMount() {
    console.log("componentDidMount");
    setTimeout(() => {
      this.setPreview(
        this.container?.offsetWidth || 0,
        this.container?.offsetHeight || 0
      );
    }, 500);
  }

  async getFaces(users: User[], reports: ReportedPerson[]) {
    const faces: Face[] = [];
    

    faces.push(
      ...users
        .filter((user) => user.uid && user.descriptors?.length)
        .map<Face>((user) => {
          return {
            type: FaceTypeEnum.USER,
            descriptors: user.descriptors || [],
            id: user.uid || "",
          };
        })
    );
    
    faces.push(
      ...reports.map<Face>((report) => {
        return {
          type: FaceTypeEnum.REPORTED,
          descriptors: report.descriptors || [],
          id: report.uuid || "",
        };
      })
    );
    console.log("faces",faces)
    return faces;
  }
  public render() {
    return (
      <IonContent>
        <div>
          {this.state.scanning === true ? (
            <div className="progress-bar">
              <IonProgressBar
                value={this.state.scanningProgress}
                buffer={this.state.scanningProgress}
              ></IonProgressBar>
            </div>
          ) : (
            ""
          )}
          <div
            id="camera-preview"
            className="camera-preview"
            hidden={this.state.detectedUser != null}
            ref={(el: HTMLDivElement) => (this.container = el)}
          ></div>
          {this.state.detectionType != null ? (
            <DetectedUserComponent
              detectionType={this.state.detectionType}
              matchedUser={this.state.detectedUser}
              user={this.props.user}
              closeAction={this.closeAction}
              goHome={this.props.closeAction}
            ></DetectedUserComponent>
          ) : (
            ""
          )}
          {this.state.scanning === true && this.state.detections ? (
            <div
              className="box"
              style={{
                position: "absolute",
                border: "solid",
                borderColor: "var(--ion-color-secondary)",
                height: this.state.detections.box.height,
                width: this.state.detections.box.width,
                transform: `translate(${this.state.detections.box._x}px,${this.state.detections.box._y}px)`,
              }}
            ></div>
          ) : (
            ""
          )}
          <IonToast
            isOpen={this.state.noneFaceDetectedError === true}
            duration={3000}
            animated={true}
            onDidDismiss={() => {
              this.setState({ noneFaceDetectedError: false });
            }}
            message="No se ha podido detectar ningún rostro. Por favor, acerquesé a la cámara y revise la iluminación del lugar antes de volver a intentar."
          />
          <div className="buttons">
            <IonRow className="ion-justify-content-center">
              <IonCol size="auto" className="ion-justify-content-center">
                <IonButton
                  disabled={this.state.scanning}
                  hidden={this.state.detectionType !== undefined}
                  color="primary"
                  onClick={this.onScanFace}
                >
                  <IonIcon icon={scan}></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </div>
        </div>
      </IonContent>
    );
  }
}
