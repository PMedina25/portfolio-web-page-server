const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const Admin = require('../../models/Admin');
const checkAuth = require('../../util/check-auth');


// Salt rounds for the hash
const SALT_ROUNDS = 12;

function generateToken(admin) {
    return jwt.sign({
        id: admin.id,
        username: admin.username
    }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const {errors, valid} = validateLoginInput(username, password);
            const admin = await Admin.findOne({ username });

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            if (!admin) {
                errors.general = 'Admin not found';
                throw new UserInputError('Admin not found', { errors });
            }

            const match = await bcrypt.compare(password, admin.password);
            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(admin);

            return {
                ...admin._doc,
                id: admin._id,
                token
            }
        },
        async register(_, { registerInput: { username, password, confirmPassword }}, context) {
            // Check that the admin is logged in
            // The only person that can register a new admin is and admin
            checkAuth(context);

            // Validate admin data
            const { valid, errors } = validateRegisterInput(username, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // Make sure does not already exist
            const admin = await Admin.findOne({ username });
            if (admin) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }

            // As hashing is designed to be computationally intensive, it is recommended to do so
            // asynchronously on your server as to aboid blocking incoming connections while you hash.
            // All you have to do to hash a password asynchronous is call:
            password = await bcrypt.hash(password, SALT_ROUNDS);

            // Hash password and create and auth token
            const newAdmin = new Admin({
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newAdmin.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}