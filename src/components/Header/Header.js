import { useAuth } from "@/hooks/useAuth";
import { Button } from "@heroui/react";
import { FaCartShopping } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/catalog", label: "Catálogo" },
    { href: "/cart?step=1", label: <FaCartShopping className="text-lg" /> },
  ];

  return (
    <header className="relative  bg-cover bg-center bg-no-repeat flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
      
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Navigation Bar */}
        <nav className="border-b border-border-light bg-background-dark/80 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-parchment-cream">
              Biblioteca Elegante
            </Link>

            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 transition-colors ${
                    pathname === link.href
                      ? "text-primary hover:text-primary-hover"
                      : "text-parchment-cream hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <Link href="/account">
                  <Button
                    isIconOnly
                    aria-label="Cuenta"
                    variant="faded"
                    className="bg-background-secondary hover:bg-background-dark"
                  >
                    <MdAccountCircle className="text-xl text-primary" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="bg-primary text-white hover:bg-primary-hover">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>

      
      </div>
    </header>
  );
}