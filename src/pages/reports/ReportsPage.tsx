import * as React from "react";
import { IonPage, IonContent } from "@ionic/react";
import HeaderComponent from "../../components/header/HeaderComponent";
import { HeaderOption } from '../../model/header.option';
import { personOutline, logOut } from 'ionicons/icons';
import { RouteComponentProps } from "react-router";
import { ReportService } from '../../service/report/report.service';
import { injector, ReportServiceToken } from '../../injector/injector';
import { ReportedPerson } from "../../model/reported.person";
import ReportsComponent from "../../components/reports/ReportsComponent";
import moment from "moment";

export interface IAppProps {
    history: RouteComponentProps["history"];
}

export interface IAppState {
    showModal: boolean;
    reportService: ReportService;
    reports: ReportedPerson[]
}

export default class ReportsPage extends React.Component<IAppProps, IAppState> {
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

    this.state = {showModal: false,  reportService: injector.get(
        ReportServiceToken
      ) as ReportService, reports: []};
  }

  async componentDidMount(){
      const reports: ReportedPerson[] = (await this.state.reportService.get())

      this.setState({reports: reports})
  }

  public render() {
    return (
      <IonPage>
        <HeaderComponent options={this.options}></HeaderComponent>
        <IonContent class="ion-padding">
            <ReportsComponent reports={this.state.reports}></ReportsComponent>
        </IonContent>
      </IonPage>
    );
  }
}
