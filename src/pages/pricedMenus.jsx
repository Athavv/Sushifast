import { useEffect, useState } from "react";
import { getMenu } from "../utils/boitesServices";
import { Container, Row, Col, Card } from "react-bootstrap";

function MenusFiltres() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    getMenu().then((data) => {
      const filtres = data.filter( (menu) =>
          !menu.aliments.some(
            (aliment) => aliment.nom === "California Saumon Avocat"
          )
      );
      setMenus(filtres);
    });
  }, []);

  return (
    <Container className="my-5 pt-5">
      <h2 className="text-center mb-4">
        Menus sans California Saumon Avocat 
      </h2>
      <Row>
        {menus.map((item) => (
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

export default MenusFiltres;
