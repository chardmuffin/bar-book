import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import DrinkList from "../components/DrinkList";

const SearchDrinks = () => {
  // create state for holding returned api data
  const [searchedDrinks, setSearchedDrinks] = useState([]);
  // create state for holding search field string value
  const [searchInput, setSearchInput] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    setSearchInput(event.target.value);

    if (!searchInput) {
      return false;
    }

    try {
      console.log("searchInput: ", searchInput);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`
      );
      const { drinks } = await response.json();

      //console.log("queried drinks raw data: ", drinks);

      const drinkData = drinks.map((drink) => {

        let ingredients = [drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7, drink.strIngredient8, drink.strIngredient9, drink.strIngredient10];
        let measurements = [drink.strMeasure1, drink.strMeasure2, drink.strMeasure3, drink.strMeasure4, drink.strMeasure5, drink.strMeasure6, drink.strMeasure7, drink.strMeasure8, drink.strMeasure9, drink.strMeasure10];

        //remove blank items
        const filteredIngredients = ingredients.filter(Boolean);
        const filteredMeasurements = measurements.filter(Boolean);

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
      //setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Search for a Drink</Form.Label>
            <Form.Control type="textarea" rows={1} placeholder="old fashioned" onChange={onSubmit} />
          </Form.Group>
        </Form>
      </Container>
      {!searchedDrinks.length ? (
          <h5 style={{textAlign: "center", marginTop: "25vh"}}>Search for a drink!</h5>
        ) : (
          <DrinkList drinks={searchedDrinks}></DrinkList>
      )}
    </main>
  );
};

export default SearchDrinks;