import React, { FC, useState } from "react";
import { IonCol, IonGrid, IonModal, IonRow } from "@ionic/react";
import "./GuardHome.css";
import FaceScannerComponent from "../../face-scanner/FaceScannerComponent";
import { User } from "../../../model/user";
import { useHistory } from "react-router";
interface IProps {
  user: User;
}

const GuardHomeComponent: FC<IProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const closeModal = () => {
    setShowModal(false);
  };
  const onFaceScan = async () => {
    //console.log("on go to photo");
    setShowModal(true);
    // history.push("/photo");
  };
  const onViewReports = async () => {
    history.push("/reports");
  };
  return (
    <div>
      <IonModal
        isOpen={showModal}
        cssClass="my-custom-class"
        showBackdrop={true}
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
            <div className="home-option">
              <p className="label">Zonas</p>
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="row ion-justify-content-center">
          <IonCol>
            <div className="home-option">
              <p className="label">Reportes</p>
            </div>
          </IonCol>
          <IonCol>
            <div className="home-option">
              <p className="label">Notificaciones</p>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default GuardHomeComponent;
