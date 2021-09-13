import { IonCol, IonRow, IonButton, IonModal } from "@ionic/react";
import React, { FC, useState } from "react";
import {
  injector,
  PositionLoggerServiceToken,
} from "../../../injector/injector";
import { User } from "../../../model/user";
import { PositionLoggerService } from "../../../service/position-logger/position-logger.service";
import "./GuardItem.css";
import GuardActivity from "../guard-activity/GuardActivity";
import { PositionLog } from "../../../model/position-log";
interface IProps {
  guard: User;
}

const GuardItem: FC<IProps> = (props) => {
  const [positionLoggerService] = useState<PositionLoggerService>(
    injector.get(PositionLoggerServiceToken)
  );

  const [showActivity, setShowActivity] = useState(false);
  const [activity, setActivity] = useState<PositionLog[]>([]);
  const closeModal = () => {
    setShowActivity(false);
  };
  const onViewGuardActivity = async () => {
      if(props.guard.uid){
        const activity = await positionLoggerService.getByGuardId(props.guard.uid);
        console.log("activity", activity)
        setActivity(activity)
        setShowActivity(true)
      }
  };
  return (
    <div
      className="report-item"
      id={"report_" + props.guard.uid}
      key={props.guard.uid}
    >
      <IonModal isOpen={showActivity} cssClass="my-custom-class" onDidDismiss={closeModal} showBackdrop={true}>
        <GuardActivity guard={props.guard} activity={activity}></GuardActivity>
      </IonModal>
      <div className="report-item-content">
        {/*  */}
        <IonRow>
          <IonCol>
            <h3>Guardia de Seguridad</h3>
          </IonCol>
        </IonRow>
        <div className="sub-item">
          <h4>Datos Personales</h4>
          <IonRow>
            <IonCol>
              <b>DNI:</b> {props.guard.dni}
            </IonCol>
            <IonCol>
              <b>Matrícula:</b> {props.guard.uid}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <b>Nombre:</b> {props.guard.firstname}
            </IonCol>
            <IonCol>
              <b>Apellido:</b> {props.guard.lastname}
            </IonCol>
          </IonRow>
        </div>
        {/* <div className="sub-item">
        <h4>Reportado Por</h4>
        <IonRow>
          <IonCol><b>DNI:</b> {props.guard.reporterDni}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol><b>Nombre:</b> {props.guard.reporterFirstname}</IonCol>
          <IonCol><b>Apellido:</b> {props.guard.reporterLastname}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol><b>Motivo:</b> {props.guard.description}</IonCol>
        </IonRow>
      </div>
      <div className="sub-item">
        <h4>Otros Datos</h4>
        <IonRow>
          <IonCol size="6">
            <b>Fecha:</b> {moment(props.guard.date).format("DD/MM/yyyy")}
          </IonCol>
          <IonCol size="6">
            <b>Hora:</b> {moment(props.guard.date).format("HH:mm")}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="2" offset="10">
            <IonFabButton size="small" color="primary" onClick={onOpenMap}>
              <IonIcon icon={navigateCircleOutline}></IonIcon>
            </IonFabButton>
          </IonCol>
        </IonRow>
      </div> */}
        <br />
        <div className="ion-justify-content-center">
          <IonButton onClick={onViewGuardActivity}>
            {" "}
            Ver Actividad del Guardia
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default GuardItem;
