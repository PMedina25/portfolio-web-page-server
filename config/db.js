const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config();

const connectDB = async (server, port) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan);
        console.log(`Server listening on port ${port}`);
        return server.listen({ port });
    } catch (error) {
        console.error(`Error: ${error.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;