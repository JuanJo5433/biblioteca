import jwt from "jsonwebtoken";
import { getConstants } from "./constans";

// Desestructuramos secretKey para acceder a ella de forma más clara
const { secretKey } = getConstants();

if (!secretKey) {
    throw new Error("La clave secreta no está definida en las constantes");
}

// Función para generar el token (síncrona)
export const encrypt = (payload) => {
    try {
        console.log("Clave secreta utilizada para generar el token:", secretKey);

        // jwt.sign es síncrono, no necesitamos async/await
        const token = jwt.sign(payload, secretKey, {
            expiresIn: "1h", // El token expira en 1 hora
            algorithm: "HS256", // Algoritmo utilizado
        });

        console.log("Token generado correctamente:", token);
        return token;
    } catch (error) {
        console.error("Error al generar el token:", error.message);
        throw new Error("Error al generar el token");
    }
};

// Función para validar y decodificar el token
export const decrypt = (token) => {
    console.log("Token recibido para decodificar:", token);
    console.log("Clave secreta utilizada para verificar:", secretKey);

    try {
        if (!token) {
            throw new Error("No se proporcionó un token");
        }

        // Limpiar el token de posibles espacios
        token = token.trim();

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, secretKey, { algorithms: ["HS256"] });
        console.log("Token decodificado correctamente:", decoded);

        return decoded;
    } catch (error) {
        // Manejo específico de errores
        if (error.name === "TokenExpiredError") {
            console.error("El token ha expirado");
            throw new Error("El token ha expirado");
        } else if (error.name === "JsonWebTokenError") {
            console.error("El token es inválido");
            throw new Error("El token es inválido");
        } else {
            console.error("Error al verificar el token:", error.message);
            throw new Error("Error desconocido al verificar el token");
        }
    }
};

// const testToken = encrypt({ test: "data" });
// console.log("Token de prueba:", testToken);

// const verifiedToken = decrypt(testToken);
// console.log("Token de prueba decodificado:", verifiedToken);
