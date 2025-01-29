"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaUser } from "react-icons/fa";
import { Alert, Button } from "@heroui/react";
import { fetchBooksBySlug } from "@/services/books/bookServices";
import { useCart } from "@/hooks/useCart";
import { StarRating } from "@/components/Common/StarRating";

const BookDetail = ({ book }) => {
  const { addCart } = useCart();
  const [bookData, setBookData] = useState(book?.[0] || null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(!book);

  useEffect(() => {
    if (!book) {
      const fetchBookData = async () => {
        try {
          const slug = window.location.pathname.split("/").pop();
          const response = await fetchBooksBySlug(slug);
          setBookData(response.data?.[0]);
        } catch (error) {
          console.error("Error fetching book:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBookData();
    }
  }, [book]);

  const handleAddToCart = () => {
    addCart(bookData.id);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-background-secondary rounded w-1/4 mx-auto" />
          <div className="grid lg:grid-colImages-[1fr_2fr] gap-8">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-background-secondary rounded-xl" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-background-secondary rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-12 bg-background-secondary rounded w-3/4" />
              <div className="h-4 bg-background-secondary rounded w-full" />
              <div className="h-4 bg-background-secondary rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Libro no encontrado</h1>
        <Link href="/catalog" className="text-primary hover:text-primary-hover">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-background-main py-12"
    >
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-text-secondary">
          <Link href="/" className="hover:text-primary">
            Inicio
          </Link>
          {' > '}
          <Link href="/catalog" className="hover:text-primary">
            Catálogo
          </Link>
          {' > '}
          <span className="text-primary">{bookData.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-elevation-2">
              <img
                src={bookData.cover}
                alt={bookData.title}
                fill
                className="object-cover w-full h-full"
                priority
               
              />
            </div>
            
            {/* <div className="grid grid-cols-4 gap-2">
              {[bookData.cover, ...(bookData.additionalImages || [])].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === i ? "border-primary" : "border-border-light"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Vista ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          {/* Detalles del libro */}
          <div className="space-y-6">
            <div className="border-b border-border-light pb-6">
              <h1 className="text-4xl font-bold text-text-primary">
                {bookData.title}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <StarRating rating={bookData.rating || 4.5} />
                <span className="text-sm text-text-secondary">
                  ({bookData.reviews?.length || 0} reseñas)
                </span>
              </div>
            </div>

            {/* Especificaciones */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg bg-background-secondary p-4">
                <span className="text-sm text-text-secondary">Autor</span>
                <span className="font-medium text-text-primary">{bookData.author?.name}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-background-secondary p-4">
                <span className="text-sm text-text-secondary">Editorial</span>
                <span className="font-medium text-text-primary">{bookData.editorial}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-background-secondary p-4">
                <span className="text-sm text-text-secondary">Año</span>
                <span className="font-medium text-text-primary">{bookData.yearPublication}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-background-secondary p-4">
                <span className="text-sm text-text-secondary">ISBN</span>
                <span className="font-medium text-text-primary">{bookData.ISBN}</span>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Descripción</h3>
              <p className="text-text-secondary leading-relaxed">
                {bookData.description}
              </p>
            </div>

            {/* Precios y acciones */}
            <div className="rounded-xl bg-background-secondary p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">
                    ${bookData.purchasePrice}
                  </div>
                  <div className="text-sm text-text-secondary">
                    Precio de venta
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    startContent={<FaShoppingCart className="text-lg" />}
                    className="bg-primary text-white hover:bg-primary-hover"
                  >
                    Añadir al carrito
                  </Button>
                  <Button
                    startContent={<FaHeart className="text-lg" />}
                    variant="bordered"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    Favoritos
                  </Button>
                </div>
              </div>
            </div>

            {/* Reseñas */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Reseñas destacadas</h3>
              {bookData.reviews?.map((review, i) => (
                <div key={i} className="rounded-lg border border-border-light p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaUser className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                  </div>
                  <p className="mt-3 text-text-secondary">{review.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alertas */}
        {alertVisible && (
          <div className="fixed bottom-4 right-4 z-50">
            <Alert color="success" title="Libro añadido al carrito" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;
    const response = await fetchBooksBySlug(slug);
    
    if (!response.data || response.data.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        book: response.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default BookDetail;