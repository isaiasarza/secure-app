import { IonFab, IonFabButton, IonIcon, IonModal } from '@ionic/react';
import { add, addCircle, addCircleOutline } from "ionicons/icons";
import React, { FC, useState } from "react";
import { Zone } from "../../model/zone/zone";
import ZoneItemComponent from "./zone-item/ZoneItemComponent";
import './ZoneComponent.css'
import AddZoneComponent from './add-zone/AddZoneComponent';
interface IProps {
  zones: Zone[];
}

const ZonesComponent: FC<IProps> = (props) => {
  const [showAddZone,setShowAddZone] = useState<boolean>(false)
  const [change,setChange] = useState<number>(0)
  const closeAddZoneModal = (data?: any) => {
    if(data?.newZone){
      props.zones.push(data?.newZone)
      setChange(change + 1)
    }
    setShowAddZone(false)
  }

  const onAddZone = () => {
    setShowAddZone(true)
  }
  return (
    <div>
     
      <IonModal isOpen={showAddZone} onDidDismiss={() => closeAddZoneModal()}>
        <AddZoneComponent closeAction={closeAddZoneModal}></AddZoneComponent>
      </IonModal>
      <div>
        {props.zones.map((z: Zone) => {
          return (
            <div key={z.uuid}>
               <p hidden={true}>{change}</p>
              <ZoneItemComponent zone={z}></ZoneItemComponent>
              <br></br>
            </div>
          );
        })}
      </div>
      <div className="fixed">
        <IonFab vertical="top" horizontal="end" slot="fixed" edge={true}>
          <IonFabButton color="primary" onClick={onAddZone}>
            <IonIcon icon={addCircleOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </div>
    </div>
  );
};

export default ZonesComponent;
