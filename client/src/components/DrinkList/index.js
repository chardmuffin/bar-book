import React from 'react';

const DrinkList = ({ drinks, name }) => {
  if (!drinks.length) {
    return <h3>No Drinks Found</h3>;
  }

  console.log(name)

  return (
    <div>
      
      {drinks &&
        drinks.map(drink => (
          <div key={drink._id} className="card mb-3">
            <h3>{drink.name}</h3>
            <p className="card-header">
              {drink.username}
              {(drink.username !== "TheCocktailDB.com") ? (
                <p className="created-on">`Created on ${drink.createdAt}`</p>
              ) : ("")
              }
            </p>
            <div className="card-body">
              <p>{drink.ingredients.join(", ")}</p>
              <p className="mb-0">
                Comments: {drink.commentCount} || Click to{' '}
                {drink.commentCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DrinkList;