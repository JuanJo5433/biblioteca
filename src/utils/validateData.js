/**
 * Valida una contraseña y devuelve un objeto con el estado y un mensaje.
 * @param {string} password - Contraseña a validar.
 * @returns {object} - Objeto con el estado (`status`) y un mensaje (`message`).
 */
export function validatePasswordWithMessage(password) {
    if (password.length < 7) {
        return {
            message: "La contraseña debe tener al menos 7 caracteres.",
            status: false,
        };
    }
    if (!/[a-zA-Z]/.test(password)) {
        return {
            message: "La contraseña debe contener al menos una letra.",
            status: false,
        };
    }
    if (!/\d/.test(password)) {
        return {
            message: "La contraseña debe contener al menos un número.",
            status: false,
        };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            message: "La contraseña debe contener al menos un carácter especial.",
            status: false,
        };
    }

    // Si cumple con todos los requisitos
    return {
        message: "Contraseña válida.",
        status: true,
    };
}
