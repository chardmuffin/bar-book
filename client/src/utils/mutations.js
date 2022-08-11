import { gql } from '@apollo/client';

export const SAVE_DRINK = gql`
  mutation addDrink($newDrink: drinkInput!) {
    addDrink(newDrink: $newDrink) {
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