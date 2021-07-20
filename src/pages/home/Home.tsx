import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Home.css";
import HeaderComponent from "../../components/header/HeaderComponent";
import { logOut } from "ionicons/icons";
import { useHistory } from 'react-router';
import { AuthService } from '../../service/auth/auth.service';
import { injector, AuthServiceToken } from '../../injector/injector';
import { useState } from "react";

const HomePage: React.FC = () => {
  const history = useHistory()
  const [authService] = useState<AuthService>(injector.get(AuthServiceToken))
  return (
    <IonPage>
      <HeaderComponent
        icon={logOut}
        onClick={() => {
          console.log("logOut");
          authService.logout()
          history.push("/")
        }}
      ></HeaderComponent>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">Secure App</IonTitle>
            <IonButtons slot="primary">
              <IonButton>
                <IonIcon slot="icon-only" name="home-outline"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
