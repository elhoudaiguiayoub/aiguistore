import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const WHATSAPP_NUMBER = "212612345678";

export default function Checkout() {
  const { cart, total } = useCart();

  const shipping = cart.length > 0 ? 9 : 0;
  const grandTotal = total + shipping;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const isValid = useMemo(() => {
    if (cart.length === 0) return false;

    return (
      form.fullName.trim().length >= 2 &&
      form.phone.trim().length >= 8 &&
      form.address.trim().length >= 4 &&
      form.city.trim().length >= 2
    );
  }, [form, cart.length]);

  const handleWhatsappOrder = () => {
    const itemsText = cart
      .map(
        (p) =>
          `- ${p.name} | Couleur: ${p.color} | Taille: ${p.size} | Qté: ${p.qty} | Prix: ${
            p.price * p.qty
          } DH`
      )
      .join("\n");

    const message = `
Bonjour, je veux passer cette commande:

${itemsText}

Sous-total: ${total} DH
Livraison: ${shipping} DH
Total: ${grandTotal} DH

Nom: ${form.fullName}
Téléphone: ${form.phone}
Adresse: ${form.address}
Ville: ${form.city}
`.trim();

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <h1>Commande</h1>
        <p className="muted">Ton panier est vide.</p>
        <Link to="/shop" className="btn" style={{ display: "inline-block", marginTop: 12 }}>
          Aller à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: 14 }}>
        <Link to="/cart" className="muted">
          ← Retour panier
        </Link>
      </div>

      <h1 style={{ margin: 0 }}>Finaliser la commande</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Remplis tes informations, puis envoie la commande sur WhatsApp.
      </p>

      <div
        className="checkout-grid"
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 18,
          alignItems: "start",
        }}
      >
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Informations client</h3>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <Field
              label="Nom complet"
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              placeholder="Nom et prénom"
            />

            <Field
              label="Téléphone"
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="06 12 34 56 78"
            />

            <Field
              label="Adresse"
              name="address"
              value={form.address}
              onChange={onChange}
              placeholder="Adresse de livraison"
            />

            <Field
              label="Ville"
              name="city"
              value={form.city}
              onChange={onChange}
              placeholder="Casablanca"
            />
          </div>

          <button
            className="btn"
            disabled={!isValid}
            onClick={handleWhatsappOrder}
            style={{
              marginTop: 14,
              width: "100%",
              opacity: isValid ? 1 : 0.45,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            Commander sur WhatsApp
          </button>

          <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
            Le message sera préparé automatiquement. Vérifie-le dans WhatsApp avant de l’envoyer.
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Résumé</h3>

          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            {cart.map((p) => (
              <div
                key={p.cartId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  alignItems: "baseline",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800 }}>{p.name}</div>

                  <div className="muted" style={{ fontSize: 12 }}>
                    {p.color} • Taille {p.size} • {p.price} DH × {p.qty}
                  </div>
                </div>

                <div style={{ fontWeight: 800 }}>{p.price * p.qty} DH</div>
              </div>
            ))}
          </div>

          <hr style={{ borderColor: "#222", margin: "14px 0" }} />

          <Row label="Sous-total" value={`${total} DH`} />
          <Row label="Livraison" value={`${shipping} DH`} />

          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginTop: 8 }}>
            <span>Total</span>
            <span>{grandTotal} DH</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
      <span className="muted">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Field(props: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { label, ...rest } = props;

  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span className="muted" style={{ fontSize: 12 }}>
        {label}
      </span>

      <input
        {...rest}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #222",
          background: "#0b0b0b",
          color: "#f5f5f5",
          outline: "none",
        }}
      />
    </label>
  );
}
