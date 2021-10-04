import { IonInput, IonItem, IonLabel, IonTextarea } from "@ionic/react";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
  name: string;
  type: any;
  control?: Control;
  position: any;
  label: string;
  component?: JSX.Element;
  inputType?: string;
  hidden?:boolean;
  value?:string;
}

const FormInputWrapper: FC<IProps> = (props) => {
  const onFocus = (el: HTMLElement)=>{
    el.removeAttribute('readonly');
    return el
  }
  return (
    <IonItem className={props.hidden === true ? 'ion-hide':''}>
      <IonLabel className="ion-text-wrap" position={props.position}>
        {props.label}
      </IonLabel>
      <Controller
        
        control={props.control}
        name={props.name}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) =>
          props.inputType === "textarea" ? (
            <IonTextarea
              data-testid={props.name}
              onIonChange={onChange}
              rows={6}
              cols={20}
              value={value}
            ></IonTextarea>
          ) : (
            <IonInput
              autofocus={false}
              autocomplete="off"
              className="ion-text-wrap"
              type={props.type}
              data-testid={props.name}
              onIonChange={onChange}
              value={value}
            ></IonInput>
          )
        }
      />
    </IonItem>
  );
};

export default FormInputWrapper;
