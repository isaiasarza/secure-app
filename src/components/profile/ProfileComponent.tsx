import {
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
  IonIcon,
  IonItem,
  IonFabButton,
  IonCardContent,
} from "@ionic/react";
import React, { FC, useState } from "react";
import { User } from "../../model/user";
import "./ProfileComponent.css";
import {
  injector,
  CloudFilesServiceToken,
  UserServiceToken,
} from "../../injector/injector";
import {
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
} from "@ionic/react";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { camera, close } from "ionicons/icons";
import { UserPhoto } from "../../model/user.photo";
import { CloudFilesService } from "../../service/cloud-files/cloud-files.service";
import { UserService } from "../../service/user/user.service";
import { presentErrorToast } from '../../utils/toast';
import { useIonToast } from '@ionic/react';

interface IProps {
  user: User;
  closeAction: Function;
}

const ProfileComponent: FC<IProps> = (props) => {
  const [cloudFilesService] = useState<CloudFilesService>(
    injector.get(CloudFilesServiceToken)
  );
  const [present] = useIonToast();
  const [userService] = useState<UserService>(injector.get(UserServiceToken));
  const [photo, setPhoto] = useState<UserPhoto>();
 // if(props.selfie?.length) setSelfie(props.selfie)
  const takePicture = async () => {
    const image: Photo = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
      height: 1000,
      width: 1000,
    });

    if(!image?.webPath) {
      presentErrorToast(present, "Ha ocurrido un error al tomar la foto, intente nuevamente")
      return
    }

    console.log("photo taked", image);
    const fileName = props.user.uid + "_selfie.jpeg";
    // Can be set to the src of an image now
    setPhoto({
      filepath: fileName,
      webviewPath: image.webPath,
    });
    
    const res = await fetch(image.webPath);
    const blob = await res.blob();
    
    userService.setSelfie(props.user, fileName, blob);
    //cloudFilesService.uploadFile("asdf",fileName,image)
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
                  {props.user?.local_selfie_url?.length || photo?.webviewPath?.length ? (
                    <div className="selfie">
                      <img alt="" src={props.user?.local_selfie_url?.length ? props.user?.local_selfie_url : photo?.webviewPath?.length ? photo?.webviewPath : ''} />
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
