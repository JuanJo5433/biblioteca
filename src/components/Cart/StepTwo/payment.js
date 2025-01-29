import { useState } from "react";
import { detectCardType } from "@/utils/validateTypeCart";
import { useCart } from "@/hooks/useCart";
import { FaLock, FaCreditCard, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiVisa, SiMastercard, SiAmericanexpress } from "react-icons/si";

const PaymentForm = () => {
    const { total } = useCart();
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    
    const cardTypes = {
        1: { icon: <SiVisa className="text-2xl" />, color: "text-[#1a1f71]" },
        2: { icon: <SiMastercard className="text-2xl" />, color: "text-[#eb001b]" },
        3: { icon: <SiAmericanexpress className="text-2xl" />, color: "text-[#016FD0]" }
    };

    const formatCardNumber = (value) => {
        return value.replace(/\D/g, "")
            .replace(/(\d{4})(?=\d)/g, "$1 ")
            .substring(0, 19);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de procesamiento de pago
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto p-6"
        >
            <div className="bg-background-secondary rounded-2xl p-6 shadow-elevation-1">
                <div className="flex items-center gap-3 mb-8">
                    <FaLock className="text-primary text-xl" />
                    <h2 className="text-2xl font-bold text-text-primary">Pago Seguro</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Número de Tarjeta */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                            <FaCreditCard />
                            Número de tarjeta
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formatCardNumber(cardNumber)}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="0000 0000 0000 0000"
                                className="w-full p-3 rounded-lg border border-border-light bg-background-main focus:ring-2 focus:ring-primary"
                                maxLength={19}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                {cardTypes[detectCardType(cardNumber)]?.icon || (
                                    <FaCreditCard className="text-text-secondary" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Fecha y CVV */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                                <FaCalendarAlt />
                                Expiración
                            </label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                placeholder="MM/AA"
                                className="w-full p-3 rounded-lg border border-border-light bg-background-main"
                                maxLength={5}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                                <FaShieldAlt />
                                CVV
                            </label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                                placeholder="000"
                                className="w-full p-3 rounded-lg border border-border-light bg-background-main"
                                maxLength="3"
                            />
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center p-4 bg-background-main rounded-lg">
                        <span className="font-medium text-text-primary">Total a Pagar:</span>
                        <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="w-full p-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                    >
                        <FaLock />
                        Pagar Ahora
                    </button>

                    {/* Seguridad */}
                    <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
                        <FaLock className="text-green-500" />
                        <span>Transacción 100% segura</span>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default PaymentForm;