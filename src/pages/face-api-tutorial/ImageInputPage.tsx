import * as React from "react";
import { IonPage, IonContent } from '@ionic/react';
import { HeaderOption } from "../../model/header.option";
import { logOut } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import HeaderComponent from '../../components/header/HeaderComponent';
import ImageInputComponent from '../../components/face-api-tutorial/ImageInputComponent';

export interface IAppProps {
  history: RouteComponentProps["history"];
}

export default class ImageInputPage extends React.Component<IAppProps> {
  private options: HeaderOption[] = [
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
  }
  public render() {
    return <IonPage>
    <HeaderComponent options={this.options}></HeaderComponent>

    <IonContent fullscreen>
      <ImageInputComponent></ImageInputComponent>
    </IonContent>
  </IonPage>
  }
}
