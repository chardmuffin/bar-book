import { useQuery } from '@apollo/client';
import { QUERY_DRINK } from '../utils/queries';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { SAVE_DRINK } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import { useLocation } from 'react-router-dom';

// SingleDrink is a page with detail on a single drink.
// Page is linked to from DrinkList component
// the drinks from the args may be in format:
// drink {
//   _id : String representing unique id of the drink.         WARNING: drinks from API The CocktailDB.com do not have _id yet!
//   alternateId : drinks from API The CocktailDB.com have this, is unique
//   name : String name of the drink
//   thumbnail : String href for the drink picture
//   instructions : String for written instructions how to make drink
//   ingredients : [String] 1 ingredient per String, several Strings in an array (sometimes more than drink.measurements)
//   measurements : [String] 1 corresponding measurement for each ingredient in drink.ingredients --units may need converting 
//   glass : String name of the glass to serve the drink in
//   createdAt : Date when this was added to the db.
//   username : String username that submitted this drink, or "TheCocktailDB.com"
//   commentCount : Number number of comments on this drink
//   comments {
//     _id
//     createdAt
//     username
//     text
//     reactionCount
//     reactions {
//       _id
//       createdAt
//       username
//       reactionBody
//     }
//   }
// }

//TODO
// drinks from API TheCocktailDB.com need to be added to this db once viewed.    (to display as "recently viewed drinks" for home page),
// if a drink from DrinkList is clicked/tapped, call mutation addDrink to save the current drink to the API 
// WARNING: drinks from API The CocktailDB.com do not have _id yet!
const SingleDrink = async ({ drink }) => {

  console.log("drink from component props: ", drink)
  const location = useLocation();
  const { _id: drinkId } = useParams(); //only used if searched - when the drink is already part of the db (if it has an _id), use to load it:
  console.log("location.state", location.state)
  console.log("_id: drinkId", drinkId)

  // define saveDrink() from mutation
  const [addDrink] = useMutation(SAVE_DRINK);

  //if it is new to the db, must be from API. Add it to the db! and it will become data.drink
  drinkId?.length <= 7 && await addDrink({variables: {drink: {...drink}}})
  
  const { loading, data } = await useQuery(QUERY_DRINK, {
    variables: { _id: drinkId || location.state.drink._id }
  });

  console.log("from save: ", data.drink)

  const currentDrink = data.drink || location.state.drink
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <Card className="bg-dark text-white">
      <Container className='card-content-container'>
        <Card.Header>
          <Card.Title>{drink.name}</Card.Title>
          <Link to={`/profile/${drink.username}`} className="card-subtitle">
            <Card.Subtitle>by {drink.username}</Card.Subtitle>
          </Link>
          {drink.username !== "TheCocktailDB.com" && <Card.Subtitle className="created-on">Created on {drink.createdAt}</Card.Subtitle>}
        </Card.Header>
        <Card.Body>
          <ol>
            {drink.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}<span>{drink.measurements[index]}</span></li>
            ))}
          </ol>
          <Card.Text>Served in a <span>{drink.glass}</span>.</Card.Text>
          <Card.Text>{drink.instructions}</Card.Text>
        </Card.Body>
        <Card.Img src={drink.thumbnail} alt="drink image" />
      </Container>
      {drink.comments.map(comment => (
          <Card.Text className="pill mb-3" key={comment._id}>
            {comment.text}
            <Link to={`/profile/${comment.username}`}>
              {comment.username} on {comment.createdAt}
            </Link>
          </Card.Text>
        ))}
    </Card>
  );
};

export default SingleDrink;
