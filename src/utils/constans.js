export function getConstants() {
    // Extraemos las variables de entorno individualmente
    const cart = process.env.NEXT_PUBLIC_CART;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const payuApiKey = process.env.NEXT_PUBLIC_API_KEY;
    const payuApiLogin = process.env.NEXT_PUBLIC_PAYU_API_LOGIN;
    const payuMerchantId = process.env.NEXT_PUBLIC_PAYU_MERCHANT_ID;
    const payuAccountId = process.env.NEXT_PUBLIC_PAYU_ACCOUNT_ID;
    const payuUrl = process.env.NEXT_PUBLIC_PAYU_URL;
    const ipifyApiUrl = process.env.NEXT_PUBLIC_IPIFY_API_URL;

    // Retornamos las constantes en un objeto
    return {
        cart,
        apiUrl,
        payuApiKey,
        payuApiLogin,
        payuMerchantId,
        payuAccountId,
        payuUrl,
        ipifyApiUrl,
    };
}
