import { useCart } from "@/hooks/useCart";
import { fetchBooksById } from "@/services/books/bookServices";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export function Resume() {
    const { cart, total, setTotal, deleteItem, changeQuantityItems } =
        useCart();
    const [books, setBooks] = useState([]);

    // useEffect para obtener los detalles de los libros en el carrito
    useEffect(() => {
        if (cart?.length > 0) {
            // Función asincrónica para obtener los libros del carrito
            const fetchCartBooks = async () => {
                try {
                    // Usamos Promise.all para hacer peticiones de los libros en paralelo
                    const fetchedBooks = await Promise.all(
                        cart.map(async (item) => {
                            try {
                                // Obtenemos el libro por su ID
                                const book = await fetchBooksById(item.id);
                                // Actualizamos el total del carrito según el precio del libro y la cantidad
                                setTotal(
                                    (prev) =>
                                        prev +
                                        book.purchasePrice * item.quantity
                                );
                                return { ...book, quantity: item.quantity };
                            } catch (error) {
                                console.error(
                                    `Error fetching book with ID ${item.id}:`,
                                    error
                                );
                                return null; // Si hay error al obtener el libro, retornamos null
                            }
                        })
                    );
                    // Filtramos los resultados para eliminar los libros que no se pudieron obtener
                    setBooks(fetchedBooks.filter((book) => book !== null));
                } catch (error) {
                    console.error("Error fetching books:", error);
                }
            };
            fetchCartBooks();
        }
    }, [cart, setTotal]);

    // Función para manejar la selección de cantidad de productos
    const cantSelect = (idItem, value) => {
        Number(value);
        const options = [
            value - 2,
            value - 1,
            value,
            value + 1,
            value + 2,
            value + 3,
            value + 4,
        ];

        // Manejador de cambios de cantidad
        const handleChange = (event) =>
            changeQuantityItems(idItem, Number(event.target.value));

        return (
            <select value={value} onChange={handleChange}>
                {options
                    .filter((option) => option > 0) // Filtramos las opciones para evitar valores negativos
                    .map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
            </select>
        );
    };

    // Si no hay productos en el carrito, mostramos un mensaje
    if (!cart || cart.length === 0) {
        return (
            <p className="text-center bg-[var(--background-main)] p-6">
                NO TIENE PRODUCTOS EN EL CARRITO
            </p>
        );
    }

    return (
        <div className=" p-6">
            <div className="my-20 max-w-4xl mx-auto bg-[var(--background-secondary)] rounded-lg shadow-lg">
                {/* Encabezado del carrito */}
                <header className="text-center py-4">
                    <h1 className="text-2xl font-bold text-[var(--espresso-brown)]">
                        Tu Carrito
                    </h1>
                </header>

                {/* Resumen del pedido */}
                <div className="bg-[var(--soft-taupe)] p-4 rounded-md">
                    <h2 className="font-semibold text-lg text-[var(--text-primary)]">
                        Resumen del Pedido
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                        {cart.length === 1
                            ? "Tienes 1 libro en tu carrito"
                            : `Tienes ${cart.length} libros en tu carrito`}
                    </p>
                </div>

                {/* Tabla con los detalles del carrito */}
                <table className="w-full mt-4 border-collapse">
                    <thead>
                        <tr className="text-left border-b border-[var(--border-light)]">
                            {[
                                "Portada",
                                "Título",
                                "Autor",
                                "Precio",
                                "Cantidad",
                                "Subtotal",
                                "",
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="py-2 px-4 text-[var(--text-secondary)]"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr
                                key={book.id}
                                className="border-b border-[var(--border-light)]"
                            >
                                <td className="py-2 px-4">
                                    <img
                                        src={book.cover}
                                        alt={book.title}
                                        className="w-16 h-20 flex items-center justify-center rounded-lg border border-[var(--border-dark)]"
                                    />
                                </td>
                                <td className="py-2 px-4 text-[var(--text-primary)]">
                                    {book.title}
                                </td>
                                <td className="py-2 px-4 text-[var(--text-primary)]">
                                    {book.author?.name}
                                </td>
                                <td className="py-2 px-4 text-[var(--text-primary)]">
                                    ${book.purchasePrice}
                                </td>
                                {/* Muestra  el selector para cambiar la cantidad */}
                                <td className="py-2 px-4 text-[var(--text-primary)]">
                                    {cantSelect(book.id, book.quantity)}
                                </td>
                                <td className="py-2 px-4 text-[var(--text-primary)]">
                                    ${book.purchasePrice * book.quantity}
                                </td>
                                <td className="py-2 px-4 text-[var(--text-primary)]">
                                    {/* Botón para eliminar el producto del carrito */}
                                    <button
                                        type="button"
                                        onClick={() => deleteItem(book.id)}
                                    >
                                        <FaRegTrashAlt
                                            className="text-[var(--text-primary)] cursor-pointer"
                                            title="Eliminar del carrito"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Total y botones para continuar explorando o proceder al pago */}
                <div className="p-4 bg-[var(--soft-taupe)] flex justify-between items-center">
                    <span className="text-lg font-bold text-[var(--text-primary)]">
                        Total: ${total}
                    </span>
                    <div className="flex gap-4">
                        <a
                            href="/catalog"
                            className="bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] py-2 px-4 rounded-md hover:bg-[var(--hover-gray)]"
                        >
                            Seguir Explorando
                        </a>
                        <a
                            href="?step=2"
                            className="bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] py-2 px-4 rounded-md hover:bg-[var(--hover-brown)]"
                        >
                            Proceder al Pago
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
