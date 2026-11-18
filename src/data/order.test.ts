import { describe, expect, it } from "vitest";
import type { CartItem } from "../types/product";
import { orderLink, orderTotal, validContact } from "./order";
import { merchantNumber } from "./store";

const item: CartItem = {
  id:"item", cartId:"item-noir-M", name:"T-shirt", price:250, category:"T-Shirts",
  colors:[], size:"M", color:"Noir", image:"", qty:2,
};
const contact = { fullName:"Client fictif", phone:"+1 202 555 0100", address:"10 rue Démo", city:"Casablanca" };
const merchant = "+1 202 555 0110";

describe("demande de commande", () => {
  it("calcule le même total pour le panier et la demande", () => {
    expect(orderTotal([])).toEqual({subtotal:0,shipping:0,total:0});
    expect(orderTotal([item])).toEqual({subtotal:500,shipping:50,total:550});
  });

  it("prépare le message pour le numéro configuré et l’encode", () => {
    const link = orderLink(merchant, [item], contact, "AIG-DEMO");
    expect(link).not.toBeNull();
    const url = new URL(link!);
    expect(url.origin + url.pathname).toBe("https://wa.me/12025550110");
    expect(url.searchParams.get("text")).toContain("AIG-DEMO");
    expect(url.searchParams.get("text")).toContain("Total estimé : 550 DH");
    expect(url.searchParams.get("text")).toContain("Adresse : 10 rue Démo");
  });

  it("bloque les destinataires ou coordonnées invalides et les paniers vides", () => {
    expect(merchantNumber("https://example.org")).toBeNull();
    expect(merchantNumber(undefined)).toBeNull();
    expect(validContact({...contact,phone:"abc123456789"})).toBe(false);
    expect(orderLink("",[item],contact,"AIG-DEMO")).toBeNull();
    expect(orderLink(merchant,[],contact,"AIG-DEMO")).toBeNull();
  });
});
