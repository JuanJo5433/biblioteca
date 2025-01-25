import React from "react";

export function Profile() {
    return (
        <div>
            <form>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-text-secondary font-medium mb-2"
                    >
                        Nombre Completo
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Juan Pérez"
                        className="w-full py-2 px-4 border border-border-light rounded-md text-text-primary"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-text-secondary font-medium mb-2"
                    >
                        Correo Electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        className="w-full py-2 px-4 border border-border-light rounded-md text-text-primary"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="phone"
                        className="block text-text-secondary font-medium mb-2"
                    >
                        Teléfono
                    </label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="+34 123 456 789"
                        className="w-full py-2 px-4 border border-border-light rounded-md text-text-primary"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-button-primary-bg text-button-primary-text font-medium rounded-md hover:bg-hover-brown"
                >
                    Actualizar Perfil
                </button>
            </form>
        </div>
    );
}
