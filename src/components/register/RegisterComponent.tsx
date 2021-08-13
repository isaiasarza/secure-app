import React, { FC, useState } from "react";
import {
  IonButton,
  IonLoading,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { User } from "../../model/user";
import { IonCard, IonCardContent } from "@ionic/react";
import { useHistory } from "react-router";
import { presentSuccessToast, presentErrorToast } from "../../utils/toast";
import {
  getInitialValues,
  getValidations,
} from "./validations/RegisterValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormState } from "react-hook-form";
import FormInputWrapper from "../formInputWrapper/formInputWrapper";
import { AuthService } from "../../service/auth/auth.service";
import { injector, AuthServiceToken } from "../../injector/injector";
import SelfieComponent from "../selfie/SelfieComponent";
import { UserRegisterForm } from './validations/RegisterValidations';
import {
  getFullFaceDescription,
  loadModels,
} from "../../service/face-api/face-api.service";
interface IProps {}

const RegisterComponent: FC<IProps> = (props) => {
  const history = useHistory();
  const [present] = useIonToast();
  const [showLoading, setShowLoading] = useState(false);
  const [blob,setBlob] = useState<Blob>()
  const [descriptorsError, setDescriptorsError] = useState(false)
  const [user, setUser] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    cuil_cuit: "",
    dni: "",
  });
  const [authService] = useState<AuthService>(injector.get(AuthServiceToken));
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: getInitialValues(),
    mode: "all",
    resolver: yupResolver(getValidations()),
  });
  const { isValid, errors } = useFormState({ control });
  const handler = async (webPath: string, fileName: string) => {
    // const res = await fetch(webPath);
    // const blob = await res.blob();
    setValue("webPath", webPath, { shouldValidate: true });
    const res = await fetch(webPath);
    const _blob = await res.blob();
    setBlob(_blob)
    setShowLoading(true);
    await loadModels();
    const fullDesc = await getFullFaceDescription(webPath);
    if (!!fullDesc) {
      const descriptors: number[] = Array.from(fullDesc[0].descriptor)//.map((fd) => Array.from(fd.descriptor));
      console.log("descriptors",descriptors)
      if(descriptors.length <= 0){
        setDescriptorsError(true)
      }
      setValue("descriptors", descriptors, { shouldValidate: true });
    }
    setShowLoading(false);
  };
  const onSubmit = async (data: UserRegisterForm) => {
    const _user: User = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: "vigilant",
      cuil_cuit: data.cuil_cuit,
      dni: data.dni,
      descriptors: data.descriptors
    };

   

    console.log("onSubmit", _user);
    setShowLoading(false);
    setUser(_user);
    try {
      const savedUser = await authService.register(
        data.email,
        data.password,
        _user,
        blob
      );
      console.log("savedUser", savedUser);
      setShowLoading(false);
      presentSuccessToast(
        present,
        "El usuario fue registrado de forma exitosa"
      );
      history.push("/home");
    } catch (error) {
      setShowLoading(false);
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
          <IonLoading isOpen={showLoading} message={"Please wait..."} />
          <div>
            <SelfieComponent readonly={false} user={user} handler={handler}></SelfieComponent>
          </div>
          <p>{errors.webPath?.message}</p>
          <p>{errors.descriptors?.message}</p>
          <FormInputWrapper
            position={"stacked"}
            name={"firstname"}
            type={"text"}
            control={control}
            label={"Nombre"}
          ></FormInputWrapper>
          <p>{errors.firstname?.message}</p>
          <FormInputWrapper
            position={"stacked"}
            name={"lastname"}
            type={"text"}
            control={control}
            label={"Apellido"}
          ></FormInputWrapper>
          <p>{errors.lastname?.message}</p>
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
            name={"dni"}
            type={"text"}
            control={control}
            label={"DNI"}
          ></FormInputWrapper>
          <p>{errors.dni?.message}</p>
          <FormInputWrapper
            position={"stacked"}
            name={"cuil_cuit"}
            type={"text"}
            control={control}
            label={"CUIL/CUIT"}
          ></FormInputWrapper>
          <p>{errors.cuil_cuit?.message}</p>
          <FormInputWrapper
            position={"stacked"}
            name={"password"}
            type={"password"}
            control={control}
            label={"Contraseña"}
          ></FormInputWrapper>
          <p>{errors.password?.message}</p>
          <FormInputWrapper
            position={"stacked"}
            name={"repeat_password"}
            type={"password"}
            control={control}
            label={"Repetir Contraseña"}
          ></FormInputWrapper>
          <p>{errors.repeat_password?.message}</p>
          <IonButton expand="full" type="submit" disabled={!isValid}>
            Registrarme
          </IonButton>
        </IonCardContent>
      </form>
    </IonCard>
  );
};

export default RegisterComponent;
