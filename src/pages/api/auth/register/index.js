import prisma from "@/libs/prisma";
import { Token } from "@/services/token/tokenServices";
import argon2 from "argon2";

const tokenCtrl = new Token();

// Manejador de solicitudes para la autenticación de usuarios
export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Método no permitido" });
        }

        const {name, lastName, email, password } = req.body;
        const hashedString = await argon2.hash(password);

        // Validación de los campos requeridos
        if (!name || !lastName|| !email || !password) {
            return res.status(400).json({ message: "Faltan campos" });
        }

        const client = await prisma.clients.create({
            data: {
                name: name,
                lastName: lastName,
                email: email,
                password: hashedString,
            }
        })
        // Responder con éxito y el JWT generado
        res.status(200).json({
            message: "Registro exitoso",
            response: client,
        });
    } catch (error) {
        // Manejo de errores generales
        console.error("Error al manejar la solicitud:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
