import { IonContent, IonPage } from "@ionic/react";
import React, { FC } from "react";
import RegisterComponent from "../../components/register/RegisterComponent";
import HeaderComponent from "../../components/header/HeaderComponent";
import { logIn } from "ionicons/icons";
import { useHistory } from "react-router";
import { HeaderOption } from '../../model/header.option';
interface IProps {}

const RegisterPage: FC<IProps> = (props) => {
  const history = useHistory();
  const options: HeaderOption[] = [
    {
      key: "register_to_login",
      icon: logIn,
      onClick: (e: any) => {
        console.log("navigate to login");
        e.preventDefault();
        history.push("/login");
      },
    },
  ];
  return (
    <IonPage>
      <HeaderComponent
        options={options}
      ></HeaderComponent>
      <IonContent class="ion-padding">
        <RegisterComponent></RegisterComponent>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
