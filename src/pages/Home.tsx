import { Link } from "react-router-dom";
import { products } from "../data/products";

export default function Home() {
  document.title = "EHYoub — Boutique streetwear";

  const featured = products.slice(0, 3);

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-left">
          <span className="badge">NOUVEAUTÉS</span>
          <h1 className="hero-title">AIGUI Store Streetwear</h1>
          <p className="hero-sub">
            Découvre les pièces disponibles, choisis la couleur et la taille, puis commande directement sur WhatsApp.
          </p>

          <div className="hero-cta">
            <Link to="/shop" className="btn">
              Voir la boutique →
            </Link>
            <Link to="/cart" className="btn btn-ghost">
              Voir le panier
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">WhatsApp</div>
              <div className="muted">Commande rapide</div>
            </div>
            <div className="stat">
              <div className="stat-num">DH</div>
              <div className="muted">Prix en dirhams</div>
            </div>
            <div className="stat">
              <div className="stat-num">Maroc</div>
              <div className="muted">Livraison locale</div>
            </div>
          </div>
        </div>

        <div className="hero-right card" style={{ overflow: "hidden" }}>
          <div className="hero-img-wrap">
            <img
              src={featured[0]?.image}
              alt="Produit à la une"
              className="hero-img"
              loading="lazy"
            />
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 900 }}>{featured[0]?.name ?? "Produit"}</div>
              <div className="muted" style={{ marginTop: 4 }}>
                {featured[0]?.category ?? "Streetwear"}
              </div>
            </div>
            <div style={{ fontWeight: 900 }}>
              {featured[0] ? `${featured[0].price} DH` : ""}
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <div className="section-head">
          <h2 style={{ margin: 0 }}>Catégories</h2>
          <Link to="/shop" className="muted">
            Voir tout →
          </Link>
        </div>

        <div className="cat-grid">
          <Link to="/shop" className="card cat-card">
            <div className="cat-title">T-Shirts</div>
            <div className="muted">Plusieurs couleurs disponibles</div>
          </Link>
          <Link to="/shop" className="card cat-card">
            <div className="cat-title">Shorts</div>
            <div className="muted">Photos, tailles et couleurs</div>
          </Link>
          <Link to="/shop" className="card cat-card">
            <div className="cat-title">Commande</div>
            <div className="muted">Confirmation sur WhatsApp</div>
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <div className="section-head">
          <h2 style={{ margin: 0 }}>Produits disponibles</h2>
          <Link to="/shop" className="muted">
            Boutique →
          </Link>
        </div>

        <div className="featured-grid">
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="card"
              style={{ overflow: "hidden" }}
            >
              <div className="thumb">
                <img src={p.image} alt={p.name} className="thumb-img" loading="lazy" />
              </div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 900 }}>{p.name}</div>
                <div style={{ fontWeight: 900 }}>{p.price} DH</div>
              </div>
              <div className="muted" style={{ marginTop: 6 }}>
                {p.category}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta">
        <div>
          <h2 style={{ margin: 0 }}>Prêt à commander ?</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            Ajoute les produits au panier et envoie la commande sur WhatsApp.
          </p>
        </div>
        <Link to="/shop" className="btn">
          Aller à la boutique →
        </Link>
      </section>
    </div>
  );
}
