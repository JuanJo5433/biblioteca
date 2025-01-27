import { getConstants } from "@/utils/constans";

// Desestructuramos apiUrl de los constantes obtenidos
const { apiUrl } = getConstants();
export class AuthServices {
    // Método para autenticar a un usuario
    async authLogin(email, password) {
        // Obtenemos la función de login desde el contexto de autenticación
        try {
            // Realizamos la solicitud POST al endpoint de autenticación
            const response = await fetch(`${apiUrl}/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), // Enviamos email y contraseña
            });

            // Verificamos si la respuesta es exitosa (código 200)
            if (response.status === 200) {
                return response.json(); // Devolvemos la respuesta en caso de éxito
            } else {
                // Si la respuesta no es exitosa, lanzamos un error con el mensaje recibido
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            // Si ocurre un error, lo lanzamos para ser manejado por el consumidor del servicio
            throw new Error(error.message);
        }
    }

    async authRegister(data) {
        try {
            const { name, lastName, email, password } = data;

            const response = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, lastName, email, password }), // Enviamos email y contraseña
            });
    
             // Verificamos si la respuesta es exitosa (código 200)
             if (response.status === 200) {
                return response.json(); // Devolvemos la respuesta en caso de éxito
             } else {
                // Si la respuesta no es exitosa, lanzamos un error con el mensaje recibido
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.error(error)
        }
        
    }
}
