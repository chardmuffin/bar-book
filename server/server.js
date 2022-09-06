const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const path = require('path');

// used to seed production db
const { Drink } = require('./models');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3001;

// create Apollo server to pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create a new instance of Apollo server with GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  //integrate Apollo server with express application as middleware
  server.applyMiddleware({ app });

  // Serve up static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', async () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      //log where to test GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });




    //ran once to seed production
    //
    //
    //
    //
    //
    await Drink.deleteMany({});
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
    //
    //
    //
    //
  });
};

// call function to start sever (async)
startApolloServer(typeDefs, resolvers);