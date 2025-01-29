import prisma from "@/libs/prisma";
import { authenticate } from "@/middlewares/authenticate";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "GET":
                // Obtenemos el id del parametro
                const { id } = req.query;

                if (!id) {
                    return res
                        .status(400)
                        .json({ message: "Falta el id del cliente" });
                }
                // Obtenemos el cliente con el id
                const client = await prisma.clients.findUnique({
                    where: {
                        id: parseInt(id),
                    },
                });

                if (!client) {
                    return res
                        .status(404)
                        .json({ message: "EL cliente no existe" });
                }

                res.status(200).json({
                    message: "Cliente obtenido correctamente",
                    data: client,
                });
                break;
            case "PUT":
                // Obtenemos el id del parámetro y los datos del body
                const decoded = await authenticate(req)
              
                if (!decoded.id) {
                    return res
                        .status(400)
                        .json({ message: "Falta el id del cliente" });
                }
                const updateData = req.body;
                // Verificamos si el cliente existe
                const existingClient = await prisma.clients.findUnique({
                    where: { id: parseInt(decoded.id) },
                });

                if (!existingClient) {
                    return res
                        .status(404)
                        .json({ message: "Cliente no encontrado" });
                }

                // Actualizamos el cliente
                const updatedClient = await prisma.clients.update({
                    where: { id: parseInt(decoded.id) },
                    data: updateData,
                });

                res.status(200).json({
                    message: "Cliente actualizado correctamente",
                    data: updatedClient,
                });
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
