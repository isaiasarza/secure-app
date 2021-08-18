import React, { FC, useState } from "react";
import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import SelfieComponent from "../selfie/SelfieComponent";
import { IonButton, IonLoading } from "@ionic/react";
import FormInputWrapper from "../formInputWrapper/formInputWrapper";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getInitialValues,
  getValidations,
  SuspiciousPersonForm,
} from "./validations/RegisterValidations";

interface IProps {}

const ReportSuspiciousPersonComponent: FC<IProps> = (props) => {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: getInitialValues(),
    mode: "all",
    resolver: yupResolver(getValidations()),
  });
  const { isValid, errors } = useFormState({ control });
  const onSubmit = async (data: SuspiciousPersonForm) => {
    /*  const _user: User = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: "vigilant",
      cuil_cuit: data.cuil_cuit,
      dni: data.dni,
      descriptors: data.descriptors,
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
    } */
  };
  const handler = async (webPath: string, fileName: string) => {
    // const res = await fetch(webPath);
    // const blob = await res.blob();
    setValue("webPath", webPath, { shouldValidate: true });
    const res = await fetch(webPath);
    /*const _blob = await res.blob();
     setBlob(_blob);
    setShowLoading(true);
    await loadModels();
    const fullDesc = await getFullFaceDescription(webPath);
    if (!!fullDesc) {
      const descriptors: number[] = Array.from(fullDesc[0].descriptor); //.map((fd) => Array.from(fd.descriptor));
      console.log("descriptors", descriptors);
      if (descriptors.length <= 0) {
        setDescriptorsError(true);
      }
      setValue("descriptors", descriptors, { shouldValidate: true });
    } */
    setShowLoading(false);
  };
  const [showLoading, setShowLoading] = useState(false);
  return (

      <form id="report-suspicious-person-form" onSubmit={handleSubmit(onSubmit)}>
        <IonLoading isOpen={showLoading} message={"Please wait..."} />
        <div>
          {/* <SelfieComponent
              readonly={false}
              user={user}
              handler={handler}
            ></SelfieComponent> */}
        </div>
        <p>{errors.webPath?.message}</p>
        <p>{errors.descriptors?.message}</p>
        <IonRow>
          <IonCol>
            <FormInputWrapper
              position={"stacked"}
              name={"firstname"}
              type={"text"}
              control={control}
              label={"Nombre"}
            ></FormInputWrapper>
            <p>{errors.firstname?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <FormInputWrapper
              position={"stacked"}
              name={"lastname"}
              type={"text"}
              control={control}
              label={"Apellido"}
            ></FormInputWrapper>
            <p>{errors.lastname?.message}</p>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <FormInputWrapper
              position={"stacked"}
              name={"reason"}
              type={"text"}
              control={control}
              label={
                "¿Porque razón motivo o cirscunstancia usted reporta a esta persona?"
              }
              inputType={"textarea"}
            ></FormInputWrapper>
            <p>{errors.reason?.message}</p>
          </IonCol>
        </IonRow>
        <IonButton expand="full" type="submit" disabled={!isValid}>
          Enviar Reporte
        </IonButton>
      </form>
  );
};

export default ReportSuspiciousPersonComponent;
