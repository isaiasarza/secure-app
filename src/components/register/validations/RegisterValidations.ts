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
    cuil_cuit: yup
      .string()
      .typeError("Solo se permiten números")
      .matches(/\d+/, "Campo numérico")
      .required("Campo requerido")
      .min(8, "Mínimo 8 números")
      .max(10, "Máximo 10 números"),
    role: yup.string().required("Campo requerido"),
    email: yup.string().required("Campo requerido").email("Email inválido"),
    password: yup.string().required("Campo requerido"),
    repeat_password: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
    webPath: yup.string().required("La selfie es obligatoria"),
    descriptors: yup.array().min(1, "Vuelva a sacarse la selfie").required(""),
  });
}

export function getInitialValues(): FieldValues {
  const initialValues: FieldValues = {
    firstname: "",
    lastname: "",
    dni: "",
    cuil_cuit: "",
    role: "vigilant",
    email: "",
    password: "",
    repeat_password: "",
    webPath: "",
    descriptors: [],
  };
  return initialValues;
}

export interface UserRegisterForm {
  firstname: string;
  lastname: string;
  dni: string;
  cuil_cuit: string;
  role: string;
  email: string;
  password: string;
  repeat_password: string;
  webPath: string;
  descriptors: number[];
}
