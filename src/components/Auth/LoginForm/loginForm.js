import { useFormik } from "formik";
import { initialValues, validationSchema } from "./loginForm.form";
import { authServices } from "@/services/auth/authServices";
import { useAuth } from "@/context/authContext";

const authCtrl = new authServices();

export function LoginForm() {
    const { login } = useAuth();


    const authLogin = async (values) => {
        const { email, password } = values;
        try {
            const response = await authCtrl.authLogin(email, password, login);
            console.log(response)
            
        } catch (error) {
            console.error(error);
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            authLogin(values);
        },
    });

    return (
        <div className="  flex items-center justify-center bg-[var(--background-main)]">
            <div className="my-12 w-full max-w-md bg-[var(--background-secondary)] rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-[var(--espresso-brown)] mb-6">
                    Bienvenido de Nuevo
                </h1>
                <form onSubmit={formik.handleSubmit}>
                    {/* <!-- Campo de correo --> */}
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

                    {/* <!-- Campo de contraseña --> */}
                    <div className="mb-6">
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

                    {/* <!-- Botón de inicio de sesión --> */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] rounded-md font-semibold hover:bg-[var(--hover-brown)] transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                {/* <!-- Enlaces de ayuda --> */}
                <div className="text-center mt-4">
                    <a
                        href="#"
                        className="text-sm text-[var(--text-highlight)] hover:text-[var(--hover-gray)]"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                {/* <!-- Registro --> */}
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
