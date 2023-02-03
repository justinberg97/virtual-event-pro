import React from "react";
import { Container, Jumbotron, Card, CardColumns } from "react-bootstrap";

function HomePage() {
  return (
    <Container>
      <Jumbotron style={{ backgroundColor: "#7c4dff", color: "white", borderRadius: "50%", width: ""}}>
        <h1 className="text-center, ">Welcome to Virtual Event Pro</h1>
      </Jumbotron>
      <CardColumns>
        <Card style={{ backgroundColor: "white", color: "#7c4dff" }}>
          <Card.Body>
            <Card.Title>Virtual Event Pro</Card.Title>
            <Card.Text style={{ borderRadius: "50%, width: 100px: height: 100px," }}>
              Organize and host events with ease using Virtual Event Pro.  Signup to begin, or Login to continue to your profile!
              </Card.Text>

          </Card.Body>
        </Card>
      </CardColumns>
    </Container>
  );
}

export default HomePage;