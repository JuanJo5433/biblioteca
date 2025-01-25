import { useFormik } from "formik";
import { initialValues, validationSchema } from "./loginForm.form";
import { AuthServices } from "@/services/auth/authServices";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/router";

// Instanciamos el controlador de autenticación para usar sus métodos
const authCtrl = new AuthServices();

export function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false); // Estado para el indicador de carga
    const [error, setError] = useState(""); // Estado para almacenar el mensaje de error

    // Función para manejar el inicio de sesión
    const authLogin = async (values) => {
        setLoading(true); // Iniciamos el indicador de carga
        const { email, password } = values;
        try {
            const response = await authCtrl.authLogin(email, password); // Intentamos realizar la autenticación
            const { jwt } = await response;
            await login(jwt); // Si es exitoso, guardamos el JWT en el contexto de autenticación
            setLoading(false); // Detenemos el indicador de carga
            router.push("/account"); // Redirigimos al usuario a la página de la cuenta
        } catch (error) {
            setError(error.message); // En caso de error, mostramos el mensaje de error
            setLoading(false); // Detenemos el indicador de carga
        }
    };

    // Inicialización de Formik para el manejo de formularios con validación
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            authLogin(values); // Llamamos a la función de inicio de sesión cuando se envía el formulario
        },
    });

    return (
        <div className="flex items-center justify-center bg-[var(--background-main)]">
            <div className="my-12 w-full max-w-md bg-[var(--background-secondary)] rounded-lg shadow-lg p-8">
                {/* Título del formulario */}
                <h1 className="text-2xl font-bold text-center text-[var(--espresso-brown)] mb-6">
                    Bienvenido de Nuevo
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    {/* Campo de correo electrónico */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-[var(--text-primary)] font-medium mb-2"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            placeholder="tucorreo@ejemplo.com"
                            className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            required
                        />
                    </div>

                    {/* Campo de contraseña */}
                    <div className="mb-1">
                        <label
                            htmlFor="password"
                            className="block text-[var(--text-primary)] font-medium mb-2"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="Ingresa tu contraseña"
                            className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            required
                        />
                    </div>

                    {/* Mostrar mensaje de error si existe */}
                    <div className="mb-4">
                        {error && (
                            <div className="text-red-700 mb-4 rounded-md">
                                <h2 className="text-lg font-semibold">
                                    {error}
                                </h2>
                            </div>
                        )}
                    </div>

                    {/* Botón de inicio de sesión con estado de carga */}
                    <Button
                        isLoading={loading} // Muestra un indicador de carga en el botón
                        type="submit"
                        className="w-full py-3 bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] rounded-md font-semibold hover:bg-[var(--hover-brown)] transition-colors"
                    >
                        Iniciar Sesión
                    </Button>
                </form>

                {/* Enlace para recuperación de contraseña */}
                <div className="text-center mt-4">
                    <a
                        href="#"
                        className="text-sm text-[var(--text-highlight)] hover:text-[var(--hover-gray)]"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                {/* Enlace para registrarse */}
                <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">
                    ¿No tienes una cuenta?
                    <a
                        href="/register"
                        className="ml-1 text-[var(--text-highlight)] hover:text-[var(--hover-gray)]"
                    >
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
}
