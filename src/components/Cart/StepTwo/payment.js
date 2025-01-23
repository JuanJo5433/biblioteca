import { detectCardType } from "@/utils/validateTypeCart";
import { useState } from "react";
import { SiMastercard } from "react-icons/si";
import { RiVisaLine } from "react-icons/ri";
import { SiAmericanexpress } from "react-icons/si";
import { MdCancel } from "react-icons/md";
import { useCart } from "@/context/cartContext";

const PaymentForm = () => {
    // Estados para manejar los datos del formulario
    const [cardNumber, setCardNumber] = useState("");
    const [cardType, setCardType] = useState(null);
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    // Total a pagar
    const { total } = useCart();

    // Estilos comunes para inputs
    const inputClass =
        "p-3 rounded-lg border border-border-light focus:outline-none focus:ring-2 focus:ring-library-green";

    /**
     * Formatea el número de la tarjeta con guiones después de cada grupo de 4 dígitos.
     * @param {string} cardNumber - Número de tarjeta ingresado por el usuario.
     * @returns {string} - Número de tarjeta formateado.
     */
    const formatCardNumber = (cardNumber) => {
        return cardNumber
            .replace(/\D/g, "") // Elimina caracteres no numéricos
            .replace(/(\d{4})(?=\d)/g, "$1-"); // Agrega un guion después de cada 4 dígitos
    };

    /**
     * Maneja el cambio en el input de número de tarjeta, formatea y detecta el tipo.
     */
    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        const formattedNumber = formatCardNumber(value);
        setCardNumber(formattedNumber);
        setCardType(detectCardType(value)); // Detecta el tipo de tarjeta
    };

    /**
     * Genera las opciones de mes y año en formato MM/AA para los próximos 10 años.
     */
    const generateMonthYearOptions = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 * 12 }, (_, i) => {
            const year = currentYear + Math.floor(i / 12);
            const month = (i % 12) + 1;
            return `${month.toString().padStart(2, "0")}/${year
                .toString()
                .slice(-2)}`;
        });
    };

    /**
     * Maneja el envío del formulario.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            `Submitting payment with card: ${cardNumber}, Expiry Date: ${expiryDate}, CVV: ${cvv}`
        );
    };

    return (
        <div className="my-14 flex justify-center bg-background-main">
            <div className="bg-background-secondary p-12 rounded-lg shadow-md w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-text-primary text-center mb-6">
                    Realiza tu Pago
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Número de tarjeta */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="cardNumber"
                            className="text-text-secondary font-medium mb-2"
                        >
                            Número de tarjeta
                        </label>
                        <div className="relative">
                            <input
                                id="cardNumber"
                                type="text"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                className={`${inputClass} w-full`}
                                placeholder="1234-5678-1234-5678"
                                maxLength={19}
                                required
                            />
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-4xl text-gray-500">
                                {cardType === 0 && <MdCancel />}
                                {cardType === 1 && <RiVisaLine />}
                                {cardType === 2 && <SiMastercard />}
                                {cardType === 3 && <SiAmericanexpress />}
                            </div>
                        </div>
                    </div>

                    {/* Fecha de vencimiento y CVV */}
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label
                                htmlFor="expiryDate"
                                className="text-text-secondary font-medium mb-2"
                            >
                                Fecha de vencimiento
                            </label>
                            <select
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className={`${inputClass} mt-1 w-full`}
                                required
                            >
                                <option value="" disabled>
                                    Selecciona MM/AA
                                </option>
                                {generateMonthYearOptions().map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="cvv"
                                className="text-text-secondary font-medium mb-2"
                            >
                                CVV
                            </label>
                            <input
                                id="cvv"
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className={`${inputClass} w-full`}
                                placeholder="CVV"
                                maxLength={3}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-[var(--text-primary)]">
                            Total a pagar: ${total}
                        </h1>
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className="w-full bg-library-green text-white p-3 rounded-lg hover:bg-hover-green focus:outline-none focus:ring-2 focus:ring-library-green"
                    >
                        Pagar Ahora
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;
