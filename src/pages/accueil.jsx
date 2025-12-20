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
        {/* Titre principal et sous-texte en haut */}
        <div className="page-header-section">
          <p className="page-subtitle text-white mb-2">Découvrez notre sélection</p>
          <h1 className="page-main-title text-white mb-5">頂きます</h1>
        </div>

        <div className="content-wrapper">
          <div className="sidebar-wrapper">
            <Sidebar menus={menus} onChange={(f) => setFilters(f)} />
          </div>

          <div className="cards-wrapper">
            <Row className="cards-row g-4">
              {filtered.map((item) => (
                <Col key={item.id} xs={12} sm={6} md={6} lg={4} xl={3} className="d-flex">
                  <Card className="menu-card w-100">
                    <Card.Body className="d-flex flex-column p-0">
                      {/* Titre avec nombre de pièces en haut */}
                      <div className="menu-card-header text-center py-3">
                        <Card.Title className="fw-bold mb-0 menu-card-pieces">
                          {item.pieces} PIÈCES
                        </Card.Title>
                      </div>

                      {/* Image au centre */}
                      <div className="menu-card-image-wrapper">
                        <Card.Img
                          src={`/images/${item.image}.jpg`}
                          alt={item.nom}
                          className="menu-card-img"
                        />
                      </div>

                      {/* Prix et nom en bas */}
                      <div className="menu-card-footer text-center py-3 px-3">
                        <Card.Text className="fw-bold text-danger mb-2 menu-card-price">
                          {item.prix} €
                        </Card.Text>
                        <Card.Title className="fw-bold mb-2 menu-card-name">
                          {item.nom.toUpperCase()}
                        </Card.Title>

                        {/* Saveurs (optionnel, peut être masqué ou stylisé différemment) */}
                        {item.saveurs && item.saveurs.length > 0 && (
                          <Card.Text className="menu-card-saveurs mb-3">
                            {item.saveurs.map((saveur, index) => (
                              <span key={index} className="me-1 badge bg-secondary">{saveur}</span>
                            ))}
                          </Card.Text>
                        )}

                        {/* Bouton Voir détails */}
                        <div className="d-grid mt-2">
                          <Link to={`/menu/${item.id}`} className="cacaBtn btn rounded-pill mx-1 bg-danger">
                            Voir détails
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Accueil;
