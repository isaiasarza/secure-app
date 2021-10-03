import * as React from "react";
import { UserContextService } from "../../service/user-context/user-context.service";
import {
  injector,
  UserContextServiceToken,
  ZoneServiceToken,
  GeofenceServiceToken,
} from "../../injector/injector";
import { User } from "../../model/user";
import { HeaderOption } from "../../model/header.option";
import { constructOutline, logOut, personOutline } from "ionicons/icons";
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
  useIonToast,
  IonToast,
} from "@ionic/react";
import HeaderComponent from "../../components/header/HeaderComponent";
import ProfileComponent from "../../components/profile/ProfileComponent";
import { RouteComponentProps } from "react-router";
import HomeComponent from "../../components/home/HomeComponent";
import { Subscription } from "rxjs";
import { ZoneService } from "../../service/zone/zone.service";
import { GeofenceService } from "../../service/geofence/geofence.service";
import { Zone } from "../../model/zone/zone";
import { presentSuccessToast } from "../../utils/toast";
import {
  FCMServiceToken,
  UserServiceToken,
  NotificationServiceToken,
} from "../../injector/injector";
import { FCMService } from "../../service/fcm/fcm.service";
import { Token, PushNotificationSchema } from "@capacitor/push-notifications";
import { UserService } from "../../service/user/user.service";
import { NotificationService } from "../../service/notification/notification.service";
import { Notification } from "../../model/notification/notification";
import moment from "moment";
import { NotificationType } from "../../model/notification/notification-type.enum";

export interface IAppProps {
  history: RouteComponentProps["history"];
}

export interface IAppState {
  userContextService: UserContextService;
  fcmService: FCMService;
  zoneService: ZoneService;
  geofenceService: GeofenceService;
  zones: Zone[];
  user: User | null;
  showModal: boolean;
  isToastOpen: boolean;
  userService: UserService;
  notificationService: NotificationService;
  toastData: any;
}

export default class HomePage extends React.Component<IAppProps, IAppState> {
  public _isMounted: boolean = false;
  //public isToastOpen: boolean = false;
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
      userContextService: injector.get(UserContextServiceToken),
      userService: injector.get(UserServiceToken),
      zoneService: injector.get(ZoneServiceToken),
      geofenceService: injector.get(GeofenceServiceToken),
      fcmService: injector.get(FCMServiceToken),
      notificationService: injector.get(NotificationServiceToken),
      zones: [],
      user: null,
      showModal: false,
      isToastOpen: false,
      toastData: null,
    };
  }

  getZones = async () => {
    try {
      const zones = await this.state.zoneService.get();
      await this.state.geofenceService.initialize();
      await this.state.geofenceService.addGeofences(
        zones.map((z) => z.geofence)
      );

      const watched = await this.state.geofenceService.getWatched();
      console.log("watched", watched);
      const geofenceListener = this.state.geofenceService.getListener();
      geofenceListener.subscribe(async (data) => {
        console.log("geofenceListener", data);

        this.setState({ isToastOpen: true, toastData: data });
        setTimeout(() => {
          this.setState({ isToastOpen: false, toastData: null });
        }, 5000);
        const notification: Notification = {
          receivedDate: moment().toISOString(),
          type: NotificationType.GUARD_ZONE_ENTERED,
          pushNotification: {
            id: "1",
            title: "Hola Mundo",
            body: "Esta es una prueba hecha desde Secure-App",
            data: {},
            
          },
        };
        this.state.notificationService.add(notification);
        const tokens = await this.state.userService.getUserTokens();
        if (tokens.length > 0)
          this.state.fcmService.sendNotification(
            notification.pushNotification,
            tokens
          );
      });
      return zones;
    } catch (error) {
      return [];
    }
  };

  async registrationHandler(token: Token, state: any) {
    console.log("registrationHandler", token, state);
    const user = state.user;
    user.push_notification_token = token.value;
    console.log("updating user token:", user.push_notification_token);
    state.userService.update(user);
  }

  async pushNotificationReceivedHandler(
    pushNotification: PushNotificationSchema
  ) {
    console.log("pushNotificationReceivedHandler", pushNotification);
  }

  async componentDidMount() {
    this._isMounted = true;
    console.log("componentDidMount");
    this.setState({ zones: await this.getZones() });
    const userContextService = this.state.userContextService;

    if (!userContextService.currentUser.observed)
      this.subscription = userContextService.currentUser.subscribe((user) => {
        console.log("current user", user);
        if (user) {
          let state = { ...this.state };
          state.user = user;
          this.setState(state);

          this.state.fcmService.register(
            this.registrationHandler,
            this.pushNotificationReceivedHandler,
            this.state,
          );
        }
      });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this._isMounted = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
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
            <HomeComponent
              user={this.state.user}
              zones={this.state.zones}
            ></HomeComponent>
            <IonModal
              isOpen={showModal}
              cssClass="my-custom-class"
              showBackdrop={true}
              onDidDismiss={this.closeModal}
            >
              <ProfileComponent
                user={user}
                closeAction={this.closeModal}
              ></ProfileComponent>
            </IonModal>
            <IonToast
              color="secondary"
              isOpen={this.state.isToastOpen}
              message={JSON.stringify(this.state.toastData)}
              duration={5000}
            ></IonToast>
          </IonContent>
        </IonPage>
      );
    } else {
      return <div>No Current User</div>;
    }
  }
}
