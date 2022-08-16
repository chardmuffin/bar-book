import { useQuery } from '@apollo/client';
import { QUERY_DRINK } from '../utils/queries';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { Link, useParams, useLocation } from 'react-router-dom';
import { SAVE_DRINK } from '../utils/mutations';
import { useMutation } from "@apollo/client";
import { useState, useEffect } from 'react'

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

// TODO
// drinks from API TheCocktailDB.com need to be added to this db once viewed.    (to display as "recently viewed drinks" for home page),
// if a drink from DrinkList is clicked/tapped, call mutation addDrink to save the current drink to the DB 
// WARNING: drinks from API The CocktailDB.com do not have _id yet!
const SingleDrink = drink => {

  const [currentDrink, setCurrentDrink] = useState(null)

  //locationDrink will only have a value if the SingleDrink page was navigated to from a DrinkList
  const useLocationState = useLocation().state || {}
  const locationDrink = useLocationState.drink;
  const [addDrink] = useMutation(SAVE_DRINK);

  const _id = useParams().id;

  // NOTE: if the _id.length <= 7, QUERY_DRINK will automatically query for alternateId instead!
  const { error, loading, data } = useQuery(QUERY_DRINK, {
    
    variables: { id: _id }
    // OR:     { alternateId: _id }
  })

  useEffect(() => {

    // declare the async func to add drink to db and set the newly added drink as current
    const createNewDrink = async () => {
      //console.log("drink not found in db, adding", locationDrink.alternateId);

      const results = await addDrink({
        variables: { newDrink: { ...locationDrink } },
      })

      console.log("drink not found in db, added:", results.data.addDrink)
      
      setCurrentDrink(results.data.addDrink);
    }

    // if the query has an error
    if (error) console.log("error", error.message);

    // if the query finds the drink in db, set it to the currentDrink
    // if query finds empty drink, create new drink from state to the db
    // console.log("data", data)
    if (data) {
      if (data.drink) {
        console.log("db match found, displaying:", data.drink)
        setCurrentDrink(data.drink)
      } 
      else {
        createNewDrink()
          .catch(err => console.log(err))
      }
    }

  }, [locationDrink, addDrink, error, data])

  return (
    // <div>fail</div>
    <main>
      {currentDrink===null ? (
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
