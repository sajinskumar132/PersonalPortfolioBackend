"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Schema_1 = require("../Schemas/Schema");
const Personal_Info_1 = __importDefault(require("../Models/Personal_Info"));
const mongoose_1 = require("mongoose");
const Skills_1 = __importDefault(require("../Models/Skills"));
const Experience_1 = __importDefault(require("../Models/Experience"));
const Projects_1 = __importDefault(require("../Models/Projects"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const Rootquery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        Personalinfo: {
            type: new graphql_1.GraphQLList(Schema_1.PersonalInfoType),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Personal_Info_1.default.find();
                });
            }
        },
        Skills: {
            type: new graphql_1.GraphQLList(Schema_1.SkillsType),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Skills_1.default.find();
                });
            }
        },
        Experience: {
            type: new graphql_1.GraphQLList(Schema_1.Experiencetype),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Experience_1.default.find();
                });
            }
        },
        Projects: {
            type: new graphql_1.GraphQLList(Schema_1.ProjectType),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Projects_1.default.find();
                });
            }
        }
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        //Personal Info
        CreatePersonalInfo: {
            type: Schema_1.PersonalInfoType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                emailId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Resume: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                linkedinId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, { name, emailId, Position, Description, Resume, linkedinId }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let newInfo = new Personal_Info_1.default({ name: name, emailId: emailId, Position: Position, Description: Description, Resume: Resume, linkedinId: linkedinId });
                        return yield newInfo.save();
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        UpdatePersonalInfo: {
            type: Schema_1.PersonalInfoType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                emailId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Resume: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                linkedinId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, { id, name, emailId, Position, Description, Resume, linkedinId }) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Personal_Info_1.default.findByIdAndUpdate(id, {
                        name: name, emailId: emailId, Position: Position, Description: Description, Resume: Resume, linkedinId: linkedinId
                    }, { new: true });
                });
            }
        },
        //Skill
        createSkills: {
            type: Schema_1.SkillsType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                image: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, { name, image }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const session = yield (0, mongoose_1.startSession)();
                    try {
                        session.startTransaction({ session });
                        let newSkill = new Skills_1.default({ name: name, image: image });
                        return yield newSkill.save();
                    }
                    catch (error) {
                        console.log(error);
                    }
                    finally {
                        yield session.commitTransaction();
                    }
                });
            }
        },
        DeleteSkill: {
            type: Schema_1.SkillsType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let exisingskills = yield Skills_1.default.findById(id);
                        if (!exisingskills)
                            return new Error("Skill not found");
                        return yield Skills_1.default.findByIdAndRemove(id);
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        //Experiences
        CreateExperience: {
            type: Schema_1.Experiencetype,
            args: {
                CompanyName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Posting: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                StartDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                EndDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Summary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                TaskOrResponsnibility: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) }
            },
            resolve(Parent, { CompanyName, StartDate, EndDate, Summary, TaskOrResponsnibility, Posting }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let newExperience = new Experience_1.default({ CompanyName, StartDate, EndDate, Summary, TaskOrResponsnibility, Posting });
                        return yield newExperience.save();
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        UpdateExperience: {
            type: Schema_1.Experiencetype,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                CompanyName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Posting: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                StartDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                EndDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Summary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                TaskOrResponsnibility: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) }
            },
            resolve(parent, { id, CompanyName, StartDate, EndDate, Summary, TaskOrResponsnibility, Posting }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const existingId = yield Experience_1.default.findById(id);
                        if (!existingId)
                            return new Error('Experience not found');
                        return yield Experience_1.default.findByIdAndUpdate(id, { CompanyName, StartDate, EndDate, Summary, TaskOrResponsnibility, Posting }, { new: true });
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        DeleteExperience: {
            type: Schema_1.Experiencetype,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let ExistingUser = yield Experience_1.default.findById(id);
                        if (!ExistingUser)
                            return new Error("Experince with this id not found");
                        return yield Experience_1.default.findOneAndRemove(id);
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        //Projects
        CreateProject: {
            type: Schema_1.ProjectType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                TechStack: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                Summary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Description: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                Url: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, { name, TechStack, Description, Url, Summary }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let newProject = new Projects_1.default({ name, TechStack, Description, Url, Summary });
                        return yield newProject.save();
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        UpdateProject: {
            type: Schema_1.ProjectType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                TechStack: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                Summary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Description: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                Url: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, { id, name, TechStack, Description, Url, Summary }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let existingId = yield Projects_1.default.findById(id);
                        if (!existingId)
                            return new Error('ID not found');
                        return yield Projects_1.default.findByIdAndUpdate(id, { name, TechStack, Description, Url, Summary }, { new: true });
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        DeleteProject: {
            type: Schema_1.ProjectType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let existingId = yield Projects_1.default.findById(id);
                        if (!existingId)
                            return new Error('ID not found');
                        return yield Projects_1.default.findOneAndRemove(id);
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        SendEmail: {
            type: Schema_1.EmailType,
            args: {
                fromEmail: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Subject: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                MailText: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, { fromEmail, Subject, MailText }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const Transport = nodemailer_1.default.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'sajinskumar39@gmail.com',
                                pass: 'Sajin73561',
                            },
                        });
                        const mailOptions = {
                            from: fromEmail,
                            to: 'sajinskumar39@gmail.com',
                            subject: Subject,
                            text: MailText,
                        };
                        console.log(mailOptions);
                        yield Transport.sendMail(mailOptions);
                        return "Mainsend";
                    }
                    catch (error) {
                        console.log(error);
                        return "MainNotsend";
                    }
                });
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({ query: Rootquery, mutation: Mutation });
