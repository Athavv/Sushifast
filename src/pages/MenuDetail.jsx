import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuById } from "../utils/boitesServices";
import { Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap";
import "../styles/MenuDetail.css";

function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    getMenuById(id).then((data) => setItem(data));
  }, [id]);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrement = () => setQuantity(quantity + 1);

  if (!item) {
    return (
      <div className="detail-page-wrapper d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <div className="detail-page-wrapper">
      <Container>
        <div className="py-4">
            <Button 
            variant="link" 
            onClick={() => navigate(-1)} 
            className="text-decoration-none text-white opacity-75 p-0"
            >
            ← Retour au menu
            </Button>
        </div>

        <Row className="align-items-center gx-lg-5">
          {/* COLONNE IMAGE : Prend plus de place et force l'agrandissement */}
          <Col lg={7} className="mb-5 mb-lg-0">
            <div className="image-wrapper-pro">
              <img
                src={`/images/${item.image}.jpg`}
                alt={item.nom}
                className="detail-hero-img"
              />
              <div className="floating-badge">
                <span className="fw-bold">{item.pieces}</span> pièces
              </div>
            </div>
          </Col>

          {/* COLONNE INFO */}
          <Col lg={5}>
            <div className="sticky-content">
                <h1 className="display-4 fw-bold mb-2">{item.nom}</h1>
                
                <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                    <span className="price-display">{item.prix} €</span>
                    <div className="d-flex gap-2">
                        {item.saveurs.map((s, i) => (
                        <Badge key={i} bg="transparent" className="border border-secondary text-light fw-normal p-2">
                            {s}
                        </Badge>
                        ))}
                    </div>
                </div>

                {item.description && (
                    <div className="mb-4">
                    <p className="text-light opacity-75 lh-lg">{item.description}</p>
                    </div>
                )}

                <div className="action-box">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="fw-bold text-white text-uppercase small ls-1">Quantité</span>
                        <div className="quantity-selector">
                            <button onClick={handleDecrement} className="qty-btn">−</button>
                            <span className="qty-value">{quantity}</span>
                            <button onClick={handleIncrement} className="qty-btn">+</button>
                        </div>
                    </div>

                    <Button 
                        variant="danger" 
                        size="lg" 
                        className="w-100 btn-action-pro py-3"
                    >
                        Ajouter au panier • {(item.prix * quantity).toFixed(2)} €
                    </Button>
                </div>

                {item.aliments && item.aliments.length > 0 && (
                    <div className="ingredients-box mt-4">
                    <h6 className="text-uppercase text-muted small fw-bold mb-3 ls-1">Composition</h6>
                    <ul className="list-unstyled mb-0">
                        {item.aliments.map((aliment, idx) => (
                        <li key={idx} className="ingredient-item d-flex justify-content-between">
                            <span className="text-white">{aliment.nom}</span>
                            {aliment.quantite && (
                            <span className="text-muted small">x{aliment.quantite}</span>
                            )}
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MenuDetail;