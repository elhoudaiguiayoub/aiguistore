import type { CartItem } from "../types/product";
import { SHIPPING_MAD, merchantNumber } from "./store";

export type OrderContact = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
};

export function validContact(contact: OrderContact) {
  return contact.fullName.trim().length >= 2
    && /^\+?[0-9 ()-]+$/.test(contact.phone.trim())
    && /^\d{8,15}$/.test(contact.phone.replace(/\D/g, ""))
    && contact.address.trim().length >= 4
    && contact.city.trim().length >= 2;
}

export function orderTotal(items: Pick<CartItem, "price" | "qty">[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = items.length ? SHIPPING_MAD : 0;
  return { subtotal, shipping, total: subtotal + shipping };
}

export function orderLink(number: string, items: CartItem[], contact: OrderContact, reference: string) {
  const merchant = merchantNumber(number);
  if (!merchant || !items.length || !validContact(contact)) return null;
  const { subtotal, shipping, total } = orderTotal(items);
  const products = items.map(item =>
    `- ${item.name} · ${item.color} · Taille ${item.size} · ${item.qty} × ${item.price} DH`,
  );
  const message = [
    `Bonjour, je souhaite passer la commande ${reference}.`,
    "",
    ...products,
    "",
    `Articles : ${subtotal} DH`,
    `Livraison estimée : ${shipping} DH`,
    `Total estimé : ${total} DH`,
    "",
    `Nom : ${contact.fullName.trim()}`,
    `Téléphone : ${contact.phone.trim()}`,
    `Adresse : ${contact.address.trim()}`,
    `Ville : ${contact.city.trim()}`,
    "",
    "Merci de confirmer le stock, le montant et le délai avant paiement.",
  ].join("\n");
  return `https://wa.me/${merchant}?text=${encodeURIComponent(message)}`;
}
