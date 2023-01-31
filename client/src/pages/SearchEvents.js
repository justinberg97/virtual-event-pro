// NEED TO FIX LINE 41

import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { SAVE_EVENT } from '../utils/mutations';
import { saveEventIds, getSavedEventIds } from '../utils/localStorage';

import Auth from '../utils/auth';

const SearchEvents = () => {
  const [searchedEvents, setSearchedEvents] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [savedEventIds, setSavedEventIds] = useState(getSavedEventIds());

  const [saveEvent, { error }] = useMutation(SAVE_EVENT);

  useEffect(() => {
    return () => saveEventIds(savedEventIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const eventData = items.map((event) => ({
        eventId: event.id,
        host: event.volumeInfo.host || ['No host to display'],
        title: event.volumeInfo.title,
        description: event.volumeInfo.description,
        image: event.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedEvents(eventData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveEvent = async (eventId) => {
    const eventToSave = searchedEvents.find((event) => event.eventId === eventId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveEvent({
        variables: { eventData: { ...eventToSave } },
      });
      console.log(savedEventIds);
      setSavedEventIds([...savedEventIds, eventToSave.eventId]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Events!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a event"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedEvents.length
            ? `Viewing ${searchedEvents.length} results:`
            : 'Search for a event to begin'}
        </h2>
        <CardColumns>
          {searchedEvents.map((event) => {
            return (
              <Card key={event.eventId} border="dark">
                {event.image ? (
                  <Card.Img
                    src={event.image}
                    alt={`The cover for ${event.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <p className="small">Host: {event.host}</p>
                  <Card.Text>{event.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedEventIds?.some(
                        (savedId) => savedId === event.eventId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveEvent(event.eventId)}
                    >
                      {savedEventIds?.some((savedId) => savedId === event.eventId)
                        ? 'Event Already Saved!'
                        : 'Save This Event!'}
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
