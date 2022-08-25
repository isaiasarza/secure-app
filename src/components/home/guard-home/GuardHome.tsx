import React, { FC, useState } from "react";
import { IonCol, IonGrid, IonModal, IonRow } from "@ionic/react";
import "./GuardHome.css";
import FaceScannerComponent from "../../face-scanner/FaceScannerComponent";
import { User } from "../../../model/user";
import { useHistory } from "react-router";
import { Zone } from "../../../model/zone/zone";
import { Notification } from "../../../model/notification/notification";
interface IProps {
  user: User;
  zones: Zone[];
}

const GuardHomeComponent: FC<IProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const closeModal = () => {
    setShowModal(false);
  };
  const onFaceScan = async () => {
    setShowModal(true);
  };
  const onViewReports = async () => {
    history.push("/reports");
  };

  const onViewZones = async () => {
    console.log("onViewZones", props.zones);
    history.push("/zones", { zones: props.zones, user: props.user });
  };

  const onViewNotifications = async () => {
    console.log("onViewNotifications", props.zones);
    history.push("/notifications", { user: props.user });
  };
  return (
    <div>
      <IonModal
        isOpen={showModal}
        cssClass="my-custom-class"
        showBackdrop={true}
        onDidDismiss={closeModal}
        backdropDismiss={true}
      >
        <FaceScannerComponent
          closeAction={closeModal}
          user={props.user}
        ></FaceScannerComponent>
      </IonModal>
      <IonGrid>
        <IonRow className="row ion-justify-content-center">
          <IonCol>
            <div className="home-option" onClick={onFaceScan}>
              <p className="label">Scanner</p>
            </div>
          </IonCol>
          <IonCol>
            <div className="home-option" onClick={onViewZones}>
              <p className="label">Zonas</p>
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="row ion-justify-content-center">
          <IonCol>
            <div className="home-option" onClick={onViewReports}>
              <p className="label">Reportes</p>
            </div>
          </IonCol>
          <IonCol>
            <div className="home-option" onClick={onViewNotifications}>
              <p className="label">Notificaciones</p>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default GuardHomeComponent;
