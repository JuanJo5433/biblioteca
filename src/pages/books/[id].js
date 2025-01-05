"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, ShoppingCart, BookOpen } from "lucide-react";

const bookDetails = [
    {
        id: 1,
        title: "El Principito",
        author: "Antoine de Saint-Exupéry",
        cover: "https://www.laesferaazul.com/wp-content/uploads/2022/09/Descubrir-el-Principito-scaled.jpg",
        rentalPrice: "$5",
        salePrice: "$20",
        description:
            "Una historia sobre un pequeño príncipe que viaja por el universo...",
        rating: 4.5,
        reviews: [
            {
                user: "Carlos",
                comment: "Un libro maravilloso, muy conmovedor.",
            },
            { user: "Ana", comment: "Una obra maestra que todos deben leer." },
        ],
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrq2RIC2cWWHMnrvruHzvyMepMNCGRau8PA&s",
        rentalPrice: "$6",
        salePrice: "$22",
        description:
            "Una novela distópica que presenta un futuro totalitario. Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.Una novela distópica que presenta un futuro totalitario.",
        rating: 4.7,
        reviews: [
            { user: "Pedro", comment: "Muy impactante, te hace reflexionar." },
            { user: "Laura", comment: "Un clásico de la literatura." },
        ],
    },
];

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

export default function BookDetail() {
    const params = useParams();
    const id = parseInt(params.id);
    const book = bookDetails.find((b) => b.id === id);

    if (!book) {
        return (
            <div className="text-center text-gray-700">
                Libro no encontrado.
            </div>
        );
    }

    return (
        <div className="w-screen max-w-full px-52 py-8 overflow-x-hidden">
            <div className="flex flex-col md:flex-row ">
                <div className="md:w-1/1 w-48 mr-10">
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="w-max  rounded-lg shadow-l "
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold text-espresso-brown mb-2">
                        {book.title}
                    </h1>
                    <h2 className="text-xl text-warm-gray mb-4">
                        {book.author}
                    </h2>
                    <StarRating rating={book.rating} />
                    <p className="mt-4 text-text-primary break-words">
                        {book.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-text-secondary">
                                Precio de alquiler
                            </p>
                            <p className="text-2xl font-bold text-library-green">
                                {book.rentalPrice}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">
                                Precio de venta
                            </p>
                            <p className="text-2xl font-bold text-library-green">
                                {book.salePrice}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <button className="flex-1 bg-espresso-brown text-button-primary-text p-2 rounded-lg hover:bg-hover-brown flex items-center justify-center">
                            <BookOpen className="mr-2 h-4 w-4" /> Alquilar
                        </button>
                        <button className="flex-1 bg-soft-taupe text-espresso-brown p-2 rounded-lg hover:bg-rich-tan flex items-center justify-center">
                            <ShoppingCart className="mr-2 h-4 w-4" /> Comprar
                        </button>
                    </div>
                </div>
                <div className="md:w-1/1 w-auto ml-16">
                    <h3 className="text-2xl font-bold text-espresso-brown mb-4">
                        Reseñas
                    </h3>
                    <div className="space-y-4">
                        {book.reviews.map((review, index) => (
                            <div
                                key={index}
                                className="p-6 border rounded-lg shadow-sm bg-white"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex justify-center items-center w-10 h-10 rounded-full bg-library-green text-white">
                                        {review.user[0]}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-text-primary">
                                            {review.user}
                                        </p>
                                        <p className="text-text-secondary mt-1">
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
