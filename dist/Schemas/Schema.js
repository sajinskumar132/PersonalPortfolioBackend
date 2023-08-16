"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailType = exports.ProjectType = exports.Experiencetype = exports.SkillsType = exports.PersonalInfoType = void 0;
const graphql_1 = require("graphql");
exports.PersonalInfoType = new graphql_1.GraphQLObjectType({
    name: "PersonalInfoType",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        emailId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        Position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        Description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        Resume: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        linkedinId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
exports.SkillsType = new graphql_1.GraphQLObjectType({
    name: "SkillsType",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        image: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
exports.Experiencetype = new graphql_1.GraphQLObjectType({
    name: "ExperienceType",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        CompanyName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        Posting: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        StartDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        EndDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        Summary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        TaskOrResponsnibility: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) }
    })
});
exports.ProjectType = new graphql_1.GraphQLObjectType({
    name: "ProjectType",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        TechStack: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
        Summary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        Description: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
        Url: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
exports.EmailType = new graphql_1.GraphQLObjectType({
    name: "EmailType",
    fields: () => ({
        fromEmail: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        Subject: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        MailText: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
    })
});
