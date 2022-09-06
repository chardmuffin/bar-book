import React, { useEffect, useState } from "react";
import DrinkList from "../components/DrinkList";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { DRINK_SEARCH } from '../utils/queries';

const SearchDrinks = () => {
  // create state for holding returned api data
  const [searchedDrinks, setSearchedDrinks] = useState([]);

  // get the search input
  const { searchInput } = useParams();

  // use useQuery hook to make query request
  const { error, loading, data } = useQuery(DRINK_SEARCH, {
    variables: { nameInput:  searchInput }
  });

  useEffect(() => {
    try {
      setSearchedDrinks(data?.drinkSearch)
    } catch (err) {
      console.error(err);
    }
  }, [data, searchInput])

  return (
    <main className="container-fluid">
      {!searchedDrinks?.length ? (
        <h5 style={{textAlign: "center", marginTop: "12vh"}}>{loading ? "Loading..." : "Search for a drink!"}</h5>
      ) : (
        <DrinkList drinks={searchedDrinks}></DrinkList>
      )}
    </main>
  );
};

export default SearchDrinks;