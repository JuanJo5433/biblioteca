import Link from "next/link";
import { motion } from "framer-motion";

export function BookCard({ books, category }) {
  return books
    .filter(
      (book) =>
        book.category === category || category === "Todos" || !category
    )
    .map((book) => (
      <motion.div
        key={book.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group relative h-[420px] w-full overflow-hidden rounded-xl bg-background-secondary shadow-elevation-1 transition-all hover:shadow-elevation-2"
      >
        {/* Fondo oscuro degradado + capa semitransparente */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
        
        {/* Imagen con fallback */}
        <img
          src={book.cover || book.image ||"/default-book-cover.jpg"}
          alt={book.title}
          fill
          className="object-cover w-full h-full object-center transition-transform duration-300 group-hover:scale-105"
          priority
        />

        {/* Contenido textual con mejor contraste */}
        <div className="absolute bottom-0 z-20 w-full p-6 space-y-3">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {book.title}
            </h3>
            <p className="text-sm font-medium text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {book.author.name}
            </p>
          </div>

          <Link
            href={`/book/${book.slug}`}
            className="inline-flex items-center justify-center w-full px-6 py-2.5 text-sm font-semibold text-white transition-all bg-primary rounded-lg hover:bg-primary-hover hover:scale-[1.02]"
          >
            Ver Detalles
          </Link>
        </div>
      </motion.div>
    ));
}