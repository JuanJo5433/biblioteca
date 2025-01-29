import { useFormik } from "formik";
import { initialValues, validationSchema } from "./loginForm.form";
import { AuthServices } from "@/services/auth/authServices";
import { useAuth } from "@/hooks/useAuth";
import { Button, Card, CardBody } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Input } from "@/components/Common/Input";

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
        <div className=" bg-background-main py-20">
          <div className="container max-w-md">
            <Card className="bg-background-secondary shadow-elevation-2">
              <CardBody className="p-8">
                <div className="space-y-1 text-center">
                  <h1 className="text-2xl font-bold text-text-primary">
                    Bienvenido de Nuevo
                  </h1>
                  <p className="text-text-secondary">
                    Inicia sesión para continuar
                  </p>
                </div>
    
                <form onSubmit={formik.handleSubmit} className="mt-6 space-y-6">
                  <Input
                    label="Correo Electrónico"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.email && formik.errors.email}
                  />
    
                  <Input
                    label="Contraseña"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.password && formik.errors.password}
                  />
    
                  {error && (
                    <Alert color="error" className="mt-4">
                      {error}
                    </Alert>
                  )}
    
                  <Button
                    type="submit"
                    isLoading={loading}
                    className="w-full bg-primary text-white hover:bg-primary-hover"
                  >
                    Iniciar Sesión
                  </Button>
                </form>
    
                <div className="mt-6 text-center text-sm text-text-secondary">
                  ¿No tienes cuenta?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-primary hover:text-primary-hover"
                  >
                    Regístrate
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    }