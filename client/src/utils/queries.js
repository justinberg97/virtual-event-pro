import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedEvents {
        eventId
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
