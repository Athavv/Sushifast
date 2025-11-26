import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          🍣 <strong>Sushi <span style={{ color: "#ff4d4d" }}>Fast</span></strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>Accueil</Nav.Link>
            <Nav.Link as={NavLink} to="/menus-filtres">Menu</Nav.Link>
            <Nav.Link as={NavLink} to="/priced-menus">Priced Menus</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
