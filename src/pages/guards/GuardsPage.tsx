import { IonContent, IonPage } from "@ionic/react";
import { logOut, personOutline } from "ionicons/icons";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import HeaderComponent from "../../components/header/HeaderComponent";
import { injector, UserServiceToken } from "../../injector/injector";
import { HeaderOption } from "../../model/header.option";
import { User } from "../../model/user";
import { UserService } from "../../service/user/user.service";
import GuardsComponent from "../../components/guards/GuardsComponent";

export interface IAppProps {
  history: RouteComponentProps["history"];
}

export interface IAppState {
  showModal: boolean;
  userService: UserService;
  guards: User[];
}

export default class GuardsPage extends React.Component<IAppProps, IAppState> {
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
      userService: injector.get(UserServiceToken) as UserService,
      guards: [],
    };
  }

  async componentDidMount() {
    const guards: User[] = await this.state.userService.getGuards()
    this.setState({ guards: guards })
  }

  public render() {
    return (
      <IonPage>
        <HeaderComponent options={this.options}></HeaderComponent>
        <IonContent class="ion-padding">
          <GuardsComponent guards={this.state.guards}></GuardsComponent>
        </IonContent>
      </IonPage>
    );
  }
}
