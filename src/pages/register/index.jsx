"use client";
import { useForm } from 'react-hook-form';

function RegisterPage() {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert('Las contraseñas no coinciden');
    }
  
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          fullName: data.fullname,
          email: data.email,
          password: data.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const error = await res.json();
        return alert(`Error: ${error.error || 'Ocurrió un problema'}`);
      }
  
      const resJSON = await res.json();
      console.log(resJSON);
  
      alert('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al procesar la solicitud');
    }
  });
  

  console.log(errors);

  return (
    <div className="flex items-center justify-center bg-[var(--background-main)]">
      <div className="my-8 w-full max-w-lg bg-[var(--background-secondary)] rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-[var(--espresso-brown)] mb-6">
          ¡Crea tu Cuenta!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de Nombre Completo */}
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-[var(--text-primary)] font-medium mb-2"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              {...register("fullname", {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              placeholder="Ingresa tu nombre completo"
              className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
            />
            {errors.fullname && <span className="text-[var(--text-red)] text-sm">{errors.fullname.message}</span>}
          </div>

          {/* Campo de Correo Electrónico */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[var(--text-primary)] font-medium mb-2"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              placeholder="tucorreo@ejemplo.com"
              className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
            />
            {errors.email && <span className="text-[var(--text-red)] text-sm">{errors.email.message}</span>}
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-[var(--text-primary)] font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              placeholder="Crea una contraseña segura"
              className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
            />
            {errors.password && <span className="text-[var(--text-red)] text-sm">{errors.password.message}</span>}
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-[var(--text-primary)] font-medium mb-2"
            >
              Confirmar Contraseña
            </label>
            <input
              type="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: 'Este campo es obligatorio',
                },
              })}
              placeholder="Repite tu contraseña"
              className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
            />
            {errors.confirmPassword && <span className="text-[var(--text-red)] text-sm">{errors.confirmPassword.message}</span>}
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            className="w-full py-3 bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] rounded-md font-semibold hover:bg-[var(--hover-brown)] transition-colors"
          >
            Registrarse
          </button>
        </form>

        {/* Enlace para Iniciar Sesión */}
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
    </div>
  );
}

export default RegisterPage;
