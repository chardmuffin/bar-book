import React, { useCallback, useEffect, useState } from "react";
import DrinkList from "../components/DrinkList";
import { useParams } from "react-router-dom";

const SearchDrinks = () => {
  // create state for holding returned api data
  const [searchedDrinks, setSearchedDrinks] = useState([]);
  
  // get the search input
  const { searchInput } = useParams();

  const fetchAndCleanResults = useCallback(async (searchInput) => {

    if (!searchInput) {
      return false;
    }

    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`
    );
    const {drinks} = await response.json();

    //console.log("queried drinks raw data: ", drinks);

    const drinkData = drinks.map((drink) => {

      let ingredients = [drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7, drink.strIngredient8, drink.strIngredient9, drink.strIngredient10];
      let measurements = [drink.strMeasure1, drink.strMeasure2, drink.strMeasure3, drink.strMeasure4, drink.strMeasure5, drink.strMeasure6, drink.strMeasure7, drink.strMeasure8, drink.strMeasure9, drink.strMeasure10];

      //remove blank items
      const filteredIngredients = ingredients.filter(Boolean);
      const filteredMeasurements = measurements.filter(Boolean);
      //TODO standardize measurements here

      return {
        alternateId: drink.idDrink,
        name: drink.strDrink,
        glass: drink.strGlass,
        ingredients: filteredIngredients,
        measurements: filteredMeasurements,
        instructions: drink.strInstructions,
        username: "TheCocktailDB.com",
        thumbnail: drink.strDrinkThumb
      }
    });

    console.log("cleaned search results: ", drinkData);
    setSearchedDrinks(drinkData);
  }, [])

  useEffect(() => {

    try {
      console.log("searchInput: ", searchInput);
      fetchAndCleanResults(searchInput);
    } catch (err) {
      console.error(err);
    }

  }, [searchInput, fetchAndCleanResults])

  return (
    <main>
      {!searchedDrinks?.length ? (
        <h5 style={{textAlign: "center", marginTop: "25vh"}}>Search for a drink!</h5>
      ) : (
        <DrinkList drinks={searchedDrinks}></DrinkList>
      )}
    </main>
  );
};

export default SearchDrinks;