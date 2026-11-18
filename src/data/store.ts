export const SHIPPING_MAD = 50;
export const PRODUCT_SIZES = ["S", "M", "L", "XL"] as const;

export function merchantNumber(value: string | undefined) {
  const digits = value?.trim().replace(/[+\s()-]/g, "");
  return digits && /^[1-9]\d{7,14}$/.test(digits) ? digits : null;
}

export const whatsappNumber = merchantNumber(import.meta.env.VITE_WHATSAPP_NUMBER);
export const merchantContact = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null;
