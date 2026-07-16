import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

type Sort = "featured" | "price-asc" | "price-desc";

export default function Shop() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<Sort>("featured");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = products.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q);
      const matchesCat = category === "all" || p.category === category;
      return matchesQuery && matchesCat;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [query, category, sort]);

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Boutique</h1>
          <div className="muted" style={{ marginTop: 6 }}>
            {filtered.length} produit(s)
          </div>
        </div>

        <div
          className="shop-filters"
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher..."
            style={inputStyle}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "Toutes les catégories" : c}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            style={inputStyle}
          >
            <option value="featured">À la une</option>
            <option value="price-asc">Prix: bas</option>
            <option value="price-desc">Prix: haut</option>
          </select>
        </div>
      </div>

      <div
        className="shop-grid"
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {filtered.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="card"
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                borderRadius: 12,
                background: "#111",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
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
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ fontWeight: 800 }}>{p.name}</div>
              <span className="badge">DISPONIBLE</span>
            </div>

            <div className="muted" style={{ marginTop: 6 }}>
              {p.category}
            </div>

            <div style={{ marginTop: 10, fontWeight: 900 }}>{p.price} DH</div>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .shop-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 520px) {
          .shop-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .shop-filters {
            width: 100%;
          }

          .shop-filters input,
          .shop-filters select {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

const inputStyle: CSSProperties = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #222",
  background: "#0b0b0b",
  color: "#f5f5f5",
  outline: "none",
};
