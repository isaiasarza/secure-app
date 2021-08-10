import * as React from "react";
import {
  CameraPreview,
  CameraPreviewOptions,
} from "@capacitor-community/camera-preview";
import { IonContent, IonPage } from "@ionic/react";
import "./FaceScannerComponent.css";
export interface IAppProps {
  closeAction: Function;
}

export interface IAppState {}

export default class FaceScannerComponent extends React.Component<
  IAppProps,
  IAppState
> {
  private cameraPreviewOpts: CameraPreviewOptions = {
    className: "cameraPreview",
    parent: "cameraPreview",
    position: "front",
  };
  private readonly TAG = "FaceScannerComponent";
  private container: any = {};
  constructor(props: IAppProps) {
    super(props);
    this.state = {};
  }

  setPreview(container: HTMLDivElement) {
    console.log("on Change Container", container);
    if (container?.clientWidth > 0) {
      console.log(
        "width:",
        container.clientWidth,
        "height:",
        container.clientHeight
      );
      this.cameraPreviewOpts.height = container.clientHeight;
      this.cameraPreviewOpts.width = container.clientWidth;
      CameraPreview.start(this.cameraPreviewOpts);
    }
  }

  componentDidMount() {
    console.log(this.TAG, "componentDidMount", this.container.clientWidth);
  }

  componentDidUpdate() {
    console.log(this.TAG, "componentDidUpdate", this.container.clientWidth);
  }

  public render() {
    return (
      <div
        id="cameraPreview"
        className="cameraPreview"
        ref={(el: HTMLDivElement) => this.setPreview(el)}
      ></div>
    );
  }
}
