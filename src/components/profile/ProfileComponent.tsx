import {
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
  IonButton,
  IonIcon,
  IonItem,
} from "@ionic/react";
import React, { FC, useState } from "react";
import { User } from "../../model/user";

import { AuthService } from "../../service/auth/auth.service";
import { injector, AuthServiceToken } from "../../injector/injector";
import { IonInput } from "@ionic/react";

interface IProps {
  user: User;
  closeAction: Function;
}

const ProfileComponent: FC<IProps> = (props) => {
  const [authService] = useState<AuthService>(injector.get(AuthServiceToken));
  /* var user: User = {
    firstname: "",
    lastname: "",
    dni: "",
    cuil_cuit: "",
    role: "",
    email: "",
  }; */
  /*  authService.suscribeChanges((_user: User) => {
    user = _user;
    console.log("home user value changed", user);
  }); */
  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={props.user.firstname} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Apellido</IonLabel>
            <IonInput value={props.user.lastname} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">DNI</IonLabel>
            <IonInput value={props.user.dni} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">CUIL/CUIT</IonLabel>
            <IonInput value={props.user.cuil_cuit} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput value={props.user.email} disabled={true}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>

      <IonButton expand="block" onClick={() => props.closeAction()}>
        <IonIcon name="close" slot="icon-only"></IonIcon>
      </IonButton>
    </IonGrid>
  );
};

export default ProfileComponent;
