import {
  IonCol,
  IonRow,
  IonFabButton,
  IonIcon,
  IonModal,
  IonLoading,
  useIonToast,
} from "@ionic/react";
import React, { FC, useState } from "react";
import { Zone } from "../../../model/zone/zone";
import { manOutline, navigateCircleOutline } from "ionicons/icons";
import ZoneMapComponent from "./zone-map/MapComponent";
import { User } from "../../../model/user";
import GuardsComponent from "../guards/GuardsComponent";
import {
  AuthorizationServiceToken,
  injector,
  UserServiceToken,
  ZoneServiceToken,
} from "../../../injector/injector";
import { UserService } from "../../../service/user/user.service";
import { presentSuccessToast, presentErrorToast } from "../../../utils/toast";
import { ZoneService } from "../../../service/zone/zone.service";
import { AuthorizationService } from '../../../service/autz/autz.service';
import { ActionTypeEnum } from "../../../model/profiles-type.enum";

interface IProps {
  user: User;
  zone: Zone;
}

const ZoneItemComponent: FC<IProps> = (props) => {
  const [autzService] = useState<AuthorizationService>(
    injector.get(AuthorizationServiceToken)
  );
  const [showMap, setShowMap] = useState(false);
  const [showGuards, setShowGuards] = useState(false);
  const [guards, setGuards] = useState<User[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [userService] = useState<UserService>(injector.get(UserServiceToken));
  const [zoneService] = useState<ZoneService>(injector.get(ZoneServiceToken));
  const [present] = useIonToast();
  const onOpenMap = () => {
    console.log("onOpenMap", "zone", props.zone);
    setShowMap(true);
  };

  const closeMapModal = () => {
    setShowMap(false);
  };

  const onViewGuards = async () => {
    setLoadingMsg("Por favor, espere");
    setShowLoading(true);
    try {
      const guards: User[] = await userService.getGuards();
      console.log("onViewGuards", props.zone, guards);
      setGuards(guards);
      setShowGuards(true);
    } catch (error) {
      console.log("onViewGuards error", error);
    }
    setShowLoading(false);
  };

  const updateZone = async () => {
    setLoadingMsg("Guardando cambios");
    setShowLoading(true);
    try {
      await zoneService.update(props.zone);
      presentSuccessToast(
        present,
        "Los cambios se guardaron satisfactoriamente"
      );
    } catch (error) {
      presentErrorToast(present, "Error al actualizar los datos de la zona");
    }
    setShowLoading(false);
  };

  const closeGuardsModal = async () => {
    setShowGuards(false);
    updateZone();
  };
  return (
    <div
      className="report-item"
      id={"report_" + props.zone.uuid}
      key={props.zone.uuid}
    >
      <IonLoading isOpen={showLoading} message={loadingMsg} />
      <IonModal
        isOpen={showMap}
        cssClass="my-custom-class"
        onDidDismiss={closeMapModal}
        showBackdrop={true}
        backdropDismiss={true}
      >
        <ZoneMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          yesIWantToUseGoogleMapApiInternals
          lat={props.zone.geofence.latitude}
          lng={props.zone.geofence.longitude}
          radius={props.zone.geofence.radius}
        />
      </IonModal>
      <IonModal
        isOpen={showGuards}
        cssClass="my-custom-class"
        onDidDismiss={closeGuardsModal}
        showBackdrop={true}
        backdropDismiss={true}
      >
        <GuardsComponent zone={props.zone} guards={guards}></GuardsComponent>
      </IonModal>
      <div className="report-item-content">
        {/*  */}
        <IonRow>
          <IonCol>
            <h3>Zona "{props.zone.name}"</h3>
          </IonCol>
        </IonRow>
        <div className="sub-item">
          <IonRow>
            <IonCol>
              <b>Descripción:</b> {props.zone.description}
            </IonCol>
          </IonRow>
        </div>
        <div className="sub-item">
          <IonRow>
            <IonCol size="6">
              <b>Guardias Asignados:</b> {props.zone.assignedGuards.length}
            </IonCol>
            <IonCol size="2" offset="4">
              <IonFabButton hidden={!autzService.isAuthorized(props.user.role,ActionTypeEnum.ASSIGN_GUARDS_TO_ZONE)} size="small" color="primary" onClick={onViewGuards}>
                <IonIcon icon={manOutline}></IonIcon>
              </IonFabButton>
            </IonCol>
          </IonRow>
        </div>
        <div className="sub-item">
          <IonRow>
            <IonCol size="6">
              <b>Radio de la Zona:</b> {props.zone.geofence.radius} mts
            </IonCol>
            <IonCol size="2" offset="4">
              <IonFabButton size="small" color="primary" onClick={onOpenMap}>
                <IonIcon icon={navigateCircleOutline}></IonIcon>
              </IonFabButton>
            </IonCol>
          </IonRow>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ZoneItemComponent;
