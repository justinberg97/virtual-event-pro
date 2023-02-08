import React, { useState } from "react";
import {
  Container,
  Jumbotron,
  Card,
  CardColumns,
  Button,
} from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SAVE_EVENT } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

function CreateEvents() {
  const [eventData, setEventData] = useState({
    host: "",
    title: "",
    description: "",
    attendees: "",
  });

  const loggedInUser = Auth.getProfile();  

  const [saveEvent, { error }] = useMutation(SAVE_EVENT);

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {

    event.preventDefault();

    try {
      console.log(eventData)
      const {data} = saveEvent({
        variables: {
          eventData: {
            title: eventData.title,
            host: eventData.host,
            description: eventData.description,
            user: loggedInUser.data._id
          }
        }
      })
      console.log(data)
      navigate("/profile")
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Container className="create-container">
      <Jumbotron>
        <h1 className="text-center">Create Event</h1>
        <CardColumns>
          <Card>
            <Card.Body className="create-event">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="host">Event Host:</label>
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
                  <label htmlFor="title">Event Title:</label>
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
                  <label htmlFor="description">Event Description:</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="attendees">Attendees</label>
                  <input
                    type="text"
                    className="form-control"
                    id="attendees"
                    name="attendees"
                    value={eventData.attendees}
                    onChange={handleChange}
                  />
                </div> */}
                <Button variant="success" type="submit">Create Event</Button>
              </form>
            </Card.Body>
          </Card>
        </CardColumns>
      </Jumbotron>
    </Container>
  );
}

export default CreateEvents;
