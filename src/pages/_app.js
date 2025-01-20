import { CartProvider } from "@/hooks/useCart";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";

export default function App({ Component, pageProps }) {
    return (
        <HeroUIProvider>
            <CartProvider>
                <Component {...pageProps} />{" "}
            </CartProvider>
        </HeroUIProvider>
    );
}
