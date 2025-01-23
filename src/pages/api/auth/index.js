import prisma from "@/libs/prisma";
import { Token } from "@/services/token/tokenServices";
import { getConstants } from "@/utils/constans";
import { encrypt } from "@/utils/jwt";

const tokenCtrl = new Token();

// Manejador de solicitudes para la autenticación de usuarios
export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Método no permitido" });
        }

        const { email, password } = req.body;

        // Validación de los campos requeridos
        if (!email || !password) {
            return res.status(400).json({ message: "Faltan campos" });
        }

        // Verificación de existencia del correo en la base de datos
        const client = await prisma.clients.findUnique({
            where: {
                email: email,
            },
        });

        // Si no existe el correo, retornar error
        if (!client) {
            return res.status(400).json({ message: "El correo no existe" });
        }

        // Verificación de la contraseña
        if (client.password !== password) {
            return res
                .status(400)
                .json({ message: "La contraseña es incorrecta" });
        }

        // Preparar los datos para el JWT
        const payload = {
            email: client.email,
            id: client.id,
            name: client.name,
            lastName: client.lastName,
        };

        // Generar el JWT
        const jwt = await encrypt(payload);

        // Establecer la cookie con el JWT
        await tokenCtrl.setCookie(res, jwt);

        // Responder con éxito y el JWT generado
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            jwt: jwt,
        });
    } catch (error) {
        // Manejo de errores generales
        console.error("Error al manejar la solicitud:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
