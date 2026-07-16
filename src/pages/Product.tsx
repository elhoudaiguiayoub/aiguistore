import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const SIZES = ["S", "M", "L", "XL"] as const;
type Size = (typeof SIZES)[number];

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [size, setSize] = useState<Size>("M");
  const [colorIndex, setColorIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container">
        <h1>Produit introuvable</h1>
        <p className="muted">Ce produit n’existe pas ou a été retiré.</p>
        <Link to="/shop" className="btn" style={{ display: "inline-block", marginTop: 12 }}>
          Retour boutique
        </Link>
      </div>
    );
  }

  const selectedColor = product.colors[colorIndex];
  const selectedImage = selectedColor.images[imageIndex];

  const handleColorChange = (index: number) => {
    setColorIndex(index);
    setImageIndex(0);
  };

  const handleAdd = () => {
    addToCart(product, {
      size,
      color: selectedColor.name,
      image: selectedImage,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: 14 }}>
        <Link to="/shop" className="muted">
          ← Retour boutique
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        <div className="card" style={{ overflow: "hidden" }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              borderRadius: 14,
              background: "#111",
            }}
          >
            <img
              src={selectedImage}
              alt={`${product.name} - ${selectedColor.name}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 12,
              flexWrap: "wrap",
            }}
          >
            {selectedColor.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setImageIndex(index)}
                style={{
                  width: 72,
                  height: 72,
                  padding: 0,
                  borderRadius: 12,
                  overflow: "hidden",
                  border: index === imageIndex ? "2px solid #00ff66" : "1px solid #333",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <img
                  src={image}
                  alt={`${product.name} ${selectedColor.name} ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <span className="badge">{product.category}</span>

          <h1 style={{ marginTop: 12, marginBottom: 6, fontSize: 34 }}>
            {product.name}
          </h1>

          <div style={{ fontWeight: 900, fontSize: 18 }}>{product.price} DH</div>

          <p className="muted" style={{ marginTop: 10, lineHeight: 1.6 }}>
            Produit disponible en plusieurs couleurs. Choisis la couleur, la taille, puis ajoute-le au panier.
          </p>

          <div style={{ marginTop: 14 }}>
            <div className="muted" style={{ marginBottom: 8 }}>
              Couleur: {selectedColor.name}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {product.colors.map((color, index) => {
                const active = index === colorIndex;

                return (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(index)}
                    title={color.name}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      border: active ? "3px solid #00ff66" : "1px solid #444",
                      background: color.hex,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="muted" style={{ marginBottom: 8 }}>
              Taille
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SIZES.map((s) => {
                const active = s === size;

                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid #222",
                      background: active ? "#00ff66" : "transparent",
                      color: active ? "#000" : "#f5f5f5",
                      fontWeight: 800,
                      cursor: "pointer",
                      minWidth: 54,
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="btn"
            onClick={handleAdd}
            style={{ marginTop: 16, width: "100%" }}
          >
            {added ? "Ajouté ✓" : `Ajouter au panier — ${selectedColor.name} / ${size}`}
          </button>

          <div style={{ marginTop: 12 }}>
            <Link to="/cart" className="muted">
              Aller au panier →
            </Link>
          </div>

          <hr style={{ borderColor: "#222", margin: "16px 0" }} />

          <div style={{ display: "grid", gap: 8 }}>
            <div className="muted">• Livraison: 2–5 jours</div>
            <div className="muted">• Paiement possible à la livraison</div>
            <div className="muted">• Commande confirmée sur WhatsApp</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
