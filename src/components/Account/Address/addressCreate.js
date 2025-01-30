import { Formik, Field, Form, ErrorMessage } from "formik";
import { initialValues, validationSchema } from "./address.form";
import { FiMapPin, FiHome, FiGlobe, FiMail, FiPhone } from "react-icons/fi";
import { addressService } from "@/services/address/addressService";
import { useState } from "react";
import { Alert, Button } from "@heroui/react";

export function AddressCreate({ onSuccess, onCancel }) {
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setError(null);
      setIsSuccess(false);

      // Crear la dirección usando el servicio
      const response = await addressService.createAddress(values);

      if (response && response.data) {
        setIsSuccess(true);
        resetForm();
        onSuccess(response.data); // Notificar al componente padre con la nueva dirección
        onCancel(); // Cerrar el formulario
      }
    } catch (error) {
      setError(error.message || "Error al guardar la dirección");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl p-6">
      {/* Encabezado */}
      <div className="border-b border-border-light pb-4 mb-6">
        <h2 className="text-2xl font-bold text-text-primary">
          Dirección de Envío
        </h2>
        <p className="text-text-secondary mt-1">
          Actualiza tu información de dirección
        </p>
      </div>
      {/* Alertas */}
      <div className="mb-6 space-y-2">
        {isSuccess && (
          <Alert color="success" title="¡Dirección guardada exitosamente!" />
        )}
        {error && <Alert color="error" title={error} />}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Dirección */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <FiMapPin className="text-lg" />
                  Dirección Principal
                </label>
                <Field
                  name="street1"
                  className={`w-full p-3 rounded-lg border ${
                    errors.street1 && touched.street1
                      ? "border-error"
                      : "border-border-light"
                  } bg-background-main focus:ring-2 focus:ring-primary`}
                  placeholder="Calle y número"
                />
                <ErrorMessage
                  name="street1"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              {/* Ciudad */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <FiHome className="text-lg" />
                  Ciudad
                </label>
                <Field
                  name="city"
                  className={`w-full p-3 rounded-lg border ${
                    errors.city && touched.city
                      ? "border-error"
                      : "border-border-light"
                  } bg-background-main focus:ring-2 focus:ring-primary`}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              {/* Estado */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <FiGlobe className="text-lg" />
                  Estado/Provincia
                </label>
                <Field
                  name="state"
                  className={`w-full p-3 rounded-lg border ${
                    errors.state && touched.state
                      ? "border-error"
                      : "border-border-light"
                  } bg-background-main focus:ring-2 focus:ring-primary`}
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              {/* País */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <FiGlobe className="text-lg" />
                  País
                </label>
                <Field
                  name="country"
                  as="select"
                  className={`w-full p-3 rounded-lg border ${
                    errors.country && touched.country
                      ? "border-error"
                      : "border-border-light"
                  } bg-background-main focus:ring-2 focus:ring-primary`}
                >
                  <option value="">Selecciona un país</option>
                  <option value="México">México</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Argentina">Argentina</option>
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              {/* Código Postal */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <FiMail className="text-lg" />
                  Código Postal
                </label>
                <Field
                  name="postalCode"
                  className={`w-full p-3 rounded-lg border ${
                    errors.postalCode && touched.postalCode
                      ? "border-error"
                      : "border-border-light"
                  } bg-background-main focus:ring-2 focus:ring-primary`}
                />
                <ErrorMessage
                  name="postalCode"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <FiPhone className="text-lg" />
                  Teléfono
                </label>
                <Field
                  name="phone"
                  className={`w-full p-3 rounded-lg border ${
                    errors.phone && touched.phone
                      ? "border-error"
                      : "border-border-light"
                  } bg-background-main focus:ring-2 focus:ring-primary`}
                  placeholder="Ej. 5512345678"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>
            </div>

            {/* Botón de Guardar */}
            <div className="border-t border-border-light pt-6">
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full bg-primary text-white hover:bg-primary-hover"
              >
                {isSubmitting ? "Guardando..." : "Guardar Dirección"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}