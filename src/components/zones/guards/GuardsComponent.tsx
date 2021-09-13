import React, { FC, useEffect, useState } from "react";
import { User } from "../../../model/user";
import { Zone } from "../../../model/zone/zone";
import { IonGrid, IonRow, IonCol, IonIcon, IonButton } from "@ionic/react";
import "./GuardsComponent.css";
import {
  addCircleSharp,
  checkmarkDoneCircleSharp,
  closeCircleSharp,
} from "ionicons/icons";
interface IProps {
  zone: Zone;
  guards: User[];
}

const GuardsComponent: FC<IProps> = (props) => {
  const [zone, setZone] = useState<Zone>(props.zone);
  const [change, setChange] = useState<number>(0);
  const onAddGuard = async (guardId: string) => {
    console.log("onAddGuard");
    const _zone = zone;
    _zone.assignedGuards.push(guardId);
    setZone(_zone);
    setChange(change + 1);
  };

  const onRemoveGuard = async (guardId: string) => {
    const index = props.zone.assignedGuards.findIndex((id) => id === guardId);
    if (index > -1) {
      props.zone.assignedGuards.splice(index, 1);
      setZone(props.zone);
      setChange(change - 1);
    }
  };

  const isAssigned = (guardId: string) => {
    return zone.assignedGuards.includes(guardId);
  };

  useEffect(() => {});

  return (
    <div>
      <p hidden={true}>{change}</p>
      {props.guards.map((guard: User, index: number) => {
        return (
          <div key={"id_" + index}>
            <div className="custom-item ion-margin">
              <IonRow>
                <IonCol size="10">
                  <IonRow>
                    <IonCol className="ion-text-wrap">
                      <b>DNI:</b> {guard.dni}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol className="ion-text-wrap">
                      <b>CUIL/CUIT:</b> {guard.cuil_cuit}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol className="ion-text-wrap">
                      <b>Nombre:</b> {guard.firstname}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol className="ion-text-wrap">
                      <b>Apellido:</b> {guard.lastname}
                    </IonCol>
                  </IonRow>
                </IonCol>
                <IonCol size="2">
                  {isAssigned(guard.uid || "") ? (
                    <div>
                      {/* <IonIcon
                        className="added"
                        icon={checkmarkDoneCircleSharp}
                      ></IonIcon>
                      <IonIcon
                        className="remove"
                        icon={closeCircleSharp}
                      ></IonIcon> */}
                      <IonButton fill="clear" slot="icon-only">
                        <IonIcon
                          className="added"
                          icon={checkmarkDoneCircleSharp}
                          slot="icon-only"
                        ></IonIcon>
                      </IonButton>
                      <IonButton
                        fill="clear"
                        slot="icon-only"
                        onClick={() => {
                          onRemoveGuard(guard.uid || "");
                        }}
                      >
                        <IonIcon
                          className="remove"
                          icon={closeCircleSharp}
                          slot="icon-only"
                        ></IonIcon>
                      </IonButton>
                    </div>
                  ) : (
                    <div className="item-action">
                      <IonButton
                        fill="clear"
                        slot="icon-only"
                        onClick={() => {
                          onAddGuard(guard.uid || "");
                        }}
                      >
                        <IonIcon
                          className="add"
                          icon={addCircleSharp}
                          slot="icon-only"
                        ></IonIcon>
                      </IonButton>
                    </div>
                  )}
                </IonCol>
              </IonRow>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GuardsComponent;
