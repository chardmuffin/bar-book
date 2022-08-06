import React from "react";
import { Link } from 'react-router-dom'
import { Container, Card } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DrinkList = ({ drinks }) => {
  if (!drinks.length) {
    return <h3>None Found!</h3>;
  }

  // TODO: calculate the height of the rendered content
  // card-spacer height = Card.Header height + Card.Body height - drink.thumbnail height

  return (
    <Container>
      
      {drinks &&
        drinks.map(drink => (
          <Card key={drink._id} border="dark" bg="dark">
            <Card.Img src={drink.thumbnail} />
            <div className='card-spacer'></div>
            <Card.ImgOverlay >
              <Container className='card-content-container'>
                
                <Card.Header>
                  <Link to={`/drink/${drink._id}`}>
                    <Card.Title>{drink.name}</Card.Title>
                  </Link>
                  <Link to={`/profile/${drink.username}`}>
                    by {drink.username}
                  </Link>
                  {drink.username !== "TheCocktailDB.com" && <Card.Text className="created-on">Created on {drink.createdAt}</Card.Text>}
                </Card.Header>
                
                <Card.Body>
                  <Link to={`/drink/${drink._id}`}>
                    <Card.Text>{drink.glass}</Card.Text>
                    <Row>
                      <Col>
                        <Card.Text>{drink.measurements.join(", \r\n")}</Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>{drink.ingredients.join(", ")}</Card.Text>
                      </Col>
                    </Row>
                  </Link>
                </Card.Body>
              </Container>
            </Card.ImgOverlay>
          </Card>
        ))}
    </Container>
  );
};

export default DrinkList;