import { FieldValues } from "react-hook-form";
import * as yup from "yup";

export function getValidations() {
  return yup.object().shape({
    firstname: yup.string().required("Campo requerido"),
    lastname: yup.string().required("Campo requerido"),
    dni: yup
      .string()
      .typeError("Solo se permiten números")
      .matches(/\d+/, "Campo numérico")
      .min(6, "Mínimo 6 números")
      .max(8, "Máximo 8 números")
      .required("Campo requerido"),
    webPath: yup.string().required("La selfie es obligatoria"),
    descriptors: yup.array().min(1, "Vuelva a sacarse la selfie").required(""),
    reason: yup.string().required("Campo requerido"),
  });
}

export function getInitialValues(): FieldValues {
  const initialValues: FieldValues = {
    firstname: "",
    lastname: "",
    dni: "",
    reason: "",
    webPath: "",
    descriptors: [],
  };
  return initialValues;
}

export interface SuspiciousPersonForm {
  firstname: string;
  lastname: string;
  dni: string;
  reason: string;
  webPath: string;
  descriptors: number[];
}
