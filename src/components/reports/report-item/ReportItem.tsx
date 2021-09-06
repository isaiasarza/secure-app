import React, { FC, useState } from "react";
import { ReportedPerson } from "../../../model/reported.person";
import "./ReportItem.css";
import {
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
} from "@ionic/react";
import moment from "moment";
import { navigateCircleOutline } from "ionicons/icons";
import MapComponent from "./map/MapComponent";
interface IProps {
  report: ReportedPerson;
}

const ReportItem: FC<IProps> = (props) => {
  const [showMap, setShowMap] = useState(false);
  const onOpenMap = () => {
    console.log(
      "onOpenMap",
      "lat: " + props.report.lat,
      "long: " + props.report.long
    );
    setShowMap(true);
  };
  return (
    <div className="report-item" id={"report_" + props.report.uuid} key={props.report.uuid}>
      <IonModal isOpen={showMap} cssClass="my-custom-class" showBackdrop={true}>
        <MapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          yesIWantToUseGoogleMapApiInternals
          lat={props.report.lat}
          lng={props.report.long}
        />
      </IonModal>
      <div className="report-item-content">
        {/*  */}
        <IonRow>
          <IonCol>
            <h3>Reporte # {props.report.number}</h3>
          </IonCol>
        </IonRow>
        <div className="sub-item">
          <h4>Persona Reportada</h4>
          <IonRow>
            <IonCol><b>DNI:</b> {props.report.dni}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol><b>Nombre:</b> {props.report.firstname}</IonCol>
            <IonCol><b>Apellido:</b> {props.report.lastname}</IonCol>
          </IonRow>
        </div>
        <div className="sub-item">
          <h4>Reportado Por</h4>
          <IonRow>
            <IonCol><b>DNI:</b> {props.report.reporterDni}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol><b>Nombre:</b> {props.report.reporterFirstname}</IonCol>
            <IonCol><b>Apellido:</b> {props.report.reporterLastname}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol><b>Motivo:</b> {props.report.description}</IonCol>
          </IonRow>
        </div>
        <div className="sub-item">
          <h4>Otros Datos</h4>
          <IonRow>
            <IonCol size="6">
              <b>Fecha:</b> {moment(props.report.date).format("DD/MM/yyyy")}
            </IonCol>
            <IonCol size="6">
              <b>Hora:</b> {moment(props.report.date).format("HH:mm")}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="2" offset="10">
              {/*  <IonFab vertical="bottom" horizontal="end" slot="fixed"> */}
              <IonFabButton size="small" color="primary" onClick={onOpenMap}>
                <IonIcon icon={navigateCircleOutline}></IonIcon>
              </IonFabButton>
              {/*  </IonFab> */}
            </IonCol>
          </IonRow>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ReportItem;
