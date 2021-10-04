import { useState } from "react";
import Circle from "react-google-maps/lib/components/Circle";
import GoogleMap from "react-google-maps/lib/components/GoogleMap";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";

const AddZoneMapComponent =  withScriptjs(
  withGoogleMap((props: any) => {
    const [change, setChange] = useState<number>(0);
    const [circle, setCircle] = useState<any>(null)
    const getCoordinates = (event: any) => {
      try {
        const _lat = event.latLng.lat();
        const _long = event.latLng.lng();
        if (_lat !== undefined && _long !== undefined) {
          console.log("latitide", _lat);
          console.log("longitude", _long);
         
          setCircle( {lat:_lat,lng:_long} )
          setChange(change + 1);
          props.updateCircle( {lat:_lat,lng:_long} )
        }
      } catch (error) {}
    };
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        onClick={getCoordinates}
      >
        <p hidden={true}>{change}</p>
        {circle?.lat && circle?.lng ? (
          <div>
            <Circle
              center={circle}
              radius={props.radius}
              options={{ fillColor: "#536895", strokeColor: "#722f37" }}
            />
            <p hidden={true}>{change}</p>
          </div>
        ) : null}
      </GoogleMap>
    );
  })
);

export default AddZoneMapComponent;
