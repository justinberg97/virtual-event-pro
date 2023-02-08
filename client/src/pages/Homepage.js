import React from "react";
import { Container, Jumbotron, Card, CardColumns } from "react-bootstrap";

function HomePage() {
  return (
    <Container>
      <Jumbotron style={{ backgroundColor: "#7c4dff", color: "white", borderRadius: "55%", padding: "80px"}}>
        <h1 className="text-center ">Welcome to Virtual Event Pro</h1>
      </Jumbotron>
      <CardColumns className="center">
        <Card className="center customCard">
          <Card.Body>
            <Card.Title>Virtual Event Pro</Card.Title>
            <Card.Text>
              Organize and host events with ease using Virtual Event Pro. Using this app you can create a profile to save and schedule your own events, while also viewing events from other users to save and attend. Signup to begin, or login to continue to your profile!
            </Card.Text>
          </Card.Body>
        </Card>
      </CardColumns>
    </Container>
  );
}

export default HomePage;