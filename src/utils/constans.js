export function getConstants() {
    const cart = process.env.NEXT_PUBLIC_CART;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    return {
        apiUrl,
        cart,
    };
}
