import { useQuery } from '@apollo/client';
import { QUERY_DRINK } from '../utils/queries';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// SingleDrink is a page with detail on a single drink.
// Page is linked to from DrinkList component
// the drinks from the args are in format:
// drink {
//   _id : String representing unique id of the drink.
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
const SingleDrink = () => {

  const [currentDrink, setCurrentDrink] = useState(null)

  const _id = useParams().id;
  const { error, loading, data } = useQuery(QUERY_DRINK, {
    variables: { id: _id }
  })
  
  // if the query has an error
  if (error) console.log("error", error.message);

  //add the current drink to recently viewed drinks if not already
  useEffect(() => {
    if (currentDrink) {
      //get drinkHistory from localStorage
      let drinkHistory = JSON.parse(localStorage.getItem("drinkHistory"));

      // start a drinkHistory if empty
      if (drinkHistory === null) {
        drinkHistory = [currentDrink];
      }
      else {
        // if drinkHistory not empty, see if drink is already in history
        const index = drinkHistory.findIndex((drink) => {
          return currentDrink._id === drink._id;
        });
        if (index !== -1) {
          // drink is already in history, let's remove it and...
          drinkHistory.splice(index, 1);
        }
        // add drink to top of history
        drinkHistory.push(currentDrink);

        // remove oldest search item if more than 15 items
        if (drinkHistory.length > 15) {
          drinkHistory.shift();
        }
      }

      //save to local storage
      localStorage.setItem("drinkHistory", JSON.stringify(drinkHistory));
    }
  }, [currentDrink])

  useEffect(() => {
    // set the currentDrink
    try{
      setCurrentDrink(data?.drink)
    } catch (err) {
      console.error(err);
    }

  }, [data])

  return (
    // <div>fail</div>
    <main>
      {!currentDrink ? (
        <p>Loading...</p>
      ) : (
        <Card className="bg-dark text-white">
        <Container className='card-content-container'>
          <Card.Header className='card-header-single-drink'>
            <Card.Title className='title-single-drink'>{currentDrink.name}</Card.Title>
            <Link to={`/profile/${currentDrink.username}`} className="card-subtitle">
              <Card.Subtitle>by {currentDrink.username}</Card.Subtitle>
            </Link>
            {currentDrink.username !== "TheCocktailDB.com" &&
              <Card.Subtitle className="created-on">Created on {currentDrink.createdAt}</Card.Subtitle>
            }
          </Card.Header>
          <Card.Body>
            <ol className='ingredients-single-drink'>
              {currentDrink.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}<span>{currentDrink.measurements[index]}</span></li>
              ))}
            </ol>
            <Card.Text className='glass-text'>Served in a <span>{currentDrink.glass}</span>.</Card.Text>
            <Card.Text>{currentDrink.instructions}</Card.Text>
          </Card.Body>
          <Card.Img src={currentDrink.thumbnail} alt="drink image" />
        </Container>
          {currentDrink.comments?.map(comment => (
            <Card.Text className="pill mb-3" key={comment._id}>
              {comment.text}
              <Link to={`/profile/${comment.username}`}>
                {comment.username} on {comment.createdAt}
              </Link>
            </Card.Text>
          ))}
        </Card>
      )}
    </main>
  );
};

export default SingleDrink;
