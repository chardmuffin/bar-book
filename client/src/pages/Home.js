import React, { useEffect, useState } from 'react';
import DrinkList from '../components/DrinkList'

const Home = () => {
  
  const [drinks, setDrinks] = useState();

  useEffect(() => {
    try {
      // load drink history for easy access
      setDrinks(JSON.parse(localStorage.getItem("drinkHistory"))?.reverse());
      
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <main className="container-fluid">
      <h3 className='my-3' style={{textAlign: "center"}}>Recently Viewed</h3>
      {!drinks?.length ? (
        <h5 style={{textAlign: "center", marginTop: "25vh"}}>No Recent Drinks!</h5>
      ) : (
        <DrinkList drinks={drinks}></DrinkList>
      )}
    </main>
  );
};

export default Home;