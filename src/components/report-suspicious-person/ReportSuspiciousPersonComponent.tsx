import React, { FC } from "react";
import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import SelfieComponent from "../selfie/SelfieComponent";
import { IonButton } from "@ionic/react";

interface IProps {}

const ReportSuspiciousPersonComponent: FC<IProps> = (props) => {
  const handler = async (webPath: string, fileName: string) => {};
  return (
    <div>
      <IonRow className="ion-padding-top">
        <IonCol size="1"></IonCol>
        <IonCol size="10">
          <SelfieComponent
            user={{
              firstname: "",
              lastname: "",
              email: "",
              role: "",
              cuil_cuit: "",
              dni: "",
            }}
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
            <IonInput disabled={false}></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Apellido</IonLabel>
            <IonInput disabled={false}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">DNI</IonLabel>
            <IonInput disabled={false}></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">CUIL/CUIT</IonLabel>
            <IonInput disabled={false}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput disabled={false}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonItem>
          <IonLabel className="ion-text-wrap" position="stacked">
            ¿Porque razón motivo o cirscunstancia usted reporta a esta persona?
          </IonLabel>
          <IonTextarea rows={6} cols={20} disabled={false}></IonTextarea>
        </IonItem>
      </IonRow>
      <IonButton expand="full" type="submit" color="primary">
        Enviar Reporte
      </IonButton>
    </div>
  );
};

export default ReportSuspiciousPersonComponent;
