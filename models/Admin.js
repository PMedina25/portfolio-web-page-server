const { model, Schema } = require('mongoose');

// We can use GraphQL to specify which fields are required!!
const adminSchema = new Schema({
    username: String,
    password: String,
    createdAt: String
});

module.exports = model('Admin', adminSchema);