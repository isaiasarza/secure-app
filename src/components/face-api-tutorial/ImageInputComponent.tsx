import * as React from "react";
import { UserService } from "../../service/user/user.service";
import { injector, UserServiceToken } from "../../injector/injector";
import {
  createMatcher,
  getFullFaceDescription,
  loadModels,
} from "../../service/face-api/face-api.service";
import { User } from "../../model/user";
const testImg = window.location.origin + "/assets/face-api-test/test_3.jpg";

export interface IAppProps {
  imageURL: any;
  fullDesc: any;
  detections: any;
  loading: boolean;
  faceMatcher: any;
  match: any;
  descriptors: any;
  userService: UserService;
  users: User[];
}
// Import face profile
const JSON_PROFILE = require("./descriptors/rolling-stones.json");

// Initial State
const INIT_STATE = {
  imageURL: testImg,
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null,
  loading: false,
  users:[]
};
export default class ImageInputComponent extends React.Component<
  {},
  IAppProps
> {
  private readonly TAG = ImageInputComponent;
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      ...INIT_STATE,
      faceMatcher: null,
      userService: injector.get(UserServiceToken) as UserService,
    };
  }
  componentWillMount = async () => {
    console.log(this.TAG, "componentWillMount");
    await loadModels();
    const users = await this.state.userService.getAllUsers();
    console.log("users", users);
    const faceMatcher = await createMatcher(users);
    console.log("faceMatcher", faceMatcher);
    this.setState({ faceMatcher: faceMatcher, users: users });
    await this.handleImage(this.state.imageURL);
  };

  handleImage = async (image = this.state.imageURL) => {
    await getFullFaceDescription(image).then((fullDesc) => {
      if (!!fullDesc) {
        fullDesc.forEach((fd: any, i: number) => {
          console.log(
            this.TAG,
            "fullDesc descriptor #" + i,
            Array.from(fd.descriptor).length
          );
        });
        this.setState({
          fullDesc,
          detections: fullDesc.map((fd) => fd.detection),
          descriptors: fullDesc.map((fd) => fd.descriptor),
        });
      }
    });

    if (!!this.state.descriptors && !!this.state.faceMatcher) {
      let match = await this.state.descriptors.map((descriptor: any) => {
        console.log("descriptor length", descriptor.length);
        return this.state.faceMatcher.findBestMatch(descriptor);
      });
      this.setState({ match });
    }
  };

  handleFileChange = async (event: any) => {
    this.resetState();
    await this.setState({
      imageURL: URL.createObjectURL(event.target.files[0]),
      loading: true,
    });
    this.handleImage();
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };

  render() {
    const { imageURL, detections, match } = this.state;

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection: any, i: number) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                border: "solid",
                borderColor: "blue",
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`,
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: "var(--ion-color-secondary)",
                    border: "solid",
                    borderColor: "var(--ion-color-secondary)",
                    width: _W,
                    marginTop: 0,
                    color: "#fff",
                    transform: `translate(-3px,${_H}px)`,
                  }}
                >
                  {match[i]._label.toLowerCase() === "unknown" ? 'No reconocido' :  match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        <input
          id="myFileUpload"
          type="file"
          onChange={this.handleFileChange}
          accept=".jpg, .jpeg, .png"
        />
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute" }}>
            <img src={imageURL} alt="imageURL" />
          </div>
          {!!drawBox ? drawBox : null}
        </div>
      </div>
    );
  }
}
