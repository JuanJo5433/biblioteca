import { decrypt } from "@/utils/jwt";
import { NextResponse } from "next/server";


export async function middleware(req) {
    const token = req.cookies.get("token"); // Obtener el token de las cookies

    if (!token) {
        // Si no hay token, redirigir al login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // Verificar el token 
        const payload = decrypt(token)
       

        // Si el token es válido, permitir acceso
        console.log("Token válido:", payload);
        return NextResponse.next();
    } catch (error) {
        // Token inválido o expirado
        console.error("Token inválido:", error);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/account", "/dashboard/:path*"], // Rutas protegidas
};
