import { useFormik } from "formik";
import { initialValues, validationSchema } from "./registerForm.form";
import { useState } from "react";
import { AuthServices } from "@/services/auth/authServices";
import { validatePasswordWithMessage } from "@/utils/validateData";
import { useRouter } from "next/router";
import { Alert, Button, Card, CardBody, Checkbox, Chip } from "@heroui/react";
import { Input } from "@/components/Common/Input";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const authCtrl = new AuthServices();

const RegisterForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState(false);
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                // Validación de contraseña
                if (values.password !== values.confirmPassword) {
                    setError("Las contraseñas no coinciden");
                    return;
                }
                
                const validation = validatePasswordWithMessage(values.password);
                if (!validation.status) {
                    setError(validation.message);
                    return;
                }

                // Registro
                await authCtrl.authRegister(values);
                setRegisterSuccess(true);
                
                setTimeout(() => {
                    router.push("/login");
                }, 2500);

            } catch (error) {
                setError("Error en el registro. Inténtalo de nuevo.");
                console.error(error);
            }
        },
    });

    return (
        <div className="min-h-screen bg-background-main py-12">
            <div className="container max-w-2xl">
                <Card className="bg-background-secondary shadow-elevation-2">
                    <CardBody className="p-8">
                        {/* Encabezado y pasos */}
                        <div className="mb-8 space-y-4">
                            <h1 className="text-center text-2xl font-bold text-text-primary">
                                Crear Cuenta
                            </h1>
                            <div className="flex justify-center">
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3].map((step) => (
                                        <div
                                            key={step}
                                            className={`h-2 w-8 rounded-full ${
                                                step === 1
                                                    ? "bg-primary"
                                                    : "bg-border-light"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            {/* Sección de Información Personal */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-text-primary">
                                    Información Personal
                                </h2>
                                
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Input
                                        label="Nombre"
                                        name="name"
                                        type="text"
                                        placeholder="Juan"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessage={
                                            formik.touched.name && formik.errors.name
                                                ? formik.errors.name
                                                : ""
                                        }
                                    />
                                    <Input
                                        label="Apellido"
                                        name="lastName"
                                        type="text"
                                        placeholder="Pérez"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        errorMessage={
                                            formik.touched.lastName && formik.errors.lastName
                                                ? formik.errors.lastName
                                                : ""
                                        }
                                    />
                                </div>
                            </div>

                            {/* Sección de Credenciales */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-text-primary">
                                    Credenciales de Acceso
                                </h2>
                                
                                <Input
                                    label="Correo Electrónico"
                                    name="email"
                                    type="email"
                                    placeholder="tucorreo@ejemplo.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    errorMessage={
                                        formik.touched.email && formik.errors.email
                                            ? formik.errors.email
                                            : ""
                                    }
                                />
                                
                                <Input
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    errorMessage={
                                        formik.touched.password && formik.errors.password
                                            ? formik.errors.password
                                            : ""
                                    }
                                />
                                
                                <Input
                                    label="Confirmar Contraseña"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    errorMessage={
                                        formik.touched.confirmPassword && formik.errors.confirmPassword
                                            ? formik.errors.confirmPassword
                                            : ""
                                    }
                                />
                            </div>

                            {/* Términos y Condiciones */}
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    isSelected={formik.values.terms}
                                    onChange={(checked) => formik.setFieldValue("terms", checked)}
                                />
                                <span className="text-sm text-text-secondary">
                                    Acepto los{" "}
                                    <a href="#" className="text-primary hover:text-primary-hover">
                                        términos y condiciones
                                    </a>
                                </span>
                            </div>

                            {/* Mensajes de error y éxito */}
                            {error && (
                                <Alert color="error" className="my-4">
                                    {error}
                                </Alert>
                            )}
                            
                            {registerSuccess && (
                                <Alert color="success" className="my-4">
                                    ¡Registro exitoso! Redirigiendo...
                                </Alert>
                            )}

                            {/* Botón de Registro */}
                            <Button
                                type="submit"
                                className="w-full bg-primary text-white hover:bg-primary-hover"
                                isLoading={formik.isSubmitting}
                            >
                                Crear Cuenta
                            </Button>

                        
                         
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default RegisterForm;