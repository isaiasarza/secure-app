import {
  IonGrid,
  IonCard,
  IonCardHeader,
  IonRow,
  IonCol,
  IonCardSubtitle,
  IonIcon,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { FC } from "react";
import { User } from "../../model/user";
import SelfieComponent from "../selfie/SelfieComponent";

interface IProps {
  user: User;
  closeAction: Function;
}

const DetectedUserComponent: FC<IProps> = (props) => {
  const handler = async (webPath: string, fileName: string) => {};
  return (
    <IonGrid>
      <IonCard>
        <IonCardHeader>
          <IonRow>
            <IonCol size="11">
              <IonCardSubtitle>Usuario Detectado</IonCardSubtitle>
            </IonCol>
          </IonRow>
        </IonCardHeader>
        <IonCardContent>
          <IonRow>
            <IonCol size="1"></IonCol>
            <IonCol size="10">
              <SelfieComponent
                user={props.user}
                readonly={true}
                handler={handler}
              ></SelfieComponent>
            </IonCol>
            <IonCol size="1">
              <IonIcon
                onClick={() => props.closeAction()}
                icon={close}
              ></IonIcon>
            </IonCol>
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

export default DetectedUserComponent;
