import { gql } from '@apollo/client';

export const SAVE_DRINK = gql`
  mutation addDrink($alternateId: ID, $name: String!, $thumbnail: String, $instructions: String!, $ingredients: [String]!, $measurements: [String]!, $glass: String) {
    addDrink(alternateId: $alternateId, name: $name, thumbnail: $thumbnail, instructions: $instructions, ingredients: $ingredients, measurements: $measurements, glass: $glass) {
      _id
      alternateId
      name
      thumbnail
      instructions
      ingredients
      measurements
      glass
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