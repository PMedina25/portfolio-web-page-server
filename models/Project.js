const { model, Schema } = require('mongoose');

// We can use GraphQL to specify which fields are required
const projectSchema = new Schema({
    title: String,
    description: String,
    category: String,
    technologies: [String],
    startDate: String,
    endDate: String,
    url: String,
    image: String
});

module.exports = model('Project', projectSchema);