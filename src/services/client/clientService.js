import { getConstants } from "@/utils/constans";
import { decrypt } from "@/utils/jwt";

// Desestructuramos las constantes necesarias
const { apiUrl, client } = getConstants();

// Función para obtener información de un cliente a partir de un token
export async function getClient(token) {
    // Validamos si se proporciona un token
    if (!token) {
        return; // Retorna vacío si no hay token
    }

    try {
        // Desciframos el token para obtener los datos del cliente
        const data = await decrypt(token);
        const { id } = data; // Extraemos el ID del cliente

        // Realizamos la solicitud GET al endpoint correspondiente
        const response = await fetch(`${apiUrl}/${client}?id=${id}`, {
            method: "GET",
        });

        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
            throw new Error("Error al obtener el cliente");
        }

        // Parseamos y retornamos los datos procesados
        const result = await response.json();

        return result;
    } catch (error) {
        // Manejo de errores con logging para depuración
        console.error("Error al obtener el cliente:", error.message);
        throw error; // Relanzamos el error para ser manejado por el consumidor
    }
}
