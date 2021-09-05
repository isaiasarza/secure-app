import React, { FC } from "react";
import { GoogleMap, GoogleMapProps, Marker, WithGoogleMapProps } from 'react-google-maps';
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";

interface IProps {
    isMarkerShown: boolean;
}

const MapComponent = withScriptjs(withGoogleMap((props: any) => {
  return (
    <GoogleMap defaultZoom={16} defaultCenter={{ lat: props.lat, lng: props.lng}}>
      {props.isMarkerShown && (
        <Marker position={{ lat: props.lat, lng: props.lng}} />
      )}
    </GoogleMap>
  );
}));

export default MapComponent;
