import { IonContent, IonPage } from "@ionic/react";
import React, { FC } from "react";
import RegisterComponent from '../../components/register/RegisterComponent';
import HeaderComponent from '../../components/header/HeaderComponent';
import {logIn} from 'ionicons/icons'
import { useHistory } from "react-router";
interface IProps {}

const RegisterPage: FC<IProps> = (props) => {
    const history = useHistory()
  return (
    <IonPage>
      <HeaderComponent
        icon={logIn}
        onClick={(e: any) => {
            console.log("navigate to login");
            e.preventDefault();
            history.push("/login");
          }}
      ></HeaderComponent>
      <IonContent class="ion-padding">
        <RegisterComponent></RegisterComponent>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
