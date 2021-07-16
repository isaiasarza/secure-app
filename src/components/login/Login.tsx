import React, { FC, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Login.css";
import { IonButton } from '@ionic/react';
import { loginUser } from '../../firebaseConfig';

interface IProps {}

const LoginComponent: FC<IProps> = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onLogin(){
    console.log(email, password)
    const res = await loginUser(email,password)
    console.log("login", res ? 'successful' : 'failed')
  }
  return (
    <IonCard>
        <IonImg src="/assets/images/security-app-logo.png"></IonImg>
      <IonCardContent>
        <IonItem>
          <IonLabel position="stacked">
            Email
          </IonLabel>
          <IonInput type="text" onIonChange={(event: any) => setEmail(event.target.value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput type="password" onIonChange={(event: any) => setPassword(event.target.value)}></IonInput>
        </IonItem>
        <IonButton expand="full" onClick={onLogin}>Iniciar Sesión</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default LoginComponent;
