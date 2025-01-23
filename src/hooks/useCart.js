import { CartContext } from "@/context/cartContext";
import { useContext } from "react";

export const useCart = () => useContext(CartContext);
