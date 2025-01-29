import React, { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { getInitialValues, validationSchema } from "./profile.form";
import { updateClient } from "@/services/client/clientService";
import { Alert, Button } from "@heroui/react";
import { FiEdit, FiXCircle, FiSave } from "react-icons/fi";

export function Profile() {
    const { user } = useAuth();
    const [formDisabled, setFormDisabled] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: getInitialValues(user),
        enableReinitialize: true,
        validationSchema: validationSchema(),
        onSubmit: async (values) => {
            try {
                await updateClient(values);
                setIsUpdate(true);
                setTimeout(() => setIsUpdate(false), 3000);
                setFormDisabled(true);
            } catch (error) {
                setErrorMessage("Error al actualizar la información");
                console.error(error);
            }
        },
    });

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Encabezado */}
                <div className="flex items-center justify-between border-b border-border-light pb-4">
                    <h2 className="text-2xl font-bold text-text-primary">
                        Información Personal
                    </h2>
                    <Button
                        type="button"
                        variant="light"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => setFormDisabled(!formDisabled)}
                        startContent={formDisabled ? <FiEdit /> : <FiXCircle />}
                    >
                        {formDisabled ? "Editar" : "Cancelar"}
                    </Button>
                </div>

                {/* Campos del formulario */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Nombre */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary">
                            Nombre
                        </label>
                        <input
                            {...formik.getFieldProps("name")}
                            disabled={formDisabled}
                            className={`w-full rounded-lg border bg-background-main p-3 ${
                                formik.errors.name && formik.touched.name
                                    ? "border-error"
                                    : "border-border-light"
                            } ${formDisabled ? "bg-background-secondary" : ""}`}
                        />
                        {formik.errors.name && formik.touched.name && (
                            <p className="text-sm text-error">
                                {formik.errors.name}
                            </p>
                        )}
                    </div>

                    {/* Apellido */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary">
                            Apellido
                        </label>
                        <input
                            {...formik.getFieldProps("lastName")}
                            disabled={formDisabled}
                            className={`w-full rounded-lg border bg-background-main p-3 ${
                                formik.errors.lastName && formik.touched.lastName
                                    ? "border-error"
                                    : "border-border-light"
                            } ${formDisabled ? "bg-background-secondary" : ""}`}
                        />
                        {formik.errors.lastName && formik.touched.lastName && (
                            <p className="text-sm text-error">
                                {formik.errors.lastName}
                            </p>
                        )}
                    </div>

                    {/* Tipo Documento */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary">
                            Tipo de Documento
                        </label>
                        <select
                            {...formik.getFieldProps("documentType")}
                            disabled={formDisabled}
                            className={`w-full rounded-lg border bg-background-main p-3 ${
                                formik.errors.documentType && formik.touched.documentType
                                    ? "border-error"
                                    : "border-border-light"
                            } ${formDisabled ? "bg-background-secondary" : ""}`}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="TI">Tarjeta de Identidad</option>
                            <option value="CE">Cédula Extranjera</option>
                            <option value="PA">Pasaporte</option>
                        </select>
                    </div>

                    {/* Número Documento */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary">
                            Número de Documento
                        </label>
                        <input
                            type="number"
                            {...formik.getFieldProps("codeDocument")}
                            disabled={formDisabled}
                            className={`w-full rounded-lg border bg-background-main p-3 ${
                                formik.errors.codeDocument && formik.touched.codeDocument
                                    ? "border-error"
                                    : "border-border-light"
                            } ${formDisabled ? "bg-background-secondary" : ""}`}
                        />
                        {formik.errors.codeDocument && formik.touched.codeDocument && (
                            <p className="text-sm text-error">
                                {formik.errors.codeDocument}
                            </p>
                        )}
                    </div>

                    {/* Teléfono */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-text-primary">
                            Teléfono
                        </label>
                        <input
                            {...formik.getFieldProps("phone")}
                            disabled={formDisabled}
                            className={`w-full rounded-lg border bg-background-main p-3 ${
                                formik.errors.phone && formik.touched.phone
                                    ? "border-error"
                                    : "border-border-light"
                            } ${formDisabled ? "bg-background-secondary" : ""}`}
                        />
                        {formik.errors.phone && formik.touched.phone && (
                            <p className="text-sm text-error">
                                {formik.errors.phone}
                            </p>
                        )}
                    </div>
                </div>

                {/* Botón de guardado */}
                {!formDisabled && (
                    <div className="border-t border-border-light pt-6">
                        <Button
                            type="submit"
                            className="w-full bg-primary text-white hover:bg-primary-hover"
                            startContent={<FiSave />}
                            isLoading={formik.isSubmitting}
                        >
                            Guardar Cambios
                        </Button>
                    </div>
                )}

                {/* Alertas */}
                <div className="space-y-2">
                    {isUpdate && (
                        <Alert color="success" title="¡Información actualizada con éxito!" />
                    )}
                    {errorMessage && <Alert color="error" title={errorMessage} />}
                </div>
            </form>
        </div>
    );
}