import prisma from "@/libs/prisma";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "GET":
                // Obteniendo todos los libros con relaciones

                const { id, slug } = req.query;

                if (id) {
                    const books = await prisma.books.findMany({
                        where: {
                            id: Number(id),
                        },
                        include: {
                            author: true,
                            category: true,
                        },
                    });

                    res.status(200).json({
                        message: "Obteniendo por id",
                        data: books,
                    });
                    break;
                }
                else if (slug) {
                    const books = await prisma.books.findMany({
                        where: {
                            slug: slug,
                        },
                        include: {
                            author: true,
                            category: true,
                        },
                    });

                    res.status(200).json({
                        message: "Obteniendo por slug",
                        data: books,
                    });
                    break;
                }else{
                    const books = await prisma.books.findMany({
                        include: {
                            author: true,
                            category: true,
                        },
                    });
    
                    res.status(200).json({
                        message: "Obteniendo todos los libros",
                        data: books,
                    });
                    break;
                }
               

            default:
                // Respuesta para métodos no permitidos
                res.status(405).json({ message: "Método no permitido" });
                break;
        }
    } catch (error) {
        // Manejo de errores
        console.error("Error al manejar la solicitud:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
