import { FieldValues } from 'react-hook-form';
import * as yup from 'yup';
export function getValidations() {  
  return yup.object().shape({
    email: yup.string().required("Campo requerido").email("Email inválido"),
    password: yup.string().required(),
    repeatPassword: yup.string().required(),
  });;
}

export function getInitialValues(): FieldValues{

  const initialValues: FieldValues = {
    firstname:"",
    lastname:"",
    dni:"",
    cuil_cuit:"",
    role:"vigilant",
    email: "",
    password: "",
    repeat_password:""
  }
  return initialValues
}