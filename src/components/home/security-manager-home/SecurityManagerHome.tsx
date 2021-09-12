import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { User } from "../../../model/user";
import { Zone } from "../../../model/zone/zone";
import "../HomeComponent.css";
interface IProps {
  user: User;
  zones: Zone[];
}

const SecurityManagerHomeComponent: FC<IProps> = (props) => {
  const history = useHistory();
  const onViewReports = async () => {
    history.push("/reports");
  };

  const onViewGuards = async () => {
    history.push("/guards");
  };

  const onViewZones = async () => {
    console.log("onViewZones",props.zones)
    history.push("/zones", { zones: props.zones });
  };

  return (
    <div>
      <IonGrid>
        <IonRow className="row ion-justify-content-center">
          <IonCol>
            <div className="home-option" onClick={onViewGuards}>
              <p className="label">Guardias</p>
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
            <div className="home-option">
              <p className="label">Notificaciones</p>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default SecurityManagerHomeComponent;
