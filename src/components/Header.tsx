import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="logo" onClick={close}>
          AIGUI Store
        </Link>

        <nav className="nav-links desktop">
          <NavLink to="/" end>
            Accueil
          </NavLink>
          <NavLink to="/shop">
            Boutique
          </NavLink>
          <NavLink to="/favorites">
            Favoris
          </NavLink>
          <NavLink to="/about">
            À propos
          </NavLink>
          <NavLink to="/cart">
            Panier
          </NavLink>
        </nav>

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <nav className="mobile-menu">
          <NavLink to="/" end onClick={close}>
            Accueil
          </NavLink>
          <NavLink to="/shop" onClick={close}>
            Boutique
          </NavLink>
          <NavLink to="/about" onClick={close}>
            À propos
          </NavLink>
          <NavLink to="/cart" onClick={close}>
            Panier
          </NavLink>
        </nav>
      )}
    </header>
  );
}
