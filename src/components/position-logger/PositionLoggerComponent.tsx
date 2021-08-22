import { Geolocation } from "@capacitor/geolocation";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { injector, PositionLoggerServiceToken } from "../../injector/injector";
import { User } from "../../model/user";
import { PositionLoggerService } from '../../service/position-logger/position-logger.service';
import { PositionLog } from '../../model/position-log';

interface IProps {
  period: number;
  user: User;
}

const PositionLoggerComponent: FC<IProps> = (props) => {
  const [positionLoggerService] = useState<PositionLoggerService>(injector.get(PositionLoggerServiceToken));
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("Position Logger");
      const coordinates = await Geolocation.getCurrentPosition();
      const log: PositionLog = {
        uid: props.user.uid,
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        cuil_cuit: props.user.cuil_cuit,
        dni: props.user.dni,
        email: props.user.email,
        role: props.user.role,
        selfie_url: props.user.selfie_url,
        date:  moment().toISOString(),
        lat: coordinates.coords.latitude,
        long: coordinates.coords.longitude,
      };
      positionLoggerService.add(log)
    }, props.period);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  });
  return <div></div>;
};

export default PositionLoggerComponent;
