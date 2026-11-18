import { Link } from "react-router-dom";

export default function Confirmed() {
  return (
    <div className="container">
      <span className="badge">Commande</span>
      <h1 style={{ marginTop: 10 }}>Vérifie ta demande sur WhatsApp</h1>
      <p className="muted">
        La boutique confirme ta demande directement sur WhatsApp après réception.
      </p>

      <div style={{ marginTop: 16 }}>
        <Link to="/shop" className="btn" style={{ display: "inline-block" }}>
          Retour à la boutique
        </Link>
      </div>
    </div>
  );
}
