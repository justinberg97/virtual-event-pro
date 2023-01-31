import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedEvents {
        EventId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
