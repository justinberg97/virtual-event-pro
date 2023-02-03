import React, { useState } from "react";
import { Container, Jumbotron, Card, CardColumns, Button } from "react-bootstrap";

function CreateEvents() {
  const [eventData, setEventData] = useState({
    host: "",
    title: "",
    description: "",
    attendees: "",
    eventID: ""
  });

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Jumbotron>
        <h1 className="text-center">Create Event</h1>
        <CardColumns>
          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="host">Host</label>
                  <input
                    type="text"
                    className="form-control"
                    id="host"
                    name="host"
                    value={eventData.host}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="attendees">Attendees</label>
                  <input
                    type="text"
                    className="form-control"
                    id="attendees"
                    name="attendees"
                    value={eventData.attendees}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventID">Event ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventID"
                    name="eventID"
                    value={eventData.eventID}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit">Create Event</Button>
              </form>
            </Card.Body>
          </Card>
        </CardColumns>
      </Jumbotron>
    </Container>
  );
}

export default CreateEvents;