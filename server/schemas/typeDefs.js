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
    commentCount: Int
    comments: [Comment]
    friendCount: Int
    friends: [User]
    drinkCount: Int
    authoredDrinks: [Drink]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Drink {
    _id: ID
    name: String
    thumbnail: String
    instructions: String
    ingredients: [String]
    measurements: [String]
    glass: String
    isVariation: Boolean
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }

  input drinkInput {
    name: String
    thumbnail: String
    instructions: String
    ingredients: [String]
    measurements: [String]
    glass: String
    isVariation: Boolean
  }

  type Query {
    me: User
    drinks: [Drink]
    drink(_id: ID!): Drink
    drinkSearch(nameInput: String): [Drink]
    users: [User]
    user(username: String!): User
    comments(drinkId: String): [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addDrink(newDrink: drinkInput!): Drink
    addComment(drinkId: ID!, text: String!): Comment
    addReaction(commentId: ID!, reactionBody: String!): Comment
    addFriend(friendId: ID!): User
    deleteDrink(drinkId: ID!): Drink
  }
`;

//export typeDefs
module.exports = typeDefs;