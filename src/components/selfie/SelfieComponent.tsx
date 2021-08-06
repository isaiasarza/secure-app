import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { IonFabButton, IonIcon, useIonToast } from "@ionic/react";
import { camera } from "ionicons/icons";
import React, { FC, useState } from "react";
import { User } from "../../model/user";
import { UserPhoto } from "../../model/user.photo";
import { presentErrorToast } from "../../utils/toast";

interface IProps {
  user: User | null;
  handler: Function;
}

const SelfieComponent: FC<IProps> = (props) => {
  const [photo, setPhoto] = useState<UserPhoto>();
  const [present] = useIonToast();

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
    const fileName = props.user?.uid + "_selfie";
    setPhoto({
      filepath: fileName,
      webviewPath: image.webPath,
    });

    props.handler(image.webPath, fileName);
  };
  return (
    <div className="avatar-container">
      <div className="avatar">
        {props.user?.local_selfie_url?.length || photo?.webviewPath?.length ? (
          <div className="selfie">
            <img
              alt=""
              src={
                props.user?.local_selfie_url?.length
                  ? props.user?.local_selfie_url
                  : photo?.webviewPath?.length
                  ? photo?.webviewPath
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
        <IonFabButton size="small" onClick={() => takePicture()}>
          <IonIcon icon={camera}></IonIcon>
        </IonFabButton>
      </div>
    </div>
  );
};

export default SelfieComponent;
