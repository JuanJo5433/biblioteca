import * as Yup from "yup";

export const getInitialValues = (user) => ({
  name: user?.name || null,
  lastName: user?.lastName || null,
  documentType: user?.documentType || null,
  codeDocument: user?.codeDocument || null,
  phone: user?.phone || null,
});

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    lastName: Yup.string().required("Los apellidos son obligatorios"),
    documentType: Yup.string().nullable(), // Ahora opcional
    codeDocument: Yup.number()
      .nullable() // Permite que sea opcional
      .typeError("Debe ser un número"), // Solo validará si el usuario ingresa un valor
    phone: Yup.string().nullable(), // Ahora opcional
  });
}
