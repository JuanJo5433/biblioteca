import { useCart } from "@/hooks/useCart";
import { fetchBooksById } from "@/services/books/bookServices";
import { useEffect, useState } from "react";
import { FaRegTrashAlt, FaArrowRight, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

export function Resume() {
    const { cart, total, deleteItem, changeQuantityItems,setTotal } = useCart();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartBooks = async () => {
            try {
                const fetchedBooks = await Promise.all(
                    cart.map(async (item) => {
                        const book = await fetchBooksById(item.id);
                        setTotal((prev) => prev + book.purchasePrice * item.quantity);
                        return { ...book, quantity: item.quantity };
                    })
                );
                setBooks(fetchedBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        
        if (cart?.length > 0) fetchCartBooks();
    }, [cart]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity > 0) changeQuantityItems(id, newQuantity);
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 animate-pulse space-y-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-background-secondary rounded-xl" />
                ))}
            </div>
        );
    }

    if (!cart || cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-12 text-center">
                <div className="inline-block p-6 bg-background-secondary rounded-2xl">
                    <FaBookOpen className="mx-auto text-4xl text-text-secondary mb-4" />
                    <h2 className="text-xl font-semibold text-text-primary">
                        Tu carrito está vacío
                    </h2>
                    <p className="text-text-secondary mt-2">
                        Explora nuestro catálogo para encontrar libros increíbles
                    </p>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto p-6"
        >
            <div className="space-y-8">
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-text-primary">Tu Carrito</h1>
                    <p className="text-text-secondary">
                        {cart.length} {cart.length > 1 ? "artículos" : "artículo"} en tu carrito
                    </p>
                </header>

                <div className="space-y-6">
                    {books.map((book) => (
                        <div 
                            key={book.id}
                            className="flex gap-4 p-4 bg-background-secondary rounded-xl"
                        >
                            <div className="relative w-24 h-32 flex-shrink-0">
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            
                            <div className="flex-1 space-y-2">
                                <h3 className="font-semibold text-text-primary">{book.title}</h3>
                                <p className="text-sm text-text-secondary">{book.author?.name}</p>
                                
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-border-light rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(book.id, book.quantity - 1)}
                                            className="px-3 py-1 hover:bg-background-main"
                                        >
                                            -
                                        </button>
                                        <span className="px-3">{book.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(book.id, book.quantity + 1)}
                                            className="px-3 py-1 hover:bg-background-main"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <button
                                        onClick={() => deleteItem(book.id)}
                                        className="text-error hover:text-error-dark flex items-center gap-2"
                                    >
                                        <FaRegTrashAlt />
                                        <span className="text-sm">Eliminar</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="text-right space-y-2">
                                <p className="text-lg font-semibold text-text-primary">
                                    ${(book.purchasePrice * book.quantity).toFixed(2)}
                                </p>
                                <p className="text-sm text-text-secondary">
                                    ${book.purchasePrice} c/u
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sticky bottom-0 bg-background-main pt-6 border-t border-border-light">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-text-primary">Total:</h3>
                        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href="/catalog"
                            className="flex items-center justify-center gap-2 p-3 border border-primary text-primary rounded-lg hover:bg-primary/10"
                        >
                            Seguir Comprando
                        </a>
                        <a
                            href="?step=2"
                            className="flex items-center justify-center gap-2 p-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                            Continuar al Pago
                            <FaArrowRight />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}