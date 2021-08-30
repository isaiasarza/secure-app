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
import ReportSuspiciousPersonComponent from "../report-suspicious-person/ReportSuspiciousPersonComponent";
import ReliablePerson from "../reliable-person/ReliablePerson";
import { ReportedPerson } from "../../model/reported.person";
import SuspiciousPerson from "../suspicious-person/SuspiciousPerson";
interface IProps {
  user: User;
  matchedUser?: User;
  matchedReportedPerson?: ReportedPerson;
  closeAction: Function;
  detectionType: DetectionTypeEnum;
  goHome: Function;
}
export enum DetectionTypeEnum {
  SUSPICIOUS = "SUSPICIOUS",
  RELIABLE = "RELIABLE",
  UNKNOWN = "UNKNOWN",
}
const DetectedUserComponent: FC<IProps> = (props) => {
  const TAG = "DetectedUserComponent";
  const handler = async (webPath: string, fileName: string) => {};
  const getIcon = () => {
    switch (props.detectionType) {
      case DetectionTypeEnum.RELIABLE:
        return checkmarkCircleOutline;
      case DetectionTypeEnum.SUSPICIOUS:
        return warningOutline;
      case DetectionTypeEnum.UNKNOWN:
        return alertCircleOutline;
    }
  };

  const getIconColor = () => {
    switch (props.detectionType) {
      case DetectionTypeEnum.RELIABLE:
        return "success";
      case DetectionTypeEnum.SUSPICIOUS:
        return "danger";
      case DetectionTypeEnum.UNKNOWN:
        return "warning";
    }
  };

  const getResultLabel = () => {
    switch (props.detectionType) {
      case DetectionTypeEnum.RELIABLE:
        return "¡Relax! La persona detectada es confiable";
      case DetectionTypeEnum.SUSPICIOUS:
        return "¡Cuidado! Está persona fue reportada en otra ocasión";
      case DetectionTypeEnum.UNKNOWN:
        return "No podemos reconocer esté rostro";
    }
  };

  const getClassName = () => {
    switch (props.detectionType) {
      case DetectionTypeEnum.RELIABLE:
        return "frame-success";
      case DetectionTypeEnum.SUSPICIOUS:
        return "frame-danger";
      case DetectionTypeEnum.UNKNOWN:
        return "frame-unknown";
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
        <IonCardContent style={{
          paddingTop:"20px",
        }}>
          <div className={getClassName()}>
            <div className="frame-icon ion-justify-content-center">
              <IonIcon
                className="custom-icon"
                icon={getIcon()}
                color={getIconColor()}
              ></IonIcon>
            </div>
            {props.detectionType === DetectionTypeEnum.RELIABLE &&
            props.matchedUser?.uid ? (
              <div className="suspicious-person">
                <ReliablePerson
                  user={props.matchedUser}
                ></ReliablePerson>
              </div>
            ) : (
              ""
            )}

            {props.detectionType === DetectionTypeEnum.SUSPICIOUS &&
            props.matchedReportedPerson?.uuid ? (
              <div className="suspicious-person">
                <SuspiciousPerson
                  reportedPerson={props.matchedReportedPerson}
                ></SuspiciousPerson>
              </div>
            ) : (
              ""
            )}

            {props.detectionType === DetectionTypeEnum.UNKNOWN ? (
              <div className="suspicious-person">
                <ReportSuspiciousPersonComponent
                  user={props.user}
                  goHome={props.goHome}
                  closeAction={props.closeAction}
                ></ReportSuspiciousPersonComponent>
              </div>
            ) : (
              ""
            )}
          </div>
        </IonCardContent>
      </IonCard>
    </IonGrid>
  );
};

export default DetectedUserComponent;
