import { FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
    return (
        <div className=" bg-[var(--background-main)] p-6">
            <div className=" my-20 max-w-4xl mx-auto bg-[var(--background-secondary)] rounded-lg shadow-lg">
                <header className="text-center py-4">
                    <h1 className="text-2xl font-bold text-[var(--espresso-brown)]">
                        Tu Carrito
                    </h1>
                </header>
                <div className="bg-[var(--soft-taupe)] p-4 rounded-md">
                    <h2 className="font-semibold text-lg text-[var(--text-primary)]">
                        Resumen del Pedido
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                        Tienes 3 libros en tu carrito
                    </p>
                </div>
                <table className="w-full mt-4 border-collapse">
                    <thead>
                        <tr className="text-left border-b border-[var(--border-light)]">
                            <th className="py-2 px-4 text-[var(--text-secondary)]">
                                Portada
                            </th>
                            <th className="py-2 px-4 text-[var(--text-secondary)]">
                                Título
                            </th>
                            <th className="py-2 px-4 text-[var(--text-secondary)]">
                                Autor
                            </th>
                            <th className="py-2 px-4 text-[var(--text-secondary)]">
                                Precio
                            </th>
                            <th className="py-2 px-4 text-[var(--text-secondary)]">
                                Cantidad
                            </th>
                            <th className="py-2 px-4 text-[var(--text-secondary)]">
                                Subtotal
                            </th>
                            <th className="py-2 px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-[var(--border-light)]">
                            <td className="py-2 px-4">
                                <div className="w-16 h-20 bg-[var(--background-dark)] flex items-center justify-center rounded-lg border border-[var(--border-dark)]">
                                    <span className="text-[var(--text-primary)] text-sm">
                                        Imagen
                                    </span>
                                </div>
                            </td>
                            <td className="py-2 px-4 text-[var(--text-primary)]">
                                El Gran Gatsby
                            </td>
                            <td className="py-2 px-4 text-[var(--text-secondary)]">
                                F. Scott Fitzgerald
                            </td>
                            <td className="py-2 px-4 text-[var(--text-primary)]">
                                $15.99
                            </td>
                            <td className="py-8 px-4 flex items-center gap-2">
                                <button className="w-8 h-8 flex items-center justify-center bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] rounded-full hover:bg-[var(--hover-brown)] hover:text-[var(--parchment-cream)]">
                                    -
                                </button>
                                <span className="text-[var(--text-primary)]">
                                    1
                                </span>
                                <button className="w-8 h-8 flex items-center justify-center bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] rounded-full hover:bg-[var(--hover-brown)] hover:text-[var(--parchment-cream)]">
                                    +
                                </button>
                            </td>
                            <td className="py-2 px-4 text-[var(--text-primary)]">
                                $15.99
                            </td>
                            <td className="py-2 px-4">
                                <button className="w-8 h-8 flex items-center justify-center bg-[var(--button-primary-bg)] rounded-full text-[var(--button-primary-text)]">
                                    <FaRegTrashAlt  />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="p-4 bg-[var(--soft-taupe)] flex justify-between items-center">
                    <span className="text-lg font-bold text-[var(--text-primary)]">
                        Total: $60.47
                    </span>
                    <div className="flex gap-4">
                        <button className="bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] py-2 px-4 rounded-md hover:bg-[var(--hover-gray)]">
                            Seguir Explorando
                        </button>
                        <button className="bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] py-2 px-4 rounded-md hover:bg-[var(--hover-brown)]">
                            Proceder al Pago
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
