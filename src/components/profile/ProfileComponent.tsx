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
  IonCardContent,
  IonCardTitle,
} from "@ionic/react";
import React, { FC, useState } from "react";
import { User } from "../../model/user";
import "./ProfileComponent.css";
import { AuthService } from "../../service/auth/auth.service";
import { injector, AuthServiceToken, CloudFilesServiceToken } from '../../injector/injector';
import {
  IonInput,
  IonImg,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { add, camera, close, person } from "ionicons/icons";
import { UserPhoto } from "../../model/user.photo";
import { CloudFilesService } from '../../service/cloud-files/cloud-files.service';

interface IProps {
  user: User;
  closeAction: Function;
}

const ProfileComponent: FC<IProps> = (props) => {
  const [cloudFilesService] = useState<CloudFilesService>(injector.get(CloudFilesServiceToken));
  const [photo, setPhoto] = useState<UserPhoto>();

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
      height: 1000,
      width: 1000,
    });
    console.log("photo taked", image);
    const fileName = props.user.uid + "_selfie.jpeg";
    // Can be set to the src of an image now
    setPhoto({
      filepath: fileName,
      webviewPath: image.webPath,
    });
    cloudFilesService.uploadFile("asdf",fileName,image)
  };

  return (
    <IonGrid>
      <IonCard>
        <IonCardHeader>
          <IonRow>
            <IonCol size="11">
              <IonCardSubtitle>Mis Datos Personales</IonCardSubtitle>
            </IonCol>
            <IonCol size="1">
              <IonIcon
                onClick={() => props.closeAction()}
                icon={close}
              ></IonIcon>
            </IonCol>
          </IonRow>
        </IonCardHeader>
        <IonCardContent>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol size="10">
              <div className="avatar-container">
              <div className="avatar">
                {photo?.webviewPath?.length ? (
                  <div className="selfie">
                    <img alt="" src={photo.webviewPath} />
                  </div>
                ) : (
                  <div className="default-user">
                    <img
                      alt=""
                      src="/assets/images/default-user.png"
                    />
                  </div>
                )}
                </div>
                <div className="avatar-button">
                  <IonFabButton size="small" onClick={() => takePicture()}>
                    <IonIcon icon={camera}></IonIcon>
                  </IonFabButton>
                </div>
              </div>
            </IonCol>
            <IonCol size="1"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  value={props.user.firstname}
                  disabled={true}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Apellido</IonLabel>
                <IonInput
                  value={props.user.lastname}
                  disabled={true}
                ></IonInput>
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
                <IonInput
                  value={props.user.cuil_cuit}
                  disabled={true}
                ></IonInput>
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
        </IonCardContent>
      </IonCard>
    </IonGrid>
  );
};

export default ProfileComponent;
