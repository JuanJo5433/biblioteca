import React, { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { getInitialValues, validationSchema } from "./profile.form";
import { updateClient } from "@/services/client/clientService";
import { Alert } from "@heroui/react";

export function Profile() {
    const { user } = useAuth();
    const [formDisabled, setFormDisabled] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: getInitialValues(user),
        enableReinitialize: true, // Permite actualizar los valores iniciales si `user` cambia
        validationSchema: validationSchema(),
        onSubmit: async (values) => {
            try {
                await updateClient(values);
                setIsUpdate(true);
                setTimeout(() => setIsUpdate(false), 3000);
                setFormDisabled(true);
            } catch (error) {
                setErrorMessage("Error al actualizar la información.");
                console.error(error);
            }
        },
    });

    return (
        <div className="max-w-lg mx-auto">
            <form onSubmit={formik.handleSubmit} className="space-y-4 my-5">
                {/* Nombre y Apellidos */}
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label
                            htmlFor="name"
                            className="block text-text-secondary font-medium mb-1"
                        >
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            aria-label="Nombre"
                            disabled={formDisabled}
                            {...formik.getFieldProps("name")}
                            className="w-full py-2 px-4 border rounded-md text-text-primary"
                        />
                    </div>
                    <div className="w-1/2">
                        <label
                            htmlFor="lastName"
                            className="block text-text-secondary font-medium mb-1"
                        >
                            Apellidos
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            aria-label="Apellidos"
                            disabled={formDisabled}
                            {...formik.getFieldProps("lastName")}
                            className="w-full py-2 px-4 border rounded-md text-text-primary"
                        />
                    </div>
                </div>

                {/* Tipo y Número de Documento */}
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label
                            htmlFor="documentType"
                            className="block text-text-secondary font-medium mb-1"
                        >
                            Tipo de Documento
                        </label>
                        <select
                            id="documentType"
                            aria-label="Tipo de documento"
                            disabled={formDisabled}
                            {...formik.getFieldProps("documentType")}
                            className="w-full py-2 px-4 border rounded-md text-text-primary"
                        >
                            <option value="" disabled defaultValue>
                                Selecciona...
                            </option>
                            <option value="CC">CC</option>
                            <option value="TI">TI</option>
                            <option value="CE">CE</option>
                            <option value="PA">PA</option>
                            <option value="DNI">DNI</option>
                        </select>
                    </div>
                    <div className="w-1/2">
                        <label
                            htmlFor="codeDocument"
                            className="block text-text-secondary font-medium mb-1"
                        >
                            Número de Documento
                        </label>
                        <input
                            id="codeDocument"
                            type="number"
                            aria-label="Número de documento"
                            disabled={formDisabled}
                            {...formik.getFieldProps("codeDocument")}
                            className="w-full py-2 px-4 border rounded-md text-text-primary"
                        />
                    </div>
                </div>

                {/* Teléfono */}
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-text-secondary font-medium mb-1"
                    >
                        Teléfono
                    </label>
                    <input
                        id="phone"
                        type="text"
                        aria-label="Teléfono"
                        disabled={formDisabled}
                        {...formik.getFieldProps("phone")}
                        className="w-full py-2 px-4 border rounded-md text-text-primary"
                    />
                </div>

                {/* Botones */}
                <div className="flex gap-4 pt-5">
                    <button
                        type="button"
                        onClick={() => setFormDisabled(!formDisabled)}
                        className="flex-1  py-2 bg-button-primary-bg text-button-primary-text font-medium rounded-md hover:bg-hover-brown"
                    >
                        {formDisabled ? "Editar Información" : "Cancelar"}
                    </button>
                    {!formDisabled && (
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="flex-1 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
                        >
                            {formik.isSubmitting
                                ? "Guardando..."
                                : "Actualizar Perfil"}
                        </button>
                    )}
                </div>

                {/* Alertas */}
                {isUpdate && (
                    <Alert
                        color="success"
                        title="¡Información actualizada con éxito!"
                    />
                )}
                {errorMessage && <Alert color="error" title={errorMessage} />}
            </form>
        </div>
    );
}
