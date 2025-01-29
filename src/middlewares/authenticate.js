import { Token } from "@/services/token/tokenServices";
import { decrypt } from "@/utils/jwt";

const tokenCtrl = new Token()
// Middleware de autenticación reutilizable
export const authenticate = async (req) => {
  const token =  tokenCtrl.getTokenServer(req);
    
    if (!token) {
        throw new Error("No autenticado");
    }
    
    const decoded = await decrypt(token);
    
    if (!decoded?.id) {
        throw new Error("Token inválido");
    }
    
    return decoded;
};
