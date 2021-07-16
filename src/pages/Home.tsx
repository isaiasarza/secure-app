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
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import HeaderComponent from '../components/header/HeaderComponent';

const Home: React.FC = () => {
  return (
    <IonPage>
      <HeaderComponent></HeaderComponent>
      {/* <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Secure App</IonTitle>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" icon={home}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">
              Secure App
            </IonTitle>
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

export default Home;
