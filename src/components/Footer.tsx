export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="muted">
          © {year} AIGUI Store — Boutique en ligne
        </div>

        <div className="footer-links">
          <a href="https://wa.me/212612345678" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
