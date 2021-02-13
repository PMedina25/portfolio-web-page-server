const { model, Schema } = require('mongoose');

// We can use GraphQL to specify which fields are required
const organizationSchema = new Schema({
    name: String,
    description: String,
    type: String,
    startDate: String,
    endDate: String,
    url: String,
    image: String
});

module.exports = model('Organization', organizationSchema);