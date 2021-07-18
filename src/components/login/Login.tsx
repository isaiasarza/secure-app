import React, { FC, useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonRange,
  useIonToast,
} from "@ionic/react";
import "./Login.css";
import { IonButton } from "@ionic/react";
import { loginUser } from "../../firebaseConfig";
import { useHistory } from "react-router";
import { Controller, useForm, useFormState } from "react-hook-form";
import { presentSuccessToast, presentErrorToast } from "../../utils/toast";
import FormInputWrapper from "../formInputWrapper/formInputWrapper";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
interface IProps {}

const LoginComponent: FC<IProps> = (props) => {
  const history = useHistory();
  const [present] = useIonToast();

  const schema = yup.object().shape({
    email: yup.string().required("Campo requerido").email("Email inválido"),
    password: yup.string().required(),
  });

  const initialValues: any = {
    email: "",
    password: "",
  };

  const { handleSubmit, control } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: yupResolver(schema)
  });
  const { isValid, errors } = useFormState({ control });

  const onSubmit = async (data: any) => {
    console.log("onSubmit", data);
    const res = await loginUser(data.email, data.password);
    console.log("login", res ? "successful" : "failed");
    if (res) {
      presentSuccessToast(present, "Se inicio sesión de forma satisfactoria");
      history.push("/home");
    } else {
      presentErrorToast(
        present,
        "No se pudo iniciar sesión, intente nuevamente"
      );
    }
  };

  return (
    <IonCard>
      <IonImg src="/assets/images/security-app-logo.png"></IonImg>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonCardContent>
          <FormInputWrapper
            position={"stacked"}
            name={"email"}
            type={"text"}
            control={control}
            label={"Email"}
            rules={{ required: true }}
          ></FormInputWrapper>
         {/*  {errors.email?.type === "required" && "Campo obligatorio"} */}
          <p>{errors.email?.message}</p>
          <FormInputWrapper
              position={"stacked"}
              name={"password"}
              type={"password"}
              control={control}
              label={"Contraseña"}
              rules={{ required: true }}
            ></FormInputWrapper>
          {errors.password?.type === "required" && "Campo obligatorio"}
        
          <IonButton type="submit" expand="full" disabled={!isValid}>
            Iniciar Sesión
          </IonButton>
        </IonCardContent>
      </form>
    </IonCard>
  );
};

export default LoginComponent;
