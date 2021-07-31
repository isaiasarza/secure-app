import * as React from "react";
import { UserContextService } from "../../service/user-context/user-context.service";
import { injector, UserContextServiceToken } from "../../injector/injector";
import { User } from "../../model/user";
import { HeaderOption } from "../../model/headerOption";
import { logOut, personOutline } from "ionicons/icons";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
  IonBackButton,
} from "@ionic/react";
import HeaderComponent from "../../components/header/HeaderComponent";
import ProfileComponent from "../../components/profile/ProfileComponent";
import { RouteComponentProps } from "react-router";
import HomeComponent from "../../components/home/HomeComponent";
import { Subscription } from "rxjs";

export interface IAppProps {
  history: RouteComponentProps["history"];
}

export interface IAppState {
  userContextService: UserContextService;
  user: User | null;
  showModal: boolean;
}

export default class HomePage extends React.Component<IAppProps, IAppState> {
  public _isMounted: boolean = false
  public subscription: Subscription | null = null;
  private options: HeaderOption[] = [
    {
      key: "home_to_profile",
      icon: personOutline,
      onClick: async () => {
        console.log("on Navigate To Profile");
        let state = { ...this.state };
        state.showModal = true;
        this.setState(state);
      },
    },
    {
      key: "home_logout",
      icon: logOut,
      onClick: () => {
        console.log("on Log Out");
        this.props.history.push("/");
      },
    },
  ];
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      userContextService: injector.get(
        UserContextServiceToken
      ) as UserContextService,
      user: null,
      showModal: false,
    };
  }

  componentDidMount() {
    this._isMounted = true
    console.log("componentDidMount");
    const userContextService = this.state.userContextService;
    if (!userContextService.currentUser.observed)
      this.subscription = userContextService.currentUser.subscribe((user) => {
        console.log("current user", user);
      /*   setTimeout(() => { */
          if (user) {
            let state = { ...this.state };
            state.user = user;
            this.setState(state);
          }
       /*  }, 500); */
      });
    /*  userContextService.userSelfie.subscribe((selfie) => {
      console.log("user selfie", selfie);
      if (selfie) {
        let state = { ...this.state };
        state.selfie = 
        this.setState(state);
      }
    }); */
  }
  
  componentDidUpdate() {
    console.log("componentDidUpdate")
  }
  /* componentDidUpdate() {
    console.log("componentDidUpdate")
    const userContextService = this.state.userContextService;
    if (userContextService.currentUser.closed) {
      userContextService.currentUser.subscribe((user) => {
        console.log("current user", user);
        if (user) {
          let state = { ...this.state };
          state.user = user;
          this.setState(state);
        }
      });
    }
    if (userContextService.userSelfie.closed) {
      userContextService.userSelfie.subscribe((selfie) => {
        console.log("user selfie", selfie);
        if (selfie) {
          let state = { ...this.state };
          state.selfie = URL.createObjectURL(selfie);
          this.setState(state);
        }
      });
    }
  }*/

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this._isMounted = false
    if (this.subscription){
      this.subscription.unsubscribe()
    }
  }

  closeModal = () => {
    let state = { ...this.state };
    state.showModal = false;
    this.setState(state);
  };

  public render() {
    if (this.state.user) {
      let { user } = this.state;
      let { showModal } = this.state;
      return (
        <IonPage>
          <HeaderComponent options={this.options}></HeaderComponent>

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
            <HomeComponent></HomeComponent>
            <IonModal
              isOpen={showModal}
              cssClass="my-custom-class"
              showBackdrop={true}
            >
              <ProfileComponent
                user={user}
                closeAction={this.closeModal}
              ></ProfileComponent>
            </IonModal>
          </IonContent>
        </IonPage>
      );
    } else {
      return <div>No Current User</div>;
    }
  }
}
