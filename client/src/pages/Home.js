import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_DRINKS } from '../utils/queries';
import DrinkList from '../components/DrinkList'

const Home = () => {

  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_DRINKS);

  const drinks = data?.drinks || [];
  console.log(drinks);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DrinkList drinks={drinks} title="yum"></DrinkList>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
