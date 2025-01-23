import React from "react";

const Register = () => {
    return (
        <div className="flex items-center justify-center bg-[var(--background-main)]">
            <div className="my-8 w-full max-w-4xl bg-[var(--background-secondary)] rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-[var(--espresso-brown)] mb-6">
                    ¡Crea tu Cuenta!
                </h1>
                <form action="#" method="POST">
                    {/* Fila 1: Nombre y Apellido */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-2">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-[var(--text-primary)] font-medium mb-2"
                            >
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ingresa tu nombre"
                                className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="lastName"
                                className="block text-[var(--text-primary)] font-medium mb-2"
                            >
                                Apellido
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Ingresa tu apellido"
                                className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
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
                            placeholder="tucorreo@ejemplo.com"
                            className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                        <div className="mb-4">
                            {" "}
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
                                placeholder="Crea una contraseña segura"
                                className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="confirm-password"
                                className="block text-[var(--text-primary)] font-medium mb-2"
                            >
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Repite tu contraseña"
                                className="w-full p-3 border border-[var(--border-light)] rounded-md bg-[var(--soft-taupe)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--library-green)] focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Botón de registro */}
                    <button
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
        </div>
    );
};

export default Register;
