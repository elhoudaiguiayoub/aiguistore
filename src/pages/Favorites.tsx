import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="container">
        <h1>Favoris</h1>
        <p className="muted">Tu n’as pas encore ajouté de produits aux favoris.</p>

        <Link to="/shop" className="btn" style={{ display: "inline-block", marginTop: 12 }}>
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Favoris</h1>

      <div
        className="shop-grid"
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {favoriteProducts.map((p) => (
          <div key={p.id} className="card" style={{ overflow: "hidden" }}>
            <Link to={`/product/${p.id}`}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: 12,
                  display: "block",
                }}
              />
            </Link>

            <div style={{ marginTop: 12, fontWeight: 900 }}>{p.name}</div>
            <div className="muted" style={{ marginTop: 6 }}>{p.category}</div>
            <div style={{ marginTop: 10, fontWeight: 900 }}>{p.price} DH</div>

            <button
              onClick={() => toggleFavorite(p.id)}
              style={{
                marginTop: 12,
                width: "100%",
                border: "1px solid #333",
                background: "transparent",
                color: "#080808",
                padding: "10px 14px",
                borderRadius: 12,
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Retirer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}