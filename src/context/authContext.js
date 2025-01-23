import { getClient } from "@/services/client/clientService";
import { Token } from "@/services/token/tokenServices";
import { createContext, useEffect, useState } from "react";

const tokenCtrl = new Token();

// Crear el contexto de autenticación
export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    // Estados para manejar el token y el usuario
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // Obtener el token del localStorage o cookie y verificar su validez
    useEffect(() => {
        (async () => {
            const storedToken = tokenCtrl.getToken("token");

            if (!storedToken) {
                console.log("No hay token.");
                setLoading(false);
                return;
            }

            const isTokenExpired = await tokenCtrl.isTokenExpired(storedToken);
            // Verificar si el token ha expirado usando la función que ya definimos
            if (isTokenExpired) {
                console.log("El token ha expirado.");
                setToken(null); // El token ha expirado, lo eliminamos del estado
                return; // Si el token ha expirado, no hacer nada más
            } else {
                console.log("El token es válido.");
                login(storedToken);
            }
        })();
    }, []);

    // Función para realizar login
    const login = async (token) => {
        try {
            setToken(token); // Establecer el token
            const userData = await getClient(token);
            setUser(userData.data); // Establecer el usuario
            setLoading(false);

        } catch (error) {
            console.error("Error al realizar el login:", error);
            setLoading(false);

        }
    };

    // Función para realizar logout
    const logout = () => {
        setToken(null); // Eliminar el token
        setUser(null); // Eliminar el usuario
        tokenCtrl.setCookie("token", "", 0); // Eliminar la cookie del token
    };

    // // Función para actualizar el usuario
    // const updateUser = (updatedUser) => {
    //     setUser(updatedUser); // Actualizar el estado del usuario
    // };

    // Datos que se pasan a través del contexto
    const data = {
        accessToken: token,
        login,
        user,
        logout,
        updateUser: "",
    };
    if (loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
