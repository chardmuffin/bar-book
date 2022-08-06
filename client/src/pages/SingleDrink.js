import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_DRINK } from '../utils/queries';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

const SingleDrink= props => {

  const { id: drinkId } = useParams();
  
  const { loading, data } = useQuery(QUERY_DRINK, {
    variables: { id: drinkId }
  });
  
  const drink = data?.drink || {};
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    // if search result - format
    <Card className="bg-dark text-white">
      <Card.Img src="https://placekitten.com/300/400" alt="Card image" />
      <Card.ImgOverlay>
        
        <Card.Text>Ingredients: {drink.ingredients.join(", ")}</Card.Text>
        <Card.Text>Measurements: {drink.measurements.join(", ")}</Card.Text>
        <Card.Text>{drink.glass}</Card.Text>
        <Card.Text>{drink.instructions}</Card.Text>
        <Card.Title>{drink.name}</Card.Title>
        <Link to={`/profile/${drink.username}`}><Card.Text>by {drink.username}</Card.Text></Link>
        {drink.comments.map(comment => (
            <Card.Text className="pill mb-3" key={comment._id}>
              {comment.text} {'// '}
              <Link to={`/profile/${comment.username}`}>
                {comment.username} on {comment.createdAt}
              </Link>
            </Card.Text>
          ))}
      </Card.ImgOverlay>
    </Card>
  );
};

export default SingleDrink;
