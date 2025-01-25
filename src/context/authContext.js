import { getClient } from "@/services/client/clientService";
import { Token } from "@/services/token/tokenServices";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

const tokenCtrl = new Token();

// Crear el contexto de autenticación
export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const router = useRouter();
    // Estados para manejar el token y el usuario
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [validateSession, setValidateSession] = useState(false);
    const [loading, setLoading] = useState(true);

    // Obtener el token del localStorage o cookie y verificar su validez
    useEffect(() => {
        (async () => {
            const storedToken = tokenCtrl.getToken("token");

            if (!storedToken) {
                setLoading(false);
                logout();
                return;
            }

            const isTokenExpired = await tokenCtrl.isTokenExpired(storedToken);
            // Verificar si el token ha expirado usando la función que ya definimos
            if (isTokenExpired) {
                setToken(null); // El token ha expirado, lo eliminamos del estado
                return; // Si el token ha expirado, no hacer nada más
            } else {
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
            setValidateSession(true);
        } catch (error) {
            console.error("Error al realizar el login:", error);
            setLoading(false);
        }
    };

    // Función para realizar logout
    const logout = () => {
        document.cookie = "token=; Max-Age=0; path=/;";
        setToken(null); // Eliminar el token
        setUser(null); // Eliminar el usuario
        setValidateSession(false);
        router.push("/login");
    };

    // // Función para actualizar el usuario
    // const updateUser = (updatedUser) => {
    //     setUser(updatedUser); // Actualizar el estado del usuario
    // };

    // Datos que se pasan a través del contexto
    const data = {
        accessToken: token,
        validateSession,
        login,
        user,
        logout,
        updateUser: "",
    };
    if (loading) return null;

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
