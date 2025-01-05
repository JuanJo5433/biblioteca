export function Footer() {
    return (
        <footer className="bg-espresso-brown text-parchment-cream py-8 mb-0 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <div>
                    <h2 className="text-lg font-bold">Biblioteca Elegante</h2>
                    <p className="mt-2 text-warm-gray">
                        Tu destino para el conocimiento y la imaginación.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold">Enlaces Rápidos</h2>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <a
                                href="#"
                                className="text-parchment-cream hover:text-hover-gray transition"
                            >
                                Catálogo en Línea
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-parchment-cream hover:text-hover-gray transition"
                            >
                                Horarios y Ubicación
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-parchment-cream hover:text-hover-gray transition"
                            >
                                Preguntas Frecuentes
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-bold">Contáctanos</h2>
                    <p className="mt-2 text-warm-gray">
                        123 Calle Principal, Ciudad
                        <br />
                        Teléfono: (123) 456-7890
                        <br />
                        Email: info@bibliotecaelegante.com
                    </p>
                </div>
            </div>

            <div className="border-t border-border-dark mt-8 pt-4 text-center text-warm-gray text-sm">
                © 2025 Biblioteca Elegante. Todos los derechos reservados.
            </div>
        </footer>
    );
}
