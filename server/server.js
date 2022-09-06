const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// create Apollo server to pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create a new instance of Apollo server with GraphQL schema
const startApolloServer = (typeDefs, resolvers) => {
  await server.start();

  //integrate Apollo server with express application as middleware
  server.applyMiddleware({ app });

  // Serve up static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', async () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      //log where to test GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
  });
};

// call function to start sever (async)
startApolloServer(typeDefs, resolvers);