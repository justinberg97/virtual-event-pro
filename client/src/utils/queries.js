import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedEvents {
        host
        description
        attendees
        title
        _id
        user
      }
    }
  }
`;

export const SEARCH_EVENTS = gql`
  query SearchEvents($searchText: String!) {
    searchEvents(searchText: $searchText) {
      _id
      host
      description
      attendees
      title
      user
    }
  }
`;
