import { yupResolver } from "@hookform/resolvers/yup";
import {
  IonCard,
  IonCardContent,
  IonLoading,
  IonButton,
  useIonLoading,
  useIonToast,
  IonCardHeader,
  IonRow,
  IonCardSubtitle,
  IonIcon,
} from "@ionic/react";
import React, { FC, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import FormInputWrapper from "../../formInputWrapper/formInputWrapper";
import {
  getInitialValues,
  getValidations,
} from "./validations/AddZoneValidations";
import "./AddZoneComponent.css";
import AddZoneMapComponent from "./add-zone-map/AddZoneMap";
import { ZoneService } from "../../../service/zone/zone.service";
import { injector, ZoneServiceToken, GeofenceServiceToken } from '../../../injector/injector';
import { Zone } from "../../../model/zone/zone";
import { v4 } from "uuid";
import moment from "moment";
import { presentSuccessToast } from "../../../utils/toast";
import { useHistory } from "react-router";
import { IonCol } from '@ionic/react';
import { close } from "ionicons/icons";
import { GeofenceService } from "../../../service/geofence/geofence.service";
interface IProps {
    closeAction: Function;
}

const AddZoneComponent: FC<IProps> = (props) => {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: getInitialValues(),
    mode: "onChange",
    resolver: yupResolver(getValidations()),
  });
  const { isValid, errors } = useFormState({ control });
  const isFormValid = () => {
    return isValid;
  };
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [zoneService] = useState<ZoneService>(injector.get(ZoneServiceToken));
  const [geofenceService] = useState<GeofenceService>(injector.get(GeofenceServiceToken))
  const [present] = useIonToast();
  const onSubmit = async (data: any) => {
    
    setShowLoading(true);
    try {
      const zone: Zone = {
        uuid: v4(),
        name: data.name,
        description: data.description,
        assignedGuards: [],
        createdBy: "",
        geofence: {
          latitude: data.latitude,
          longitude: data.longitude,
          id: v4(),
          radius: data.radius,
          transitionType: 3,
        },
        createdDate: moment().toISOString(),
      };
      await zoneService.add(zone);
      //await geofenceService.addGeofence(zone.geofence)
      presentSuccessToast(
        present,
        "Se ha registrado la zona satisfactoriamente"
      );
      props.closeAction({newZone: zone});
    } catch (error) {
      presentSuccessToast(present, "No se pudo registrar la zona");
    }

    setShowLoading(false);
  };
  const updateCircle = (circle: any) => {
    setValue("latitude", circle.lat, { shouldValidate: true });
    setValue("longitude", circle.lng, { shouldValidate: true });
    setValue("radius", 50, { shouldValidate: true });
  };
  return (
    <IonCard>
       <IonCardHeader>
          <IonRow>
            <IonCol size="11">
              <IonCardSubtitle>Creación de Zona</IonCardSubtitle>
            </IonCol>
            <IonCol size="1">
              <IonIcon
                onClick={() => props.closeAction()}
                icon={close}
              ></IonIcon>
            </IonCol>
          </IonRow>
        </IonCardHeader> 
      <form
        id="add-zone-form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <IonLoading isOpen={showLoading} message={"Por favor, espere"} />
        <input hidden value={"something"} type={"hidden"} />

        <IonCardContent className="add-zone-card">
          <FormInputWrapper
            position={"stacked"}
            name={"name"}
            type={"text"}
            control={control}
            label={"Nombre"}
          ></FormInputWrapper>
          <p>{errors.name?.message}</p>
          <FormInputWrapper
            position={"stacked"}
            name={"description"}
            type={"text"}
            control={control}
            label={"Descripción"}
          ></FormInputWrapper>

          <div className="map-wrapper">
            <AddZoneMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              yesIWantToUseGoogleMapApiInternals
              lat={-42.781548}
              lng={-64.998906}
              radius={50}
              updateCircle={updateCircle}
            ></AddZoneMapComponent>
          </div>
          <IonButton
            data-testid="submit_button"
            type="submit"
            expand="full"
            disabled={!isFormValid()}
          >
            Crear Zona
          </IonButton>
        </IonCardContent>
      </form>
    </IonCard>
  );
};

export default AddZoneComponent;
