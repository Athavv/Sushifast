import { useEffect, useState } from "react";
import { getMenu } from "../utils/boitesServices";
import { Container, Row, Col, Card } from "react-bootstrap";

function Accueil() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu().then((data) => setMenu(data));
  }, []);

  return (
    <Container className="my-5 pt-5">
      <h2 className="text-center mb-4">Notre Menu 🍣</h2>
      <Row>
        {menu.map((item) => (
          <Col key={item.id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={`/images/${item.image}.jpg`}
                alt={item.nom}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body className="text-center">

                <Card.Title className="fw-bold">{item.nom}</Card.Title>

                <Card.Text>{item.pieces} pièces</Card.Text>

                <Card.Text className="fw-bold text-danger">
                  {item.prix} €
                </Card.Text>

                <Card.Text>
                    {item.saveurs.map((saveur, index) => (
                      <span key={index} className=" me-1">
                      {saveur}
                    </span>
                    ))}
                  </Card.Text>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Accueil;
