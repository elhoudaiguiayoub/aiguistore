# EHYoub Streetwear — React + TypeScript

🔗 Live demo: https://ehyoubstreetwear.vercel.app

A modern streetwear storefront demo built with **React, TypeScript, and Vite**.
This project simulates a real e-commerce front-end with clean UI and scalable architecture.

---

## ✨ Features
- Responsive UI (mobile & desktop)
- Product catalog with search, filter & sort
- Product detail pages
- Shopping cart with quantity management
- Checkout & order confirmation (demo)
- Modern streetwear-inspired design
- Deployed on Vercel

---

## 🧰 Tech Stack
- React
- TypeScript
- Vite
- React Router
- Context API (state management)
- CSS (custom styling)
- Vercel (deployment)

---

## 🚀 Getting Started
```bash
npm install
npm run dev

## Activer les demandes de commande

Copier `.env.example` vers `.env.local` et renseigner `VITE_WHATSAPP_NUMBER`
avec le numéro professionnel qui traite les demandes, au format international.
Sur un hébergeur, définir la même variable pour le build. Ce numéro est public.
Sans numéro valide, le site affiche que les commandes sont fermées.

Le client prépare une demande avec référence, vérifie les produits, tailles,
quantités, coordonnées et montant estimé, puis l’envoie dans WhatsApp. Le vendeur
confirme disponibilité, frais de livraison, délai et modalités de paiement.
Le site ne débite aucun moyen de paiement et ne maintient pas d’inventaire partagé.

Le catalogue existant est défini dans `src/data/products.ts`. Le prix et les
frais indicatifs sont en dirhams marocains. Pour un lancement commercial,
renseigner les produits autorisés à la vente, leurs visuels et leur stock réel.
Vérifier les coûts d’achat, d’emballage, de livraison et de retours avant de
valider les prix. Suivre la marge par commande livrée et le nombre réel de
demandes conclues.

### Vérifications

- `npm ci`
- `npx tsc --noEmit`
- `npx vitest run`
- `npm run build`
