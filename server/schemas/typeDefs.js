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
    eventId: ID!
    host: [String]
    description: String
    attendees: String
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input EventInput {
    host: [String]
    description: String!
    attendees: String!
    eventId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
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
