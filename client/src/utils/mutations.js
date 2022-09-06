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

export const SAVE_DRINK = gql`
  mutation addDrink($newDrink: drinkInput!) {
    addDrink(newDrink: $newDrink) {
      _id
      name
      thumbnail
      instructions
      ingredients
      measurements
      glass
      isVariation
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        text
        reactionCount
        reactions {
          _id
          createdAt
          username
          reactionBody
        }
      }
    }
  }
`;