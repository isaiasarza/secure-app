import React, { FC } from "react";
import {
  GoogleMap,
  GoogleMapProps,
  Marker,
  WithGoogleMapProps,
} from "react-google-maps";
import Circle from "react-google-maps/lib/components/Circle";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import AnyReactComponent from "../../../any-react-component/any-react-component";

interface IProps {
  isMarkerShown: boolean;
}

const ZoneMapComponent = withScriptjs(
  withGoogleMap((props: any) => {
    return (
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
      >
        {props.lat ? (
          <Circle
            defaultCenter={{
              lat: parseFloat(props.lat),
              lng: parseFloat(props.lng),
            }}
            radius={props.radius}
            options={{fillColor:"#536895",strokeColor:"#722f37"}}
          />
        ) : null}
      </GoogleMap>
    );
  })
);

export default ZoneMapComponent;
