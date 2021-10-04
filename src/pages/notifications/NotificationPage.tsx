import { IonPage, IonLoading, IonContent } from "@ionic/react";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import HeaderComponent from "../../components/header/HeaderComponent";
import NotificationComponent from "../../components/notification/NotificationComponent";
import { HeaderOption } from "../../model/header.option";
import { User } from "../../model/user";
import { personOutline, logOut } from "ionicons/icons";
import { Notification } from "../../model/notification/notification";
import { NotificationService } from "../../service/notification/notification.service";
import { injector, NotificationServiceToken } from "../../injector/injector";

export interface IAppProps {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
}

export interface IAppState {
  user?: User;
  showModal: boolean;
  notifications: Notification[];
  notificationService: NotificationService;
  showLoading: boolean;
}

export default class NotificationPage extends React.Component<
  IAppProps,
  IAppState
> {
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
      showModal: false,
      notifications: [],
      showLoading: true,
      notificationService: injector.get(NotificationServiceToken),
    };
  }

  async componentDidMount() {
    this.setState({ showLoading: true });
    const notifications = await this.state.notificationService.get();
    const data: any = this.props.location.state;
    this.setState({
      notifications: notifications,
      user: data.user,
      showLoading: false,
    });
  }

  public render() {
    if (this.state.user)
      return (
        <IonPage>
          <IonLoading
            isOpen={this.state.showLoading}
            message={"Por favor, espere"}
          ></IonLoading>
          <HeaderComponent options={this.options}></HeaderComponent>
          <IonContent class="ion-padding">
            <NotificationComponent
              user={this.state.user}
              notifications={this.state.notifications}
            ></NotificationComponent>
          </IonContent>
        </IonPage>
      );
    else return <div>No Current User</div>;
  }
}
