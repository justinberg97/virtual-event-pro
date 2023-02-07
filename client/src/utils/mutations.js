// Looks good 

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_EVENT = gql`
  mutation saveEvent($eventData: EventInput!) {
    saveEvent(eventData: $eventData) {
      _id
      username
      email
      savedEvents {
        host
        image
        description
        attendees
        title
        link
      }
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent(eventId: $eventId) {
      _id
      username
      email
      savedEvents {
        host
        image
        description
        attendees
        title
        link
      }
    }
  }
`;
