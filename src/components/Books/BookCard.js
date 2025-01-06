import React, { useState } from "react";
import Link from "next/link";

export function BookCard(props) {
    const { books, category } = props;

    return books
    
        .filter((book) => book.category === category || category === "Todos" || !category)
        .map((book) => (
            <div
                key={book.id}
                className="relative bg-soft-taupe shadow-lg rounded-lg overflow-hidden group perspective hover:scale-105 transition-transform duration-300"
                style={{ height: "350px", width: "240px" }} // Ajustando para mejorar la proporción
            >
                {/* Lomo del libro */}
                <div className="absolute top-0 left-0 h-full w-6 bg-rich-tan group-hover:bg-hover-brown transition-all"></div>

                {/* Portada del libro */}
                <div className="relative z-10 p-4 ml-5 text-center h-full flex flex-col">
                    <img
                        src={
                            book.image ||
                            "https://images.cdn1.buscalibre.com/fit-in/360x360/07/b1/07b1ebdde976fdf929f75769f19efb42.jpg"
                        }
                        alt={book.title}
                        className="h-3/5 object-container w-full rounded-t-lg line-clamp-1  "
                    />
                    <h3 className="text-lg font-bold mt-4 text-espresso-brown">
                        {book.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                        {book.author}
                    </p>
                    <Link href={`/books/${book.id}`}>
                        <button className="mt-4 bg-library-green text-white py-2 px-4 rounded-md hover:bg-hover-green transition-colors duration-200">
                            Ver más
                        </button>
                    </Link>
                </div>

                {/* Efecto tridimensional */}
                <div className="absolute inset-0 bg-library-green rotate-y-90 group-hover:rotate-y-0 transition-transform duration-500"></div>
            </div>
        ));
}
