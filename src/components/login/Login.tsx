import {
  IonButton, IonCard,
  IonCardContent,
  IonImg,
  IonLoading,
  useIonToast
} from "@ionic/react";
import { FC, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useHistory } from "react-router";
import { presentErrorToast, presentSuccessToast } from "../../utils/toast";
import FormInputWrapper from "../formInputWrapper/formInputWrapper";
import "./Login.css";

import { yupResolver } from '@hookform/resolvers/yup';

import { getInitialValues, getValidations } from './validations/LoginValidations';

import { AuthServiceToken, injector } from '../../injector/injector';
import { AuthService } from '../../service/auth/auth.service';
interface IProps {}

const LoginComponent: FC<IProps> = (props) => {
  const history = useHistory();
  const [present] = useIonToast();
  
  const [authService] = useState<AuthService>(injector.get(AuthServiceToken))
  const [showLoading, setShowLoading] = useState(false);
  
  

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
    setShowLoading(true)
    
    try {
      const res = await authService.auth(data.email, data.password)
      if (res) {
        presentSuccessToast(present, "Se inicio sesión de forma satisfactoria");
        history.push("/home",{props:{user: res}});
      } else {
        presentErrorToast(present,"No se pudo iniciar sesión, intente nuevamente");
      }
    } catch (error) {
      presentErrorToast(present,"No se pudo iniciar sesión, intente nuevamente");
    }
    setShowLoading(false)
  };

  return (
    <IonCard>
      <IonImg src="/assets/images/security-app-logo.png"></IonImg>
      <form id="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <IonLoading isOpen={showLoading} message={"Por favor, espere"} />
      <input hidden value={"something"} type={"hidden"}/>

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
