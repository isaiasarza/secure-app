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
import {
  alertCircleOutline,
  checkmarkCircleOutline,
  close,
  warningOutline,
} from "ionicons/icons";
import React, { FC } from "react";
import { User } from "../../model/user";
import SelfieComponent from "../selfie/SelfieComponent";
import "./DetectedUserComponent.css";
import ReportSuspiciousPersonComponent from '../report-suspicious-person/ReportSuspiciousPersonComponent';
interface IProps {
  user: User;
  matchedUser?: User;
  closeAction: Function;
  detectionType: DetectionTypeEnum;
}
export enum DetectionTypeEnum {
  SUSPICIOUS = "SUSPICIOUS",
  RELIABLE = "RELIABLE",
  UNKNOWN = "UNKNOWN",
}
const DetectedUserComponent: FC<IProps> = (props) => {
  const TAG = "DetectedUserComponent"
  const handler = async (webPath: string, fileName: string) => {
    console.log(TAG,"selfie handler", webPath, fileName)
  };
  const getIcon = () => {
    switch(props.detectionType){
      case DetectionTypeEnum.RELIABLE:
        return checkmarkCircleOutline;
      case DetectionTypeEnum.SUSPICIOUS:
        return warningOutline;
      case DetectionTypeEnum.UNKNOWN:
        return alertCircleOutline
    }
  };

  const getIconColor = () => {
    switch(props.detectionType){
      case DetectionTypeEnum.RELIABLE:
        return "success";
      case DetectionTypeEnum.SUSPICIOUS:
        return "danger";
      case DetectionTypeEnum.UNKNOWN:
        return "warning"
    }
  };

  const getResultLabel = () => {
    switch(props.detectionType){
      case DetectionTypeEnum.RELIABLE:
        return "¡Relax! La persona detectada es confiable";
      case DetectionTypeEnum.SUSPICIOUS:
        return "¡Cuidado! Está persona fue reportada en otra ocasión";
      case DetectionTypeEnum.UNKNOWN:
        return "No podemos reconocer esté rostro"
    }
  };

  const getClassName = () => {
    switch(props.detectionType){
      case DetectionTypeEnum.RELIABLE:
        return "frame-success";
      case DetectionTypeEnum.SUSPICIOUS:
        return "frame-danger";
      case DetectionTypeEnum.UNKNOWN:
        return "frame-unknown"
    }
  };
  return (
    <IonGrid>
      <IonCard className="scroll-content">
        <IonCardHeader>
          <IonRow>
            <IonCol size="11">
              <IonCardSubtitle>Resultado de Scan</IonCardSubtitle>
            </IonCol>
            <IonCol size="1">
              <IonIcon
                onClick={() => props.closeAction()}
                icon={close}
                color="background-constrant"
              ></IonIcon>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>{getResultLabel()}</IonLabel>
            </IonCol>
          </IonRow>
        </IonCardHeader>
        <IonCardContent>
          <div className={getClassName()}>
            <div className="frame-icon ion-justify-content-center">
              <IonIcon
                className="custom-icon"
                icon={getIcon()}
                color={getIconColor()}
              ></IonIcon>
            </div>
            {props.detectionType === DetectionTypeEnum.RELIABLE && props.matchedUser?.uid? (
              <div>
                <IonRow className="ion-padding-top">
                  <IonCol size="1"></IonCol>
                  <IonCol size="10">
                    <SelfieComponent
                      selfieUrl={
                        props.matchedUser.local_selfie_url?.length
                          ? props.matchedUser.local_selfie_url
                          : props.matchedUser?.selfie_url?.length
                          ? props.matchedUser.selfie_url
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
                        value={props.matchedUser.firstname}
                        disabled={true}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Apellido</IonLabel>
                      <IonInput
                        value={props.matchedUser.lastname}
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
                        value={props.matchedUser.dni}
                        disabled={true}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">CUIL/CUIT</IonLabel>
                      <IonInput
                        value={props.matchedUser.cuil_cuit}
                        disabled={true}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Email</IonLabel>
                      <IonInput
                        value={props.matchedUser.email}
                        disabled={true}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </div>
            ) : (
              ""
            )}
          
          {props.detectionType === DetectionTypeEnum.UNKNOWN ? 
          <div className="suspicious-person">
            <ReportSuspiciousPersonComponent user={props.user}></ReportSuspiciousPersonComponent>
          </div> : '' }
          </div>
        </IonCardContent>
      </IonCard>
    </IonGrid>
  );
};

export default DetectedUserComponent;
