import React, { FC, useState } from "react";
import { PositionLog } from "../../../model/position-log";
import { User } from "../../../model/user";
import ActivityMapComponent from "./map/ActivityMapComponent";

interface IProps {
  guard: User;
  activity: PositionLog[];
}

const GuardActivity: FC<IProps> = (props) => {
  return (
    <div>
      {props.activity?.length > 0 ? (
        <ActivityMapComponent
          activity={props.activity}          
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          isMarkerShown
        ></ActivityMapComponent>
      ) : (
        ""
      )}
    </div>
  );
};

export default GuardActivity;
