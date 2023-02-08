// NEED TO FIX LINE 41

import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SAVE_EVENT } from "../utils/mutations";
import { QUERY_ME } from '../utils/queries';

import Auth from "../utils/auth";
import { SEARCH_EVENTS } from "../utils/queries";

const SearchEvents = () => {
  const [searchInput, setSearchInput] = useState("");

  const { data: loggedInUser } = useQuery(QUERY_ME);
  const [saveEvent] = useMutation(SAVE_EVENT);
  const [searchEvents, { refetch, data }] = useLazyQuery(SEARCH_EVENTS);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      await searchEvents({
        variables: { searchText: searchInput },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEvent = async (eventToSave) => {
    delete eventToSave._id;
    delete eventToSave.__typename;
    eventToSave.user = loggedInUser.me._id
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveEvent({
        variables: { eventData: eventToSave},
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const searchedEvents = data?.searchEvents;

  return (
    <>
      <Jumbotron fluid style={{ backgroundColor: "#7c4dff", color: "white" }}>
        <Container>
          <h1>Search for an Event</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for an event"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedEvents?.length
            ? `Viewing ${searchedEvents.length} results:`
            : "Search for an event"}
        </h2>
        <CardColumns>
          {searchedEvents?.map((event) => {
            return (
              <Card key={event._id} border="dark" className="customCard">
                {event.image ? (
                  <Card.Img
                    src={event.image}
                    alt={`${event.title} image`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <p className="small">Hosted by {event.host}</p>
                  <Card.Text>{event.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={loggedInUser?.me?.savedEvents?.some(
                        (e) => e.user === event.user
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveEvent(JSON.parse(JSON.stringify(event)))}
                    >
                      {loggedInUser?.me?.savedEvents?.some(
                        (e) => e.user === event.user
                      )
                        ? "Event Already Saved"
                        : "Save Event"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchEvents;
