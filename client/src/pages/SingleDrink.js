import React from 'react';

const SingleDrink= props => {
  return (
    <div>
      <div className="card">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{' '}
          created on createdAt
        </p>
        <div className="card-body">
          <p>Drink Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleDrink;
