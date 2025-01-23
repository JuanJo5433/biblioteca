import prisma from "@/libs/prisma";
import { Token } from "@/services/token/tokenServices";
import { encrypt } from "@/utils/jwt";

const tokenCtrl = new Token();

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "POST": {
                const { email, password } = req.body;

                if (!email || !password) {
                    return res.status(400).json({ message: "Faltan campos" });
                }

                const validateEmail = await prisma.clients.findMany({
                    where: {
                        email: email,
                    },
                });

                if (validateEmail.length === 0) {
                    return res
                        .status(400)
                        .json({ message: "El correo no existe" });
                }

                const validateLogin = await prisma.clients.findMany({
                    where: {
                        email: email,
                        password: password,
                    },
                });

                if (validateLogin.length === 0) {
                    return res
                        .status(400)
                        .json({ message: "La contraseña es incorrecta" });
                }

                const payload = {
                    email: validateLogin[0].email,
                    id: validateLogin[0].id,
                    name: validateLogin[0].name,
                    lastName: validateLogin[0].lastName,
                };
                const jwt = encrypt(payload);

                tokenCtrl.setCookie(res, jwt)
              
                res.status(200).json({
                    message: "Inicio de sesión exitoso",
                    data: validateLogin,
                    jwt: jwt,
                });
            }
        }
    } catch (error) {
        // Manejo de errores
        console.error("Error al manejar la solicitud:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
