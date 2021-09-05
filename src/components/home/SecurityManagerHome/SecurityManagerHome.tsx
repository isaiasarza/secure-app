import React, { FC } from "react";
import "../HomeComponent.css";
interface IProps {}

const SecurityManagerHomeComponent: FC<IProps> = (props) => {
  return (
    <div>
      <div className="home-option">Guardias</div>
      <div className="home-option">Zonas</div>
      <div className="home-option">Reportes</div>
      <div className="home-option">Notificaciones</div>
    </div>
  );
};

export default SecurityManagerHomeComponent;
