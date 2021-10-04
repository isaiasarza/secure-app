import { IonContent, IonPage } from "@ionic/react";
import React, { FC } from "react";
import HeaderComponent from "../../components/header/HeaderComponent";
import LoginComponent from "../../components/login/Login";
import { personAdd } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { HeaderOption } from "../../model/header.option";

interface IProps {}

const LoginPage: FC<IProps> = (props) => {
  const history = useHistory();
  const options: HeaderOption[] = [
    {
      key: "login_to_register",
      icon: personAdd,
      onClick: (e: any) => {
        console.log("navigate to register");
        e.preventDefault();
        history.push("/register");
      },
    },
  ];
  return (
    <IonPage>
      <HeaderComponent
        options={options}
      ></HeaderComponent>
      <IonContent class="ion-padding">
        <LoginComponent></LoginComponent>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
