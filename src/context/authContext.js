import { AuthContext } from "@/hooks/useAuth";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);