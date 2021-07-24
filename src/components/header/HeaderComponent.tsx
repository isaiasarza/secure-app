import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { FC } from "react";
import { home, options } from "ionicons/icons";
import { HeaderOption } from "../../model/headerOption";
import { useHistory } from "react-router";
interface IProps {
  options: HeaderOption[];
}

const HeaderComponent: FC<IProps> = (props) => {
  const history = useHistory();
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
          {/* <IonButton onClick={props.onClick}>
              <IonIcon slot="icon-only" icon={props.icon_2}></IonIcon>
            </IonButton> */}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderComponent;
