import { IonContent, IonPage, IonLoading } from "@ionic/react";
import { logOut, personOutline } from "ionicons/icons";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import HeaderComponent from "../../components/header/HeaderComponent";
import ZonesComponent from "../../components/zones/ZonesComponent";
import {
  injector,
  ZoneServiceToken,
  UserContextServiceToken,
} from "../../injector/injector";
import { HeaderOption } from "../../model/header.option";
import { User } from "../../model/user";
import { Zone } from "../../model/zone/zone";
import { ZoneService } from "../../service/zone/zone.service";
import { UserContextService } from "../../service/user-context/user-context.service";
import { Subscription } from "rxjs";

export interface IAppProps {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
}

export interface IAppState {
  /* userContextService: UserContextService; */
  user?: User;
  showModal: boolean;
  zones: Zone[];
  showLoading: boolean;
}

export default class ZonesPage extends React.Component<IAppProps, IAppState> {
  private readonly TAG = "ZonesPage";
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
      showModal: false,
      zones: [],
      showLoading: true,/* 
      userContextService: injector.get(UserContextServiceToken),
      user: null, */
    };
  }

  componentDidMount() {
    const data: any = this.props.location.state;
    this.setState({ zones: data.zones });
    this.setState({ showLoading: false });
    this.setState({user: data.user})
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
            <ZonesComponent
              user={this.state.user}
              zones={this.state.zones}
            ></ZonesComponent>
          </IonContent>
        </IonPage>
      );
    else return <div>No Current User</div>;
  }
}
