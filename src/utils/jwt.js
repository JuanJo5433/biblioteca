import { SignJWT, jwtVerify } from "jose";
import { getConstants } from "./constans";

// Desestructuramos la clave secreta desde las constantes
const { secretKey } = getConstants();

// Validación inicial para asegurarnos de que la clave secreta esté definida
if (!secretKey) {
    throw new Error("La clave secreta no está definida en las constantes");
}

/**
 * Función para generar un token JWT
 * @param {Object} payload - Datos a incluir en el token
 * @returns {Promise<string>} - Token generado
 */
export const encrypt = async (payload) => {
    try {
        console.log("Clave secreta utilizada para generar el token:", secretKey);

        // Convertimos la clave secreta en un formato adecuado usando TextEncoder
        const encoder = new TextEncoder();

        // Creamos y firmamos el token usando la librería jose
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" }) // Usamos HS256 como algoritmo de firma
            .sign(encoder.encode(secretKey)); // Firmamos el token con la clave secreta

        console.log("Token generado correctamente:", token);
        return token;
    } catch (error) {
        console.error("Error al generar el token:", error.message);
        throw new Error("Error al generar el token");
    }
};

/**
 * Función para decodificar y verificar un token JWT
 * @param {string} token - Token a decodificar
 * @returns {Promise<Object|null>} - Payload decodificado o `null` si no hay token
 */
export const decrypt = async (token) => {
    try {
        // Validamos si el token fue proporcionado
        if (!token) {
            console.warn("No se proporcionó un token para decodificar");
            return null;
        }

        console.log("Token a decodificar:", token);

        // Convertimos la clave secreta en un formato adecuado usando TextEncoder
        const encoder = new TextEncoder();

        // Verificamos y decodificamos el token
        const decoded = await jwtVerify(token, encoder.encode(secretKey));

        console.log("Token decodificado correctamente:", decoded.payload);
        return decoded.payload; // Retornamos solo el payload del token
    } catch (error) {
        console.error("Error al verificar el token:", error.message);
        throw new Error("Token inválido o expirado");
    }
};

