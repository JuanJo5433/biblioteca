import { Star } from "lucide-react";

// Componente para mostrar las estrellas de calificación
export function StarRating({ rating }) {
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