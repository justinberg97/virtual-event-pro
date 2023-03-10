import React from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_EVENT } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeEvent, { error }] = useMutation(REMOVE_EVENT);

  const userData = data?.me || {};

  const handleDeleteEvent = async (eventId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeEvent({
        variables: { eventId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Jumbotron fluid style={{ backgroundColor: "#7c4dff", color: "white" }}>

        <Container>
          <h1>Showing {userData.username}'s Events</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.SavedEvents?.length
            ? `Viewing ${userData.SavedEvents.length} saved ${
                userData.savedEvents.length === 1 ? 'event' : 'events'
              }:`
            : ''}
        </h2>
        <CardColumns>
          {userData.savedEvents?.map((event, i) => {
            return (
              <Card key={i} border="dark" className= 'customCard'>
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
                  <p className="small">Description: {event.description}</p>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    Remove Event
                  </Button>
                </Card.Body>
              </Card> 
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Profile;
