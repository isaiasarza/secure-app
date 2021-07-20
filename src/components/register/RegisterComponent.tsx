import React, { FC, useState } from "react";
import { IonButton, useIonToast } from "@ionic/react";
import { User } from "../../model/user";
import {
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { useHistory } from "react-router";
import { presentSuccessToast, presentErrorToast } from "../../utils/toast";
import {
  getInitialValues,
  getValidations,
} from "./validations/RegisterValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormState } from "react-hook-form";
import FormInputWrapper from "../formInputWrapper/formInputWrapper";
import { AuthService } from '../../service/auth/auth.service';
import { injector, AuthServiceToken } from '../../injector/injector';
interface IProps {}

const RegisterComponent: FC<IProps> = (props) => {
  const history = useHistory();
  const [present] = useIonToast();
  const [authService] = useState<AuthService>(injector.get(AuthServiceToken))
  const { handleSubmit, control } = useForm({
    defaultValues: getInitialValues(),
    mode: "onChange",
    resolver: yupResolver(getValidations()),
  });
  const { isValid, errors } = useFormState({ control });
  const onSubmit = async (data: any) => {
    
    console.log("onSubmit", data);
    const user: User = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: "vigilant",
      cuil_cuit: data.cuil_cuit,
      dni: data.dni,
    };
    try {
      const savedUser = await authService.register(data.email, data.password, user)
      console.log("savedUser", savedUser);
      presentSuccessToast(
        present,
        "El usuario fue registrado de forma exitosa"
      );
      history.push("/home");
    } catch (error) {
      presentErrorToast(
        present,
        "No se pudo registrar al usuario, intente nuevamente"
      );
    }
  };

  return (
    <IonCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonCardContent>
          <FormInputWrapper
            position={"stacked"}
            name={"firstname"}
            type={"text"}
            control={control}
            label={"Nombre"}
          ></FormInputWrapper>
          <p>{errors.firstname?.message}</p>
          {/* <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            type="text"
            onIonChange={(event: any) => setFirstname(event.target.value)}
          ></IonInput>
        </IonItem> */}
          <FormInputWrapper
            position={"stacked"}
            name={"lastname"}
            type={"text"}
            control={control}
            label={"Apellido"}
          ></FormInputWrapper>
          <p>{errors.lastname?.message}</p>
          {/* <IonItem>
          <IonLabel position="stacked">Apellido</IonLabel>
          <IonInput
            type="text"
            onIonChange={(event: any) => setLastname(event.target.value)}
          ></IonInput>
        </IonItem> */}
          <FormInputWrapper
            position={"stacked"}
            name={"email"}
            type={"text"}
            control={control}
            label={"Email"}
          ></FormInputWrapper>
          <p>{errors.email?.message}</p>
          {/* <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="text"
            onIonChange={(event: any) => setEmail(event.target.value)}
          ></IonInput>
        </IonItem> */}
          <FormInputWrapper
            position={"stacked"}
            name={"dni"}
            type={"text"}
            control={control}
            label={"DNI"}
          ></FormInputWrapper>
          <p>{errors.dni?.message}</p>
          {/* <IonItem>
          <IonLabel position="stacked">DNI</IonLabel>
          <IonInput
            type="number"
            onIonChange={(event: any) => setDNI(event.target.value)}
          ></IonInput>
        </IonItem> */}
          <FormInputWrapper
            position={"stacked"}
            name={"cuil_cuit"}
            type={"text"}
            control={control}
            label={"CUIL/CUIT"}
          ></FormInputWrapper>
          <p>{errors.cuil_cuit?.message}</p>
          {/* <IonItem>
          <IonLabel position="stacked">CUIL/CUIT</IonLabel>
          <IonInput
            type="text"
            onIonChange={(event: any) => setCuilCuit(event.target.value)}
          ></IonInput>
        </IonItem> */}
          <FormInputWrapper
            position={"stacked"}
            name={"password"}
            type={"password"}
            control={control}
            label={"Contraseña"}
          ></FormInputWrapper>
          <p>{errors.password?.message}</p>
          {/* <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            type="password"
            onIonChange={(event: any) => setPassword(event.target.value)}
          ></IonInput>
        </IonItem> */}
          <FormInputWrapper
            position={"stacked"}
            name={"repeat_password"}
            type={"password"}
            control={control}
            label={"Repetir Contraseña"}
          ></FormInputWrapper>
          <p>{errors.repeat_password?.message}</p>
          {/* <IonItem>
          <IonLabel position="stacked">Repetir Contraseña</IonLabel>
          <IonInput
            type="password"
            onIonChange={(event: any) => setRepeatPassword(event.target.value)}
          ></IonInput>
        </IonItem> */}
          <IonButton expand="full" type="submit" disabled={!isValid}>
            Registrarme
          </IonButton>
        </IonCardContent>
      </form>
    </IonCard>
  );
};

export default RegisterComponent;
