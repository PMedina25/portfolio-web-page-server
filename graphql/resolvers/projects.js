const { UserInputError } = require('apollo-server');
const Project = require('../../models/Project');
const checkAuth = require('../../util/check-auth');
const { validateProject } = require('../../util/validators');

module.exports = {
    Query: {
        async getProjects() {
            try {
                const projects = await Project.find();
                return projects;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getProject(_, { projectId }) {
            try {
                // We get the project using the project id
                const project = await Project.findById(projectId);

                if (project) {
                    return project;
                }
                else {
                    throw new Error('Project not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async addProject(_, { title, description, category, technologies, startDate, endDate, url, image }, context) {
            // Check that the admin is logged in
            checkAuth(context);

            // Validate project data
            const { valid, errors } = validateProject(title, description, category, technologies, startDate);
            if (!valid) {
                throw new UserInputError("Error", { errors });
            }

            // Make sure that the project does not exist
            const checkProject = await Project.findOne({ title });
            if (checkProject) {
                throw new UserInputError('Project already exists', {
                    errors: {
                        porject: 'This project already exists'
                    }
                });
            }

            const newProject = new Project({
                title,
                description,
                category,
                technologies,
                startDate,
                endDate,
                url,
                image
            });

            const project = await newProject.save();

            return project;
        },
        async updateProject(_, {projectId, title, description, category, technologies, startDate, endDate, url, image }, context) {
            // Check that the admin is logged in
            checkAuth(context);

            // Validate organization data
            const { valid, errors } = validateProject(title, description, category, technologies, startDate, image);
            if (!valid) {
                throw new UserInputError("Error", { errors });
            } 

            // Make sure that the project does not exist
            const checkProject = await Project.findOne({ title });
            if (checkProject) {
                // In case the projectId is different to the _id, it will mean that this project already exists
                if (checkProject.id !== projectId) {
                    throw new UserInputError('Project already exists', {
                        errors: {
                            porject: 'This project already exists'
                        }
                    });
                }
            }

            // By default, findOneAndUpdate() returns the document as it was before update was applied
            // To return the document after update was applied, set the new option to true
            const updateProject = await Project.findByIdAndUpdate({ _id: projectId }, {
                title,
                description,
                category,
                technologies,
                startDate,
                endDate,
                url,
                image
            }, { new: true });

            const project = await updateProject.save();

            return project;
        },
        async deleteProject(_, { projectId }, context) {
            // Check that the admin is logged in
            checkAuth(context);
            
            try {
                const project = await Project.findById(projectId);
                const deleteProject = await project.deleteOne();
                return deleteProject;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
}