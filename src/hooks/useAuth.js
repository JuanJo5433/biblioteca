import { Token } from "@/services/token/tokenServices";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const tokenCtrl = new Token();

export function AuthProvider(props) {
    const { children } = props;
    const [token, setToken] = useState(null);
    console.log("🚀 ~ AuthProvider ~ token:", token)
    const [user, setUser] = useState(null);

    
    useEffect(() => {
        (async () => {
            const token = tokenCtrl.getToken("token");
            if (!token) {
                console.log("No hay token");
                return;
            }
            if (tokenCtrl.isTokenExpired(token)) {
                console.log(token)
                console.log("El token ha expirado.");
                return ;
            } else {
                console.log("El token es válido.");
                setToken(token);
            }
        })();
    }, []);

    const login = async (token, user) => {
        try {
            setToken(token);
            setUser(user);
        } catch (error) {
            console.error(error);
        }
    };

    const data = {
        accessToken: token,
        login,
        user,
        logout: "",
        updateUser: "",
    };
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
