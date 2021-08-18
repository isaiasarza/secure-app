import React, { FC, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonImg,
  useIonToast,
} from "@ionic/react";
import "./Login.css";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import { useForm, useFormState } from "react-hook-form";
import { presentSuccessToast, presentErrorToast } from "../../utils/toast";
import FormInputWrapper from "../formInputWrapper/formInputWrapper";

import { yupResolver } from '@hookform/resolvers/yup';

import { getValidations, getInitialValues } from './validations/LoginValidations';

import { AuthService } from '../../service/auth/auth.service';
import { injector, AuthServiceToken } from '../../injector/injector';
interface IProps {}

const LoginComponent: FC<IProps> = (props) => {
  const history = useHistory();
  const [present] = useIonToast();
  
  const [authService] = useState<AuthService>(injector.get(AuthServiceToken))

  
  

  const { handleSubmit, control } = useForm({
    defaultValues: getInitialValues(),
    mode: "onChange",
    resolver: yupResolver(getValidations())
  });
  const { isValid, errors } = useFormState({ control });
  const isFormValid = () => {
    return isValid
  }
  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);
    
    const res = await authService.auth(data.email, data.password)
    console.log("login", res ? "successful" : "failed");
    if (res) {
      presentSuccessToast(present, "Se inicio sesión de forma satisfactoria");
      history.push("/home",{props:{user: res}});
    } else {
      presentErrorToast(present,"No se pudo iniciar sesión, intente nuevamente");
    }
  };

  return (
    <IonCard>
      <IonImg src="/assets/images/security-app-logo.png"></IonImg>
      <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <IonCardContent>
          <FormInputWrapper
            position={"stacked"}
            name={"email"}
            type={"text"}
            control={control}
            label={"Email"}
          ></FormInputWrapper>
          <p>{errors.email?.message}</p>
          <FormInputWrapper
              position={"stacked"}
              name={"password"}
              type={"password"}
              control={control}
              label={"Contraseña"}
            ></FormInputWrapper>
          <p>{errors.password?.message}</p>
        
          <IonButton data-testid="submit_button" type="submit" expand="full" disabled={!isFormValid()}>
            Iniciar Sesión
          </IonButton>
        </IonCardContent>
      </form>
    </IonCard>
  );
};

export default LoginComponent;
