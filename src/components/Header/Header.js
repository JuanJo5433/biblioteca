import { useAuth } from "@/hooks/useAuth";
import { Button } from "@heroui/react";
import { FaCartShopping } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";

export default function Header() {
    const { user } = useAuth();

    return (
        <header
            className="relative w-full h-80 bg-cover bg-center flex flex-col justify-between"
            style={{
                backgroundImage: "url('/fondoHeader.jpeg')", // Cambia esto por la URL de tu imagen
            }}
        >
            {/* Capa grisácea (overlay) */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

            {/* Contenido del header */}
            <section className="relative z-10 flex justify-between items-center p-7">
                <div className="flex items-center">
                    <h1 className="ml-3 font-bold text-4xl text-parchment-cream ">
                        Biblioteca Elegante
                    </h1>
                </div>
                <nav>
                    <ul className="flex space-x-4 text-white font-medium">
                        <a href="/">
                            <li className="hover:text-gray-300 cursor-pointer ">
                                Inicio
                            </li>
                        </a>

                        <a href="/catalog">
                            <li className="hover:text-gray-300 cursor-pointer">
                                Catálogo
                            </li>
                        </a>
                        <a href="/cart?step=1">
                            <FaCartShopping />
                        </a>

                        {user ? (
                            <a href="/account">
                                <Button
                                    className="-mt-5"
                                    isIconOnly
                                    aria-label="Take a photo"
                                    color="warning"
                                    variant="faded"
                                >
                                    <MdAccountCircle className="text-black text-xl" />
                                </Button>
                            </a>
                        ) : (
                            <a href="/login">
                                <Button className="-mt-5 bg-white border-small border-warm-gray text-slate-700">
                                    Login
                                </Button>
                            </a>
                        )}
                    </ul>
                </nav>
            </section>

            {/* Sección inferior: Título y subtítulo */}
            <section className="relative mb-10 z-10 flex flex-col items-center justify-center text-center text-white">
                <h2 className="text-3xl font-bold text-parchment-cream ">
                    Descubre Mundos Infinitos
                </h2>
                <p className="text-lg mt-2 text-parchment-cream  ">
                    Tu puerta a la sabiduría y la imaginación
                </p>
            </section>
        </header>
    );
}
