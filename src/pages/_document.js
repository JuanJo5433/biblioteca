import { Footer } from "@/components/Footer/Footer";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">

      <Head />
      <body className="antialiased bg-[var(--background-main)] min-h-screen flex flex-col">
        <Main />
        <NextScript />
      </body>
      <Footer/>
    </Html>
  );
}
