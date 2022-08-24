const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const path = require('path');

const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

require("dotenv").config({
  path: path.resolve(__dirname, '../.env')
});

const PORT = process.env.PORT || 3001;
console.log(process.env.PORT)
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit: '50mb'}));

// Use cors middleware to allow React server with port 3000 for development and 5000 for production(build) to communicate with the backend server (port 5000)
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.MODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server 
  startApolloServer(typeDefs, resolvers);