const { gql } = require('apollo-server-express');

//create typeDefs
const typeDefs = gql`
  type Comment {
    _id: ID
    text: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    comments: [Comment]
    friends: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Cocktail {
    _id: ID
    name: String
    instructions: String
    ingredients: [String]
    measurements: [String]
    glass: String
    author: User
    comments: [Comment]
    thumbnail: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addComment(text: String!): Comment
    addReaction(commentId: ID!, reactionBody: String!): Comment
    addFriend(friendId: ID!): User
  }
`;

//export typeDefs
module.exports = typeDefs;