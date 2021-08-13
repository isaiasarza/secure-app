import * as React from "react";
import {
  CameraPreview,
  CameraPreviewOptions,
} from "@capacitor-community/camera-preview";
import {

  IonButton,
  IonRow,
  IonCol,
} from "@ionic/react";
import "./FaceScannerComponent.css";
import { scan } from "ionicons/icons";
import * as faceapi from "face-api.js";
import {
  createMatcher,
  getFullFaceDescription2,
  loadModels,
} from "../../service/face-api/face-api.service";
import { UserService } from "../../service/user/user.service";
import { injector, UserServiceToken } from "../../injector/injector";
import { IonIcon } from "@ionic/react";
import { User } from "../../model/user";
import DetectedUserComponent from '../detected-user-component/DetectedUserComponent';
export interface IAppProps {
  closeAction: Function;
}

export interface IAppState {
  ref: any;
  preview: any;
  detections: any;
  userService: UserService;
  faceMatcher: any;
  users: any;
  match: any;
  detectedUser: User | null;
  scanning: boolean;
}

export default class FaceScannerComponent extends React.Component<
  IAppProps,
  IAppState
> {
  private cameraPreviewOpts: CameraPreviewOptions = {
    className: "preview-container",
    parent: "cameraPreview",

    position: "front",
  };
  private readonly TAG = "FaceScannerComponent";
  private container: HTMLDivElement | null = null;
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      detectedUser: null,
      users: null,
      faceMatcher: null,
      ref: null,
      preview: null,
      detections: null,
      match: null,
      scanning: false,
      userService: injector.get(UserServiceToken) as UserService,
    };
  }
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
    this.setState({match: null, detectedUser: null, scanning: false, detections: null})
  }

  onScanFace = async () => {
    this.setState({scanning: true})
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
    const refreshIntervalId = setInterval(async () => {
      await loadModels();
      const detectionsWithLandmarks = await getFullFaceDescription2(video);
      const resizedDetections = faceapi.resizeResults(
        detectionsWithLandmarks,
        displaySize
      );
      console.log("resizedDetections", resizedDetections);
      if (resizedDetections.length > 0) {
        this.setState({ detections: resizedDetections[0].detection });
        let match = await detectionsWithLandmarks.map((a: any) => {
          console.log("descriptor length", a.descriptor.length);
          return this.state.faceMatcher.findBestMatch(a.descriptor);
        });
        if (match.length > 0) {
          console.log("match label", match[0]._label);
          const user = this.state.users.find(
            (u: any) => u.uid === match[0]._label
          );
          if(user?.uid){
            console.log("user finded", user);
            this.setState({detectedUser: user, match: match, scanning: false})
          }
        }
        clearInterval(refreshIntervalId);
      }
    }, 100);
  };

  componentWillMount = async () => {
    await loadModels();
    const users = await this.state.userService.getAllUsers();
    console.log("users", users);
    const faceMatcher = await createMatcher(users);
    this.setState({ faceMatcher: faceMatcher, users: users });
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
  public render() {
    return (
      <div>
        <div
          id="cameraPreview"
          className="cameraPreview"
          hidden={this.state.detectedUser != null}
          ref={(el: HTMLDivElement) => (this.container = el)}
        ></div>
        {this.state.detectedUser != null ? (
          <DetectedUserComponent user={this.state.detectedUser} closeAction={this.closeAction}></DetectedUserComponent>
        ) : ''}
        {this.state.detections && this.state.detectedUser == null ? (
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
        <div className="buttons">
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto" className="ion-justify-content-center">
              <IonButton disabled={this.state.scanning || this.state.detectedUser != null} color="primary" onClick={this.onScanFace}>
                <IonIcon icon={scan}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </div>
      </div>
    );
  }
}
