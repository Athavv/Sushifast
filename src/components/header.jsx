import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100 sushi-navbar">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="sushi-navbar-brand">
          🍣 <strong>Sushi <span className="sushi-navbar-highlight">Fast</span></strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={NavLink} to="/" end>
              Accueil
            </Nav.Link>
            <Nav.Link as={NavLink} to="/menus-filtres">
              Menus Avocat / Coriandre
            </Nav.Link>
            <Nav.Link as={NavLink} to="/priced-menus">
              Menus &lt; 13 pièces
            </Nav.Link>
            <Nav.Link as={NavLink} to="/menus-extremes">
              Menus extrêmes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
