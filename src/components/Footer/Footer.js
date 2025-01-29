import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export function Footer() {
    return (
      <footer className="mt-auto border-t border-border-light bg-background-secondary text-parchment-cream">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Logo y descripción */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Biblioteca Elegante</h3>
              <p className="text-sm text-parchment-cream/80">
                Tu portal al conocimiento desde 2024
              </p>
            </div>

            {/* Enlaces rápidos */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Explorar</h4>
              <nav className="space-y-2">
                {['Catálogo', 'Eventos', 'Blog', 'Sobre Nosotros'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-sm transition-colors hover:text-primary-hover"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contacto</h4>
              <div className="space-y-2 text-sm">
                <p>📞 +57 123 456 7890</p>
                <p>✉️ contacto@biblioteca.com</p>
                <p>📍 Carrera 123 #45-67, Bogotá</p>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Síguenos</h4>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((network) => (
                  <a
                    key={network}
                    href="#"
                    className="rounded-full bg-background-secondary p-2 transition-colors hover:bg-primary-hover"
                  >
                    <span className="sr-only">{network}</span>
                    <SocialIcon network={network} />
                  </a>
                ))}
              </div>
              
              {/* Newsletter */}
              <div className="mt-4 space-y-2">
                <p className="text-sm">Suscríbete a nuestro boletín</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full rounded-lg border border-border-light bg-background-main px-3 py-2 text-sm text-text-primary"
                  />
                  <button className="rounded-lg bg-primary px-4 py-2 text-sm transition-colors hover:bg-primary-hover">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-border-light pt-6 text-center text-sm text-parchment-cream/60">
            © 2024 Biblioteca Elegante. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    );
}

const SocialIcon = ({ network }) => {
    const icons = {
      Facebook: <FaFacebook className="h-5 w-5" />,
      Twitter: <FaTwitter className="h-5 w-5" />,
      Instagram: <FaInstagram className="h-5 w-5" />,
      LinkedIn: <FaLinkedin className="h-5 w-5" />,
    };

    return icons[network] || null;
};