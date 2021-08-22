import React, { FC } from "react";
import { ReportedPerson } from "../../../model/reported.person";
import "./ReportItem.css";
import { IonRow, IonCol } from "@ionic/react";
import moment from "moment";
interface IProps {
  report: ReportedPerson;
}

const ReportItem: FC<IProps> = (props) => {
  return (
    <div className="report-item" id={"report_" + props.report.uuid}>
      <div className="report-item-content">
        {/*  */}
        <IonRow>
          <IonCol>
            <h3>Reporte #{" " + props.report.number}</h3>
          </IonCol>
        </IonRow>
        <div className="sub-item">
          <h4>Persona Reportada</h4>
          <IonRow>
            <IonCol>DNI: {props.report.firstname}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Nombre: {props.report.firstname}</IonCol>
            <IonCol>Apellido: {props.report.lastname}</IonCol>
          </IonRow>
        </div>
        <div className="sub-item">
          <h4>Reportado Por</h4>
          <IonRow>
            <IonCol>DNI: {props.report.reporterDni}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>Nombre: {props.report.reporterFirstname}</IonCol>
            <IonCol>Apellido: {props.report.reporterLastname}</IonCol>
          </IonRow>
        </div>
        <div className="sub-item">
          <h4>Otros Datos</h4>
          <IonRow>
            <IonCol size="6">
              Fecha: {moment(props.report.date).format("DD/MM/yyyy")}
            </IonCol>
            <IonCol size="6">
              Hora: {moment(props.report.date).format("HH:mm")}
            </IonCol>
          </IonRow>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ReportItem;
