import React, { FC } from "react";
import {
  GoogleMap,
  GoogleMapProps,
  Marker,
  WithGoogleMapProps,
} from "react-google-maps";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import AnyReactComponent from "../../../any-react-component/any-react-component";

interface IProps {
  isMarkerShown: boolean;
}



const MapComponent = withScriptjs(
  withGoogleMap((props: any) => {
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
      >
        {props.lat ? (
         <Marker position={{lat: props.lat, lng: props.lng}}/>
        ) : (
          null
        )}
      </GoogleMap>
    );
  })
);



export default MapComponent;
