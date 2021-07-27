import {
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
  IonButton,
  IonIcon,
  IonItem,
  IonFab,
  IonFabButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonAvatar,
} from "@ionic/react";
import React, { FC, useState } from "react";
import { User } from "../../model/user";
import "./ProfileComponent.css";
import { AuthService } from "../../service/auth/auth.service";
import { injector, AuthServiceToken } from "../../injector/injector";
import { IonInput, IonImg, IonContent } from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { add, camera, person } from "ionicons/icons";
import { UserPhoto } from "../../model/user.photo";

interface IProps {
  user: User;
  closeAction: Function;
}

const ProfileComponent: FC<IProps> = (props) => {
  const [authService] = useState<AuthService>(injector.get(AuthServiceToken));
  const [photo, setPhoto] = useState<UserPhoto>();

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
      height: 1000,
      width: 1000
    });
    console.log("photo taked", image);
    const fileName = new Date().getTime() + ".jpeg";
    // Can be set to the src of an image now
    setPhoto({
      filepath: fileName,
      webviewPath: image.webPath,
    });
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={props.user.firstname} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Apellido</IonLabel>
            <IonInput value={props.user.lastname} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">DNI</IonLabel>
            <IonInput value={props.user.dni} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">CUIL/CUIT</IonLabel>
            <IonInput value={props.user.cuil_cuit} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput value={props.user.email} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      {photo?.webviewPath?.length ? (
        <IonRow>
          <IonCol size="12">
            <div className="avatar-container">
              <div className="avatar">
                <img alt="" src={photo.webviewPath} />
              </div>
            </div>
          </IonCol>
        </IonRow>
      ) : null}
      <IonRow>
        <IonCol className="ion-align-items-center" size="4">
          <IonButton onClick={() => takePicture()}>
            <IonIcon icon={camera}></IonIcon>
          </IonButton>
        </IonCol>
        <IonCol size="4"></IonCol>
        <IonCol className="ion-align-items-center" size="4">
          <IonButton onClick={() => props.closeAction()}>
            <IonIcon name="close"></IonIcon>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ProfileComponent;
