import { useRef, useState, type FormEvent, type HTMLInputAutoCompleteAttribute } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderLink, orderTotal, validContact, type OrderContact } from "../data/order";
import { whatsappNumber } from "../data/store";

export default function Checkout() {
  const { cart } = useCart();
  const { subtotal: total, shipping, total: grandTotal } = orderTotal(cart);
  const [form, setForm] = useState<OrderContact>({fullName:"", phone:"", address:"", city:""});
  const [prepared, setPrepared] = useState<{url:string, reference:string} | null>(null);
  const reference = useRef("");

  function prepareOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!whatsappNumber || !validContact(form)) return;
    reference.current ||= "AIG-" + crypto.randomUUID().slice(0, 8).toUpperCase();
    const url = orderLink(whatsappNumber, cart, form, reference.current);
    if (url) setPrepared({url, reference:reference.current});
  }

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
        Prépare ta demande. La boutique confirmera le stock, la livraison et le montant avant paiement.
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
        <form className="card" onSubmit={prepareOrder} onChange={() => setPrepared(null)}>
          <h3 style={{ marginTop: 0 }}>Informations de livraison</h3>
          {!whatsappNumber && <p role="status">Les commandes ne sont pas ouvertes actuellement.</p>}
          <fieldset disabled={!whatsappNumber} style={{border:0, padding:0, margin:0}}>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <Field label="Nom complet" name="fullName" autoComplete="name" maxLength={100}
              value={form.fullName} onChange={fullName => setForm(previous => ({...previous, fullName}))} />
            <Field label="Téléphone" name="phone" autoComplete="tel" maxLength={24} type="tel"
              value={form.phone} onChange={phone => setForm(previous => ({...previous, phone}))} />
            <Field label="Adresse" name="address" autoComplete="street-address" maxLength={160}
              value={form.address} onChange={address => setForm(previous => ({...previous, address}))} />
            <Field label="Ville" name="city" autoComplete="address-level2" maxLength={80}
              value={form.city} onChange={city => setForm(previous => ({...previous, city}))} />
          </div>
          <button className="btn" type="submit" disabled={!validContact(form)}
            style={{marginTop:14,width:"100%"}}>Préparer la demande</button>
          </fieldset>
          {prepared && (
            <div style={{marginTop:12}}>
              <p role="status">Demande {prepared.reference} prête.</p>
              <a className="btn" href={prepared.url} target="_blank" rel="noopener noreferrer">
                Ouvrir WhatsApp et vérifier la demande
              </a>
              <p className="muted">Le message inclut tes coordonnées de livraison. Vérifie-le puis envoie-le dans WhatsApp.</p>
            </div>
          )}
        </form>

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
          <Row label="Livraison estimée" value={`${shipping} DH`} />

          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, marginTop: 8 }}>
            <span>Total estimé</span>
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
  type?: string;
  autoComplete: HTMLInputAutoCompleteAttribute;
  maxLength: number;
  onChange: (value: string) => void;
}) {
  const { label, onChange, ...rest } = props;

  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span className="muted" style={{ fontSize: 12 }}>
        {label}
      </span>

      <input
        {...rest}
        required
        onChange={(event) => onChange(event.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #222",
          background: "#0b0b0b",
          color: "#f5f5f5",
        }}
      />
    </label>
  );
}
