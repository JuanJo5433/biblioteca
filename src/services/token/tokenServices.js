import { decrypt } from "@/utils/jwt";

export class Token {
    // Función para establecer una cookie
    setCookie(res,  jwt) {
        res.setHeader(
            "Set-Cookie",
            `token=${jwt};   SameSite=Strict; Path=/; Max-Age=3600`
        );
    }

    // Obtener el token de las cookies
    getToken(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(name);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null; // Si la cookie no existe
    }

    // Verificar si el token ha expirado
     isTokenExpired(token) {
     console.log("🚀 ~ Token ~ isTokenExpired ~ token:", token)

            if (!token) {
                console.error("No se proporcionó un token.");
                return true;
            }

            // Decodificar el token
            const decodedToken =  decrypt(token);
            console.log("🚀 ~ Token ~ isTokenExpired ~ decodedToken:", decodedToken)
            const currentTime = Date.now() / 1000; // Obtener el tiempo actual en segundos

            // Verificar si el token ha expirado
            if (decodedToken.exp < currentTime) {
                console.log("El token ha expirado.");
                return true;
            }

            console.log("El token es válido.");
            return false;
     
    }
}
