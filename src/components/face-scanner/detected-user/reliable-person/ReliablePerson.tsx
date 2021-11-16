import React, { FC } from "react";
import { User } from "../../../../model/user";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import SelfieComponent from "../../../selfie/SelfieComponent";
interface IProps {
  user: User;
}

const ReliablePerson: FC<IProps> = (props) => {
  const handler = async (webPath: string, fileName: string) => {};
  return (
    <IonGrid>
      <IonRow className="ion-padding-top">
        <IonCol size="1"></IonCol>
        <IonCol size="10">
          <SelfieComponent
            selfieUrl={
               props.user?.selfie_url?.length
                ? props.user.selfie_url
                : props.user.local_selfie_url?.length
                ? props.user.local_selfie_url
                : ""
            }
            readonly={true}
            handler={handler}
          ></SelfieComponent>
        </IonCol>
        <IonCol size="1"></IonCol>
      </IonRow>
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
    </IonGrid>
  );
};

export default ReliablePerson;
