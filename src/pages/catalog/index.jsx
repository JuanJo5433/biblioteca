import { BookCard } from "@/components/Books/BookCard";
import { books } from "@/components/Books/Bookjson";
import { BookList } from "@/components/Books/BookList";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const CatalogPage = () => {
    // Estado para el tab seleccionado
    const [activeTab, setActiveTab] = useState("Todos");

    // Función para manejar el cambio de tab
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="p-4">
            <h1 className="text-center text-2xl font-semibold mb-6">
                Catálogo de libros
            </h1>

            {/* BUSCADOR */}
            <div className="flex justify-center w-full mt-4 mb-6">
                <div className="flex flex-row relative w-full max-w-4xl">
                    <CiSearch className="absolute ml-5 top-4 text-gray-400" />
                    <input
                        className="outline-none py-3 pr-0 pl-12 w-full border border-gray-300 rounded-md focus:outline-gray-100"
                        type="text"
                        placeholder="Buscar libro"
                    />
                    <button className="absolute top-px right-0 px-4 py-3 bg-button-primary-bg text-button-primary-text rounded-l-sm rounded-md hover:bg-hover-brown">
                        Buscar
                    </button>
                </div>
            </div>

            {/* TABS */}
            <div className="flex justify-center mx-auto max-w-4xl bg-gray-100 rounded-md shadow-md">
                <ul className="flex flex-row justify-around w-full text-sm text-gray-600">
                    {[
                        "Todos",
                        "Ficción",
                        "No Ficción",
                        "Ciencia",
                        "Historia",
                        "Biografías",
                    ].map((tab) => (
                        <li
                            key={tab}
                            className={`px-4 py-2 cursor-pointer ${
                                activeTab === tab ||
                                (!activeTab && tab === "Todos")
                                    ? "border-b-2 border-rich-tan text-rich-tan font-medium"
                                    : "hover:text-rich-tan"
                            }`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>

            {/* CONTENIDO DINÁMICO */}
            <div className="mt-6 text-center">
                <BookList books={books} category={activeTab} />
            </div>
        </div>
    );
};

export default CatalogPage;
