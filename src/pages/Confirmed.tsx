import { Link } from "react-router-dom";

export default function Confirmed() {
  return (
    <div className="container">
      <span className="badge">Order</span>
      <h1 style={{ marginTop: 10 }}>Confirmed ✅</h1>
      <p className="muted">
        Demo project — your order is confirmed. Thanks for shopping EHYoub.
      </p>

      <div style={{ marginTop: 16 }}>
        <Link to="/shop" className="btn" style={{ display: "inline-block" }}>
          Back to shop
        </Link>
      </div>
    </div>
  );
}
