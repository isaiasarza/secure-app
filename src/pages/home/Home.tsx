import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Home.css";
import HeaderComponent from "../../components/header/HeaderComponent";
import { logOut, personOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { AuthService } from "../../service/auth/auth.service";
import { injector, AuthServiceToken, UserContextServiceToken } from '../../injector/injector';
import { useState } from "react";
import { HeaderOption } from "../../model/headerOption";
import { User } from "../../model/user";
import ProfileComponent from "../../components/profile/ProfileComponent";
import { UserContextService } from '../../service/user-context/user-context.service';
import * as React from 'react'
import { useObservable } from '../../observable/useObservedValue';
interface IProps {
  user: User;
}
const HomePage: React.FC = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [authService] = useState<AuthService>(injector.get(AuthServiceToken));
  const [userContextService] = useState<UserContextService>(injector.get(UserContextServiceToken));
  //var user: User = {firstname:"",lastname:"",dni:"",cuil_cuit:"",role:"", email:""};

  async function closeModal() {
    await setShowModal(false);
  }

  const user = useObservable(userContextService.currentUser.asObservable())
  const options: HeaderOption[] = [
    {
      key:"home_to_profile",
      icon: personOutline,
      onClick: async () => {
        console.log("on Navigate To Profile");
        await setShowModal(true);
      },
    },
    {
      key:"home_logout",
      icon: logOut,
      onClick: () => {
        console.log("on Navigate To Profile");
        authService.logout();
        history.push("/");
      },
    },
  ];
  if (user) {
    return (
      <IonPage>
        <HeaderComponent
          options={options}
          /* icon={logOut}
          onClick={() => {
            console.log("logOut");
            authService.logout();
            history.push("/");
          }} */
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
          <IonModal isOpen={showModal}>
            <ProfileComponent
              user={user}
              closeAction={closeModal}
            ></ProfileComponent>
          </IonModal>
        </IonContent>
      </IonPage>
    );
  }else{
    return(
    <IonPage>
        <HeaderComponent
          options={options}
          /* icon={logOut}
          onClick={() => {
            console.log("logOut");
            authService.logout();
            history.push("/");
          }} */
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
  }
};

export default HomePage;
