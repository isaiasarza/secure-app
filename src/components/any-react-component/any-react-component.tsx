import React, { FC } from "react";

interface IProps {
    lat: number;
    lng: number;
}

const AnyReactComponent: FC<IProps> = (props) => {
  return (
    <div>
      <img
        src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png"
        style={{ height: "50px", width: "50px" }}
      />
    </div>
  );
};

export default AnyReactComponent;
