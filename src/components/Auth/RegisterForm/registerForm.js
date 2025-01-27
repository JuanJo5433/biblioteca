import { useFormik } from "formik";
import { initialValues, validationSchema } from "./registerForm.form";
import { useState } from "react";
import { AuthServices } from "@/services/auth/authServices";
import { validatePasswordWithMessage } from "@/utils/validateData";
import { useRouter } from "next/router";
import { Alert } from "@heroui/react";

// Instancia del servicio de autenticación
const authCtrl = new AuthServices();

const RegisterForm = () => {
    // Estados para manejar errores
    const [error, setError] = useState(
        "La contraseña debe contener 7 caracteres, numeros, letras Y caracteres especiales"
    );
    const [loading, setLoading] = useState(false);
    const [registerSucces, setRegisterSucces] = useState(false);
    const route = useRouter();
    // Función para manejar el registro de usuario
    const authRegister = async (values) => {
        try {
            await authCtrl.authRegister(values);
            setRegisterSucces(true);
            setLoading(false);
            setTimeout(() => {
                route.push("/login");
            }, 2500);
        } catch (err) {
            console.error("Error durante el registro:", err);
            setError(
                "Ocurrió un error durante el registro. Inténtalo de nuevo."
            );
        }
    };

    // Configuración de Formik para manejar el formulario y validaciones
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            // Validación de contraseñas
            if (values.password !== values.confirmPassword) {
                setError("Las contraseñas no coinciden");
                setLoading(false);
                return;
            }

            // Validación personalizada de la contraseña
            const validation = validatePasswordWithMessage(values.password);
            if (!validation.status) {
                setError(validation.message);
                setLoading(false);
                return;
            }

            // Si todo es válido, se procede con el registro
            setError("");
            setError("");
            authRegister(values);
        },
    });

    return (
        <div className="flex items-center justify-center bg-[var(--background-main)]">
            <div className="my-8 w-full max-w-4xl bg-[var(--background-secondary)] rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-[var(--espresso-brown)] mb-6">
                    ¡Crea tu Cuenta!
                </h1>

                <form onSubmit={formik.handleSubmit}>
                    {/* Nombre y Apellido */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
                        <InputField
                            label="Nombre"
                            id="name"
                            name="name"
                            placeholder="Ingresa tu nombre"
                            formik={formik}
                        />
                        <InputField
                            label="Apellido"
                            id="lastName"
                            name="lastName"
                            placeholder="Ingresa tu apellido"
                            formik={formik}
                        />
                    </div>

                    {/* Correo Electrónico */}
                    <InputField
                        label="Correo Electrónico"
                        id="email"
                        name="email"
                        placeholder="tucorreo@ejemplo.com"
                        type="email"
                        formik={formik}
                        extraClasses="mb-6"
                    />

                    {/* Contraseña y Confirmación */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <InputField
                            label="Contraseña"
                            id="password"
                            name="password"
                            placeholder="Crea una contraseña segura"
                            type="password"
                            formik={formik}
                        />

                        <InputField
                            label="Confirmar Contraseña"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repite tu contraseña"
                            type="password"
                            formik={formik}
                        />
                    </div>

                    {/* Mensajes de Error */}
                    {error && <ErrorMessage message={error} />}

                    {/* Botón de registro */}

                    <button
                        isLoading={loading} // Muestra un indicador de carga en el botón
                        type="submit"
                        className="w-full py-3 bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] rounded-md font-semibold hover:bg-[var(--hover-brown)] transition-colors"
                    >
                        Registrarse
                    </button>
                </form>

                {/* Enlace de inicio de sesión */}
                <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">
                    ¿Ya tienes una cuenta?
                    <a
                        href="/login"
                        className="ml-1 text-[var(--text-highlight)] hover:text-[var(--hover-gray)]"
                    >
                        Inicia sesión
                    </a>
                </p>
            </div>
            { registerSucces &&(
                <Alert
                className="absolute w-80  top-4"
                    color={"success"}
                    title={`Registro exitoso! Inicia sesion`}
                />
            )}
        </div>
    );
};

// Componente reutilizable para los campos de entrada
const InputField = ({
    label,
    id,
    name,
    placeholder,
    type = "text",
    formik,
    extraClasses = "",
}) => (
    <div className={`mb-4 ${extraClasses}`}>
        <label
            htmlFor={id}
            className="block text-[var(--text-primary)] font-medium mb-2"
        >
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
            onChange={formik.handleChange}
            value={formik.values[name]}
            required
        />
    </div>
);

// Componente para mensajes de error
const ErrorMessage = ({ message }) => (
    <div className="text-red-700 mb-4 rounded-md">
        <h2 className="text-lg font-semibold">{message}</h2>
    </div>
);

export default RegisterForm;
