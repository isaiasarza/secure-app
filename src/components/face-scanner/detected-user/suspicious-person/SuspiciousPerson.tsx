import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import React, { FC } from "react";
import { ReportedPerson } from "../../../../model/reported.person";
import SelfieComponent from "../../../selfie/SelfieComponent";

interface IProps {
  reportedPerson: ReportedPerson;
}

const SuspiciousPerson: FC<IProps> = (props) => {
  const handler = async (webPath: string, fileName: string) => {};
  return (
    <IonGrid>
      <h2>Datos de la Persona Reportada</h2>
      <IonRow className="ion-padding-top">
        <IonCol size="1"></IonCol>
        <IonCol size="10">
          <SelfieComponent
            selfieUrl={
              props.reportedPerson?.selfie_url?.length
                ? props.reportedPerson.selfie_url
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
            <IonInput
              value={props.reportedPerson.firstname}
              disabled={true}
            ></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Apellido</IonLabel>
            <IonInput
              value={props.reportedPerson.lastname}
              disabled={true}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Motivo</IonLabel>
            <IonInput
              value={props.reportedPerson.description}
              disabled={true}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <h2>Datos del Guardia Reportador</h2>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              value={props.reportedPerson.reporterFirstname}
              disabled={true}
            ></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Apellido</IonLabel>
            <IonInput
              value={props.reportedPerson.reporterLastname}
              disabled={true}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">DNI</IonLabel>
            <IonInput
              value={props.reportedPerson.reporterDni}
              disabled={true}
            ></IonInput>
          </IonItem>
        </IonCol>
        {/* <IonCol>
          <IonItem>
            <IonLabel position="stacked">CUIL/CUIT</IonLabel>
            <IonInput
              value={props.reportedPerson.rep}
              disabled={true}
            ></IonInput>
          </IonItem>
        </IonCol> */}
      </IonRow>
    </IonGrid>
  );
};

export default SuspiciousPerson;
