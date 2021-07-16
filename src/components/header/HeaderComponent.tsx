import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import React, { FC } from "react";
import {home} from 'ionicons/icons'
interface IProps {};

const HeaderComponent:FC<IProps> = (props) => {
    return (
    <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Secure App</IonTitle>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={home}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      );
};

export default HeaderComponent;