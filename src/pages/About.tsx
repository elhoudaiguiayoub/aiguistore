document.title = "À propos — AIGUISTORE";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <h1>À propos de AIGUISTORE</h1>

      <p className="muted" style={{ marginTop: 8, lineHeight: 1.8 }}>
        AIGUISTORE est une boutique de vêtements basée au Maroc. Nous proposons
        des pièces streetwear sélectionnées avec soin : t-shirts, shorts et
        nouveautés disponibles en plusieurs couleurs et tailles.
      </p>

      <section style={{ marginTop: 28 }}>
        <h2>Comment commander ?</h2>

        <ul className="muted" style={{ lineHeight: 1.9 }}>
          <li>Choisis ton produit dans la boutique</li>
          <li>Sélectionne la couleur et la taille</li>
          <li>Ajoute le produit au panier</li>
          <li>Remplis tes informations de livraison</li>
          <li>Envoie ta commande directement sur WhatsApp</li>
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Paiement & livraison</h2>

        <p className="muted" style={{ lineHeight: 1.8 }}>
          Après l’envoi de la commande, nous confirmons la disponibilité des
          produits et les détails de livraison directement sur WhatsApp.
          Le paiement peut se faire à la livraison selon la ville.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Pourquoi commander chez nous ?</h2>

        <ul className="muted" style={{ lineHeight: 1.9 }}>
          <li>Photos réelles des produits</li>
          <li>Plusieurs couleurs et tailles disponibles</li>
          <li>Commande simple par WhatsApp</li>
          <li>Réponse rapide pour confirmer la commande</li>
          <li>Livraison locale selon disponibilité</li>
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Contact</h2>

        <p className="muted" style={{ lineHeight: 1.8 }}>
          Pour toute question sur un produit, une taille ou une livraison, tu peux
          nous contacter directement sur WhatsApp.
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="https://wa.me/+212661246805"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/aiguistore?utm_source=qr"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Instagram
          </a>

          <Link to="/shop" className="btn">
            Voir la boutique →
          </Link>
        </div>
      </section>
    </div>
  );
}