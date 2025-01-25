

import Header from "@/components/Header/Header";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <HeroUIProvider>
                <CartProvider>
                    <Header/>
                    <Component {...pageProps} />{" "}
                </CartProvider>
            </HeroUIProvider>
        </AuthProvider>
    );
}
