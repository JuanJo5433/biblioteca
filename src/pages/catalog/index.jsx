import { BookCard } from "@/components/Books/BookCard";
import { books } from "@/components/Books/Bookjson";
import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const CatalogPage = () => {
    const [activeTab, setActiveTab] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");
    
    const categories = [
        "Todos",
        "Ficción",
        "No Ficción",
        "Ciencia", 
        "Historia",
        "Biografías"
    ];

    const filteredBooks = books.filter(book => {
        const matchesCategory = activeTab === "Todos" || book.category === activeTab;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background-main p-4 md:p-8">
            {/* Encabezado */}
            <div className="max-w-7xl mx-auto text-center mb-8">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-text-primary mb-4"
                >
                    Explora Nuestro Catálogo
                </motion.h1>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    Descubre más de 10,000 títulos disponibles en nuestra colección
                </p>
            </div>

            {/* Barra de búsqueda */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="relative">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar libros o autores..."
                        className="w-full pl-12 pr-12 py-4 rounded-full border border-border-light focus:ring-2 focus:ring-primary focus:outline-none bg-background-main"
                    />
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-xl" />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
                        >
                            <FiX className="text-xl" />
                        </button>
                    )}
                </div>
            </div>

            {/* Filtros */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`px-4 py-2 rounded-full transition-colors ${
                                activeTab === category
                                    ? "bg-primary text-white"
                                    : "bg-background-secondary text-text-secondary hover:bg-background-dark"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resultados */}
            <motion.div 
                layout
                className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
                {filteredBooks.map((book) => (
                    <BookCard 
                        key={book.id} 
                        books={[book]} 
                        category={activeTab} 
                    />
                ))}
            </motion.div>

            {/* Sin resultados */}
            {filteredBooks.length === 0 && (
                <div className="max-w-2xl mx-auto text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                        No encontramos resultados
                    </h3>
                    <p className="text-text-secondary">
                        Intenta con otros términos de búsqueda o selecciona otra categoría
                    </p>
                </div>
            )}
        </div>
    );
};

export default CatalogPage;