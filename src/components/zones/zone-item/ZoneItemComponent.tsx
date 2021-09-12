import { IonCol, IonRow, IonFabButton, IonIcon, IonModal } from "@ionic/react";
import React, { FC, useState } from "react";
import { Zone } from "../../../model/zone/zone";
import { manOutline, navigateCircleOutline } from "ionicons/icons";
import ZoneMapComponent from "./zone-map/MapComponent";

interface IProps {
  zone: Zone;
}

const ZoneItemComponent: FC<IProps> = (props) => {
  const [showMap, setShowMap] = useState(false);
  const onOpenMap = () => {
    console.log("onOpenMap", "zone", props.zone);
    setShowMap(true);
  };
  return (
    <div
      className="report-item"
      id={"report_" + props.zone.uuid}
      key={props.zone.uuid}
    >
      <IonModal isOpen={showMap} cssClass="my-custom-class" showBackdrop={true}>
        <ZoneMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          yesIWantToUseGoogleMapApiInternals
          lat={props.zone.geofence.latitude}
          lng={props.zone.geofence.longitude}
          radius={props.zone.geofence.radius}
        />
      </IonModal>
      <div className="report-item-content">
        {/*  */}
        <IonRow>
          <IonCol>
            <h3>Zona "{props.zone.name}"</h3>
          </IonCol>
        </IonRow>
        <div className="sub-item">
          <IonRow>
            <IonCol>
              <b>Descripción:</b> {props.zone.description}
            </IonCol>
          </IonRow>
        </div>
        <div className="sub-item">
          <IonRow>
            <IonCol size="6">
            <b>Guardias Asignados:</b> {props.zone.assignedGuards.length}
            </IonCol>
            <IonCol size="2" offset="4">
              <IonFabButton size="small" color="primary" onClick={onOpenMap}>
                <IonIcon icon={manOutline}></IonIcon>
              </IonFabButton>
            </IonCol>
          </IonRow>
        </div>
        <div className="sub-item">
          <IonRow>
            <IonCol size="6">
              <b>Radio de la Zona:</b> {props.zone.geofence.radius} mts
            </IonCol>
            <IonCol size="2" offset="4">
              <IonFabButton size="small" color="primary" onClick={onOpenMap}>
                <IonIcon icon={navigateCircleOutline}></IonIcon>
              </IonFabButton>
            </IonCol>
          </IonRow>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ZoneItemComponent;
