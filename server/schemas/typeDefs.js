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
    comments: [Comment]
    friendCount: Int
    friends: [User]
    savedDrinks: [Drink]
    drinkCount: Int
    authoredDrinks: [Drink]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Drink {
    _id: ID
    alternateId: ID
    name: String
    thumbnail: String
    instructions: String
    ingredients: [String]
    measurements: [String]
    glass: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

  type Query {
    me: User
    drinks: [Drink]
    drink(_id: ID!): Drink
    users: [User]
    user(username: String!): User
    comments(drinkId: String): [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addDrink(alternateId: ID, name: String!, thumbnail: String, instructions: String!, ingredients: [String]!, measurements: [String]!, glass: String): Drink
    addComment(drinkId: ID!, text: String!): Comment
    addReaction(commentId: ID!, reactionBody: String!): Comment
    addFriend(friendId: ID!): User
  }
`;

//export typeDefs
module.exports = typeDefs;