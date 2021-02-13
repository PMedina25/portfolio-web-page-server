const adminsResolvers = require('./admins');
const projectsResolvers = require('./projects');
const organizationsResolvers = require('./organizations');

module.exports = {
    Query: {
        ...projectsResolvers.Query,
        ...organizationsResolvers.Query
    },
    Mutation: {
        ...adminsResolvers.Mutation,
        ...projectsResolvers.Mutation,
        ...organizationsResolvers.Mutation
    }
};