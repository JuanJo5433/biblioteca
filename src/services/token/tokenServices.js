import { decrypt } from "@/utils/jwt";

export class Token {
    // Función para establecer una cookie
    setCookie = async (res, jwt) => {
        res.setHeader(
            "Set-Cookie",
            `token=${jwt}; SameSite=Strict; Path=/; Max-Age=3600`
        );
    };
    
    // Función para obtener una cookie (corregida)
     // Obtener token del lado servidor
     getTokenServer(req) {
        return req.cookies.token || null;
    }

    // Obtener token del lado cliente
    getTokenClient(name) {
        if (typeof window === 'undefined') return null;
        const value = document.cookie;
        const parts = value.split(`${name}=`);
        
        return parts.length === 2 
            ? parts.pop().split(";").shift().trim()
            : null;
    }

    async isTokenExpired(token) {
        try {
            const decodedToken = await decrypt(token); // Use async/await for decoding
            const expirationTime = decodedToken.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            return currentTime >= expirationTime;
        } catch (error) {
            console.error('Error al verificar la expiración del token:', error);
            return true; // Consider returning true on error
        }
    }
}