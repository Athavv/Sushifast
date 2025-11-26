// src/components/footer.jsx
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto w-100">
      {/* Container fluid = largeur totale */}
      <Container fluid className="text-center">
        <p className="mb-1">
          © {new Date().getFullYear()} Sushi Fast 🍣 — Tous droits réservés
        </p>
        <p className="small mb-0">
          <a href="#mentions" className="text-decoration-none text-light">
            Mentions légales
          </a>{" "}
          |{" "}
          <a href="#contact" className="text-decoration-none text-light">
            Contact
          </a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
