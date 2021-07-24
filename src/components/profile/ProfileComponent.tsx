import { IonCol, IonGrid, IonRow, IonLabel, IonButton, IonIcon } from "@ionic/react";
import React, { FC, useState } from "react";
import { User } from "../../model/user";

import { AuthService } from "../../service/auth/auth.service";
import { injector, AuthServiceToken } from "../../injector/injector";

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
            <IonLabel>Nombre: {props.user.firstname}</IonLabel>
          </IonCol>
          <IonCol>
            <IonLabel>Apellido: {props.user.lastname}</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonLabel>DNI: {props.user.dni}</IonLabel>
          </IonCol>
          <IonCol>
            <IonLabel>CUIL/CUIT: {props.user.cuil_cuit}</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonLabel>Email: {props.user.email}</IonLabel>
          </IonCol>
        </IonRow>
  
        <IonButton onClick={() => props.closeAction()}>
          <IonIcon name="close" slot="icon-only"></IonIcon>
        </IonButton>
      </IonGrid>
    );
  
};

export default ProfileComponent;
