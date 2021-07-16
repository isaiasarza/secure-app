import { IonContent, IonPage } from "@ionic/react";
import React, { FC } from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import LoginComponent from "../../components/login/Login";
import { personAdd } from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface IProps {}

const LoginPage: FC<IProps> = (props) => {
  const history = useHistory();
  return (
    <IonPage>
      <HeaderComponent
        icon={personAdd}
        onClick={(e: any) => {
          console.log("navigate to register");
          e.preventDefault();
          history.push("/register");
        }}
      ></HeaderComponent>
      <IonContent class="ion-padding">
        <LoginComponent></LoginComponent>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
