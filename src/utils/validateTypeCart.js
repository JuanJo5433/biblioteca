// Función para detectar el tipo de tarjeta
export const detectCardType = (cardNumber) => {
  const card = cardNumber.replace(/\D/g, ""); // Eliminar cualquier carácter no numérico
  const visaRegex = /^4[0-9]{12,18}$/;
  const masterCardRegex = /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/;
  const amexRegex = /^3[47][0-9]{13}$/;


  if (visaRegex.test(card)) return 1;
  if (masterCardRegex.test(card)) return 2;
  if (amexRegex.test(card)) return 3;

  return 0; // Si no se detecta ningún tipo
};
