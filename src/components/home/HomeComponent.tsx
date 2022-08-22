import { FC } from "react";
import {
  ProfilesTypeEnum
} from "../../model/profiles-type.enum";
import { User } from "../../model/user";
import { Zone } from "../../model/zone/zone";
import GuardHomeComponent from "./guard-home/GuardHome";
import "./HomeComponent.css";
import PositionLoggerComponent from "./position-logger/PositionLoggerComponent";
import SecurityManagerHomeComponent from "./security-manager-home/SecurityManagerHome";
interface IProps {
  user: User;
  zones: Zone[];
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
          zones={props.zones}
        ></SecurityManagerHomeComponent>
      ) : (
        ""
      )}
      {props.user.role === ProfilesTypeEnum.VIGILANT ? (
        /**
         * Home del guardia
         */
        <GuardHomeComponent user={props.user} zones={props.zones}></GuardHomeComponent>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeComponent;
