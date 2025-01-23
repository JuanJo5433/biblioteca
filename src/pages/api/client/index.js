import prisma from "@/libs/prisma";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "GET":
                // Obtenemos el id del parametro
                const { id } = req.query;

                if(!id){
                    return res.status(400).json({message: "Falta el id del cliente"});
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
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
