import {
  IonCard,
  IonCardSubtitle,
  IonImg,
  IonCol,
  IonCardHeader,
  IonRow,
  IonGrid,
  IonModal,
} from "@ionic/react";
import { FC, useState } from "react";
import { useHistory } from "react-router";
import "./HomeComponent.css";
import FaceScannerComponent from "../face-scanner/FaceScannerComponent";
import { User } from "../../model/user";
import PositionLoggerComponent from "../position-logger/PositionLoggerComponent";
import { AuthorizationService } from "../../service/autz/autz.service";
import { AuthorizationServiceToken, injector } from "../../injector/injector";
import { ActionTypeEnum, ProfilesTypeEnum } from "../../model/profiles-type.enum";
import SecurityManagerHomeComponent from './SecurityManagerHome/SecurityManagerHome';
import GuardHomeComponent from './GuardHome/GuardHome';
interface IProps {
  user: User;
}

const HomeComponent: FC<IProps> = (props) => {

  const getPeriod = (minutes: number) => {
    return minutes * 60000;
  };

  return (
    <div className="container">
      <div hidden={true}>
        <PositionLoggerComponent
          period={getPeriod(3)}
          user={props.user}
        ></PositionLoggerComponent>
      </div>
      
      {props.user.role === ProfilesTypeEnum.SECURITY_MANAGER ? <SecurityManagerHomeComponent></SecurityManagerHomeComponent> : ''}
      {props.user.role === ProfilesTypeEnum.VIGILANT ? <GuardHomeComponent user={props.user}></GuardHomeComponent> : ''}
      {/* <IonGrid>
        <IonRow>
          {autzService.isAuthorized(props.user.role, ActionTypeEnum.SCANNER) ? (
            <IonCol>
              <IonCard onClick={onFaceScan}>
                <IonImg src="/assets/images/face-recognition.png"></IonImg>
                <IonCardHeader color="primary">
                  <IonCardSubtitle>Face Scan</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          ) : (
            ""
          )}
          <IonCol>
            <IonCard>
              <IonImg src="/assets/images/formulario.png"></IonImg>
              <IonCardHeader color="primary">
                <IonCardSubtitle>Nuevo Registro</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard onClick={onViewReports}>
              <IonImg src="/assets/images/documento.png"></IonImg>
              <IonCardHeader color="primary">
                <IonCardSubtitle>Reportes</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard>
              <IonImg src="/assets/images/notificaciones.png"></IonImg>
              <IonCardHeader color="primary">
                <IonCardSubtitle>Notificaciones</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid> */}
    </div>
  );
};

export default HomeComponent;
