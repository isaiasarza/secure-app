import { IonContent, IonPage } from "@ionic/react";
import React, { FC } from "react";
import HeaderComponent from '../../components/header/HeaderComponent';
import LoginComponent from '../../components/login/Login';

interface IProps {};

const LoginPage:FC<IProps> = (props) => {
    return (
        <IonPage>
            <HeaderComponent></HeaderComponent>
            <IonContent class="ion-padding">
                <LoginComponent></LoginComponent>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;