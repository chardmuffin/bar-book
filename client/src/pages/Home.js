import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_DRINKS } from '../utils/queries';
import DrinkList from '../components/DrinkList'

const Home = () => {

  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_DRINKS);

  const drinks = data?.drinks || [];

  return (
    <main>
      <h3 className='my-3' style={{textAlign: "center"}}>Recently Viewed</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        !drinks.length ? (
          <h5 style={{textAlign: "center", marginTop: "25vh"}}>No Recent Drinks!</h5>
        ) : (
          <DrinkList drinks={drinks}></DrinkList>
      ))}
    </main>
  );
};

export default Home;