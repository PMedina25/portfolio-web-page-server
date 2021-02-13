const { ApolloServer } = require('apollo-server');
const dotenv = require('dotenv');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./config/db');

// Load env vars 
dotenv.config();

// Set Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ( { req }) => ({ req })
});

// Set port
const port = process.env.PORT || 5000;

// Establish connection to mongoDB
connectDB(server, port);