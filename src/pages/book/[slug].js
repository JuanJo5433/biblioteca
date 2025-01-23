"use client";

import { Star, ShoppingCart, BookOpen } from "lucide-react";
import { reviews } from "@/components/Books/Bookjson";
import { fetchBooksBySlug } from "@/services/books/bookServices";
import { Alert } from "@heroui/react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

// Componente para mostrar las estrellas de calificación
function StarRating({ rating }) {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-5 h-5 ${
                        i < Math.floor(rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : i < rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                    }`}
                />
            ))}
            <span className="ml-2 text-sm text-gray-600">
                ({rating.toFixed(1)})
            </span>
        </div>
    );
}

// Componente principal de detalle del libro
export default function BookDetail({ book }) {
    const { addCart } = useCart();
    const [alertIsOpen, setAlertIsOpen] = useState(false);

    const addBookWrapper = (idBook) => {
        addCart(idBook);
        alertCart();
    };

    const bookData = book[0]; // Accedemos al primer objeto del array
    if (!bookData) {
        return (
            <div className="text-center text-gray-700">
                Libro no encontrado.
            </div>
        );
    }

    const bookReviews = reviews.filter(
        (review) => review.bookId === bookData.id
    );
    const alertCart = () => {
        setAlertIsOpen(true);
        setTimeout(() => {
            setAlertIsOpen(false);
        }, 3000);
    };
    return (
        <div className="  w-screen max-w-full px-52 py-24 overflow-x-hidden">
            <div className="flex flex-col md:flex-row ">
                <div className="md:w-1/1 w-48 mr-10">
                    <img
                        src={bookData.cover}
                        alt={bookData.title}
                        className="w-max rounded-lg shadow-l "
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold text-espresso-brown mb-2">
                        {bookData.title}
                    </h1>
                    <h2 className="text-xl text-warm-gray mb-4">{}</h2>
                    <p className="mt-4 text-text-primary break-words">
                        {bookData.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-text-secondary">
                                Precio de alquiler
                            </p>
                            <p className="text-2xl font-bold text-library-green">
                                ${bookData.rentalPrice}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">
                                Precio de venta
                            </p>
                            <p className="text-2xl font-bold text-library-green">
                                ${bookData.purchasePrice}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <button className="flex-1 bg-espresso-brown text-button-primary-text p-2 rounded-lg hover:bg-hover-brown flex items-center justify-center">
                            <BookOpen className="mr-2 h-4 w-4" /> Alquilar
                        </button>
                        <button
                            onClick={() => addBookWrapper(bookData.id)}
                            className="flex-1 bg-soft-taupe text-espresso-brown p-2 rounded-lg hover:bg-rich-tan flex items-center justify-center"
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" /> Comprar
                        </button>
                    </div>
                </div>
                <div className="md:w-1/1 w-auto ml-16">
                    <h3 className="text-2xl font-bold text-espresso-brown mb-4">
                        Reseñas
                    </h3>
                    <div className="space-y-4">
                        {bookReviews.map((review, index) => (
                            <div
                                key={index}
                                className="p-6 border rounded-lg shadow-sm bg-white"
                            >
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={review.image}
                                        className="flex justify-center items-center w-10 h-10 rounded-full bg-library-green text-white"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-text-primary">
                                            {review.user}
                                        </p>
                                        <p className="text-text-secondary mt-1">
                                            {review.review}
                                        </p>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute right-4 top-20">
                {alertIsOpen && (
                    <Alert
                        color={"success"}
                        title={`El producto se agrego al carrito`}
                    />
                )}
            </div>
        </div>
    );
}

// Obtener datos del libro en el servidor
export async function getServerSideProps({ params }) {
    const { slug } = params;

    try {
        const data = await fetchBooksBySlug(slug);
        if (!data) {
            return {
                notFound: true,
            };
        }
        return {
            props: {
                book: data.data || null,
            },
        };
    } catch (error) {
        return {
            notFound: true, // En caso de error, se muestra una página de 404
        };
    }
}
