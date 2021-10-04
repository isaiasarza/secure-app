import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { FC } from "react";
import { useHistory } from "react-router";
import { HeaderOption } from "../../model/header.option";
interface IProps {
  options: HeaderOption[];
}

const HeaderComponent: FC<IProps> = (props) => {
  const history = useHistory()
  const goHome = () => {
    history.push("/home")
  };
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle onClick={goHome}>Secure App</IonTitle>
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
