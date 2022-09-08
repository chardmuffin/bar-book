const faker = require('faker');

const db = require('../config/connection');
const { Comment, User, Drink } = require('../models');

const fetch = require('node-fetch');

db.once('open', async () => {
  await Comment.deleteMany({});
  await User.deleteMany({});
  await Drink.deleteMany({});

  // create user data
  const userData = [];
  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne(
      { _id: userId },
      { $addToSet: { friends: friendId } }
    );
  }

  // fetch and create drinks
  let createdDrinks = [];
  for (let i = 65; i <= 90; i++) {
    const firstLetter = String.fromCharCode(i).toLowerCase();

    if (firstLetter === "u" || firstLetter === "x") {
      continue;
    }

    // fetch all drinks by first letter from API @ `https://thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
    const response = await fetch(
      `https://thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
    );
    const {drinks} = await response.json();

    //console.log("queried drinks raw data: ", drinks);

    for (const drink of drinks) {

      let ingredients = [drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7, drink.strIngredient8, drink.strIngredient9, drink.strIngredient10, drink.strIngredient11, drink.strIngredient12, drink.strIngredient13, drink.strIngredient14, drink.strIngredient15];
      let measurements = [drink.strMeasure1, drink.strMeasure2, drink.strMeasure3, drink.strMeasure4, drink.strMeasure5, drink.strMeasure6, drink.strMeasure7, drink.strMeasure8, drink.strMeasure9, drink.strMeasure10, drink.strMeasure11, drink.strMeasure12, drink.strMeasure13, drink.strMeasure14, drink.strMeasure15];

      //remove blank items
      const filteredIngredients = ingredients.filter(Boolean);
      const filteredMeasurements = measurements.filter(Boolean);

      //TODO standardize measurements here

      createdDrinks.push({
        name: drink.strDrink,
        glass: drink.strGlass,
        ingredients: filteredIngredients,
        measurements: filteredMeasurements,
        instructions: drink.strInstructions,
        username: "TheCocktailDB.com",
        thumbnail: drink.strDrinkThumb,
        isVariation: false
      });
    };
  }

  await Drink.collection.insertMany(createdDrinks);

  console.log('all done!');
  process.exit(0);
});
