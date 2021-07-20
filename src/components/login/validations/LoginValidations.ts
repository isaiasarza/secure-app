import { FieldValues } from 'react-hook-form';
import * as yup from 'yup';
export function getValidations() {  
  return yup.object().shape({
    email: yup.string().required("Campo requerido").email("Email inválido"),
    password: yup.string().required("Campo requerido"),
  });;
}

export function getInitialValues(): FieldValues{
  const initialValues: FieldValues = {
    email: "",
    password: "",
  }
  return initialValues
}
