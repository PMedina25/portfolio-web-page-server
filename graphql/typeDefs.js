const { gql } = require('apollo-server');

module.exports = gql`
    type Project {
        id: ID!
        title: String!
        description: String!
        category: String!
        technologies: [String]!
        startDate: String!
        endDate: String
        url: String
        image: String
    }
    type Organization {
        id: ID!
        name: String!
        description: String!
        type: String!
        startDate: String!
        endDate: String!
        url: String!
        image: String
    }
    type Admin {
        id: ID!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
    }
    type Query {
        getProjects: [Project]
        getProject(projectId: ID!): Project
        getOrganizations: [Organization]
        getOrganization(organizationId: ID!): Organization
    },
    type Mutation {
        register(registerInput: RegisterInput): Admin!
        login(username: String!, password: String!): Admin!
        addProject(title: String!, description: String!, category: String!, technologies: [String]!, startDate: String!, endDate: String, url: String, image: String): Project!
        addOrganization(name: String!, description: String!, type: String!, startDate: String!, endDate: String!, url: String, image: String): Organization!
        updateProject(projectId: ID!, title: String!, description: String!, category: String!, technologies: [String]!, startDate: String!, endDate: String, url: String, image: String): Project!
        updateOrganization(organizationId: ID!, name: String!, description: String!, type: String!, startDate: String!, endDate: String!, url: String, image: String): Organization!
        deleteProject(projectId: ID!): Project!
        deleteOrganization(organizationId: ID!): Organization!
    }
`;
