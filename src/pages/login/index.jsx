import React from "react";

function login() {
    return (
        <div className="  flex items-center justify-center bg-[var(--background-main)]">
            <div className="my-12 w-full max-w-md bg-[var(--background-secondary)] rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-[var(--espresso-brown)] mb-6">
                    Bienvenido de Nuevo
                </h1>
                <form action="#" method="POST">
                    {/* <!-- Campo de correo --> */}
                    <div className="mb-4">
                        <label
                            for="email"
                            className="block text-[var(--text-primary)] font-medium mb-2"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="tucorreo@ejemplo.com"
                            className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
                            required
                        />
                    </div>

                    {/* <!-- Campo de contraseña --> */}
                    <div className="mb-6">
                        <label
                            for="password"
                            className="block text-[var(--text-primary)] font-medium mb-2"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
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

export default login;
