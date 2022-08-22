import {
  IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCol,
  IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow
} from "@ionic/react";
import { FC, useState } from "react";
import { injector, UserServiceToken } from "../../injector/injector";
import { User } from "../../model/user";
import "./ProfileComponent.css";

import { close } from "ionicons/icons";
import { UserService } from "../../service/user/user.service";
import SelfieComponent from "../selfie/SelfieComponent";

interface IProps {
  user: User;
  closeAction: Function;
}

const ProfileComponent: FC<IProps> = (props) => {
  const [userService] = useState<UserService>(injector.get(UserServiceToken));
  const handler = async (webPath: string) => {
    const res = await fetch(webPath);
    const blob = await res.blob();
    userService.setSelfie(props.user, props.user.uid + "_selfie", blob);
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
              <SelfieComponent
                readonly={false}
                selfieUrl={
                  props.user.selfie_url?.length
                    ? props.user.selfie_url
                    : props.user?.local_selfie_url?.length
                    ? props.user.local_selfie_url
                    : ""
                }
                handler={handler}
              ></SelfieComponent>
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
