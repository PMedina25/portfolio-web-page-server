const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');

module.exports = (context) => {
    // context = { ... header }
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        // Bearer ...
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const admin = jwt.verify(token, process.env.SECRET_KEY);
                return admin;
            } catch(err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
}