import { useEffect, useMemo, useState } from "react";
import { getMenu } from "../utils/boitesServices";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Hero from "../components/hero";
import Sidebar from "../components/sidebar";

function Accueil() {
  const [menus, setMenus] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    saveurs: [],
    noCalifornia: false,
    piecesFilter: "all", // "all" | "lt13"
    selectedPieces: [], // liste des tailles sélectionnées
    extreme: "none", // "none" | "max" | "min"
  });

  useEffect(() => {
    getMenu().then((data) => setMenus(data));
  }, []);

  const filtered = useMemo(() => {
    // 1. Filtres locaux (recherche, saveurs, sans California Saumon Avocat)
    let base = menus.filter((m) => {
      if (filters.search && !m.nom.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      if (filters.saveurs && filters.saveurs.length > 0) {
        const has = m.saveurs && m.saveurs.some((s) => filters.saveurs.includes(s));
        if (!has) return false;
      }

      if (filters.noCalifornia) {
        const hasCalifornia = m.aliments && m.aliments.some((a) => a.nom === "California Saumon Avocat");
        if (hasCalifornia) return false;
      }

      // Filtre par tailles exactes sélectionnées
      if (filters.selectedPieces.length > 0 && !filters.selectedPieces.includes(m.pieces)) {
        return false;
      }

      // Filtre par règle < 13 pièces
      if (filters.piecesFilter === "lt13" && m.pieces >= 13) {
        return false;
      }

      return true;
    });

    // Filtre extrême (plus cher / moins cher) sur le résultat déjà filtré
    if (filters.extreme === "max" && base.length > 0) {
      const maxPrice = Math.max(...base.map((m) => m.prix || 0));
      base = base.filter((m) => m.prix === maxPrice);
    } else if (filters.extreme === "min" && base.length > 0) {
      const minPrice = Math.min(...base.map((m) => m.prix || 0));
      base = base.filter((m) => m.prix === minPrice);
    }

    return base;
  }, [menus, filters]);

  return (
    <>
      <Hero />

      <Container fluid id="menu-list" className="my-5 pt-5 px-0">
        <Row className="g-0 layout-row">
          <Col className="mb-4 sidebar-col">
            <Sidebar menus={menus} onChange={(f) => setFilters(f)} />
          </Col>

          <Col className="cards-col">
            <h1 className="display-2 fw-bold sushi-accueil-title text-center text-white">頂きます</h1>
            <Row className="mt-4 cards-row justify-content-center">
              {filtered.map((item) => (
                <Col key={item.id} md={6} lg={4} className="mb-4">
                  <Card className="h-100 menu-card">
                  <Card.Img
                    variant="top"
                    src={`/images/${item.image}.jpg`}
                    alt={item.nom}
                    className="menu-card-img"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                    <Card.Body className="text-center">
                      <Card.Title className="fw-bold">{item.nom}</Card.Title>
                      <Card.Text>{item.pieces} pièces</Card.Text>
                      <Card.Text className="fw-bold text-danger">{item.prix} €</Card.Text>

                      <Card.Text>
                        {item.saveurs && item.saveurs.map((saveur, index) => (
                          <span key={index} className="me-1">{saveur}</span>
                        ))}
                      </Card.Text>

                      <div className="d-grid mt-3">
                      <Link to={`/menu/${item.id}`} className=" cacaBtn btn rounded-pill mx-1 bg-danger">Voir détails</Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Accueil;
