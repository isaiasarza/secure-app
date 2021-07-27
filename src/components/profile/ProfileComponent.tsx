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
} from "@ionic/react";
import React, { FC, useState } from "react";
import { User } from "../../model/user";

import { AuthService } from "../../service/auth/auth.service";
import { injector, AuthServiceToken } from "../../injector/injector";
import { IonInput, IonImg } from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { add, camera } from "ionicons/icons";
import { UserPhoto } from '../../model/user.photo';

interface IProps {
  user: User;
  closeAction: Function;
}

const ProfileComponent: FC<IProps> = (props) => {
  const [authService] = useState<AuthService>(injector.get(AuthServiceToken));
  const [photo, setPhoto] = useState<UserPhoto>();
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });
    debugger
    console.log("photo taked", image)
    var imageUrl = image.webPath;
    debugger
    const fileName = new Date().getTime() + ".jpeg";
    // Can be set to the src of an image now
    setPhoto({
      filepath:fileName,
      webviewPath: image.webPath
    });
    debugger
  };
  /* var user: User = {
    firstname: "",
    lastname: "",
    dni: "",
    cuil_cuit: "",
    role: "",
    email: "",
  }; */
  /*  authService.suscribeChanges((_user: User) => {
    user = _user;
    console.log("home user value changed", user);
  }); */
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
     {/*  <img style={{ border: "1px solid black", minHeight: "100px" }}
        src={photo.imageUrl} alt=""/> */}
      {
        photo?.webviewPath?.length ? <IonImg src={photo.webviewPath} /> : null
      }
      <IonFab slot="fixed">
        <IonFabButton onClick={() => takePicture()}>
          <IonIcon icon={camera} />
        </IonFabButton>
      </IonFab>

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
