import { IonContent, IonPage } from "@ionic/react";
import { logOut, personOutline } from "ionicons/icons";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import HeaderComponent from "../../components/header/HeaderComponent";
import ZonesComponent from "../../components/zones/ZonesComponent";
import { injector, ZoneServiceToken } from "../../injector/injector";
import { HeaderOption } from "../../model/header.option";
import { Zone } from "../../model/zone/zone";
import { ZoneService } from '../../service/zone/zone.service';

export interface IAppProps {
    history: RouteComponentProps["history"];
    location: RouteComponentProps["location"];
}

export interface IAppState {
    showModal: boolean;
    zones: Zone[];
}

export default class ZonesPage extends React.Component<IAppProps, IAppState> {
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

    this.state = {showModal: false, zones:[]};
  }

  componentDidMount(){
      const data: any = this.props.location.state
      this.setState({zones: data.zones})
      console.log("zonesPage state", data.zones)
  }

  public render() {
    return (
      <IonPage>
        <HeaderComponent options={this.options}></HeaderComponent>
        <IonContent class="ion-padding">
         <ZonesComponent zones={this.state.zones}></ZonesComponent>
        </IonContent>
      </IonPage>
    );
  }
}

