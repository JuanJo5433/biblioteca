import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <HeroUIProvider>
                <CartProvider>
                    <Component {...pageProps} />{" "}
                </CartProvider>
            </HeroUIProvider>
        </AuthProvider>
    );
}
