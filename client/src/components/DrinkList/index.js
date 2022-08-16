import { Container, Card } from "react-bootstrap";
import { Link } from 'react-router-dom'

// drink list is called to display a list of drink cards.
// Component is used in Search.js, Profile.js and anywhere else needing to display cards of drink recipe previews
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
const DrinkList = ({ drinks }) => {

  if (!drinks.length) {
    return <h5 style={{textAlign: "center", margin: "8vh"}}>None Found!</h5>;
  }

  return (
    <Container>
      
      {drinks &&
        drinks.map(drink => (
          // link to the SingleDrink page and send the drink as state
          <Link
            to={`/drink/${drink._id ? drink._id : drink.alternateId}`}
            key={drink._id ? drink._id : drink.alternateId}
            state={{ drink }}
          >
            <Card  border="dark" bg="dark">
              {drink.thumbnail && <Card.Img src={drink.thumbnail} alt={drink.name}/>}
              
              <Card.ImgOverlay >
                <Container className='card-content-container'>    
                  <Card.Header>
                    <Card.Title>{drink.name}</Card.Title>
                    <Card.Subtitle>by {drink.username}</Card.Subtitle>
                    {drink.username !== "TheCocktailDB.com" && <Card.Subtitle className="created-on">Created on {drink.createdAt}</Card.Subtitle>}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="glass-text">Served in a <span>{drink.glass}</span>:</Card.Text>
                      <ol>
                        {drink.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}<span>{drink.measurements[index]}</span></li>
                        ))}
                      </ol>
                  </Card.Body>
                </Container>
              </Card.ImgOverlay>
            </Card>
          </Link>
        ))}
    </Container>
  );
};

export default DrinkList;