import { FieldValues } from 'react-hook-form';
import * as yup from 'yup';
export function getValidations() {  
  return yup.object().shape({
    name: yup.string().required("Campo requerido").min(5,"Mínimo 5 caractéres"),
    description: yup.string().required("Campo requerido").min(5,"Mínimo 5 caractéres"),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    radius: yup.number().required()
  })
}

export function getInitialValues(): FieldValues{
  const initialValues: FieldValues = {
    name:"",
    description:"",
    latitude: null,
    longitude:null,
    radius: null,
  }
  return initialValues
}