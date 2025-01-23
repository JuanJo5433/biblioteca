import { getIpPublicClient } from "@/services/ipify/getIpPublicClient";
import { getUserAgent } from "@/services/userAgent/getUserAgent";
import { getConstants } from "@/utils/constans";
import { hashMd5 } from "@/utils/hashMd5";
import { uuid } from "uuidv4";

// Función principal que maneja la solicitud POST para realizar una transacción
export default async function POST(req) {
    // Generación de un código de referencia único para la transacción
    const referenceCode = uuid();
    // Obtener la IP del cliente y el User Agent del navegador
    const ipClient = getIpPublicClient();
    const userAgent = getUserAgent();

    // Obtener las constantes necesarias para la transacción desde la configuración
    const { payuApiKey, payuApiLogin, payuMerchantId, payuAccountId } = getConstants();

    // Obtener los datos de la solicitud POST
    const { tx_value, paymentMethod, client, shippingAddress, cardValues } = await req.json();

    // Función que genera la firma MD5 necesaria para la transacción
    const hashSignature = () => {
        const stringToHash =
            payuApiKey +
            "~" +
            payuMerchantId +
            "~" +
            referenceCode +
            "~" +
            tx_value +
            "~" +
            "COP";
        return hashMd5(stringToHash); // Se retorna el hash generado
    };

    // Payload que se enviará a la API de PayU
    const payload = {
        language: "es", // Lenguaje de la transacción
        command: "SUBMIT_TRANSACTION", // Comando para enviar la transacción
        merchant: {
            apiKey: payuApiKey, // API Key de PayU
            apiLogin: payuApiLogin, // API Login de PayU
        },
        transaction: {
            order: {
                accountId: payuAccountId, // ID de la cuenta de PayU para la transacción
                referenceCode: referenceCode, // Código de referencia único para la transacción
                description: "Payment test description", // Descripción del producto/servicio
                language: "es", // Lenguaje
                signature: hashSignature(), // Firma generada
                notifyUrl: "", // URL para recibir notificaciones
                additionalValues: {
                    TX_VALUE: {
                        value: tx_value, // Valor de la transacción
                        currency: "COP", // Moneda en la que se realiza la transacción
                    },
                    TX_TAX: {
                        currency: "COP", // Moneda de los impuestos
                    },
                },
                buyer: {
                    merchantBuyerId: client.id, // ID único del comprador
                    fullName: client.fullName, // Nombre completo del comprador
                    emailAddress: client.email, // Correo electrónico del comprador
                    contactPhone: client.phone, // Teléfono del comprador
                    dniNumber: client.codeDocument, // Documento de identidad del comprador
                    shippingAddress: {
                        street1: shippingAddress.street1, // Dirección de envío
                        street2: "", // Dirección adicional (vacío si no aplica)
                        city: shippingAddress.city, // Ciudad de envío
                        state: shippingAddress.state, // Estado de envío
                        country: "CO", // País de envío (Colombia)
                        postalCode: shippingAddress.postalCode, // Código postal de envío
                        phone: shippingAddress.phone, // Teléfono de contacto para envío
                    },
                },
            },
            payer: {
                merchantPayerId: client.id, // ID único del pagador
                fullName: client.fullName, // Nombre completo del pagador
                emailAddress: client.email, // Correo electrónico del pagador
                contactPhone: shippingAddress.phone, // Teléfono de contacto para facturación
                dniNumber: client.codeDocument, // Documento de identidad del pagador
                billingAddress: {
                    street1: shippingAddress.street1, // Dirección de facturación
                    street2: "", // Dirección adicional de facturación
                    city: shippingAddress.city, // Ciudad de facturación
                    state: shippingAddress.state, // Estado de facturación
                    country: "CO", // País de facturación
                    postalCode: shippingAddress.postalCode, // Código postal de facturación
                    phone: shippingAddress.phone, // Teléfono de contacto para facturación
                },
            },
            creditCard: {
                number: cardValues.number, // Número de tarjeta de crédito
                securityCode: cardValues.cvv, // Código de seguridad (CVV)
                expirationDate: cardValues.exp, // Fecha de vencimiento de la tarjeta
                name: cardValues.userName, // Nombre del titular de la tarjeta
            },
            extraParameters: {
                INSTALLMENTS_NUMBER: 1, // Número de cuotas de pago, si aplica
            },
            type: "AUTHORIZATION_AND_CAPTURE", // Tipo de transacción: autorización y captura
            paymentMethod: paymentMethod, // Método de pago (VISA, MASTERCARD, etc.)
            paymentCountry: "CO", // País del pago (Colombia)
            deviceSessionId: client.sessionId, // ID de sesión del dispositivo
            ipAddress: ipClient, // Dirección IP del cliente
            cookie: client.id, // Cookie de la sesión
            userAgent: userAgent, // Agente de usuario del navegador
        },
        test: true, // Indicador de entorno de prueba (cambiar a false en producción)
    };

    try {
        // Realizar la solicitud a la API de PayU
        const response = await fetch(process.env.PAYU_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        // Retornar la respuesta de la transacción
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        // Manejo de errores en caso de que falle la solicitud
        console.error(error.response?.data || error.message);
        return new Response(JSON.stringify({ error: "Transaction failed" }), {
            status: 500,
        });
    }
}
