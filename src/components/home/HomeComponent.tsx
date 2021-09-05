import {
  IonCard,
  IonCardSubtitle,
  IonImg,
  IonCol,
  IonCardHeader,
  IonRow,
  IonGrid,
  IonModal,
} from "@ionic/react";
import { FC, useState } from "react";
import { useHistory } from "react-router";
import "./HomeComponent.css";
import FaceScannerComponent from "../face-scanner/FaceScannerComponent";
import { User } from "../../model/user";
import PositionLoggerComponent from "./position-logger/PositionLoggerComponent";
import { AuthorizationService } from "../../service/autz/autz.service";
import { AuthorizationServiceToken, injector } from "../../injector/injector";
import {
  ActionTypeEnum,
  ProfilesTypeEnum,
} from "../../model/profiles-type.enum";
import SecurityManagerHomeComponent from "./security-manager-home/SecurityManagerHome";
import GuardHomeComponent from "./guard-home/GuardHome";
interface IProps {
  user: User;
}

const HomeComponent: FC<IProps> = (props) => {
  const getPeriod = (minutes: number) => {
    return minutes * 60000;
  };

  return (
    <div className="container">
      {props.user.role === ProfilesTypeEnum.VIGILANT ? (
        /**
         * Censa la posición del guardia cada k minutos.
         */
        <div hidden={true}>
          <PositionLoggerComponent
            period={getPeriod(3)}
            user={props.user}
          ></PositionLoggerComponent>
        </div>
      ) : (
        ""
      )}

      {props.user.role === ProfilesTypeEnum.SECURITY_MANAGER ? (
        /**
         * Home del security manager
         */
        <SecurityManagerHomeComponent
          user={props.user}
        ></SecurityManagerHomeComponent>
      ) : (
        ""
      )}
      {props.user.role === ProfilesTypeEnum.VIGILANT ? (
        /**
         * Home del guardia
         */
        <GuardHomeComponent user={props.user}></GuardHomeComponent>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeComponent;
