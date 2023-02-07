// Needs review (added the add event to your profile)

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    eventCount: Int
    savedEvents: [Event]
    attendEvents: [Event]
  }

  type Event {
    _id: ID!    
    host: String
    description: String
    attendees: String
    title: String!
    user: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  input EventInput {
    host: String
    description: String
    attendees: String
    title: String!
    user: ID!
  }

  type Query {
    me: User
    searchEvents(searchText: String!): [Event]    
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveEvent(eventData: EventInput!): User
    removeEvent(eventId: ID!): User
    attendEvent(eventData: EventInput!): User
  }
`;

module.exports = typeDefs;
