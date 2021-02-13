const { ApolloServer } = require('apollo-server');
const path = require('path');
const dotenv = require('dotenv');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./config/db');

// Load env vars 
dotenv.config();

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

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