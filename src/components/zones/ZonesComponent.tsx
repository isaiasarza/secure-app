import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add, addCircle, addCircleOutline } from "ionicons/icons";
import React, { FC } from "react";
import { Zone } from "../../model/zone/zone";
import ZoneItemComponent from "./zone-item/ZoneItemComponent";
import './ZoneComponent.css'
interface IProps {
  zones: Zone[];
}

const ZonesComponent: FC<IProps> = (props) => {
  return (
    <div>
      <div>
        {props.zones.map((z: Zone) => {
          return (
            <div key={z.uuid}>
              <ZoneItemComponent zone={z}></ZoneItemComponent>
              <br></br>
            </div>
          );
        })}
      </div>
      <div className="fixed">
        <IonFab vertical="top" horizontal="end" slot="fixed" edge={true}>
          <IonFabButton color="primary">
            <IonIcon icon={addCircleOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </div>
    </div>
  );
};

export default ZonesComponent;
