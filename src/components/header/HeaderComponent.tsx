import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { FC } from "react";
import { HeaderOption } from "../../model/header.option";
interface IProps {
  options: HeaderOption[];
}

const HeaderComponent: FC<IProps> = (props) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Secure App</IonTitle>
        <IonButtons slot="primary">
          {props.options.map((opt: HeaderOption) => {
            return (
              <IonButton key={opt.key} onClick={opt.onClick}>
                <IonIcon slot="icon-only" icon={opt.icon}></IonIcon>
              </IonButton>
            );
          })}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderComponent;
