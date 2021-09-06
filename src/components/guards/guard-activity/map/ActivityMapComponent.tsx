import React, { FC } from "react";
import {
  GoogleMap,
  GoogleMapProps,
  Marker,
  WithGoogleMapProps,
} from "react-google-maps";
import Circle from "react-google-maps/lib/components/Circle";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";
import { PositionLog } from '../../../../model/position-log';

interface IProps {
  isMarkerShown: boolean;
}

const ActivityMapComponent = withScriptjs(
  withGoogleMap((props: any) => {
    let _mark = {
      id: 1,
      latitude: 25.0391667,
      longitude: 121.525,
      shelter: "marker 1",
    };
    let markers = [
      {
        id: 1,
        latitude: 25.0391667,
        longitude: 121.525,
        shelter: "marker 1",
      },
      {
        id: 2,
        latitude: 24.0391667,
        longitude: 110.525,
        shelter: "marker 2",
      },
      {
        id: 3,
        latitude: 20.0391667,
        longitude: 100.525,
        shelter: "marker 3",
      },
    ];
    return (
      <GoogleMap defaultZoom={16} defaultCenter={{ lat: props.activity[0].lat, lng: props.activity[0].long }}>
        
         {props.activity.map((a: PositionLog,index:number)=> {
            
            return (
                <Marker
                    key={"id_" + index}                   
                    position={{ lat: a.lat, lng: a.long }}
                >
                    <InfoWindow>
                        <div>
                            {"Posición #" + index}
                        </div>
                    </InfoWindow>
                </Marker>
            )
        })}
      </GoogleMap>
    );
  })
);

export default ActivityMapComponent;
