import { IonInput, IonItem, IonLabel } from "@ionic/react";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
    name: string;
    type: any;
    control?: Control;
    position: any;
    label: string;
    component?: JSX.Element;
    rules: any;
  }

const FormInputWrapper:FC<IProps> = (props) => {
    return (
        <>
         <IonItem>
            <IonLabel position={props.position}>{props.label}</IonLabel>
            <Controller
              control={props.control}
              name={props.name}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => <IonInput type={props.type} onIonChange={onChange}></IonInput>}
            />
          </IonItem>
        </>
      );
};

export default FormInputWrapper;