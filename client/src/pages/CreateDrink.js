import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useMutation } from '@apollo/client';
import { ADD_DRINK } from '../utils/mutations';
import { useNavigate } from "react-router-dom";


// users can create drinks to add to the db
// drinks are added in format:
// drink {
//   name : String name of the drink
//   thumbnail : String href for the drink picture
//   instructions : String for written instructions on how to make drink
//   ingredients : [String] 1 ingredient per String, several Strings in an array (sometimes more than drink.measurements)
//   measurements : [String] 1 corresponding measurement for each ingredient in drink.ingredients
//   glass : String name of the glass to serve the drink in
//   isVariation: Boolean true or false depending on if the drink is a recipe variation of an already existing drink
// }
const CreateDrink = () => {

  const [formState, setFormState] = useState({
    name: '',
    thumbnail: '',
    instructions: '',
    ingredient0: '',
    ingredient1: '',
    ingredient2: '',
    ingredient3: '',
    ingredient4: '',
    ingredient5: '',
    ingredient6: '',
    ingredient7: '',
    ingredient8: '',
    ingredient9: '',
    ingredient10: '',
    ingredient11: '',
    ingredient12: '',
    ingredient13: '',
    ingredient14: '',
    measurement0: '',
    measurement1: '',
    measurement2: '',
    measurement3: '',
    measurement4: '',
    measurement5: '',
    measurement6: '',
    measurement7: '',
    measurement8: '',
    measurement9: '',
    measurement10: '',
    measurement11: '',
    measurement12: '',
    measurement13: '',
    measurement14: '',
    glass: ''
  });
  const [addDrink, { error }] = useMutation(ADD_DRINK);
  let navigate = useNavigate();
  const indexHelp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  // update state based on form input changes
  const handleChange = (event) => {

    //console.log(event.target.value)

    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {

      let ingredients = [formState.ingredient0, formState.ingredient1, formState.ingredient2, formState.ingredient3, formState.ingredient4, formState.ingredient5, formState.ingredient6, formState.ingredient7, formState.ingredient8, formState.ingredient9, formState.ingredient10, formState.ingredient11, formState.ingredient12, formState.ingredient13, formState.ingredient14];
      let measurements = [formState.measurement0, formState.measurement1, formState.measurement2, formState.measurement3, formState.measurement4, formState.measurement5, formState.measurement6, formState.measurement7, formState.measurement8, formState.measurement9, formState.measurement10, formState.measurement11, formState.measurement12, formState.measurement13, formState.measurement14];
      
      //remove blank items
      const filteredIngredients = ingredients.filter(Boolean);
      const filteredMeasurements = measurements.filter(Boolean);

      //TODO standardize measurements here

      const drinkToCreate = {
        newDrink: {
          name: formState.name,
          glass: formState.glass,
          ingredients: filteredIngredients,
          measurements: filteredMeasurements,
          instructions: formState.instructions,
          thumbnail: formState.thumbnail,
          isVariation: false
        }
      };

      const { data } = await addDrink({ variables: drinkToCreate});
      
      console.log("created", data)

      navigate(`/drink/${data.addDrink._id}`)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="container-fluid">
      <h3>Create a Drink</h3>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="formDrinkName">
            <Form.Label>
              Drink Name
            </Form.Label>
            <Form.Control name="name" type="text" value={formState.name} placeholder="Drink Name" onChange={handleChange} />
          <Form.Text className="text-muted" style={{fontSize: ".8rem", fontStyle: "italic"}}>
            Choose a memorable name for your creation.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIngredientsAndMeasurements">
          <Form.Label>
            Ingredients and Measurements
          </Form.Label>

          {indexHelp.map(index => (
            <Row key={index} className="mb-1">
              <Col>
                <Form.Control name={`ingredient${index}`} type="text" placeholder="Ingredient" onChange={handleChange} />
              </Col>
              <Col>
                <Form.Control name={`measurement${index}`} type="text" placeholder="Measurement" onChange={handleChange} />
              </Col>
            </Row>
          ))}

        </Form.Group>

        <Form.Group controlId="formDrinkGlass">
          <Form.Label style={{fontSize: "1rem"}}>
            What kind of glass is the drink served in?
          </Form.Label>
          <Form.Control name="glass" type="text" value={formState.glass} placeholder="Glass" onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formDrinkInstructions">
          <Form.Label className="mt-3">
            Instructions
          </Form.Label>
          <Form.Control className="mb-3" name="instructions" as="textarea" rows={5} value={formState.instructions} placeholder="How is your drink made?" onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formThumbnail" className="mb-3">
          <Form.Label>
            Link to an image
          </Form.Label>
          <Form.Control name="thumbnail" type="text" value={formState.thumbnail} placeholder="https://www.pictures.com/milk.jpg" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="my-4 d-flex justify-content-center">
          <Button type="submit">Create Drink</Button>
        </Form.Group>
      </Form>
      {error && <div>Something went wrong ☹️</div>}
    </main>
  )
}

export default CreateDrink;