import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { IonFabButton, IonIcon, useIonToast } from "@ionic/react";
import { camera } from "ionicons/icons";
import React, { FC, useState } from "react";
import { UserPhoto } from "../../model/user.photo";
import { presentErrorToast } from "../../utils/toast";

interface IProps {
  /* user: User | null; */
  handler: Function;
  readonly: boolean;
  selfieUrl: string;
}

const SelfieComponent: FC<IProps> = (props) => {
  const [photo, setPhoto] = useState<UserPhoto>();
  const [present] = useIonToast();

  const getSelfieUrl = () => {
    return photo?.webviewPath?.length
      ? photo?.webviewPath
      : props.selfieUrl.length
      ? props.selfieUrl
      : "";
  };

  const takePicture = async () => {
    const image: Photo = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
      height: 1000,
      width: 1000,
    });

    if (!image?.webPath) {
      presentErrorToast(
        present,
        "Ha ocurrido un error al tomar la foto, intente nuevamente"
      );
      return;
    }
    //const fileName = props.user?.uid + "_selfie";
    await setPhoto({
      filepath: "props.fileName",
      webviewPath: image.webPath,
    });
    console.log("webviewPath", image.webPath);
    console.log("photo", photo);

    props.handler(image.webPath);
  };
  return (
    <div className="avatar-container">
      <div className="avatar">
        {props.selfieUrl?.length ? (
          <div className="selfie">
            <img
              alt=""
              src={
                photo?.webviewPath?.length
                  ? photo?.webviewPath
                  : props.selfieUrl.length
                  ? props.selfieUrl
                  : ""
              }
            />
          </div>
        ) : (
          <div className="default-user">
            <img alt="" src="/assets/images/default-user.png" />
          </div>
        )}
      </div>
      <div className="avatar-button">
        <IonFabButton
          hidden={props.readonly}
          size="small"
          onClick={() => takePicture()}
        >
          <IonIcon icon={camera}></IonIcon>
        </IonFabButton>
      </div>
    </div>
  );
};

export default SelfieComponent;
