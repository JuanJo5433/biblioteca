import * as Yup from 'yup';

// Esquema de validación
export const validationSchema = Yup.object().shape({
  street1: Yup.string().required('Dirección requerida'),
  city: Yup.string().required('Ciudad requerida'),
  state: Yup.string().required('Estado requerido'),
  country: Yup.string().required('País requerido'),
  postalCode: Yup.string().required('Código postal requerido'),
  phone: Yup.string()
    .required('Teléfono requerido')
    .matches(/^[0-9]+$/, "Solo números permitidos")
    .min(10, 'Mínimo 10 dígitos')
    .max(15, 'Máximo 15 dígitos')
});

// Valores iniciales
export const initialValues = {
  street1: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  phone: ''
};