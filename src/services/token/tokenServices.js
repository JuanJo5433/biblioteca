import { decrypt, encrypt } from "@/utils/jwt";

export class Token {
    // Función para establecer una cookie
    setCookie = async (res, jwt) => {
        res.setHeader(
            "Set-Cookie",
            `token=${jwt}; SameSite=Strict; Path=/; Max-Age=3600`
        );
    };
    
    // Función para obtener una cookie (corregida)
    getToken(name) {
        const value = document.cookie; // Access cookie directly (assuming server-side rendering)
        const parts = value.split(`${name}=`); // Split without extra space

        if (parts.length === 2) {
            const token = parts.pop().split(";").shift().trim(); // Remove leading/trailing spaces
            return token;
        }

        return null;
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