import { Footer } from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">

      <Head />
      <Header/>
      <body className="antialiased bg-background min-h-screen flex flex-col">
        <Main />
        <NextScript />
      </body>
      <Footer/>
    </Html>
  );
}
