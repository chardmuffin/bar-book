import { gql } from '@apollo/client';

export const QUERY_COMMENTS = gql`
  query comments($username: String) {
    comments(username: $username) {
      _id
      text
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_DRINKS = gql`
  query getDrinks {
    drinks {
      _id
      alternateId
      name
      thumbnail
      ingredients
      measurements
      instructions
      glass
      createdAt
      username
      commentCount
      comments {
        _id
        text
        username
        createdAt
        reactionCount
        reactions {
          _id
          reactionBody
          username
          createdAt
        }
      }
    }
  }
`;