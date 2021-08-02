import * as React from "react";
import { getFullFaceDescription, loadModels } from "../../service/face-api/face-api.service";
const testImg = require("./test.jpeg");

export interface IAppProps {
  imageURL: any;
  fullDesc: any;
  detections: any[];
  loading: boolean;
}
const INIT_STATE = {
  imageURL: window.location.origin + '/assets/face-api-test/test.jpeg',
  fullDesc: null,
  detections: [],
  loading: false,
};
export default class ImageInputComponent extends React.Component<{},IAppProps> {
  private readonly TAG = ImageInputComponent
  constructor(props: IAppProps) {
    super(props);
    this.state = { ...INIT_STATE };
  }
  componentWillMount = async () => {
    console.log(this.TAG, "componentWillMount")
    await loadModels();
    await this.handleImage(this.state.imageURL);
  };

  handleImage = async (image = this.state.imageURL) => {
    await getFullFaceDescription(image).then(fullDesc => {
      console.log(fullDesc);
      this.setState({ fullDesc });
    });
  };

  handleFileChange = async (event: any) => {
    this.resetState();
    await this.setState({
      imageURL: URL.createObjectURL(event.target.files[0]),
      loading: true
    });
    this.handleImage();
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };

  render() {
    const { imageURL, detections } = this.state;

    let drawBox = null;
    if (detections.length > 0) {
      drawBox = detections.map((detection: any, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            />
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
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute' }}>
            <img src={imageURL} alt="imageURL" />
          </div>
          {!!drawBox ? drawBox : null}
        </div>
      </div>
    );
  }
}
