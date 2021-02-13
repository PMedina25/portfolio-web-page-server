const { UserInputError } = require('apollo-server');

const { validateOrganization } = require('../../util/validators');
const Organization = require('../../models/Organization');
const checkAuth = require('../../util/check-auth');


module.exports = {
    Query: {
        async getOrganizations() {
            try {
                const organizations = await Organization.find();
                return organizations;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getOrganization(_, { organizationId }) {
            try {
                // We get the organization using the organization id
                const organization = await Organization.findById(organizationId);

                if (organization) {
                    return organization;
                }
                else {
                    throw new Error('Organization not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async addOrganization(_, { name, description, type, startDate, endDate, url, image }, context) {
            // Check that the admin is logged in
            checkAuth(context);

            // Validate organization data
            const { valid, errors } = validateOrganization(name, description, type, startDate, endDate, image);
            if (!valid) {
                throw new UserInputError("Error", { errors });
            } 

            const newOrganization = new Organization({
                name,
                description,
                type,
                startDate,
                endDate,
                url,
                image
            });

            const organization = await newOrganization.save();

            return organization;
        },
        async updateOrganization(_, {organizationId, name, description, type, startDate, endDate, url, image }, context) {
            // Check that the admin is logged in
            checkAuth(context);

            // Validate organization data
            const { valid, errors } = validateOrganization(name, description, type, startDate, endDate, image);
            if (!valid) {
                throw new UserInputError("Error", { errors });
            } 

            // By default, findOneAndUpdate() returns the document as it was before update was applied
            // To return the document after update was applied, set the new option to true
            const updateOrganization = await Organization.findByIdAndUpdate({ _id: organizationId }, {
                name,
                description,
                type,
                startDate,
                endDate,
                url,
                image
            }, { new: true });

            const organization = await updateOrganization.save();

            return organization;
        },
        async deleteOrganization(_, { organizationId }, context) {
            // Check that the admin is logged in
            checkAuth(context);
            
            try {
                const organization = await Organization.findById(organizationId);
                const deleteOrganization = await organization.deleteOne();
                return deleteOrganization;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
}