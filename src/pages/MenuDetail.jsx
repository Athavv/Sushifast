import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuById } from "../utils/boitesServices";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getMenuById(id).then((data) => setItem(data));
  }, [id]);

  if (!item) {
    return (
      <Container className="my-5 pt-5 text-center">
        <h3>Chargement...</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5 pt-5">
      <Button variant="link" onClick={() => navigate(-1)} className="mb-3 text-white">
        ← Retour
      </Button>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0 menu-card">
            <Card.Img
              variant="top"
              src={`/images/${item.image}.jpg`}
              alt={item.nom}
              className="menu-card-img"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="fw-bold">{item.nom}</Card.Title>
              <Card.Text>{item.pieces} pièces</Card.Text>
              <Card.Text className="fw-bold text-danger">{item.prix} €</Card.Text>

              <Card.Text>
                <strong>Saveurs :</strong>
                <div>
                  {item.saveurs.map((s, i) => (
                    <span key={i} className="me-2">
                      {s}
                    </span>
                  ))}
                </div>
              </Card.Text>

              {item.description && (
                <Card.Text>
                  <strong>Description :</strong>
                  <div>{item.description}</div>
                </Card.Text>
              )}

              {item.aliments && item.aliments.length > 0 && (
                <Card.Text>
                  <strong>Aliments inclus :</strong>
                  <ul className="mt-3">
                    {item.aliments.map((aliment, idx) => (
                      <li key={idx}>
                        <span>{aliment.nom}</span>
                        {aliment.quantite && (
                          <span className="ms-2 text-muted">
                            ({aliment.quantite} {aliment.quantite > 1 ? "portions" : "portion"})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuDetail;


