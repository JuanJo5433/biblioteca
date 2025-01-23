export function getUserAgent() {
    // Verifica si estamos en un entorno de navegador (con `window`)
    if (typeof window !== "undefined") {
        return window.navigator.userAgent;
    } else {
        // Devuelve un valor predeterminado o vacío si no estamos en un entorno del navegador
        return "UserAgent no disponible en este entorno";
    }
}
