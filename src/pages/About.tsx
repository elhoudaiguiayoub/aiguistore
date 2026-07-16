document.title = "About — EHYoub Streetwear";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <h1>About This Project</h1>

      <p className="muted" style={{ marginTop: 8, lineHeight: 1.8 }}>
        EHYoub Streetwear is a front-end portfolio project designed to simulate
        a real-world e-commerce application. The goal is not visual gimmicks,
        but clarity, structure, and practical React patterns that scale.
      </p>

      <section style={{ marginTop: 28 }}>
        <h2>What this project demonstrates</h2>
        <ul className="muted" style={{ lineHeight: 1.9 }}>
          <li>Component-based architecture using React</li>
          <li>Client-side routing with React Router</li>
          <li>Global state management via Context API</li>
          <li>Reusable UI patterns and clean data flow</li>
          <li>Responsive layout without UI libraries</li>
          <li>Production deployment workflow (Git + Vercel)</li>
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Technical choices</h2>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          The application is built with React and TypeScript to ensure predictable
          data structures and maintainable code. Vite is used for fast development
          and optimized production builds. Styling is handled with custom CSS to
          keep full control over layout and performance.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>About the developer</h2>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          I am <strong>Ayoub Elhoudaigui</strong>, a junior front-end developer
          focused on modern JavaScript, React, and clean UI architecture.
          I enjoy building projects that reflect real product constraints
          rather than isolated demos.
        </p>

        <p className="muted" style={{ lineHeight: 1.8, marginTop: 8 }}>
          This project represents my approach to learning and problem solving:
          build end-to-end, deploy early, iterate, and improve structure over time.
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="https://github.com/elhoudaiguiayoub"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            LinkedIn
          </a>

          <Link to="/shop" className="btn">
            View the project →
          </Link>
        </div>
      </section>
    </div>
  );
}
