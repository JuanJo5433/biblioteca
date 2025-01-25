import { Token } from "@/services/token/tokenServices";

/**
 * Realiza una solicitud de red asegurando que el token de autenticación sea válido.
 * Si el token es inválido o ha expirado, redirige al usuario al login.
 *
 * @param {string} url - La URL a la que se realiza la solicitud.
 * @param {Object} params - Los parámetros adicionales de la solicitud (como método, body, etc.).
 * @returns {Promise<Response>} - Respuesta de la solicitud fetch.
 */
export async function authFetch(url, params) {
    const tokenCtrl = new Token();
    const token = tokenCtrl.getToken("token");

    // Función para hacer logout y redirigir al login
    const logout = () => {
        document.cookie = "token=; Max-Age=0; path=/;";
        window.location.replace("/"); // Redirige al login o página de inicio
    };

    // Verificamos si no hay token o si el token ha expirado
    if (!token || tokenCtrl.isTokenExpired(token)) {
        logout();
        return; // Si no hay token o ha expirado, no hacemos la solicitud
    }

    // Si el token es válido, procedemos a realizar la solicitud con Authorization
    const paramsTemp = {
        ...params,
        headers: {
            ...params?.headers,
            Authorization: `Bearer ${token}`, // Incluimos el token en los headers
        },
    };

    try {
        const response = await fetch(url, paramsTemp);

        // Verificamos si la respuesta no es OK 
        if (!response.ok) {
            logout(); // Si la respuesta no es válida, logout
            return;
        }

        return response; // Retornamos la respuesta si todo fue exitoso
    } catch (error) {
        // Manejo de errores, devolvemos el error
        console.error("Error en la solicitud:", error);
        throw error;
    }
}
