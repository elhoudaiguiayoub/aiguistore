import { merchantContact } from "../data/store";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="muted">
          © {year} AIGUI Store — Boutique en ligne
        </div>

        <div className="footer-links">
          {merchantContact && <a href={merchantContact} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
        </div>
      </div>
    </footer>
  );
}
