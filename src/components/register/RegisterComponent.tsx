import React, { FC, useState } from "react";
import { IonButton, useIonToast } from "@ionic/react";
import { User } from '../../model/user';
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { createUser } from "../../firebaseConfig";
import { useHistory } from "react-router";
interface IProps {}

const RegisterComponent: FC<IProps> = (props) => {
  const history = useHistory()
  const [present] = useIonToast();
  async function onRegister() {
    const user: User = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        role: 'vigilant',
        cuil_cuit: cuil_cuit,
        dni: dni
    }
    console.log("onRegister", user);
    try{
      const savedUser = await createUser(email, password, user)
      console.log("savedUser", savedUser)
      history.push("/home")
      present({
        message: 'El usuario fue registrado de forma exitosa',
        duration: 3000,
        color: 'success'
      })
    }catch(error){
      present({
        message: 'No se pudo registrar al usuario, intente nuevamente',
        duration: 3000,
        color: 'danger'
      })
    }
  }
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dni, setDNI] = useState("");
  const [cuil_cuit, setCuilCuit] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  return (
    <IonCard>
      <IonCardContent>
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            type="text"
            onIonChange={(event: any) => setFirstname(event.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Apellido</IonLabel>
          <IonInput
            type="text"
            onIonChange={(event: any) => setLastname(event.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="text"
            onIonChange={(event: any) => setEmail(event.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">DNI</IonLabel>
          <IonInput
            type="number"
            onIonChange={(event: any) => setDNI(event.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">CUIL/CUIT</IonLabel>
          <IonInput
            type="text"
            onIonChange={(event: any) => setCuilCuit(event.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            type="password"
            onIonChange={(event: any) => setPassword(event.target.value)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Repetir Contraseña</IonLabel>
          <IonInput
            type="password"
            onIonChange={(event: any) => setRepeatPassword(event.target.value)}
          ></IonInput>
        </IonItem>
        <IonButton expand="full" onClick={onRegister}>Registrarme</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default RegisterComponent;
