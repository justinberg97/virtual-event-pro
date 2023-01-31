// Needs review

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    eventCount: Int
    savedEvents: [Event]
  }

  type Event {
    eventId: ID!
    host: [String]
    description: String
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
  }
`;

module.exports = typeDefs;
