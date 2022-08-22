import { IonFab, IonFabButton, IonIcon, IonModal } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { FC, useState } from "react";
import { AuthorizationServiceToken, injector } from "../../injector/injector";
import { ActionTypeEnum } from "../../model/profiles-type.enum";
import { User } from "../../model/user";
import { Zone } from "../../model/zone/zone";
import { AuthorizationService } from "../../service/autz/autz.service";
import AddZoneComponent from "./add-zone/AddZoneComponent";
import ZoneItemComponent from "./zone-item/ZoneItemComponent";
import "./ZoneComponent.css";
interface IProps {
  user: User;
  zones: Zone[];
}

const ZonesComponent: FC<IProps> = (props) => {
  const [autzService] = useState<AuthorizationService>(
    injector.get(AuthorizationServiceToken)
  );
  const [showAddZone, setShowAddZone] = useState<boolean>(false);
  const [change, setChange] = useState<number>(0);
  const closeAddZoneModal = (data?: any) => {
    if (data?.newZone) {
      props.zones.push(data?.newZone);
      setChange(change + 1);
    }
    setShowAddZone(false);
  };

  const onAddZone = () => {
    setShowAddZone(true);
  };
  return (
    <div>
      <IonModal isOpen={showAddZone} onDidDismiss={() => closeAddZoneModal()}>
        <AddZoneComponent closeAction={closeAddZoneModal}></AddZoneComponent>
      </IonModal>
      <div>
        {props.zones.map((z: Zone) => {
          return (
            <div key={z.uuid}>
              <p hidden={true}>{change}</p>
              <ZoneItemComponent user={props.user} zone={z}></ZoneItemComponent>
              <br></br>
            </div>
          );
        })}
      </div>
      {autzService.isAuthorized(props.user.role, ActionTypeEnum.ADD_ZONE) ? (
        <div className="fixed">
          <IonFab vertical="top" horizontal="end" slot="fixed" edge={true}>
            <IonFabButton color="primary" onClick={onAddZone}>
              <IonIcon icon={addCircleOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ZonesComponent;
